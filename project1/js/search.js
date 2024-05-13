const openSearch = document.querySelector('.nav__search');
const closeSearch = document.querySelector('.search__close');
const searchForm = document.querySelector('.search__form');

openSearch.addEventListener('click',() => {
  searchForm.classList.add('search__form--active');
  openSearch.classList.remove('search-focus')
})

closeSearch.addEventListener('click',() => {
  searchForm.classList.remove('search__form--active');
})
