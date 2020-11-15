'use strict';
//INIT
const $moviesList = document.querySelector('ul.movies');
// ссылка на параграф с ошибкой
const $searchFormError = document.querySelector('p.search-form__error');
// ссылка на кнопку Prev
const $prevBtn = document.querySelector('[data-action="previous"]');

//чтобы пофиксить навигацию в popular movies
let popularMoviesActive = false;
let renderFilms;
let genres;
let pageNumber = 1;
let videoYou;

//FUNCTIONS
const createCard = (imgPath, filmTitle, movieId) => {
  //создаем елементы
  const $li = document.createElement('li');
  const $p = document.createElement('p');
  const $img = document.createElement('img');
  //ставим классы
  $li.className = 'movies__item';
  $p.className = 'movies__title';
  $img.className = 'movies__image';
  //наполняем елементы
  $img.setAttribute('src', imgPath);
  $p.textContent = filmTitle;
  // собираем li
  $li.append($p);
  $li.append($img);

  //добавляем слушатель с movieId и значением false (для movieLibarary)
  $li.addEventListener('click', function () {
    activeDetailsPage(movieId, false);
  });

  return $li;
};

const renderMoviesList = movies => {
  const moviesList = movies.results;

  // очищаем предыдущие результаты
  // $moviesList.innerHTML = '';

  // создаем фрагмент  чтобы добавить все фильмы в html одновременно
  //запомняем глобальную переменную HTML списком фильмов

  const $fragment = document.createDocumentFragment();
  //создаем фильмы
  moviesList.forEach(movie => {
    // подменяем изображение плейсхолдером если его нет в API
    const src = movie.poster_path
      ? IMG_URL + movie.poster_path
      : IMAGE_NOT_FOUND;
    const year = movie.release_date.substring(0, 4).trim();
    const title = `${movie.original_title} (${year})`;
    const card = createCard(src, title, movie.id);
    $fragment.appendChild(card);
  });

  // отрисовываем фильмы
  $moviesList.append($fragment);
  //сохраняем список фильмов
  renderFilms = movies;
};
//делаем запрос к API за жанрами
const fetchGenres = () => {
  fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`,
    options,
  )
    .then(res => {
      return res.json();
    })
    .then(data => {
      genres = data.genres;
    })
    .catch(console.log);
};

//делаем запрос к API за популярными фильмами
const fetchPopularMovies = (pageNumber = 1) => {
  $searchFormError.classList.replace(
    'search-form__error--visibale',
    'search-form__error--hidden',
  );

  $prevBtn.classList.remove('btn_prev_hidden');

  if (pageNumber === 1) {
    $prevBtn.classList.add('btn_prev_hidden');
  }

  //запоминаем genres в localStorage (так как не выходит сделать async)
  fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${pageNumber}`,
    options,
  )
    .then(res => {
      return res.json();
    })
    .then(renderMoviesList)
    .catch(console.log);
  popularMoviesActive = true;
};

//RUN

fetchGenres();
fetchPopularMovies();
