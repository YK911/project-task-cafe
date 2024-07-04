export function showLoader(containerSelector) {
  const container = document.querySelector(containerSelector);

  if (!container) {
    console.log('Container not found');
    return;
  }

  container.innerHTML = '';

  container.classList.add('loading');

  const loader = document.createElement('span');

  loader.textContent = 'Loading...';

  loader.classList.add('loader');

  container.appendChild(loader);
}

export function hideLoader(containerSelector) {
  const container = document.querySelector(containerSelector);

  if (!container) {
    console.log('Container not found');
    return;
  }

  container.classList.remove('loading');

  container.querySelector('.loader').remove();
}
