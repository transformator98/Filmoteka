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
  console.log('hello');
}
function activeHomePage() {
  refs.homeBtn.classList.add('onClick');
  refs.libraryBtn.classList.remove('onClick');

  refs.detailsPage.classList.add('visually-hidden');

  //Подключение пагинации
  refs.prevBtn.addEventListener('click');
  refs.nextBtn.addEventListener('click');

  //function
  //добавить домашнюю страницу
  // visualy-hiden для detailsPage
  // visualy-hiden для libraryPage
  // console.log('logo');
}

function activeLibraryPage() {
  refs.homeBtn.classList.remove('onClick');
  refs.libraryBtn.classList.add('onClick');

  // drawQueueFilmList();
}

function activeDetailsPage(movieId, itsLibraryFilm) {
  showDetails(selectFilm);
}
