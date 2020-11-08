'use strict';
const baseURL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500/';
const API_KEY = 'ca745db198ca3fbe8342f07480e09405';
const IMAGE_NOT_FOUND =
  'https://c4.wallpaperflare.com/wallpaper/198/872/888/numbers-404-not-found-simple-background-minimalism-wallpaper-preview.jpg';
const Version = {
  REGULAR: 'regular',
  PRO: 'pro',
};

//INIT
const $moviesList = document.querySelector('ul.movies');
// ссылка на параграф с ошибкой
const $searchFormError = document.querySelector('p.search-form__error');

let renderFilms = [];
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
  fetch(`${baseURL}/genre/movie/list?api_key=${API_KEY}&language=en-US`)
    .then(res => {
      return res.json();
    })
    .then(data => {
      genres = data.genres;
    })
    .catch(console.log);
};

//делаем запрос к API за популярными фильмами
const fetchPopularMovies = () => {
  $searchFormError.classList.replace(
    'search-form__error--visibale',
    'search-form__error--hidden',
  );

  //запоминаем genres в localStorage (так как не выходит сделать async)
  fetch(
    `${baseURL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${pageNumber}`,
  )
    .then(res => res.json())
    .then(renderMoviesList)
    .catch(console.log);
};

//RUN

fetchGenres();
fetchPopularMovies();

//TODO
/**
 * 2 page start
 *
 */

// ведённое слово-названия фильма, который ищут
let inputValue = ' ';
// ссылка на форму
const searchForm = document.querySelector('.search-form');
// ссылка на инпут
const $input = document.querySelector('.search-form__input');

// ссылка на обёртку кнопок
const $btnsWrapper = document.querySelector('.page-counter__wrapper');
// ссылка на кнопку Prev
const $prevBtn = document.querySelector('[data-action="previous"]');
// ссылка на кнопку Next
const $nextBtn = document.querySelector('[data-action="next"]');
// ссылка на кнопку "номер странички"
const $numberOfPage = document.querySelector('.btn_page-number');
// значение переменной version, которое хранится в LocalStorage
let versionAtLocalStorage = localStorage.getItem('version');

// На форму поставила слушатель событий
searchForm.addEventListener('submit', searchFilms);

// функция поиска фильма
function searchFilms(event) {
  // убрала дефолтное поведение формы
  event.preventDefault();

  //   Записываю в переменную inputValue значение записанное в инпут(название фильма которое ищут)
  inputValue = $input.value.trim();

  // функция очистки результата поиска перед новым вводом поиска фильма
  searchForm.reset();

  // Убрать сообщение об ошибке при следующем поиске
  $searchFormError.classList.replace(
    'search-form__error--visibale',
    'search-form__error--hidden',
  );

  // Если нажали Enter при пустом инпуте, тогда на страничке отображается список популярных
  // фильмов (вызывается fetchPopularMovies())
  if (inputValue === '') {
    fetchPopularMovies();
    return;
  } else {
    // функция поиска фильма
    $moviesList.innerHTML = '';
    fetchFilms(inputValue);
  }
}
//TODO
// функция отправки запроса на API
function fetchFilms(inputValue, number = 1) {
  if (number === 1) {
    $numberOfPage.textContent = number;
    pageNumber = number;
  }

  // При попытке пролистать обратно (нажать btn Prev) при первой странице отображения
  // поиска (pageNumber=1), fetch не выполнялся
  if (pageNumber < 1) {
    $numberOfPage.textContent = 1;
    return;
  }

  // возвращаем из функции промис
  return fetch(
    `${baseURL}/search/movie?api_key=${API_KEY}&language=en-US&page=${pageNumber}&include_adult=false&query=${inputValue}`,
  )
    .then(responce => responce.json())
    .then(movies => {
      pageNumber === 1 || pageNumber < 1
        ? refs.prevBtn.classList.add('hidden')
        : refs.prevBtn.classList.remove('hidden');
      pageNumber === movies.total_pages
        ? refs.nextBtn.classList.add('hidden')
        : refs.nextBtn.classList.remove('hidden');
      // массив приходящих фильмов(каждый фильм в виде обьекта)
      let moviesList = movies.results;

      // в случае ответа пустым массивом отрисовывать ошибку
      if (moviesList.length === 0) {
        $searchFormError.classList.replace(
          'search-form__error--hidden',
          'search-form__error--visibale',
        );
        fetchPopularMovies();
        return;
      }

      renderMoviesList(movies);

      // если version pro, тогда применяется «Ленивая» загрузка изображений
      if (versionAtLocalStorage === 'pro') {
        // При включении версии pro, pageNumber принимает начальное значение
        pageNumber = 1;
        lazyLoadingFilms();
      }
    })
    .catch(apiError => console.log(apiError));
}

