let selectFilm = {};

const refs = {
  logoRef: document.querySelector('.js-logo'),
  homeBtn: document.querySelector('button[data-action="btn-home"]'),
  libraryBtn: document.querySelector('button[data-action="btn-library"]'),

  detailsPage: document.querySelector('.js-details-page'),
  homePage: document.querySelector('.js-home-page'),
  libraryPage: document.querySelector('.js-library-page'),

  addBtnWatched: document.querySelector('button[data-add="btn-watched"]'),
  addBtnQueue: document.querySelector('button[data-add="btn-queue"]'),

  prevBtn: document.querySelector('button[data-action="previous"]'),
  nextBtn: document.querySelector('button[data-action="next"]'),
  watchedBtn: document.querySelector('button[data-action="btn-watched"]'),
  queueBtn: document.querySelector('button[data-action="btn-queue"]'),
};

// refs.logoRef.addEventListener('click', activeHomePage);
refs.logoRef.addEventListener('click', activeDetailsPage);
refs.homeBtn.addEventListener('click', activeHomePage);
refs.libraryBtn.addEventListener('click', activeLibraryPage);
refs.detailsPage.addEventListener('click', event);
refs.homePage.addEventListener('click', event);
refs.libraryPage.addEventListener('click', event);

function testClick() {
  console.log('hello world');
}
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
  refs.prevBtn.addEventListener('click', event);
  refs.nextBtn.addEventListener('click', event);

  //удаление ненужных слушателей
  refs.watchedBtn.removeEventListener('click', event);
  refs.queueBtn.removeEventListener('click', event);
  refs.addBtnWatched.removeEventListener('click', event);
  refs.addBtnQueue.removeEventListener('click', event);
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

  refs.watchedBtn.addEventListener('click', event);
  refs.queueBtn.addEventListener('click', event);
  //функция отрисовки фильмов из очереди
  // drawQueueFilmList();

  //удаление ненужных слушателей
  refs.prevBtn.removeEventListener('click', event);
  refs.nextBtn.removeEventListener('click', event);
  refs.addBtnWatched.removeEventListener('click', event);
  refs.addBtnQueue.removeEventListener('click', event);
}

function activeDetailsPage(movieId, itsLibraryFilm) {
  console.log('movieId', typeof movieId);
  console.log('itsLibraryFilm', typeof itsLibraryFilm);
  showDetails(selectFilm);
  //Показываем Details Page
  refs.detailsPage.classList.remove('visually-hidden');

  // Прячем все страницы кроме Library Page
  refs.libraryPage.classList.add('visually-hidden');
  refs.homePage.classList.add('visually-hidden');

  // Добавляем кнопки добавления/удаления фильмов
  refs.addBtnWatched.addEventListener('click', event);
  refs.addBtnQueue.addEventListener('click', event);

  //удаление ненужных слушателей
  refs.prevBtn.removeEventListener('click', event);
  refs.nextBtn.removeEventListener('click', event);
  refs.watchedBtn.removeEventListener('click', event);
  refs.queueBtn.removeEventListener('click', event);
}
