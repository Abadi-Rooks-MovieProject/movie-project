"use strict";
$(document).ready(function () {



    // When the user clicks the submit button...
    $("#searchButton").click(function () {
        // Get the search query from the input field
        // var searchQuery = searchBar.value;
        let searchBar = document.querySelector("#search");
        let searchText = searchBar.value;
        let posterImage = ''
        // Movie poster
       fetch(`http://www.omdbapi.com/?apikey=${movieKey}&s=${searchText}`)
       .then(function (response) {
               // Parse the response as JSON
               return response.json();
           })
               .then(function (poster) {
                   console.log(poster);

                   posterImage = poster.Search[0].Poster;
        });

        fetch(`http://www.omdbapi.com/?apikey=${movieKey}&t=${searchText}`)
            .then(function (response) {
                // Parse the response as JSON
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                // let movieDisplay = [];
                let movieContainer = document.getElementById("movie-info");
                if (data.Response === "False") {
                    movieContainer.innerHTML = '';
                    movieContainer.innerHTML += "Movie Not Available!";
                } else {
                    movieContainer.innerHTML = '';
                    let delay = 1000; // delay time in milliseconds

                    let timeoutId = setTimeout(function () {
                        movieContainer.innerHTML += `
                        <div class="card-body">
                          <img src = "${posterImage}" class="card-img-top" alt="...">
                           <h5 id="movieTitle" class="card-title">${data.Title}</h5>
                          <p id="released" class="card-text">Released: ${data.Released}</p>
                          <p id="rating" class="card-text">imdbRating: ${data.imdbRating}</p>
                          <p id="genre" class="card-text" >Genre: ${data.Genre}</p>
                          <a id="favorite-button" href="#" class="btn btn-primary">Add to Favorites</a>      
                         </div>
                        `;
                    }, delay);
                }
            });
    });
    // define the object you want to add to the array
    var newObject = {
        key1: "value1", key2: "value2"
    };

// get the array from the database using jQuery's $.ajax() function
    $.ajax({
        url: "https://flannel-brick-list.glitch.me/movies", type: "GET", dataType: "json", success: function (array) {
            // add the new object to the array
            array.push(newObject);
            console.log(array);

            // save the array back to the database using $.ajax()
            $.ajax({
                url: "https://flannel-brick-list.glitch.me/movies",
                type: "POST",
                data: JSON.stringify(array),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    // the array was saved successfully
                    console.log(result);
                }
            });
        }
    });

});








