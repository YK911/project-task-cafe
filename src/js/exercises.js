import state from './exercises-state';
import { drawCategoriesList } from './exercises-categories';

document.addEventListener('DOMContentLoaded', async () => {
  state.selectFilter(state.filters[0]);

  const filterContainer = document.querySelector('.exercises-filter-list');

  state.filters.forEach((filter) => {
    const item = document.createElement('li');
    item.classList.add('exercises-filter-item');

    if (filter.value === state.selectedFilter.value) {
      item.classList.add('exercises-filter-item-active');
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
        filterItem.classList.remove('exercises-filter-item-active');
      });

      item.classList.add('exercises-filter-item-active');
      state.selectFilter(filter);
      await drawCategoriesList();
    });

    item.appendChild(button);
    filterContainer.appendChild(item);
  });

  await drawCategoriesList();
});
