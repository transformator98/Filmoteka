'use strict'
const $moviesList = document.querySelector('ul.movies')
const $searchForm = document.querySelector('div.search-form__wrapper')

const createCard = (imgPath, filmTitle, movieId) => {
    if(!imgPath) return
    //создаем елементы
    const $li = document.createElement('li')
    const $p = document.createElement('p')
    const $img = document.createElement('img')
    $li.className = 'movies__item'
    $p.className = 'movies__title'
    $img.className = 'movies__image'
    //наполняем елементы
    $img.setAttribute('src', imgPath)
    $p.textContent = filmTitle
    $li.append($p)
    $li.append($img)
    $moviesList.append($li)

    //добавляем слушатель с movieId и значением false (для movieLibarary)
}
const renderResults = () => {
    // очищаем предыдущие результаты
    $moviesList.innerHTML = ""
    movies.forEach(movie => {
        if(movie.poster_path) {
            const baseUrl = "https://image.tmdb.org/t/p/w500/"
            const src = baseUrl + movie.poster_path
            createCard(src, movie.original_title)
        }
    })
}

$searchForm.addEventListener("input", renderResults)


