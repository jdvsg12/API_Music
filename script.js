let itIsFavoritesDataMovies = [];

userNameData();
searchData();
handleShowFavorites()
handleShowmovies ()


function userNameData() {
  (async () => {
    const { value: userName } = await Swal.fire({
      title: "Ingresa tu nombre",
      input: "text",
      inputValue: "",
      inputValidator: (value) => {
        if (!value) {
          return "Necesitas agregar tu nombre!";
        }
      },
    });
    const user = document.getElementById("user");
    localStorage.setItem("user", JSON.stringify(userName));
    user.innerText = userName;
  })();
}

async function dataOfMovies(movie) {
  const respons = await fetch(
    `https://www.omdbapi.com/?apikey=6e25b9e4&s=${movie}`
  );
  const data = await respons.json();

  showMovies(data.Search);
}

function addMovies() {
  const inputSearch = document.getElementById("search");

  const movie = {
    search: inputSearch.value,
  };
  dataOfMovies(movie.search);
}

function searchData() {
  const buttonSerach = document.getElementById("add");

  buttonSerach.addEventListener("click", addMovies);
}

function showMovies(movies) {
  let showMovies = document.getElementById("cardsContainer");
  showMovies.innerHTML = "";

  for (let movieData of movies) {
    let arrMovies = document.createElement("div");

    arrMovies.innerHTML = `
      <img src=${movieData.Poster}'>
      <h1>${movieData.Title}</h1>
      <p>${movieData.Year}</p>
      <p>${movieData.Type}</p>
      <button id=${movieData.imdbID} >agregar</button>
    `;
    
    showMovies.appendChild(arrMovies);
    
    appendListenerToFavoriteButton(movieData);
  }
}

function handleAddToFavoriteClick(movieClick) {

  itIsFavoritesDataMovies.push(movieClick);

    localStorage.setItem("movies", JSON.stringify(itIsFavoritesDataMovies));
  
    alertAddButton()
    showFavorites();

}

function appendListenerToFavoriteButton(movieClick) {
  const buttonAddFavorite = document.getElementById(`${movieClick.imdbID}`);

  buttonAddFavorite.addEventListener("click", () => handleAddToFavoriteClick(movieClick));
}

function showFavorites() {
  let favoritesContainer = document.getElementById("cardContainerFavorite");
  favoritesContainer.innerHTML = "";


  itIsFavoritesDataMovies.forEach(({ Poster, Title, Year, Type, imdbID}) => {
    let arrMovies = document.createElement("div");

    arrMovies.innerHTML = `
      <img src=${Poster}'>
      <h1>${Title}</h1>
      <p>${Year}</p>
      <p>${Type}</p>
      <button id="${imdbID}-delete">Eliminar</button>
    `;

    favoritesContainer.appendChild(arrMovies);
  
    handleDeleteButtonClick(imdbID);
  })
}

function deleteListnerFavoritesDataMovies (movieId) {

  itIsFavoritesDataMovies = itIsFavoritesDataMovies.filter((data) => data.imdbID !== movieId)

  showFavorites()
  alertDeleteButton();

}

function handleDeleteButtonClick(movieId) {
  const buttonDelete = document.getElementById(`${movieId}-delete`);
  buttonDelete.addEventListener("click", () => deleteListnerFavoritesDataMovies(movieId));
}

function alertAddButton() {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  Toast.fire({
    icon: 'success',
    title: 'Se ha agregado una película'
  })
}

function alertDeleteButton() {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  Toast.fire({
    icon: 'warning',
    title: 'Se ha eliminado un favorito'
  })
}

function handleShowFavorites() {

  const buttonShowFavorites = document.getElementById("btn-favorites");
  buttonShowFavorites.addEventListener('click', showFavoritesMovies)

  }

function showFavoritesMovies () {

  document.getElementById('favorites').style.display = 'block';
  document.getElementById('movies').style.display = 'none';

  // document.getElementById('favorites').toggleAttribute('block', true);
  
}

function handleShowmovies () {

  const buttonShowMovies = document.getElementById("btn-movies");
  buttonShowMovies.addEventListener('click', showDataMovies)

}

function showDataMovies () {


  document.getElementById('favorites').style.display = 'none';
  document.getElementById('movies').style.display = 'block';

  // document.getElementById('favorites').toggleAttribute('block', true);
  
}
