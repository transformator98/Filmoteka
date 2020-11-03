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
const IMG_URL = 'https://image.tmdb.org/t/p/w500/';

const queueArray = [];


function monitorButtonStatusText() {
  let filmQueueLocaStorage = JSON.parse(localStorage.getItem('filmQueue')) || [];
  let queueId = filmQueueLocaStorage.map(item => item.id);
  let filmsWatchedLocalStorage = JSON.parse(localStorage.getItem('filmWatched')) || [];
  let watchedId = filmsWatchedLocalStorage.map(item => item.id);


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
  let filmQueueLocaStorage =
    JSON.parse(localStorage.getItem('filmQueue')) || [];
  let itemId = filmQueueLocaStorage.map(item => item.id);

  if (!itemId.includes(selectFilm.id)) {
    filmQueueLocaStorage.push(selectFilm);
    localStorage.setItem('filmQueue', JSON.stringify(filmQueueLocaStorage));
  } else {
    filmQueueLocaStorage = filmQueueLocaStorage.filter(
      film => film.id !== selectFilm.id,
    );
    localStorage.setItem('filmQueue', JSON.stringify(filmQueueLocaStorage));
  }

  monitorButtonStatusText();
}

// ТРЕТЬЯ ФУНКЦИЯ
function toggleToWatched() {
  let filmWatchedLocaStorage =
    JSON.parse(localStorage.getItem('filmWatched')) || [];
  let itemId = filmWatchedLocaStorage.map(item => item.id);

  if (!itemId.includes(selectFilm.id)) {
    filmWatchedLocaStorage.push(selectFilm);
    localStorage.setItem('filmWatched', JSON.stringify(filmWatchedLocaStorage));
  } else {
    filmWatchedLocaStorage = filmWatchedLocaStorage.filter(
      film => film.id !== selectFilm.id,
    );
    localStorage.setItem('filmWatched', JSON.stringify(filmWatchedLocaStorage));
  }

  monitorButtonStatusText();
}

// ЧЕТВЁРТАЯ ФЕНКЦИЯ

function showDetails(selectFilm) {
  posterRef.src = `https://image.tmdb.org/t/p/w500/${selectFilm.poster_path}`;
  titleRef.textContent = selectFilm.title;
  votesRef.textContent = `${selectFilm.vote_average} / ${selectFilm.vote_count}`;
  popularityRef.textContent = selectFilm.popularity;
  originalTitleRef.textContent = selectFilm.title;

  // genreRef.textContent = selectFilm.genres.map(genre => ' ' + genre.name);

  plotRef.textContent = selectFilm.overview;
  if (selectFilm.poster_path === undefined) {
    posterRef.src = IMG_URL;
  }
  monitorButtonStatusText();
}
