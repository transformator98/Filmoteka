const $libraryList = document.querySelector('ul.library-list');

const createLibraryCardFunc = (imgPath, filmTitle, movieId, voteAverage) => {
  //создаем елементы
  const $li = document.createElement('li');
  const $p = document.createElement('p');
  const $img = document.createElement('img');
  const $vote = document.createElement('span');

  //ставим классы
  $li.className = 'movies__item';
  $p.className = 'movies__title ';
  $vote.className = 'movies__item-rating';
  $img.className = 'movies__image';

  //наполняем елементы
  $img.setAttribute('src', IMG_URL + imgPath);
  $p.textContent = filmTitle;
  $vote.textContent = voteAverage;

  // собираем li
  $li.append($p);
  $li.append($img);
  $li.append($vote);
  //добавляем слушатель с movieId и значением false (для movieLibarary)
  $li.addEventListener('click', function () {
    activeDetailsPage(movieId, true);
  });

  return $li;
};

function switchActiveButtonTo(btnName) {
  switch (btnName) {
    case 'queue':
      // убрать кнопку с watched
      if (refs.watchedBtn.classList.contains('onClickLibrary')) {
        refs.watchedBtn.classList.remove('onClickLibrary');
      }
      //  добавить новую кнопку на queue
      refs.queueBtn.classList.add('onClickLibrary');
      break;

    case 'watched':
      // убрать кнопку с queue
      if (refs.queueBtn.classList.contains('onClickLibrary')) {
        refs.queueBtn.classList.remove('onClickLibrary');
      }
      //  добавить кнопку на watched
      refs.watchedBtn.classList.add('onClickLibrary');
  }
}

function drawQueueFilmList() {
  //изменить активную кнопку на watched
  switchActiveButtonTo('queue');
  // очищаем html
  $libraryList.innerHTML = '';
  const $fragment = document.createDocumentFragment();
  //взять из localStorage

  const filmsQueue = JSON.parse(localStorage.getItem('filmQueue'));
  //отрисовываем фильмы если они есть
  if (filmsQueue && filmsQueue.length > 0) {
    filmsQueue.forEach(movie => {
      const $li = createLibraryCardFunc(
        movie.poster_path,
        movie.original_title,
        movie.id,
        movie.vote_average,
      );
      $fragment.appendChild($li);
    });
    //показываем ошибку, если фильмов нет
  } else {
    const $error = document.createElement('p');
    $error.className = 'movies__not-found';
    $error.textContent = 'You do not have to queue movies to watch.Add them';
    $fragment.append($error);
  }

  //обновляем страницу
  $libraryList.append($fragment);
}

// drawQueueFilmList()
function drawWatchedFilmList() {
  //изменить активную кнопку на watched
  switchActiveButtonTo('watched');
  //очищаем html
  $libraryList.innerHTML = '';
  const $fragment = document.createDocumentFragment();
  //взять из localStorage
  const filmsWatched = JSON.parse(localStorage.getItem('filmWatched'));
  if (filmsWatched.length > 0) {
    filmsWatched.forEach(movie => {
      const $li = createLibraryCardFunc(
        movie.poster_path,
        movie.original_title,
        movie.id,
        movie.vote_average,
      );
      $fragment.appendChild($li);
    });
  } else {
    const $error = document.createElement('p');
    $error.className = 'movies__not-found';
    $error.textContent = 'You do not have to queue movies to watch.Add them';
    $fragment.append($error);
  }

  $libraryList.append($fragment);
}
