const backdrop = document.querySelector('.js-menu-backdrop');
const openMenuBtn = document.querySelector('.js-open-menu');
const closeMenuBtn = document.querySelector('.js-close-menu');
const mobMenuLink = document.querySelector('.js-menu-link');

function toggleMenu() {
  backdrop.classList.toggle('is-open');
}

function onMenuClick(evt) {
  if (window.location.href === evt.target.href) {
    evt.preventDefault();
    return;
  }
  toggleMenu();
}

function handlerBackdrop({ target }) {
  if (!target.closest('#mob-menu')) {
    toggleMenu();
  }
}

openMenuBtn.addEventListener('click', toggleMenu);
closeMenuBtn.addEventListener('click', toggleMenu);
mobMenuLink.addEventListener('click', onMenuClick);

backdrop.addEventListener('click', handlerBackdrop);
