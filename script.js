
async function dataOfMovies(movie) {

  const respons = await fetch(`https://www.omdbapi.com/?apikey=6e25b9e4&s=${movie}`);
  const data = await respons.json();

  
  let movies = data.Search;

  for(let movieData of movies) {

    arrMovies = document.getElementById("cardsContainer");
  cardsContainer.innerHTML = `<img src=${movieData.Poster} height='300px'>
                                <h1>${movieData.Title}</h1>
                                <p>${movieData.Year}</p>
                                <p>${movieData.Type}</p>`;
  
  }
}



function addMovies(){
  const inputSearch = document.getElementById("search");
  
  const movie = {
    search: inputSearch.value,
  }
  dataOfMovies(movie.search);
}

function searchData() {
  const buttonSerach = document.getElementById("add");

  buttonSerach.addEventListener("click", addMovies);
}
searchData();


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
userNameData();
