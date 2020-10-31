// ведённое слово-названия фильма, который ищут
let inputValue = ' ';

// переменная для проверки нажат ли Enter при пустом инпуте
const $empty = '';

// Номер страницы
let pageNumber = 1;

// ссылка на форму
const searchForm = document.querySelector('form.search-form');

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

    // После того как пришли результаты поиска, появляется кнопка
    // Применила setTimeout чтоб кнопки не загружались раньше чем результаты поиска
    setTimeout(() => {
      $btnsWrapper.classList.remove('hidden');
    }, 2000);
  }
}

// функция отправки запроса на API
function fetchFilms(inputValue, pageNumber) {
  // При попытке пролистать обратно (нажать btn Prev) при первой странице отображения
  // поиска (pageNumber=1), fetch не выполнялся
  if (pageNumber < 1) {
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
      // в случае ответа пустым массивом отрисовывать ошибку
      if (movies.results.length === 0) {
        $searchFormError.classList.replace(
          'search-form__error--hidden',
          'search-form__error--visibale',
        );
        fetchPopularMovies();
        return;
      }
      //TODO нужно будет  убрать из это промиса
      renderMoviesList(movies);
    })
    .catch(apiError => console.log(apiError));
}

// делегирование событий на обёртку кнопок
$btnsWrapper.addEventListener('click', plaginationNavigation);

function plaginationNavigation(event) {
  if (event.target.id === 'page-counter__btn-previous') {
    // уменьшение pageNumber на 1
    pageNumber -= 1;
    fetchFilms(inputValue, pageNumber);
  } else if (event.target.id === 'page-counter__btn-next') {
    // увеличение pageNumber на 1
    pageNumber += 1;
    fetchFilms(inputValue, pageNumber);
  }
}
