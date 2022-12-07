"use strict";
$(document).ready(function () {
    let favButton = $('#favorite-button');
    favButton.css('display', 'none');

    // When the user clicks the submit button...
    let card = $("#searchButton").click(function (event) {
        event.preventDefault();

        let searchBar = document.querySelector("#search");
        let searchText = searchBar.value;
        let posterImage = ''
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
                    favButton.css('display', 'none');
                } else {
                    movieContainer.innerHTML = '';
                    let delay = 500; // delay time in milliseconds

                    let timeoutId = setTimeout(function () {
                        movieContainer.innerHTML += `
                        <div class="card-body">
                          <img id="posterImage" src = "${posterImage}" class="card-img-top" alt="...">
                           <h5 id="movieTitle" class="card-title">${data.Title}</h5>
                          <p id="released" class="card-text">Released: ${data.Released}</p>
                          <p id="rating" class="card-text">imdbRating: ${data.imdbRating}</p>
                          <p id="genre" class="card-text" >Genre: ${data.Genre}</p>  
<!--                          <a id="favorite-button" href="#" class="btn btn-primary">Add to Favorites</a>-->
                         </div>                
                        `;
                        favButton.show();
                    }, delay);
                    // console.log($("#favorite-button"))
                    // $('#favorite-button').toggle("d-none");
                    //
                    //     $('#favorite-button').click(function(event) {
                    //         event.preventDefault();
                    //
                    //     });

                }
            })
    });


    document.getElementById('favorite-button').addEventListener('click', (function () {
        let posterImage = document.querySelector('#posterImage');
        let movieTitle = document.querySelector('#movieTitle');
        let releaseDate = document.querySelector('#released');
        let rating = document.querySelector('#rating');
        let genre = document.querySelector('#genre');
        console.log("event fired");
        let movieObj = {
            image: posterImage.textContent,
            title: movieTitle.textContent,
            released: releaseDate.textContent,
            rating: rating.textContent,
            genre: genre.textContent,
        };
        const url = 'https://flannel-brick-list.glitch.me/movies';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movieObj),
        };
        fetch(url, options)
            .then(response => console.log(response)) /* review was created successfully */
            .catch(error => console.error(error)); /* handle errors */
    }))


});

fetch("https://flannel-brick-list.glitch.me/movies")
    .then(function (response) {
        // Parse the response as JSON
        return response.json();
    })
    .then(function (favoritesData) {
        favoritesData.forEach(function (favMovie) {
            let favoriteList = document.getElementById('favorite-list')
            favoriteList.innerHTML += `
            <li>${favMovie.title} (${favMovie.released})</li>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Edit</button>

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Movie:</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="mb-3">
                        <label for="title-name" class="col-form-label">Title:</label>
                        <input type="text" class="form-control" id="title-name">
                    </div>
                    <div class="mb-3">
                        <label for="release-date" class="col-form-label">Release Date:</label>
                        <input type="text" class="form-control" id="release-date">
                    </div>
                    <div class="mb-3">
                        <label for="rating-name" class="col-form-label">Rating:</label>
                        <input type="text" class="form-control" id="rating-name">
                    </div>
                    <div class="mb-3">
                        <label for="genre-name" class="col-form-label">Genre:</label>
                        <input type="text" class="form-control" id="genre-name">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Submit</button>
            </div>
        </div>
    </div>
</div>
            `
        })
    })


//
// // get the array from the database using jQuery's $.ajax() function
//     $.ajax({
//         url: "https://flannel-brick-list.glitch.me/movies", type: "GET", dataType: "json", success: function (array) {
//             // add the new object to the array
//             array.push(newObject);
//             console.log(array);
//
//             // save the array back to the database using $.ajax()
//             $.ajax({
//                 url: "https://flannel-brick-list.glitch.me/movies",
//                 type: "POST",
//                 data: JSON.stringify(array),
//                 contentType: "application/json; charset=utf-8",
//                 dataType: "json",
//                 success: function (result) {
//                     // the array was saved successfully
//                     console.log(result);
//                 }
//             });
//         }
//     });
//
// });








