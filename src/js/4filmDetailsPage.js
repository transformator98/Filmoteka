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
    // queueBtnRef.setAttribute('disabled', 'disabled');
    // queueBtnRef.removeAttribute('disabled');
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
