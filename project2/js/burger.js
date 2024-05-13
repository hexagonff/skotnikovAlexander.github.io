
const burgerBtn = document.querySelector('.burger-button');
const menuClose = document.querySelector('.burger-close');
const menuBurger = document.querySelector('.burger-menu');

burgerBtn.addEventListener('click', () => {
 menuBurger.classList.add('burger-menu__opened');
});


menuClose.addEventListener('click', () => {
  menuBurger.classList.remove ('burger-menu__opened');
});
