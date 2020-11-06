//settings

const defaultVersion = Version.REGULAR;
const body = document.querySelector('body');
const toolbar = document.querySelector('input.js-switch-input');
const versionDescription = document.querySelector('ul.features');
const youtubeTrailer = document.querySelector('.js-video');
//set theme
body.classList.add(versionAtLocalStorage || defaultVersion);
versionDescription.classList.add(versionAtLocalStorage || defaultVersion);
//change toolbar to checked when dark theme applied

if (versionAtLocalStorage === Version.REGULAR) {
  toolbar.setAttribute('checked', true);
}

//setup toolbar listener
const changeVersion = () => {
  location.reload();
  if (body.classList.contains(Version.REGULAR)) {
    body.classList.replace(Version.REGULAR, Version.PRO);
    youtubeTrailer.classList.remove('visually-hidden');
    versionDescription.classList.replace(Version.REGULAR, Version.PRO);
    localStorage.setItem('version', Version.PRO);
    versionAtLocalStorage = Version.PRO;
    return;
  }

  if (body.classList.contains(Version.PRO)) {
    body.classList.replace(Version.PRO, Version.REGULAR);
    youtubeTrailer.classList.add('visually-hidden');
    versionDescription.classList.replace(Version.PRO, Version.REGULAR);
    localStorage.setItem('version', Version.REGULAR);
    versionAtLocalStorage = Version.REGULAR;
    return;
  }
};

toolbar.addEventListener('change', changeVersion);
