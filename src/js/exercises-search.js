import state from './exercises-state';
import drawExercisesList from './exercises-list';

function attachSearchListener() {
  const searchInput = document.querySelector('.exercises-search');

  if (!searchInput) {
    return;
  }

  searchInput.addEventListener('input', (e) => {
    state.setKeyword(e.target.value);
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
    container.classList.remove('visually-hidden');
  } else {
    container.classList.add('visually-hidden');
  }

  clearSearchInput();
}

export { attachSearchListener, updateSearchVisibility, clearSearchInput };
