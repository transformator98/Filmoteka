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
};

refs.logoRef.addEventListener('click', activeHomePage);
refs.homeBtn.addEventListener('click', testClick);
refs.libraryBtn.addEventListener('click', testClick);
// refs.detailsPage.addEventListener('click', testClick);
refs.homePage.addEventListener('click', testClick);
refs.libraryPage.addEventListener('click', testClick);
refs.addBtnWatched.addEventListener('click', testClick);
refs.addBtnQueue.addEventListener('click', testClick);

function testClick() {
  console.log('hello');
}
function activeHomePage() {
  //function
  //добавить домашнюю страницу
  // visualy-hiden для detailsPage
  // visualy-hiden для libraryPage
  console.log('logo');
}

function activeLibraryPage() {
  //function
  drawQueueFilmList();
}

function activeDetailsPage(movieId, itsLibraryFilm) {
  showDetails(selectFilm);
}
