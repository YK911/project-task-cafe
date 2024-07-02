const scrollBtn = document.getElementById('scrollBtn');

scrollBtn.addEventListener('click', (e) => {
  e.preventDefault();

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });

  scrollBtn.blur();
});
