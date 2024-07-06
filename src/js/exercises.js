import state from './exercises-state';
import { showLoader, hideLoader } from './loader';
import { drawCategoriesList, updateCategoryName } from './exercises-categories';
import {
  attachSearchListener,
  updateSearchVisibility,
} from './exercises-search';

function drawFilter() {
  const filterContainer = document.querySelector('.exercises-filter-list');

  if (!filterContainer) {
    return;
  }

  state.filters.forEach((filter) => {
    const item = document.createElement('li');
    item.classList.add('exercises-filter-item');

    if (filter.value === state.selectedFilter.value) {
      item.classList.add('current');
    }

    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.classList.add('exercises-filter-button');
    button.textContent = filter.name;

    button.addEventListener('click', async (e) => {
      e.preventDefault();

      const filterItems = filterContainer.querySelectorAll(
        '.exercises-filter-item',
      );
      filterItems.forEach((filterItem) => {
        filterItem.classList.remove('current');
      });

      item.classList.add('current');
      state.selectFilter(filter);
      updateCategoryName();
      updateSearchVisibility();
      await drawCategoriesList();
    });

    item.appendChild(button);
    if (filterContainer) {
      filterContainer.appendChild(item);
    }
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  if (!document.querySelector('.exercises-filters')) {
    return;
  }

  showLoader();

  state.selectFilter(state.filters[0]);
  drawFilter();

  attachSearchListener();

  await drawCategoriesList();

  hideLoader();
});
