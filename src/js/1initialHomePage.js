'use strict'
//INIT
const $moviesList = document.querySelector('ul.movies')
const $searchForm = document.querySelector('div.search-form__wrapper')

let renderFilms
let genres
let pageNumber

//FUNCTIONS
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

    const $fragment = document.createDocumentFragment()
    results.forEach(movie => {
        if (movie.poster_path) {
            const src = IMG_URL + movie.poster_path
            const card = createCard(src, movie.original_title)
            $fragment.appendChild(card)
        }
    })

    // добавляем фильмы в html
    $moviesList.append($fragment)
    //сохраняем список фильмов
    renderFilms = movies
}

//делаем запрос к API за жанрами
const fetchGenres = () => {

    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`)
        .then(res => { return res.json() })
        .then(genresObj => { genres = genresObj })
        .catch(console.log)
}

//делаем запрос к API за популярными фильмами
const fetchPopularMovies = () => {
    //запоминаем genres в localStorage (так как не выходит сделать async)
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${pageNumber}`)
        .then(res => { return res.json() })
        .then(renderMoviesList)
        .catch(console.log);
}

//RUN
fetchGenres()
fetchPopularMovies()

