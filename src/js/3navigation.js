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
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`,
    )
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
      src: `http://www.youtube.com/embed/${videoYou}?autoplay=1&origin=http://example.com`,
      frameborder: '0',
    };

    const iframe = createElement('iframe', iframeAttrs);

    return iframe;
  }
  fetchVideo();
}

function createElement(name, attrs = {}) {
  const element = document.createElement(name);
  for (const key in attrs) {
    element.setAttribute(key, attrs[key]);
  }
  return element;
}

// function createRipple(event) {
//   const button = event.currentTarget;
//   const circle = document.createElement('span');
//   const diameter = Math.max(button.clientWidth, button.clientHeight);
//   const radius = diameter / 2;
//   circle.style.width = circle.style.height = `${diameter}px`;
//   circle.style.left = `${event.clientX - (button.offsetLeft + radius)}px`;
//   circle.style.top = `${event.clientY - (button.offsetTop + radius)}px`;
//   circle.classList.add('ripple');
//   const ripple = button.getElementsByClassName('ripple')[0];

//   if (ripple) {
//     ripple.remove();
//   }
//   button.appendChild(circle);
//   return circle;
// }
// const buttons = document.getElementsByTagName('button');
// for (const button of buttons) {
//   button.addEventListener('click', createRipple);
// }
