// ведённое слово-названия фильма, который ищут
let inputValue = ' ';
// переменная для проверки нажат ли Enter при пустом инпуте
const $empty = '';
// Номер страницы
let pageNumber = 1;
// ссылка на форму
const searchForm = document.querySelector('.search-form');
// ссылка на инпут
const $input = document.querySelector('.search-form__input');
// ссылка на параграф с ошибкой
const $searchFormError = document.querySelector('p.search-form__error');
// ссылка на обёртку кнопок
const $btnsWrapper = document.querySelector('.page-counter__wrapper');
// ссылка на кнопку Prev
const $prevBtn = document.querySelector('[data-action="previous"]');
// ссылка на кнопку Next
const $nextBtn = document.querySelector('[data-action="next"]');
// ссылка на кнопку "номер странички"
const $numberOfPage = document.querySelector('.btn_page-number');
// значение переменной version, которое хранится в LocalStorage
let versionAtLocalStorege = localStorage.getItem('version');



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
  if (inputValue === $empty) {
    fetchPopularMovies();
    return;
  } else {
    // функция поиска фильма
    fetchFilms(inputValue, pageNumber);
  }
}

// функция отправки запроса на API
function fetchFilms(inputValue, pageNumber) {
  // При попытке пролистать обратно (нажать btn Prev) при первой странице отображения
  // поиска (pageNumber=1), fetch не выполнялся
  if (pageNumber < 1) {
    $numberOfPage.textContent = 1;
    return;
  }

  // возвращаем из функции промис
  return fetch(
    'https://api.themoviedb.org/3/search/movie/?api_key=' +
      `${API_KEY}` +
      '&query=' +
      `${inputValue}` +
      '&page=' +
      `${pageNumber}`,
  )
    .then(responce => responce.json())
    .then(movies => {
      console.log(movies);

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
      // если в ответе 1 страничка с менее чем 20 фильмами, тогда кнопки пагинации прятать
      if (moviesList.length < 20) {
        $btnsWrapper.classList.add('hidden');
      }

      //TODO нужно будет  убрать из это промиса
      renderMoviesList(movies);

      // если version pro, тогда применяется «Ленивая» загрузка изображений
      lazyLoaadingFilms()

    })
    .catch(apiError => console.log(apiError));
}

// Делегирование событий на обёртку кнопок
$btnsWrapper.addEventListener('click', plaginationNavigation);

function plaginationNavigation(event) {
  if (event.target.id === 'page-counter__btn-previous') {
    // уменьшение pageNumber на 1
    pageNumber -= 1;
    // изменение текста $numberOfPage
    $numberOfPage.textContent = pageNumber;
    fetchFilms(inputValue, pageNumber);
  } else if (event.target.id === 'page-counter__btn-next') {
    // увеличение pageNumber на 1
    pageNumber += 1;
    // изменение текста $numberOfPage
    $numberOfPage.textContent = pageNumber;
    fetchFilms(inputValue, pageNumber);
  }
}

// функция Ленивой загрузки
function lazyLoaadingFilms(){
  // когда применяется lazy Loading, тогда кнопки пагинации прятать
  $btnsWrapper.classList.add('hidden');

  if (versionAtLocalStorege === 'pro') {
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

          // прекращаем наблюдение
          observer.disconnect();
        }
      });
    };

    // создаем наблюдатель
    const observer = new IntersectionObserver(callback, options);

    // Dom елемент за которым наблюдаем
    // последний елемент списка фильмов
    observer.observe($moviesList.lastChild);
  }
}
