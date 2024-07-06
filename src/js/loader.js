let loaderTimeout;

function showLoaderWithTimeout() {
  document.querySelector('.loader-overlay').style.display = 'flex';
}

export function showLoader() {
  // showing loader only if the request takes more than a second, otherwise it looks cringe
  loaderTimeout = setTimeout(showLoaderWithTimeout, 500);
}

export function hideLoader() {
  clearTimeout(loaderTimeout);
  document.querySelector('.loader-overlay').style.display = 'none';
}
