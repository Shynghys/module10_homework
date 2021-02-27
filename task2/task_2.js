// Задание 2.

// Сверстайте кнопку, клик на которую будет выводить данные о размерах экрана с помощью alert.

const btn = document.querySelector('button');


btn.addEventListener('click', () => {

    let widthSize = window.screen.width,
        heightSize = window.screen.height;

    alert(`ширина экрана = ${widthSize}, высота экрана = ${heightSize}`);
    alert(`ширина области просм.экрана = ${document.documentElement.clientWidth}, высота области просм.экрана  = ${document.documentElement.clientHeight}`);
    alert(`ширина области просм.экрана+сролл = ${window.innerWidth}, высота области просм.экрана+скролл  = ${window.innerHeight}`);
})