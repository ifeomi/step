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

import { genres } from "./genre_constants.js";
const defaultMaxComments = "5";
let email;

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
function makeUL(array, ulClass, liClass) {
  const list = document.createElement("ul");
  if (ulClass !== null) {
    list.className = ulClass;
  }
  for (let i = 0; i < array.length; i++) {
    const item = document.createElement("li");
    if (liClass !== null) {
      item.className = liClass;
    }
    if (typeof(array[i]) === "object") {
      item.appendChild(array[i]);
    }
    else {
      item.appendChild(document.createTextNode(array[i]));
    }
    list.appendChild(item);
  }

  return list
}

/**
 * Validates form on submission.
 */
function validateForm(form) {
  const valid = form.checkValidity();
  form.classList.add("was-validated");
  return valid;
}

function removeChildren(element) {
  while (element.hasChildNodes()) {
    element.removeChild(element.childNodes[0]);
  }
}

/**
 * Generates a playlist based on selected genres and number of songs.
 */
function generatePlaylist() {
  const playlistForm = document.getElementById("playlistForm");
  if (validateForm(playlistForm) === false) {
    return;
  }

  // Get user selections
  const selectElement = document.getElementById("genreSelect");
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
  const playlistContainer = document.getElementById("playlist-container");
  removeChildren(playlistContainer);

  const heading = document.createElement("h2");
  heading.innerText = "Here are your tunes:";
  const playlistLink = document.createElement("a");
  playlistLink.className = "btn btn-primary mb-2";
  playlistLink.href = playlistUrl;
  playlistLink.innerText = "YouTube Playlist";
  playlistLink.target = "_blank";

  playlistContainer.appendChild(heading);
  playlistContainer.appendChild(playlistLink);
  playlistContainer.appendChild(makeUL(playlistStrings));
}

/**
 * Converts JS object representing a comment to a HTML card
 * @param Object comment 
 */
function commentToHTMLElement(comment) {
  const card = document.createElement("div");
  card.className = "card border-0 my-1";
  const cardBody = document.createElement("div");
  cardBody.className = "card-body";
  const title = document.createElement("h5");
  title.className = "card-title";
  let titleHTML = "<a href=\"mailto:"+ comment.email + "\">" + comment.author + "</a>";
  titleHTML += "&nbsp&nbsp<small class=\"text-muted\">" + comment.timestamp + "</small>";
  title.innerHTML = titleHTML;
  const deleteButton = document.createElement("button");
  deleteButton.dataset.key = comment.key;
  deleteButton.innerText = "Delete";
  deleteButton.className = "btn btn-delete btn-secondary btn-sm float-right";
  const message = document.createElement("p");
  message.className = "card-text";

  for (let sentence in comment.sentenceScores) {
    if (comment.sentenceScores[sentence] > 0) {
      comment.message = comment.message.replace(sentence, "<span class=\"positive-sentiment\">"+sentence+"</span>")
    }
    else if (comment.sentenceScores[sentence] < 0) {
      comment.message = comment.message.replace(sentence, "<span class=\"negative-sentiment\">"+sentence+"</span>")
    }
  }
  message.innerHTML = comment.message;

  const score = document.createElement("div");
  score.className = "card-footer text-muted";
  score.innerText = "Sentiment score: " + comment.sentimentScore;
  
  card.appendChild(cardBody);
  if (email === comment.email) {
    cardBody.appendChild(deleteButton);
  }
  cardBody.appendChild(title);
  cardBody.appendChild(message);
  card.appendChild(score);
  
  return card;
}

function addLoadMoreButton(nextCursor) {
  if (nextCursor === false) {
    return document.createTextNode("All comments loaded.")
  }
  const loadMore = document.createElement("button");
  loadMore.type = "button";
  loadMore.className = "btn btn-primary";
  loadMore.dataset.cursor = nextCursor;
  loadMore.innerText = "Load more";
  loadMore.addEventListener("click", (event) => {
    addComments(defaultMaxComments, event.target.dataset.cursor, false);
  });
  return loadMore;
}

/**
 * Add comments to DOM.
 */
function addComments(numComments, cursor, clear) {
  getLoginStatus();

  if (numComments === undefined) {
    numComments = defaultMaxComments;
  }
  const commentContainer = document.getElementById("comments-container");
  const loadMoreContainer = document.getElementById("load-more-container");
  if (clear === true || clear === undefined) {
    removeChildren(commentContainer);
  }

  fetch("/data?max=" + numComments + "&cursor=" + cursor).then(response => response.json()).then((commentResponse) => {
    for (let element of commentResponse.comments.map(commentToHTMLElement)) {
      commentContainer.appendChild(element);
    }
    addDeleteButtonListener("btn-delete");
    removeChildren(loadMoreContainer);
    loadMoreContainer.appendChild(addLoadMoreButton(commentResponse.nextCursor));
  });
}

function getLoginStatus() {
  fetch("/login").then(response => response.json()).then((status) => {
    if (status.loggedIn) {
      document.getElementById("comment-form").style.display = "block";
      document.getElementById("login-container").innerHTML = 
          "<p>You are logged in as " + status.email + ". Log out <a href=\""
          + status.url + "\">here</a>.</p>";
    } else {
      document.getElementById("login-container").innerHTML = 
          "<p>Log in <a href=\"" + status.url + "\">here</a> to leave a comment.</p>";
    }
    email = status.email;
  });
}

/**
 * Delete all comments from the DOM.
 * @param String key - the key of the comment to be deleted
 */
function deleteComments(key) {
  const request = new Request("/delete?key=" + key + "&email=" + email, {method: "POST"});
  fetch(request).then(addComments());
}


// Event listeners
window.addEventListener('load', function() {
  addComments();
});

function addDeleteButtonListener(className) {
  const buttons = document.getElementsByClassName(className);
  for (const button of buttons) {
    button.addEventListener("click", (event) => {
      deleteComments(event.target.dataset.key);
    });
  }
}

if (document.getElementById("playlistSubmit") !== null) {
  document.getElementById("playlistSubmit").addEventListener("click", generatePlaylist);
}

if (document.getElementById("maxComments") !== null) {
  const maxCommentsSelect = document.getElementById("maxComments");
  maxCommentsSelect.addEventListener("change", function() {
    const numComments = maxCommentsSelect.value;
    addComments(numComments);
  });
}
