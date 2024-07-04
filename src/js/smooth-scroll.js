const scrollBtn = document.getElementById('scrollBtn');

scrollBtn.addEventListener('click', (e) => {
  e.preventDefault();

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });

  scrollBtn.blur();
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    scrollBtn.style.display = 'flex';
  } else {
    scrollBtn.style.display = 'none';
  }
});
