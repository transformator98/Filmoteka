const refs = {
  homeBtn: document.querySelector('button[data-action="btn-home"]'),
  libraryBtn: document.querySelector('button[data-action="btn-library"]'),
  detailsPage: document.querySelector('.js-details-page'),
  homePage: document.querySelector('.js-home-page'),
  libraryPage: document.querySelector('.js-library-page'),
};

refs.homeBtn.addEventListener('click', testClick);
refs.libraryBtn.addEventListener('click', testClick);

// refs.detailsPage.addEventListener('click', testClick);
refs.homePage.addEventListener('click', testClick);
refs.libraryPage.addEventListener('click', testClick);

function testClick() {
  console.log('hello');
}
