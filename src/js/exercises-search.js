import state from './exercises-state';
import drawExercisesList from './exercises-list';

function attachSearchListener() {
  const searchInput = document.querySelector('.exercises-search');

  if (!searchInput) {
    return;
  }

  const searchIcon = document.querySelector('.search-icon');

  searchInput.addEventListener('input', (e) => {
    if (e.target.value) {
      searchIcon?.classList.add('search-active');
    } else {
      searchIcon?.classList.remove('search-active');
    }

    state.setKeyword(e.target.value);
  });

  document
    .querySelector('#exercises-filters-form')
    .addEventListener('submit', (e) => {
      e.preventDefault();
      drawExercisesList();
    });

  searchIcon?.addEventListener('click', () => {
    if (!state.keyword) {
      return;
    }
    searchIcon?.classList.remove('search-active');
    searchInput.value = '';
    state.setKeyword('');
    drawExercisesList();
  });
}

function clearSearchInput() {
  document.querySelector('.exercises-search').value = '';
}

function updateSearchVisibility() {
  const container = document.querySelector('.exercises-search-container');

  if (!container) {
    return;
  }

  if (state.selectedCategory) {
    container.classList.remove('hide');
  } else {
    container.classList.add('hide');
  }

  clearSearchInput();
}

export { attachSearchListener, updateSearchVisibility, clearSearchInput };
