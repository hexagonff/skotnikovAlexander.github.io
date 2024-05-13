const swiper = new Swiper('.swiper', {
  loop: false,

  slidesPerGroup: 2,
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  breakpoints: {
    0: {
      slidesPerView: 2.4,
      spaceBetween: 20,
    },

    610: {
      slidesPerView: 2,
      spaceBetween: 20,
    },

    1100: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
  }

});

