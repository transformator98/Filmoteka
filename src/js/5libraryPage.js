const $libraryList = document.querySelector("ul.library-list")
const createLibraryCardFunc = (imgPath, filmTitle, movieId, voteAverage) => {
  //создаем елементы
  const $li = document.createElement('li');
  const $p = document.createElement('p');
  const $img = document.createElement('img');
  const $vote = document.createElement('span');

  //ставим классы
  $li.className = 'movies__item';
  $p.className = 'movies__title ';
  $vote.className = 'movies__item-rating'
  $img.className = 'movies__image';

  //наполняем елементы
  $img.setAttribute('src', imgPath);
  $p.textContent = filmTitle;
  $vote.textContent = voteAverage

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

  if (btnName == "queue") {
    if (refs.watchedBtn.classList.contains("onClickLibrary")) {
      refs.watchedBtn.classList.remove("onClickLibrary")
    }
    refs.queueBtn.classList.add("onClickLibrary")
  }
  if (btnName == "watched") {
    if (refs.queueBtn.classList.contains("onClickLibrary")) {
      refs.queueBtn.classList.remove("onClickLibrary")
    }
    refs.watchedBtn.classList.add("onClickLibrary")
  }

}

function drawQueueFilmList() {
  //изменить активную кнопку на watched
  switchActiveButtonTo("queue")
  // очищаем html
  $libraryList.innerHTML = ""
  const $fragment = document.createDocumentFragment()
  //взять из localStorage
  const filmsQueue = [{
    id: 74,
    poster_path: IMAGE_NOT_FOUND,
    original_title: "I'm the movie from librabry!",
    vote_average: "5.6"
  }]
  if (filmsQueue.length > 0) {
    filmsQueue.forEach(movie => {
      console.log(movie)
      const $li = createLibraryCardFunc(movie.poster_path, movie.original_title, movie.id, movie.vote_average)
      $fragment.appendChild($li)
    })
  } else {
    const $error = document.createElement('p')
    $error.className = "movies__not-found"
    $error.textContent = 'You do not have to queue movies to watch.Add them'
    $fragment.append($error)
  }

  $libraryList.append($fragment)

}

// drawQueueFilmList()
function drawWatchedFilmList() {
  //изменить активную кнопку на watched
  switchActiveButtonTo("watched")
  //очищаем html
  $libraryList.innerHTML = ""
  const $fragment = document.createDocumentFragment()
  //взять из localStorage
  const filmsWatched = []
  if (filmsWatched.length > 0) {
    filmsWatched.forEach(movie => {
      const $li = createLibraryCardFunc(movie.poster_path, movie.original_title, movie.id, movie.vote_average)
      $fragment.appendChild($li)
    })
  } else {
    const $error = document.createElement('p')
    $error.className = "movies__not-found"
    $error.textContent = 'You do not have to queue movies to watch.Add them'
    $fragment.append($error)
  }

  $libraryList.append($fragment)

}
