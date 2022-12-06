"use strict";
// Create the search bar element
let searchBar = document.querySelector("#search");
// let submitButton = document.querySelector("#searchButton");
// Set the text of the submit button
// submitButton.innerHTML = "Search";

// Listen for changes to the search bar
searchBar.addEventListener("input", function () {
    // Get the value of the search bar
    let searchText = searchBar.value;

    // Search for movies based on the search text
    searchMovies(searchText);
});

// Listen for the submit event on the submit button
// submitButton.addEventListener("submit", function (event) {
//     // Prevent the default form submission behavior
//     event.preventDefault();
//
//     // Get the value of the search bar
//     let searchText = searchBar.value;
//
//     // Search for movies based on the search text
//     searchMovies(searchText);
// });


// Search for movies with the given search text
function searchMovies(searchText) {
    // Use the fetch API to make a request to the movie database API
    fetch(`http://www.omdbapi.com/?apikey=${movieKey}&s=${searchText}`)
        .then(function (response) {
            // Parse the response as JSON
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        //     if (data.Response === "False") {
        //         movieContainer.innerHTML = `
        //   <h2>Movie Not Available!</h2>
        // `;
        //     } else {
        //         // Loop through the list of movies and display their information
        //         data.Search.forEach(function (movie) {
        //             const movieContainer = document.getElementById("movie-info");
        //             movieContainer.innerHTML += `
        //     <h2>${movie.Title}</h2>
        //     <p>Released: ${movie.Released}</p>
        //     <p>imdbRating: ${movie.imdbRating}</p>
        //     <p>Genre: ${movie.Genre}</p>
        //   `;
        //         });
        //     }
        });
}

