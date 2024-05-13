// Открыть модальное окно
document.querySelector(".header__button-login-1").addEventListener("click", function() {
    document.getElementById("login-menu-container").classList.add("login-menu-container-opened")
})

document.querySelector(".header__button-login-2").addEventListener("click", function() {
  document.getElementById("login-menu-container").classList.add("login-menu-container-opened")
})

// Закрыть модальное окно
document.getElementById("login-menu__close").addEventListener("click", function() {
    document.getElementById("login-menu-container").classList.remove("login-menu-container-opened")
})

// Закрыть модальное окно при нажатии на Esc
window.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        document.getElementById("login-menu-container").classList.remove("login-menu-container-opened")
    }
});

