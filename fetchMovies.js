const chargesMovies = async () => {
   const results = await fetch('https://api.themoviedb.org/3/movie/550?api_key=8d612435e18f383b972db5efd79deb3d&language=es-MX')

   console.log(results)
   const data = await results.json()

   console.log(data)
}

chargesMovies()