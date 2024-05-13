const btnLive = document.querySelector('.what-in-live-button');
const menuLive = document.querySelector('.what-in-live-bottom');
const svg = document.querySelector('.what-in-live-button__svg')

btnLive.addEventListener('click', () => {
  menuLive.classList.toggle('in-live-bottom__opened');
});

btnLive.addEventListener('click', () => {
  svg.classList.toggle('what-in-live-button__svg-opened');
});


