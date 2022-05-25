let arrMovies = "";


async function dataOfMovies(movie) {

    const url = `http://www.omdbapi.com/?apikey=6e25b9e4&t=${movie}`;

    const respons = await fetch(`${url}`);
    const data = await respons.json();
    
    
    arrMovies = document.getElementById('cardsContainer')
    cardsContainer.innerHTML = `<img src=${data.Poster} height='300px'>
                                <h1>${data.Title}</h1>
                                <p>${data.Year}</p>
                                <p>${data.Genre}</p>`
                                console.log(data);

}

dataOfMovies('arena');

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

    user.innerText = userName;
  })();
}
userNameData();