// Делегирование событий на обёртку кнопок
$btnsWrapper.addEventListener('click', plaginationNavigation);

function plaginationNavigation(event) {
  $moviesList.innerHTML = '';

  if (event.target.id === 'page-counter__btn-previous') {
    // уменьшение pageNumber на 1
    if (pageNumber === 1) {
      return;
    }
    pageNumber -= 1;
    // изменение текста $numberOfPage
    $numberOfPage.textContent = pageNumber;
    fetchFilms(inputValue, pageNumber);
  } else if (event.target.id === 'page-counter__btn-next') {
    // увеличение pageNumber на 1
    if (pageNumber >= renderFilms.total_pages) {
      return;
    }
    ++pageNumber;
    // изменение текста $numberOfPage
    $numberOfPage.textContent = pageNumber;
    fetchFilms(inputValue, pageNumber);
  }
  pageNumber === 1 || pageNumber < 1
    ? refs.prevBtn.classList.add('display-none')
    : refs.prevBtn.classList.remove('display-none');
  window.scrollBy(0, -window.innerHeight);
}

// функция Ленивой загрузки
function lazyLoadingFilms() {
  // При lazyLoading прятать кнопки пагинации
  $btnsWrapper.classList.add('hidden');

  // устанавливаем настройки
  const options = {
    // родитель целевого элемента - область просмотра
    root: null,
    // без отступов
    rootMargin: '0px',
    // процент пересечения - половина изображения
    threshold: 0.5,
  };

  const callback = function (moviesList, observer) {
    // для каждой записи-целевого элемента
    moviesList.forEach(movie => {
      // если элемент является наблюдаемым, создаём карточку фильма функций createCard()
      if (movie.isIntersecting) {
        fetchFilms(inputValue, ++pageNumber);

        // если пришло менее 20 фильмов,прекращаем наблюдение
        if (moviesList.length < 20) {
          observer.disconnect();
        }
      }
    });
  };

  // создаем наблюдатель
  const observer = new IntersectionObserver(callback, options);

  // Dom елемент за которым наблюдаем
  // последний елемент списка фильмов
  observer.observe($moviesList.lastChild);
}

//TODO
/**
 * 2 page end
 *
 */

//TODO
/**
 * 3 page start
 *
 */
let selectFilm = {};

const refs = {
  logoRef: document.querySelector('.js-logo'),
  homeBtn: document.querySelector('button[data-action="btn-home"]'),
  libraryBtn: document.querySelector('button[data-action="btn-library"]'),

  detailsPage: document.querySelector('.js-details-page'),

  // Trailer video
  detailsPageVideoId: document.querySelector('.js-video'),

  homePage: document.querySelector('.js-home-page'),
  libraryPage: document.querySelector('.js-library-page'),

  addBtnWatched: document.querySelector('button[data-add="btn-watched"]'),
  addBtnQueue: document.querySelector('button[data-add="btn-queue"]'),

  prevBtn: document.querySelector('button[data-action="previous"]'),
  nextBtn: document.querySelector('button[data-action="next"]'),
  watchedBtn: document.querySelector('button[data-action="btn-watched"]'),
  queueBtn: document.querySelector('button[data-action="btn-queue"]'),
};

refs.logoRef.addEventListener('click', activeHomePage);
refs.homeBtn.addEventListener('click', activeHomePage);
refs.libraryBtn.addEventListener('click', activeLibraryPage);

function activeHomePage() {
  window.scrollBy(0, -window.innerHeight);
  //Активация подсветки кнопки Home

  refs.homeBtn.classList.add('onClick');
  refs.libraryBtn.classList.remove('onClick');

  //Показываем Home Page
  refs.homePage.classList.remove('visually-hidden');

  // Прячем все страницы кроме Home Page
  refs.detailsPage.classList.add('visually-hidden');
  refs.libraryPage.classList.add('visually-hidden');

  // Подключение пагинации
  refs.prevBtn.addEventListener('click', plaginationNavigation);
  refs.nextBtn.addEventListener('click', plaginationNavigation);

  //удаление ненужных слушателей
  refs.watchedBtn.removeEventListener('click', drawWatchedFilmList);
  refs.queueBtn.removeEventListener('click', drawQueueFilmList);
  refs.addBtnWatched.removeEventListener('click', drawWatchedFilmList);
  refs.addBtnQueue.removeEventListener('click', drawQueueFilmList);
}

