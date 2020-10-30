// ключ API
const apiKey = 'ca745db198ca3fbe8342f07480e09405';

// ведённое слово-названия фильма, который ищут
let inputValue = ' ';

// ссылка на форму
const searchForm = document.querySelector('form.search-form');

// ссылка на инпут
const $input = document.querySelector('.search-form__input');

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
    .then(data => console.log(data))
    .catch(apiError => console.log(apiError));
}
