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

import {genres} from './genre_constants.js';

/** 
 * Implements  Fisher-Yates shuffle (from https://javascript.info/task/shuffle).
 */
function shuffle(array) {
  let retArray = [...array];
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
function validateForm(form) {
  const valid = form.checkValidity();
  form.classList.add('was-validated');
  return valid;
}

/**
 * Generates a playlist based on selected genres and number of songs.
 */
function generatePlaylist() {
  const playlistForm = document.getElementById('playlistForm');
  if (validateForm(playlistForm) === false) {
    return;
  }

  // Get user selections
  const selectElement = document.getElementById('genreSelect');
  let selectedGenres = Array.from(selectElement.selectedOptions)
      .map(option => option.value);
  const playlistLength = document.getElementById("playlist-length").value;

  // Calculate number of songs for each genre
  const songsPerGenre = Math.floor(playlistLength / selectedGenres.length);
  const numRemaining = playlistLength % selectedGenres.length;

  // Randomly choose indexes and populate title and ID arrays
  let playlistStrings = [];
  let playlistIds = [];
  let generatedIndexes = [];
  for (let i = 0; i < selectedGenres.length; i++) {
    const selectedGenre = genres.find(({genreName}) => genreName === selectedGenres[i]);
    const genreSongs = selectedGenre.songs;
    const indexes = shuffle([...Array(genreSongs.length).keys()]);
    
    if (i !== selectedGenres.length-1) {
      generatedIndexes = indexes.slice(0, songsPerGenre);
    }
    else {
      generatedIndexes = indexes.slice(0, songsPerGenre + numRemaining);
    }
    
    for (let j = 0; j < generatedIndexes.length; j++) {
      playlistStrings.push(genreSongs[j].title);
      playlistIds.push(genreSongs[j].id);
    }
  }

  // Make youtube playlist URL
  let playlistUrl = "https://www.youtube.com/watch_videos?video_ids=";
  playlistUrl += playlistIds.join();

  // Remove previous playlist from page and add new one
  const playlistContainer = document.getElementById('playlist-container');
  while (playlistContainer.hasChildNodes()) {
    playlistContainer.removeChild(playlistContainer.childNodes[0]);
  }

  const heading = document.createElement('h2');
  heading.innerText = "Here are your tunes:";
  const playlistLink = document.createElement('a');
  playlistLink.className = "btn btn-primary mb-2";
  playlistLink.href = playlistUrl;
  playlistLink.innerText = "YouTube Playlist";
  playlistLink.target = "_blank";

  playlistContainer.appendChild(heading);
  playlistContainer.appendChild(playlistLink);
  playlistContainer.appendChild(makeUL(playlistStrings));
}

document.getElementById('playlistSubmit').addEventListener('click', generatePlaylist);

/**
 * Add a string saying hello to the DOM
 */
function sayHello() {
  fetch('/data').then(response => response.text()).then((greeting) => {
    document.getElementById('greeting-container').innerText = greeting;
  });
}
