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
const hipHopIds = ["HdOhwPovkHI", "CXdTShfFPYM", "Wzurw1w3AjY", "FUXX55WqYZs", "iOtRxcTMsHc", "XXMHQ410P-c", "t5gh4uX-X40",
    "0yCJs3GrjpE", "F-4KiszXxHM", "4cucHc2vef4", "aIXyKmElvv8", "F2r-8fd1jVE", "AC4bb9Q9-04", "tYVebHOrlZU", "f--ZuvER98U",
    "8KxXsQjJsIw", "zI19cWqsLhA", "lDWeob50YY8", "sTTU-T9-RTs", "OJyy_stKS9c", "1og6jfhUPxE"];
const rAndBIds = ["lnUV4cz0gv8", "OxdCR6wwoXs", "lovts-q5s0s", "vT02Lo5WhLI", "YzI76YfVXD4", "kobOjAkSrhk", "pvU4b4N1-QU", 
    "TftBcX-kCQc", "9G-vhg8T2rc", "DBkjjuAoajY", "7HiB-hNt_mw", "6Fc4QwsTz_g", "i9PmsucjHrM", "NclTIViKiyE", "6UpjbnDfbRU",
    "3xotpsdLS6c", "dta4heZacZE", "opRwZJsOe0w", "uzS3WG6__G4", "HK90QhbzIkw", "jEvv2PR0ZeI"];
const funkIds = ["ftdZ363R9kQ", "S6Y1gohk5-A", "l7vRSu_wsNc", "MhC_iLBrSUY", "HhPu6GEoad8", "ALzISTfdXpQ", "vuDCi5neNMM",
    "NOa5UOHdwnc", "T1NW57lk5fY", "50W9W0RHvwI", "yURRmWtbTbo", "6To0fvX_wFA", "EnNgASBdCeo", "oTUSeac7IuQ", "C02SFbc4zmM",
    "42YGprrAOj0", "qchPLaiKocI", "JTvlujbJ5vg", "5SrQ9graFWQ", "71l85z2bXAs", "eAk3ayxi8Gk"];
const bedroomPopIds = ["Mf5XrSuQ4R8", "2p7m2iY-WSY", "A0gpfwZP_To", "WMp0ZyQWKf4", "GYEKlxUty84", "dvWZt6SuNtI",
    "zC3GHcPN4EQ", "sTQNJT7OZew", "L9HYJbe9Y18", "L9l8zCOwEII", "SRbzuwYMyDE", "QkeehQ8D_VM", "oFYOxVeQBTo", "GM8YDU6ZjBw",
    "7VVLDCR4wPM", "xqC--4paOTM", "5ohMAVDUswQ", "qTe6toWNC6s", "OeCS-DZsgKM", "jCkBxmPbohk", "WMp0ZyQWKf4"];
const neoSoulIds = ["6giKIu5jUvA", "T6QKqFPRZSA", "_W14wK4QGh4", "D7rm9t5S4uE", "0a4PD4SwEAs", "0ZARYxRmNWg", "OQuQV6u8-tk",
    "2j4qvVyRgRk", "Gb76TgCUqAY", "t-E2gm0a_N0", "mXiFHDfvn4A", "wVzvXW9bo5U", "hToe5L41y6c", "uhjtjOUsQ6c", "2w6udgiojlE",
    "ajOCGskHs2A", "ygkIMT4vsTE", "n0tWINt8Ofk", "T3CunfPYkME", "SxVNOnPyvIU", "ISCFeQ7963A"];
const postPunkIds =["6qHClRnSQYM", "l03ybrIMxKo", "JRiSdAe8sGY", "rW43Sq4Rgjo", "c7rsPaDXtng", "N5an4_Iw7ZU", "tkOr12AQpnU",
    "VaMU_6sI3j8", "iAmZPxuMHsc", "kfFhOsjz7jc", "2XzXLzA2Hrc", "k-lg3v4HtBA", "OMMlPs0O2rw", "Ncq7I-EHQ0Q", "PCZ2Dp6Is9M",
    "j1-xRk6llh4", "XV765LFwHJE", "uIYo1okOm9U", "UzPh89tD5pA", "ImIESKQKKJo", "5BIElTtN6Fs"];

class Song {
  /**
   * @param {string} id ID for YouTube video of song
   * @param {string} title Song title
   */
  constructor(id, title) {
    this.id = id;
    this.title = title;
  }
}

class Genre {
  /**
   * @param {string} genreName Title of the genre
   * @param {Song[]} songs List of songs in the genre
   */
  constructor(genreName, songs) {
    this.genreName = genreName;
    this.songs = songs;
  }
}

const hipHopSongs = [];
const rAndBSongs = [];
const funkSongs = [];
const bedroomPopSongs = [];
const neoSoulSongs = [];
const postPunkSongs = [];

function populateSongArrays(songArray, idArray, titleArray) {
  for (let i=0; i<titleArray.length; i++) {
    songArray.push(new Song(idArray[i], titleArray[i]));
  }
}

populateSongArrays(hipHopSongs, hipHopIds, hipHop);
populateSongArrays(rAndBSongs, rAndBIds, rAndB);
populateSongArrays(funkSongs, funkIds, funk);
populateSongArrays(bedroomPopSongs, bedroomPopIds, bedroomPop);
populateSongArrays(neoSoulSongs, neoSoulIds, neoSoul);
populateSongArrays(postPunkSongs, postPunkIds, postPunk);

// Populate map and genre array
const genreToListMap = new Map([['hip-hop', hipHopSongs], ['rb', rAndBSongs],
    ['funk', funkSongs], ['bedroom-pop', bedroomPopSongs],
    ['neo-soul', neoSoulSongs], ['post-punk', postPunkSongs]]);

const genres = [];
genreToListMap.forEach(function(value, key) {
    genres.push(new Genre(key, value));
})

export {genres};