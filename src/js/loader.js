let loaderTimeout;

function showLoaderWithTimeout() {
  document.querySelector('.loader-overlay').style.display = 'flex';
}

export function showLoader() {
  // showing loader only if the request takes more than half a second, otherwise it looks cringe
  loaderTimeout = setTimeout(showLoaderWithTimeout, 100);
}

export function hideLoader() {
  clearTimeout(loaderTimeout);
  document.querySelector('.loader-overlay').style.display = 'none';
}
