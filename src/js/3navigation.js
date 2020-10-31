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
};

refs.logoRef.addEventListener('click', activeHomePage);
refs.homeBtn.addEventListener('click', activeHomePage);
refs.libraryBtn.addEventListener('click', activeLibraryPage);
refs.detailsPage.addEventListener('click', testClick);
refs.homePage.addEventListener('click', testClick);
refs.libraryPage.addEventListener('click', testClick);
refs.addBtnWatched.addEventListener('click', testClick);
refs.addBtnQueue.addEventListener('click', testClick);

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

  //функция отрисовки фильмов из очереди
  // drawQueueFilmList();
}

function activeDetailsPage(movieId, itsLibraryFilm) {
  showDetails(selectFilm);
}