function activeLibraryPage() {
  window.scrollBy(0, -window.innerHeight);
  //Активация подсветки кнопки my library
  refs.homeBtn.classList.remove('onClick');
  refs.libraryBtn.classList.add('onClick');

  //Показываем Library Page
  refs.libraryPage.classList.remove('visually-hidden');

  // Прячем все страницы кроме Library Page
  refs.detailsPage.classList.add('visually-hidden');
  refs.homePage.classList.add('visually-hidden');

  refs.watchedBtn.addEventListener('click', drawWatchedFilmList);
  refs.queueBtn.addEventListener('click', drawQueueFilmList);
  //функция отрисовки фильмов из очереди
  drawWatchedFilmList();

  //удаление ненужных слушателей
  $btnsWrapper.removeEventListener('click', plaginationNavigation);
  refs.addBtnWatched.removeEventListener('click', toggleToWatched);
  refs.addBtnQueue.removeEventListener('click', toggleToQueue);
}

function activeDetailsPage(movieId, itsLibraryFilm) {
  window.scrollBy(0, -window.innerHeight);
  // убрал подсветку кнопок
  refs.homeBtn.classList.remove('onClick');
  refs.libraryBtn.classList.remove('onClick');

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const id = movieId;
  const filmId = renderFilms.results;
  let markup;

  const fetchVideo = () => {
    refs.detailsPageVideoId.innerHTML = '';
    fetch(`${baseURL}/movie/${movieId}/videos?api_key=${API_KEY}`)
      .then(res => {
        return res.json();
      })
      .then(({ results }) => {
        videoYou = results.map(el => el.key);

        markup = createdVideoTpl(videoYou);

        refs.detailsPageVideoId.appendChild(markup);
      })
      .catch(error => console.log(error));
  };

  if (itsLibraryFilm) {
    const parseLibrary = [
      ...JSON.parse(localStorage.getItem('filmQueue')),
      ...JSON.parse(localStorage.getItem('filmWatched')),
    ];

    selectFilm = parseLibrary.find(selectFilm => selectFilm.id === id);
  } else {
    selectFilm = filmId.find(selectFilm => selectFilm.id === id);
  }
  showDetails(selectFilm);
  refs.detailsPage.classList.remove('visually-hidden');

  // Прячем все страницы кроме Library Page
  refs.libraryPage.classList.add('visually-hidden');
  refs.homePage.classList.add('visually-hidden');

  // Добавляем кнопки добавления/удаления фильмов
  refs.addBtnWatched.addEventListener('click', toggleToWatched);
  refs.addBtnQueue.addEventListener('click', toggleToQueue);

  //удаление ненужных слушателей

  $btnsWrapper.removeEventListener('click', plaginationNavigation);
  refs.watchedBtn.removeEventListener('click', drawWatchedFilmList);
  refs.queueBtn.removeEventListener('click', drawQueueFilmList);

  function createdVideoTpl() {
    const iframeAttrs = {
      class: 'js-video__iframe',
      id: 'ytplayer',
      type: 'text/html',
      width: '450',
      height: '300',
      src: `https://www.youtube.com/embed/${videoYou}?autoplay=0&origin=http://example.com`,
      frameborder: '0',
    };

    const iframe = createElement('iframe', iframeAttrs);

    return iframe;
  }
  if (versionAtLocalStorage === Version.PRO) {
    fetchVideo();
  }
}

function createElement(name, attrs = {}) {
  const element = document.createElement(name);
  for (const key in attrs) {
    element.setAttribute(key, attrs[key]);
  }
  return element;
}
// TODO;

/**
 * 3 page end
 *
 */

// TODO;

/**
 * 4 page start
 *
 */

// ПЕРВАЯ ФУНКИЯ

const watchedBtnRef = document.querySelector('.add-btn_watched');
const queueBtnRef = document.querySelector('.add-btn_queue');
const posterRef = document.querySelector('.details-page__image');
const titleRef = document.querySelector('.title_original');
const votesRef = document.querySelector('.about-list__descr_votes');
const popularityRef = document.querySelector('.about-list__descr_popularity');
const originalTitleRef = document.querySelector('.about-list__descr_title');
const genreRef = document.querySelector('.about-list__descr_genre');
const plotRef = document.querySelector('.plot__descr');

