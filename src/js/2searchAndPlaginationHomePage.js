// ключ API
const apiKey = 'ca745db198ca3fbe8342f07480e09405';

// ведённое слово-названия фильма, который ищут
let inputValue = ' ';

// ссылка на форму
const searchForm = document.querySelector('form.search-form');

// ссылка на инпут
const $input = document.querySelector('.search-form__input');

// ссылка на параграф с ошибкой
const $searchFormError = document.querySelector('p.search-form__error');

// На форму поставила слушатель событий
searchForm.addEventListener('submit', event => searchFilms(event));

// функция поиска фильма
function searchFilms(event) {
  // убрала дефолтное поведение формы
  event.preventDefault();

  //   Записываю в переменную inputValue значение записанное в инпут(название фильма которое ищут)
  inputValue = $input.value.trim();
  //  Делегированием не удаётся достучатся до введённого слова в инпут
  // const input = event.currentTarget;
  // достучалась до инпута (елемента формы)
  // console.dir(input.elements);

  // функция очистки результата поиска перед новым вводом поиска фильма
  //   Артём обрати внимание, срабатывает ли и не ламает твою часть!!!
  searchForm.reset();

  // функция поиска фильма
  fetchFilms(inputValue);
}

// функция отправки запроса на API
function fetchFilms(inputValue) {
  // возвращаем из функции промис
  return fetch(
    'https://api.themoviedb.org/3/search/movie/?api_key=' +
      `${apiKey}` +
      '&query=' +
      `${inputValue}`,
  )
    .then(responce => responce.json())
    .then(movies => {
      // в случае ответа пустым массивом отрисовывать ошибку
      if (movies.results.length === 0) {
        $searchFormError.classList.replace(
          'search-form__error--hidden',
          'search-form__error--visibale',
        );
      } else {
        //   если массив не пустой пришёл
        // в случае корректного ответа чистить ul
        // Артём проверь плиз)
        $moviesList.innerHTML = ' ';


        // !!!!!!и с помощью createCardFunc созданной первым участником отрисовывать фильмы, не забываем также положить в глобальную переменную renderFilms результат;
        console.log(movies);
        
      }
    })
    .catch(apiError => console.log(apiError));
}
