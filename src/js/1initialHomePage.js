'use strict'
const $moviesList = document.querySelector('ul.movies')
const $searchForm = document.querySelector('div.search-form__wrapper')

let renderFilms
let genres
let pageNumber
let popularMovies

const createCard = (imgPath, filmTitle, movieId) => {
    // иногда с API не приходят картинки, потому отсеиваем ненужные
    if (!imgPath) return
    //создаем елементы
    const $li = document.createElement('li')
    const $p = document.createElement('p')
    const $img = document.createElement('img')
    //ставим классы
    $li.className = 'movies__item'
    $p.className = 'movies__title'
    $img.className = 'movies__image'
    //наполняем елементы
    $img.setAttribute('src', imgPath)
    $p.textContent = filmTitle
    // собираем li
    $li.append($p)
    $li.append($img)

    //добавляем слушатель с movieId и значением false (для movieLibarary)
    $li.addEventListener("load", function () { activeDetailsPage(movieId, false) })

    return $li
}

const renderMoviesList = (movies) => {
    const results = movies.results

    // очищаем предыдущие результаты
    $moviesList.innerHTML = ""

    // создаем фрагмент  чтобы добавить все фильмы в html одновременно
    //запомняем глобальную переменную HTML списком фильмов

    renderFilms = document.createDocumentFragment()
    results.forEach(movie => {
        if (movie.poster_path) {
            const src = IMG_URL + movie.poster_path
            const card = createCard(src, movie.original_title)
            renderFilms.appendChild(card)
        }
    })

    // добавляем фильмы в html
    $moviesList.append(renderFilms)
}


function rememberGenres(jsonObj) {
    genres = jsonObj
}

const fetchGenres = () => {
    //запоминает только промис
    return fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`)
        .then(res => { return res.json() })
        .then(res => { return res })
        .catch(err => console.log(err));

}
genres = fetchGenres()
console.log(genres)


// console.log(genres)
    // fetchPopularMovies().then(movies => console.log(movies))

    // // На форму поставила слушатель событий
    // $searchForm.addEventListener('submit', function () { fetchGenres(movies) });

//     genres = fetchGenres()
// console.log(genres)
// renderFilms = fetchPopularMovies()

