const refs = {
  homeBtn: document.querySelector('button[data-action="btn-home"]'),
  libraryBtn: document.querySelector('button[data-action="btn-library"]'),
  detailsPage: document.querySelector('.js-details-page'),
  homePage: document.querySelector('.js-home-page'),
  libraryPage: document.querySelector('.js-library-page'),
};

refs.homeBtn.addEventListener('click', e);
refs.libraryBtn.addEventListener('click', e);

refs.detailsPage.addEventListener('click', e);
refs.homePage.addEventListener('click', e);
refs.libraryPage.addEventListener('click', e);
