"use strict";
$(document).ready(function () {
    let favButton = $('#favorite-button');
    favButton.css('display', 'none');

    // Search Function
    function searchButton() {
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
                    // console.log(poster);
                    posterImage = poster.Search[0].Poster;
                });

            fetch(`http://www.omdbapi.com/?apikey=${movieKey}&t=${searchText}`)
                .then(function (response) {
                    // Parse the response as JSON
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
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
                    }
                })
        });
    }

    searchButton();


// THIS FUNCTION SENDS THE MOVIE TO THE FAVORITE LIST DATABASE
    function sendToDatabase() {
        document.getElementById('favorite-button').addEventListener('click', (function () {
            let posterImage = document.querySelector('#posterImage');
            let movieTitle = document.querySelector('#movieTitle');
            let releaseDate = document.querySelector('#released');
            let rating = document.querySelector('#rating');
            let genre = document.querySelector('#genre');
            console.log("event fired");
            let movieObj = {
                image: posterImage.src,
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
    }

    sendToDatabase();

    let movieIDs = [];

    // console.log(movieIDs);

    function renderFavorites() {
        fetch("https://flannel-brick-list.glitch.me/movies")
            .then(function (response) {
                return response.json();
            })
            .then(function (favoritesData) {
                // console.log(movieId)
                console.log(favoritesData);
                favoritesData.forEach(function (favMovie) {
                    // movieIDs.push(favMovie.id);
                    let favoriteList = document.getElementById('sidebar')
                    console.log(favMovie.id)
                    favoriteList.innerHTML += `
    <!--FAVORITE MOVIE CARD-->
    <p id="movieId" style="visibility: hidden">${favMovie.id}</p>
            <div class="card" style="width: 18em;">
    <img src="${favMovie.image}" class="card-img-top">
    <div class="card-body">
        <h5 class="card-title">${favMovie.title}</h5>
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">${favMovie.released}</li>
        <li class="list-group-item">${favMovie.rating}</li>
        <li class="list-group-item">${favMovie.genre}</li>
        <li class="list-group-item"  id="favmovie-${favMovie.id}"></li>
    </ul>
<!--   EDIT/DELETE MODAL-->
    <div class="card-body">
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
                <button type="button" id="editButton" class="btn btn-primary">Submit</button>
            </div>
        </div>
    </div>
</div>
        <button type="button" id="deleteButton" class="btn btn-primary">Delete</button>
    </div>
</div>`
                })
            })


    }
    renderFavorites();

    console.log($('#deleteButton'))

                function deleteButton () {
                    fetch("https://flannel-brick-list.glitch.me/movies")
                    .then(function (response) {
                    return response.json();
                })
                .then(function (favoritesData) {
                // console.log(movieId)

                favoritesData.forEach(function (favMovie) {
                    console.log(`${favMovie.id}`)
                    $("#deleteButton").click(function () {
                        console.log('event fired');
                        // const url = `https://flannel-brick-list.glitch.me/movies/${favMovie.id}`;
                        // const options = {
                        //     method: 'DELETE',
                        //     headers: {
                        //         'Content-Type': 'application/json',
                        //     }
                        // };
                        // fetch(url, options)
                        //     .then(response => console.log(response)) /* review was created successfully */
                        //     .catch(error => console.error(error)); /* handle errors */
                        deleteMovie($("$movieId").innerHtml())
                    });
                    })
                })
                }
                deleteButton();



                // // EDIT BUTTON ON SUBMIT
                //
                // document.getElementById('editButton').addEventListener('click', (function () {
                //     console.log('event fired');
                //     let posterImage = document.querySelector('#posterImage');
                //     let editedTitle = document.querySelector('#title-name');
                //     console.log(editedTitle);
                //     let editedRelease = document.querySelector('#release-date');
                //     let editedRating = document.querySelector('#rating-name');
                //     let editedGenre = document.querySelector('#genre-name');
                //
                //     const editedObj = {
                //         image: posterImage.src,
                //         title: editedTitle.textContent,
                //         released: editedRelease.textContent,
                //         rating: editedRating.textContent,
                //         genre: editedGenre.textContent,
                //     };
                //
                //     const url = 'https://flannel-brick-list.glitch.me/movies';
                //     const options = {
                //         method: 'PUT',
                //         headers: {
                //             'Content-Type': 'application/json',
                //         },
                //         body: JSON.stringify(editedObj),
                //     };
                //     fetch(url, options)
                //         .then( response => console.log(response) ) /* review was created successfully */
                //         .catch( error => console.error(error) ); /* handle errors */
                // }));
                //
                //
                // DELETE BUTTON



                function deleteMovie(id) {
                    console.log("fired")
                    console.log(id);
                    fetch('https://flannel-brick-list.glitch.me/movies' + '/' + id, {
                        method: 'DELETE'
                    }).then(() => {
                            console.log('resolved');
                        }
                    )
                }


            });




// $('.edit-movie').click(function(e){
//     e.preventDefault();
//     console.log('Edit Movie fired');
//     alert('Boom');
//
//     let editId = this.getAttribute('data-dbid');
//     console.log(editId);
//     getMovies().then(data => console.log('Edit this:', data[editId - 1].Title));
//
// })
//
// // Delete Movie
// $('.delete-movie').click(function(e){
//     e.preventDefault();
//     let deleteId = this.getAttribute('data-dbid');
//     removeMovie(deleteId);
// })