function monitorButtonStatusText() {
  const filmQueueLocalStorage =
    JSON.parse(localStorage.getItem('filmQueue')) || [];
  const queueId = filmQueueLocalStorage.map(item => item.id);
  const filmsWatchedLocalStorage =
    JSON.parse(localStorage.getItem('filmWatched')) || [];

  const watchedId = filmsWatchedLocalStorage.map(item => item.id);

  if (queueId.includes(selectFilm.id)) {
    queueBtnRef.textContent = 'Delete from queue';
    localStorage.setItem('filmQueueBtnStatus', queueBtnRef.textContent);
  } else {
    queueBtnRef.textContent = 'Add to queue';
    localStorage.setItem('filmQueueBtnStatus', queueBtnRef.textContent);
  }

  if (watchedId.includes(selectFilm.id)) {
    watchedBtnRef.textContent = 'Delete from watched';
    localStorage.setItem('filmWatchedBtnStatus', watchedBtnRef.textContent);
  } else {
    watchedBtnRef.textContent = 'Add to watched';
    localStorage.setItem('filmWatchedBtnStatus', watchedBtnRef.textContent);
  }
}
// ВТОРАЯ ФУНКЦИЯ
function toggleToQueue() {
  let filmQueueLocalStorage =
    JSON.parse(localStorage.getItem('filmQueue')) || [];
  let itemId = filmQueueLocalStorage.map(item => item.id);
  if (!itemId.includes(selectFilm.id)) {
    filmQueueLocalStorage.push(selectFilm);
    localStorage.setItem('filmQueue', JSON.stringify(filmQueueLocalStorage));
  } else {
    filmQueueLocalStorage = filmQueueLocalStorage.filter(
      film => film.id !== selectFilm.id,
    );
    localStorage.setItem('filmQueue', JSON.stringify(filmQueueLocalStorage));
  }
  monitorButtonStatusText();
}
// ТРЕТЬЯ ФУНКЦИЯ
function toggleToWatched() {
  let filmsWatchedLocalStorage =
    JSON.parse(localStorage.getItem('filmWatched')) || [];
  let itemId = filmsWatchedLocalStorage.map(item => item.id);
  if (!itemId.includes(selectFilm.id)) {
    filmsWatchedLocalStorage.push(selectFilm);
    localStorage.setItem(
      'filmWatched',
      JSON.stringify(filmsWatchedLocalStorage),
    );
  } else {
    filmsWatchedLocalStorage = filmsWatchedLocalStorage.filter(
      film => film.id !== selectFilm.id,
    );
    localStorage.setItem(
      'filmWatched',
      JSON.stringify(filmsWatchedLocalStorage),
    );
  }
  monitorButtonStatusText();
}

// ЧЕТВЁРТАЯ ФЕНКЦИЯ

function showDetails(selectFilm) {
  const imgUrl = selectFilm.poster_path
    ? `https://image.tmdb.org/t/p/w500/${selectFilm.poster_path}`
    : IMAGE_NOT_FOUND;
  posterRef.src = imgUrl;
  titleRef.textContent = selectFilm.title;
  votesRef.textContent = `${selectFilm.vote_average} / ${selectFilm.vote_count}`;
  popularityRef.textContent = selectFilm.popularity;
  originalTitleRef.textContent = selectFilm.title;
  plotRef.textContent = selectFilm.overview;

  let filmsGenres = [];
  const genresIdArray = selectFilm.genre_ids;
  genresIdArray.filter(item => {
    const genresArray = genres.filter(genre => genre.id === item);
    return genresArray.forEach(item => filmsGenres.push(item.name));
  });
  genreRef.textContent = filmsGenres.join(', ');

  monitorButtonStatusText();
}

/**
 * 4 page end
 *
 */

// TODO;

/**
 * 5 page start
 *
 */

const $libraryList = document.querySelector('ul.library-list');

const createLibraryCardFunc = (imgPath, filmTitle, movieId, voteAverage) => {
  //создаем елементы
  const $li = document.createElement('li');
  const $p = document.createElement('p');
  const $img = document.createElement('img');
  const $vote = document.createElement('span');

  //ставим классы
  $li.className = 'movies__item';
  $p.className = 'movies__title ';
  $vote.className = 'movies__item-rating';
  $img.className = 'movies__image';

  //наполняем елементы
  $img.setAttribute('src', IMG_URL + imgPath);
  $p.textContent = filmTitle;
  $vote.textContent = voteAverage;

  // собираем li
  $li.append($p);
  $li.append($img);
  $li.append($vote);
  //добавляем слушатель с movieId и значением false (для movieLibarary)
  $li.addEventListener('click', function () {
    activeDetailsPage(movieId, true);
  });

  return $li;
};

