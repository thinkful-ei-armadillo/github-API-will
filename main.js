// Review GitHug's API documentation for the LIST USER REPOSITORIES ENDPOINT to understand how this endpoint works.
// User must be able to SEACH for a GitHub user handle
// Search must trigger a call to GitHub's API
// Repo Associated with that handle must be displayed on the page (must display the repo name and link to repo URL)
// The user display the repo name and link to repo URL
// Time Limit - 1 hour.

'use strict';
/* global $ */

// REQUIRED: The name of the repository


// URL to access API
// List public repos for specified user -> GET /users/:username/repos
const url = 'https://api.github.com/users/'; 


// function to call GitHub's API to user's link URLs

function fetchUsersResults(userName) {
  const searchURL = url + userName + '/repos';  // -> /users/:username/repos

  fetch(searchURL)
    .then(response => response.json()
      .then(responseJson => displaySearchResults(responseJson)))
    .catch(error => alert('Error! No results'));
}


// function to iterate through responseJson and display the desired values
function displaySearchResults(responseJson) {
  console.log(responseJson); // pulling the correct information when testing
  const results = []; 
  // 
  for (let i = 0; i < responseJson.length; i++) { // for loop to push results into results
    results.push(`
        <p><a href='${responseJson[i].html_url}'>${responseJson[i].name}</a></p><hr>
      `);
  }
  $('#js-search-results').html(results.join('')); // target and generate html string of loop results
}


// handler for search function
function watchForm() {
  $('form').submit(function(event) {
    event.preventDefault();
    const userValue = $('#search-input').val(); // grab user input value
    console.log(userValue);
    fetchUsersResults(userValue); // plug in userValue value into parameter to get results
  });
}


function main() {
  console.log('main ran');
  watchForm();
}

// run on page load
$(main);


