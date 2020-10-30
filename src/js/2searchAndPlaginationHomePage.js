// ведённое слово-названия фильма, который ищут


// ссылка на форму
const searchForm = document.querySelector('form.search-form');

// На форму поставила слушатель событий
searchForm.addEventListener('submit',event=>{
    // убрала дефолтное поведение формы
    event.preventDefault();

    const input = event.currentTarget;
    console.log(input.elements)

})

// Срабатывает
// const inputValue = document.querySelector('.search-form__input');
// console.log(inputValue.value)

    // не удаётся достучатся до введённого слова в инпут
    // const input = event.currentTarget;
    // достучалась до инпута (елемента формы)
    // console.dir(input.elements.value);




// функция поиска фильма
// function fetchFilms(){
    // возвращаем из функции промис
    // return fetch()
// }