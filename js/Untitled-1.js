let searchSelectElemnt = document.querySelector(".movie-search-select")
let searchFormElement = document.querySelector(".movie-search-form")
let searchMovieInputElement = document.querySelector(".movie-search-input")
let movieListElement = document.querySelector(".movies-list")
let infoSectionElement = document.querySelector(".info")
let infoTitleElement = document.querySelector(".info-title")
let infoYearElement = document.querySelector(".info-year")
let infoCastListElement = document.querySelector(".info-casts")
let infoGanresListElement = document.querySelector(".info-ganres")

searchFormElement.addEventListener('submit', (event) => {
    event.preventDefault()
    let filteredMovies = getMoviesByOptions(searchMovieInputElement.value, searchSelectElemnt.value)
    renderData(filteredMovies)
})


function getMoviesByOptions(name, year) {
    let filteredMovies = []
    for (let movie of kinolar) {
        let movieNameGetSearchName = movie.title.toLowerCase().includes(name);
        if (movieNameGetSearchName && year == movie.year) {
            filteredMovies.push(movie)
        }
    }
    return filteredMovies;
}


setYears()


function setYears() {
    let years = []
    for (let item of kinolar) {
        let indexOfYear = years.indexOf(item.year)
        if (indexOfYear == -1) {
            years.push(item.year)
        }
    }
    years = years.sort(function (a, b) {
        return a - b
    })
    
    for (let year of years) {
        let newOptionElement = document.createElement("option");
        newOptionElement.setAttribute("value", year)
        newOptionElement.textContent = year;
        searchSelectElemnt.appendChild(newOptionElement)
        
    }
    
}

function renderData(array) {
    movieListElement.textContent = ""
    array.forEach((element) => {
        let newLiElement = document.createElement('li')
        newLiElement.classList.add("movies-item")
        newLiElement.textContent = element.title
        newLiElement.addEventListener('click', event => {
            infoTitleElement.textContent = element.title
            infoYearElement.textContent = element.year
            infoGanresListElement.textContent = ""
            element.genres.forEach(genre => {
                let newLiGanreElement = document.createElement("li")
                newLiGanreElement.textContent = genre
                infoGanresListElement.appendChild(newLiGanreElement)
            })
            infoCastListElement.textContent = ""
            element.cast.forEach(cast => {
                let newLiCastElement = document.createElement("li")
                newLiCastElement.textContent = cast
                infoCastListElement.appendChild(newLiCastElement)
            })
        })
        movieListElement.appendChild(newLiElement)
    });
}