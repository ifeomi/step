// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/** 
 * Implements  Fisher-Yates shuffle (from https://javascript.info/task/shuffle).
 */
function shuffle(array) {
  retArray = [...array];
  for (let i = retArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [retArray[i], retArray[j]] = [retArray[j], retArray[i]];
  }

  return retArray;
}

/** 
 * Makes unordered list from array.
 */
function makeUL(array) {
  const list = document.createElement('ul');

  for (let i = 0; i < array.length; i++) {
    const item = document.createElement('li');
    item.appendChild(document.createTextNode(array[i]));
    list.appendChild(item);
  }

  return list
}

/**
 * Validates form on submission.
 */
(function() {
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    const validation = Array.prototype.filter.call(forms, function(form) {
      const button = document.getElementById('playlistSubmit');
      button.addEventListener('click', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();


/**
 * Generates a playlist based on selected genres and number of songs.
 */
function generatePlaylist() {

  // Constants
  const playlistForm = document.forms["playlistSelections"];
  const genreToListMap = new Map() 
  const hipHop = ["Check yo self - ice cube", "Tierra Whack - only child", "Gold teeth - blood orange", "Who dat boy - tyler, the creator", "Poetic justice - kendrick lamar", "Solo (reprise) - frank ocean", "Bank - earthgang", "It ain’t hard to tell - nas", "Jazz - mick jenkins", "Boogie - brockhampton", "Ready or not - fugees", "Wax on - injury reserve", "King kunta - kendrick lamar", 
      "Self - noname", "Casket pretty - noname", "Bissonnet - maxo kream", "Pimp tha pen - dj screw", "Realer - Megan Thee Stallion", "Rnp - ybn cordae", "Mood - rico nasty", "Cheat code - rico nasty"];
  const rAndB = ["Cranes in the Sky - Solange", "Diddy Bop - Noname", "Come Over - the internet", "Whipped cream - ari lennox", "4 leaf clover - ravyn lenae", "Nothing burns like the cold - snoh allegra", "Dear april - frank ocean", "Do u wrong - leven kali", "Hair down - sir", "Petrol bliss - choker", "Florence - loyle carner", "Shades of blue - kelsey lu", "Color theory - kari faux", 
      "George-arlo parks", "Good for you - blood orange", "Headaches - raveena", "Polly - moses sumney", "Montego bae - noname", "Pink and white frank ocean", "Wikipedia - jean deaux", "Sticky - raven lenae", "Grey luh - berhana", "Self importance - kilo kish"];
  const funk = ["Superstition - Stevie Wonder", "Purple Rain - Prince", "Raspberry Beret - Prince", "What’s Going On - Marvin Gaye", "Brick House - Commodores", "I Got to Groove - Tower of Power", "Tell Me Something Good - Rufus and Chaka Khan", "Thank You (Falettinme Be Mice Elf Agin) - Sly & the Family Stone", "Maggot Brain - Funkadelic", "Move on Up - The Dynamics", 
      "Don’t Stop ‘Til You Get Enough - Michael Jackson", "Signed, Sealed, Delivered (I'm Yours) - Stevie Wonder", "Sir Duke - Stevie Wonder", "When Doves Cry - Prince", "Daddy Rich - Rose Royce", "Sing a Simple Song - Sly & the Family Stone", "Get Down On It - Kool & the Gang", "Play that Funky Music - Wild Cherry", "Get Up (I Feel Like Being A) Sex Machine - James Brown", 
      "Papa Was a Rolling Stone - the Temptations", "Water No Get Enemy - Fela Kuti"];
  const bedroomPop = ["Grandfather Clock - Thea", "Hit Me Up - Omar Apollo", "Ugotme - Omar Apollo", "Foolsong - Still Woozy", "B Cool - MaGroove", "Eternally 12 - Melanie Faye", "Paradise - Rex Orange County", "If You Want To - beabadoobee", "Bags - Clairo", "Sofia - Clairo", "Flaming Hot Cheetos - Clairo", "Hello? - Clairo", "Drowsy - Banes World", 
      "Gap in the Clouds - Yellow Days", "Know Love - Rex Orange County", "Can’t be // How u feel - Billy Lemos", "Dreamz - Sara King", "Smoke Song Interlude - Sebastian Roca", "Moon Undah Water - Puma Blue", "Midnight Blue - Puma Blue", "Foolsong - Still Woozy", "Lucy - Still Woozy", "Sunflower - Rex Orange County"];
  const neoSoul = ["Almeda - Solange", "Doo wop - lauryn hill", "Stay flo - solange", "Ascension - maxwell", "Song 32 - noname", "Love is stronger than pride - solange", "Jailer - Asa", "Out my mind, just in time - erykah badu", "Are We Still Friends - tyler the creator", "Earfquake - tyler the creator", "Moon river - frank ocean", "Can’t take my eyes off you - lauryn hill", 
      "Get up - amel larrieux", "Culture - kaytranada", "Sweet Love - Anita baker", "What you need - kaytranada", "Whathegirlmuthafuckinwannadoo - the coup", "I want war (but i need peace) - kali uchis", "The charade - d’angelo", "How does it feel - d’angelo", "Back to the future (part i) - d’angelo", "Dark red - steve lacy", "Some - steve lacy"];
  const postPunk = ["Punks - Matt Champion", "Fangs - matt champion", "Call this # now - the garden", "Stylish spit - the garden", "All access - the garden", "Clench to stay awake - the garden", "Bizarre love triangle - new order", "Neat neat neat - the damned", "Emergency blimp - king krule", "Vidual - king krule", "Half man half shark - king krule", "Comet face - king krule", 
      "Blue train lines - mount kimbie", "Midnight 01 (deep sea diver) - king krule", "Heads will roll - yeah yeah yeahs", "Wolf like me - tv on the radio", "Tenement roofs - glorious din", "Big joanie - dream no 9", "Rip it up - orange juice", "Blister in the sun - violent femmes", "Disorder - joy division"];

  // Get user selections
  const selectElement = document.getElementById('genreSelect');
  let selectedGenres = Array.from(selectElement.selectedOptions)
      .map(option => option.value);
  
  playlistLength = document.getElementById("playlist-length").value;

  // Populate map
  genreToListMap.set('hip-hop', hipHop);
  genreToListMap.set('rb', rAndB);
  genreToListMap.set('funk', funk);
  genreToListMap.set('bedroom-pop', bedroomPop);
  genreToListMap.set('neo-soul', neoSoul);
  genreToListMap.set('post-punk', postPunk);

  // Get number of songs for each genre
  const songsPerGenre = Math.floor(playlistLength / selectedGenres.length);
  const numRemaining = playlistLength % selectedGenres.length;

  // Randomly select songs from genres
  let playlist = [];
  for (let i = 0; i < selectedGenres.length; i++) {
    genreSongs = genreToListMap.get(selectedGenres[i]);
    shuffledGenreSongs = shuffle(genreSongs);
    if (i !== selectedGenres.length-1) {
      playlist = playlist.concat(shuffledGenreSongs.slice(0, songsPerGenre));
    }
    else {
      playlist = playlist.concat(shuffledGenreSongs.slice(0, songsPerGenre + numRemaining));
    }
  }

  // Remove previous playlist from page and add new one
  const playlistContainer = document.getElementById('playlist-container');
  if (playlistContainer.hasChildNodes()) {
    playlistContainer.removeChild(playlistContainer.childNodes[0]);
  }
  playlistContainer.appendChild(makeUL(shuffle(playlist)));  

  // TODO: make youtube playlist 
}