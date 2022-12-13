//----------------------- LOADER ------------------------
const loader = document.querySelector('#loader-container')
const load = () => { loader.style.visibility = 'visible'; }
const timeout = () => { loader.style.visibility = 'hidden'; }

//----------------------- MY MOVIES: PROJECT REQUIREMENTS ------------------------

// FETCH FUNCTION: Returns Array
// PROTOTYPE: fetchMyMovies();
const fetchMyMovies = async (id) => {
    try {
        load();
        const res = (id) ? await fetch(`https://flannel-brick-list.glitch.me/movies/${id}`):
            await fetch('https://flannel-brick-list.glitch.me/movies/');
        const data = await res.json();
        timeout();
        return data;
    } catch (e) {
        console.log("Error Occurred :(", e);
    }
};


// POST FUNCTION: Add a movie to My Movies DB, using imdbId
// RUNS: fetchMovieFromAPI(id) & fetchMyMovies()
// PROTOTYPE: postToMyMovies('tt0104431')
const addMyMovies = async (id) => {
    try {
        const movie = await fetchAPIMovie(id);
        fetch("https://flannel-brick-list.glitch.me/movies", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movie),
        }).then( async ()=>{
            isDiscover = false;
            await renderMovies(await movies());
        });
    } catch (e) {
        console.log("Error Occurred :(", e);
    }
}

// PATCH FUNCTION: Update a movie, using movie object
// RUNS: fetchMyMovies()
// PROTOTYPE: matchMyMovie(movie);
const editMyMovie = (movie) => {
    try {
        timeout();
        fetch(`https://flannel-brick-list.glitch.me/movies/${movie.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movie),
        }).then( async ()=>{
            await renderMovies(await movies())
        });
    } catch (e) {
        console.log(`Error Occurred: ${e}`)
    }
}

// DELETE FUNCTION: Deletes a movie, using movie id
// RUNS: fetchMyMovies()
// PROTOTYPE: deleteMyMovie(id);
const deleteMyMovie = (id) => {
    try {
        fetch(`https://flannel-brick-list.glitch.me/movies/${id}`, {
            method: 'DELETE',
        }).then( async ()=>{
            await renderMovies(await movies())
        });
    } catch (e) {
        console.log("Error Occurred :(", e);
    }
}


        })
    })
}

// MODAL: EDIT BUTTON
const addEditListener =  (id) => {
    let updateBtn = document.querySelector('.update-movie')
    updateBtn.addEventListener('click', async (e) => {
        await editModal(await movies(id));
    })
}

// MODAL: SAVE TO MY MOVIES BUTTON
const addSaveListener = async (id) => {
    let saveBtn = document.querySelector('.save-movie')
    saveBtn.addEventListener('click', (e) => {
        e.target;
        let userConfirm = confirm(`Add this movie?`);
        addMyMovies(id);
    })
}

const addInputChanges = (id) => {
    let inputs = document.querySelectorAll('.form-control')
    let saveEdit = document.querySelector('#edit-movie')
    inputs.forEach((input) =>{
        input.addEventListener('input', (e) =>{
            e.target
            saveEdit.removeAttribute('disabled')
        })
    })
}

const addDeleteListener = (id) => {
    let deleteBtn = document.querySelector('#delete-movie');
    deleteBtn.addEventListener('click', async (e)=>{
        let userConfirm = confirm(`Are you sure you want to delete this movie?`);
        if (userConfirm) await deleteMyMovie(id);
    })
}

const addSaveChangesListener = (id) => {
    const saveBtn = document.querySelector('#edit-movie');
    saveBtn.addEventListener('click', async (e)=>{
        let newObj = await grabInputs(id);
        editMyMovie(newObj);
    })
}

const grabInputs = async (id) => {
    const inputs = document.querySelectorAll('.form-control');
    let newMovieEdits = {};
    newMovieEdits['id'] = id;
    inputs.forEach(input =>{
        if (!!input.value) {
            newMovieEdits[`${input.id}`] = `${input.value}`;
        }
    })
    return newMovieEdits;
}

//----------------------- DARK MODE ------------------------

// FUNCTION: Change style of page
// PROTOTYPE: darkMode();

const darkMode = () => {
    document.querySelectorAll("html *, .card-body").forEach(element=> element.classList.toggle('bg-primary'));
    document.querySelectorAll("h1, p, h2, h5, span, a, #movieModal").forEach(element => element.classList.toggle('text-white'));
    document.querySelectorAll('button, input').forEach(btn => btn.classList.toggle('btn-outline-light'));
    document.querySelector('#searchBtn').classList.toggle('bg-light');
    document.querySelectorAll('.card, .modal-content, .dropdown-menu, hr').forEach(card => card.classList.toggle('border-light'));
}

// Event Listener
const darkModeToggle = document.querySelector('.slider');
darkModeToggle.addEventListener('click', darkMode);