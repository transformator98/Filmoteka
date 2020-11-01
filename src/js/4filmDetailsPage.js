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

const getFromFilmsQueue = localStorage.getItem('filmsQueue');

const asd = [];

localStorage.setItem('filmsQueue', JSON.stringify(asd));
localStorage.setItem('filmsWatched', JSON.stringify(asd));

const movieId = 'asd';

function monitorButtonStatusText() {
  if (getFromFilmsQueue.includes(movieId)) {
    queueBtnRef.textContent = 'Delete from queue';
  } else if (localStorage.getItem('filmsWatched').includes(movieId)) {
    watchedBtnRef.textContent = 'Delete from watched';
  } else {
    queueBtnRef.textContent = 'Add to queue';
    watchedBtnRef.textContent = 'Add to watched';
  }
}
// ЧЕТВЁРТАЯ ФЕНКЦИЯ

function showDetails(selectFilm) {
  posterRef.src = selectFilm.poster_path;
  titleRef.textContent = selectFilm.title;
  votesRef.textContent = `${selectFilm.vote_average} / ${selectFilm.vote_count}`;
  popularityRef.textContent = selectFilm.popularity;
  originalTitleRef.textContent = selectFilm.title;
  genreRef.textContent = selectFilm.genre_ids;
  plotRef.textContent = selectFilm.overview;
}