function switchActiveButtonTo(btnName) {
  switch (btnName) {
    case 'queue':
      // убрать кнопку с watched
      if (refs.watchedBtn.classList.contains('onClickLibrary')) {
        refs.watchedBtn.classList.remove('onClickLibrary');
      }
      //  добавить новую кнопку на queue
      refs.queueBtn.classList.add('onClickLibrary');
      break;

    case 'watched':
      // убрать кнопку с queue
      if (refs.queueBtn.classList.contains('onClickLibrary')) {
        refs.queueBtn.classList.remove('onClickLibrary');
      }
      //  добавить кнопку на watched
      refs.watchedBtn.classList.add('onClickLibrary');
  }
}

function drawQueueFilmList() {
  //изменить активную кнопку на watched
  switchActiveButtonTo('queue');
  // очищаем html
  $libraryList.innerHTML = '';
  const $fragment = document.createDocumentFragment();
  //взять из localStorage

  const filmsQueue = JSON.parse(localStorage.getItem('filmQueue'));
  //отрисовываем фильмы если они есть
  if (filmsQueue && filmsQueue.length > 0) {
    filmsQueue.forEach(movie => {
      const $li = createLibraryCardFunc(
        movie.poster_path,
        movie.original_title,
        movie.id,
        movie.vote_average,
      );
      $fragment.appendChild($li);
    });
    //показываем ошибку, если фильмов нет
  } else {
    const $error = document.createElement('p');
    $error.className = 'movies__not-found';
    $error.textContent = 'You do not have to queue movies to watch.Add them';
    $fragment.append($error);
  }

  //обновляем страницу
  $libraryList.append($fragment);
}

// drawQueueFilmList()
function drawWatchedFilmList() {
  //изменить активную кнопку на watched
  switchActiveButtonTo('watched');
  //очищаем html
  $libraryList.innerHTML = '';
  const $fragment = document.createDocumentFragment();
  //взять из localStorage
  const filmsWatched = JSON.parse(localStorage.getItem('filmWatched'));
  if (filmsWatched && filmsWatched.length > 0) {
    filmsWatched.forEach(movie => {
      const $li = createLibraryCardFunc(
        movie.poster_path,
        movie.original_title,
        movie.id,
        movie.vote_average,
      );
      $fragment.appendChild($li);
    });
  } else {
    const $error = document.createElement('p');
    $error.className = 'movies__not-found';
    $error.textContent = 'You do not have to queue movies to watch.Add them';
    $fragment.append($error);
  }

  $libraryList.append($fragment);
}

// TODO;
/**
 * 5 page end
 *
 */
// TODO;
/**
 * 6 page start
 *
 */

//settings

const defaultVersion = Version.REGULAR;
const body = document.querySelector('body');
const toolbar = document.querySelector('input.js-switch-input');
const versionDescription = document.querySelector('ul.features');
const youtubeTrailer = document.querySelector('.js-video');
//set theme
body.classList.add(versionAtLocalStorage || defaultVersion);
versionDescription.classList.add(versionAtLocalStorage || defaultVersion);
//change toolbar to checked when dark theme applied

if (versionAtLocalStorage === Version.REGULAR) {
  toolbar.setAttribute('checked', true);
}

//setup toolbar listener
const changeVersion = () => {
  location.reload();
  if (body.classList.contains(Version.REGULAR)) {
    body.classList.replace(Version.REGULAR, Version.PRO);
    youtubeTrailer.classList.remove('visually-hidden');
    versionDescription.classList.replace(Version.REGULAR, Version.PRO);
    localStorage.setItem('version', Version.PRO);
    versionAtLocalStorage = Version.PRO;
    return;
  }

  if (body.classList.contains(Version.PRO)) {
    body.classList.replace(Version.PRO, Version.REGULAR);
    youtubeTrailer.classList.add('visually-hidden');
    versionDescription.classList.replace(Version.PRO, Version.REGULAR);
    localStorage.setItem('version', Version.REGULAR);
    versionAtLocalStorage = Version.REGULAR;
    return;
  }
};

toolbar.addEventListener('change', changeVersion);

// TODO;
/**
 * 6 page end
 *
 */
