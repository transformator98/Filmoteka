// ведённое слово-названия фильма, который ищут
let inputValue = ' ';
// ссылка на форму
const searchForm = document.querySelector('.search-form');
// ссылка на инпут
const $input = document.querySelector('.search-form__input');
// ссылка на обёртку кнопок
const $btnsWrapper = document.querySelector('.page-counter__wrapper');
// ссылка на кнопку Prev
const $prevBtn = document.querySelector('[data-action="previous"]');
// ссылка на кнопку Next
const $nextBtn = document.querySelector('[data-action="next"]');
// ссылка на кнопку "номер странички"
const $numberOfPage = document.querySelector('.btn_page-number');
// значение переменной version, которое хранится в LocalStorage
let versionAtLocalStorage = localStorage.getItem('version');

// На форму поставила слушатель событий
searchForm.addEventListener('submit', searchFilms);

// функция поиска фильма
function searchFilms(event) {
  // убрала дефолтное поведение формы
  event.preventDefault();

  //   Записываю в переменную inputValue значение записанное в инпут(название фильма которое ищут)
  inputValue = $input.value.trim();

  // функция очистки результата поиска перед новым вводом поиска фильма
  searchForm.reset();

  // Убрать сообщение об ошибке при следующем поиске
  $searchFormError.classList.replace(
    'search-form__error--visibale',
    'search-form__error--hidden',
  );

  // Если нажали Enter при пустом инпуте, тогда на страничке отображается список популярных
  // фильмов (вызывается fetchPopularMovies())
  if (inputValue === "") {
    fetchPopularMovies();
    return;
  } else {
    // функция поиска фильма
    $moviesList.innerHTML = '';
    fetchFilms(inputValue);
  }
}

// функция отправки запроса на API
function fetchFilms(inputValue, number = 1) {
  popularMoviesActive = false;
  $prevBtn.classList.remove('btn_prev_hidden');
  if (number === 1) {
    $numberOfPage.textContent = number;
    pageNumber = number;
  }

  // При попытке пролистать обратно (нажать btn Prev) при первой странице отображения
  // поиска (pageNumber=1), fetch не выполнялся
  if (pageNumber < 1) {
    $numberOfPage.textContent = 1;
    return;
  } 
  
  // На первой странице списка кнопка Prev не видна
  if (pageNumber===1){
    $prevBtn.classList.add('btn_prev_hidden');
  }

  // возвращаем из функции промис
  // console.log(`https://api.themoviedb.org/3/search/movie/?api_key=${API_KEY}&query=${inputValue}&page=${pageNumber}`)
  return fetch(
    `https://api.themoviedb.org/3/search/movie/?api_key=${API_KEY}&query=${inputValue}&page=${pageNumber}`,
    options)
    .then(responce => responce.json())
    .then(movies => {
      // массив приходящих фильмов(каждый фильм в виде обьекта)
      let moviesList = movies.results;

      // в случае ответа пустым массивом отрисовывать ошибку
      if (moviesList.length === 0) {
        $searchFormError.classList.replace(
          'search-form__error--hidden',
          'search-form__error--visibale',
        );
        fetchPopularMovies();
        return;
      }

      renderMoviesList(movies);

      // если version pro, тогда применяется «Ленивая» загрузка изображений
      if (versionAtLocalStorage === 'pro') {
        // При включении версии pro, pageNumber принимает начальное значение
        pageNumber = 1;
        lazyLoadingFilms();
      }
    })
    .catch(apiError => console.log(apiError));
}

// Делегирование событий на обёртку кнопок
$btnsWrapper.addEventListener('click', plaginationNavigation);

function plaginationNavigation(event) {
  $moviesList.innerHTML = '';

  if (event.target.id === 'page-counter__btn-previous') {
    // уменьшение pageNumber на 1
    if (pageNumber === 1) {
      return;
    }
    pageNumber -= 1;
    // изменение текста $numberOfPage
    $numberOfPage.textContent = pageNumber;
    if (popularMoviesActive) {
      fetchPopularMovies(pageNumber)
    } else {
      fetchFilms(inputValue, pageNumber);
    }
  } else if (event.target.id === 'page-counter__btn-next') {
    // увеличение pageNumber на 1
    if (pageNumber >= renderFilms.total_pages) {
      return;
    }
    ++pageNumber;
    // изменение текста $numberOfPage
    $numberOfPage.textContent = pageNumber;
    if (popularMoviesActive) {
      fetchPopularMovies(pageNumber)
    } else {
      fetchFilms(inputValue, pageNumber);
    }

  }
  window.scrollBy(0, -window.innerHeight);
}

// функция Ленивой загрузки
function lazyLoadingFilms() {
  // При lazyLoading прятать кнопки пагинации
  $btnsWrapper.classList.add('hidden');

  // устанавливаем настройки
  const options = {
    // родитель целевого элемента - область просмотра
    root: null,
    // без отступов
    rootMargin: '0px',
    // процент пересечения - половина изображения
    threshold: 0.5,
  };

  const callback = function (moviesList, observer) {
    // для каждой записи-целевого элемента
    moviesList.forEach(movie => {
      // если элемент является наблюдаемым, создаём карточку фильма функций createCard()
      if (movie.isIntersecting) {

        fetchFilms(inputValue, ++pageNumber);
        // console.log(pageNumber)
        // если пришло менее 20 фильмов,прекращаем наблюдение
        if (moviesList.length < 20) {
          observer.disconnect();
        }
      }
    });
  };

  // создаем наблюдатель
  const observer = new IntersectionObserver(callback, options);

  // Dom елемент за которым наблюдаем
  // последний елемент списка фильмов
  observer.observe($moviesList.lastChild);
}
