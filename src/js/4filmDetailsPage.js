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

function buttonStatus() {
  const filmQueueBtnStatusStorage = localStorage.getItem('filmQueueBtnStatus');
  const filmWatchedBtnStatusStorage = localStorage.getItem('filmWatchedBtnStatus');

  queueBtnRef.textContent = filmQueueBtnStatusStorage;
  watchedBtnRef.textContent = filmWatchedBtnStatusStorage;
}

function monitorButtonStatusText(movieId) {
  let filmQueueLocaStorage = JSON.parse(localStorage.getItem('filmQueue'));
  let filmsWatchedLocalStorage = JSON.parse(localStorage.getItem('filmWatched'));

  if (filmQueueLocaStorage.includes(movieId)) {

    queueBtnRef.textContent = 'Delete from queue';
    localStorage.setItem('filmQueueBtnStatus', queueBtnRef.textContent);
  }
  else {
    queueBtnRef.textContent = 'Add to queue';
    localStorage.setItem('filmQueueBtnStatus', queueBtnRef.textContent);
  }

  if (filmsWatchedLocalStorage.includes(movieId)) {

    watchedBtnRef.textContent = 'Delete from watched';
    localStorage.setItem('filmWatchedBtnStatus', watchedBtnRef.textContent);
  }
  else {
    watchedBtnRef.textContent = 'Add to watched';
    localStorage.setItem('filmWatchedBtnStatus', watchedBtnRef.textContent);
  }
}
// ВТОРАЯ ФУНКЦИЯ

function toggleToQueue(selectFilm) {
  let filmQueueLocaStorage =
    JSON.parse(localStorage.getItem('filmQueue')) || [];

  if (!filmQueueLocaStorage.includes(selectFilm.id)) {
    filmQueueLocaStorage.push(selectFilm.id);
    localStorage.setItem('filmQueue', JSON.stringify(filmQueueLocaStorage));
  } else {
    let value = selectFilm.id;
    filmQueueLocaStorage = filmQueueLocaStorage.filter(id => id !== value);
    localStorage.setItem('filmQueue', JSON.stringify(filmQueueLocaStorage));
  }

  monitorButtonStatusText(selectFilm.id);
}
// ТРЕТЬЯ ФУНКЦИЯ
function toggleToWatched(selectFilm) {
  let filmsWatchedLocalStorage =
    JSON.parse(localStorage.getItem('filmWatched')) || [];

  if (!filmsWatchedLocalStorage.includes(selectFilm.id)) {
    filmsWatchedLocalStorage.push(selectFilm.id);
    localStorage.setItem(
      'filmWatched',
      JSON.stringify(filmsWatchedLocalStorage),
    );
  } else {
    let value = selectFilm.id;
    filmsWatchedLocalStorage = filmsWatchedLocalStorage.filter(
      id => id !== value,
    );
    localStorage.setItem(
      'filmWatched',
      JSON.stringify(filmsWatchedLocalStorage),
    );
  }
  monitorButtonStatusText(selectFilm.id);

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
}

const asdga = {
  adult: false,
  backdrop_path: '/dFYguAfeVt19qAbzJ5mArn7DEJw.jpg',
  belongs_to_collection: {
    id: 137697,
    name: 'Finding Nemo Collection',
    poster_path: '/xwggrEugjcJDuabIWvK2CpmK91z.jpg',
    backdrop_path: '/2hC8HHRUvwRljYKIcQDMyMbLlxz.jpg',
  },
  budget: 94000000,
  genres: [
    {
      id: 16,
      name: 'Animation',
    },
    {
      id: 10751,
      name: 'Family',
    },
  ],
  homepage: 'http://movies.disney.com/finding-nemo',
  id: 74,
  imdb_id: 'tt0266543',
  original_language: 'en',
  original_title: 'Finding Nemo',
  overview:
    'Nemo, an adventurous young clownfish, is unexpectedly taken from his Great Barrier Reef home to a dentist’s office aquarium. It’s up to his worrisome father Marlin and a friendly but forgetful fish Dory to bring Nemo home -- meeting vegetarian sharks, surfer dude turtles, hypnotic jellyfish, hungry seagulls, and more along the way.',
  popularity: 36.157,
  poster_path: '/8h0CG12Oft1GqthLmsctg8iuQQj.jpg',
  production_companies: [
    {
      id: 3,
      logo_path: '/1TjvGVDMYsj6JBxOAkUHpPEwLf7.png',
      name: 'Pixar',
      origin_country: 'US',
    },
  ],
  production_countries: [
    {
      iso_3166_1: 'US',
      name: 'United States of America',
    },
  ],
  release_date: '2003-05-30',
  revenue: 940335536,
  runtime: 100,
  spoken_languages: [
    {
      iso_639_1: 'en',
      name: 'English',
    },
  ],
  status: 'Released',
  tagline: 'There are 3.7 trillion fish in the ocean. They’re looking for one.',
  title: 'Finding Nemo',
  video: false,
  vote_average: 7.8,
  vote_count: 14157,
};


showDetails(asdga);


queueBtnRef.addEventListener('click', event => {
  event.preventDefault();
  toggleToQueue(asdga);
});

watchedBtnRef.addEventListener('click', event => {

  event.preventDefault();
  toggleToWatched(asdga);
});

buttonStatus();


