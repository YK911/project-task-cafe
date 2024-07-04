import { drawCategoriesList } from './exercises-categories';

document.addEventListener('DOMContentLoaded', async () => {
  const filterItems = document.querySelectorAll('.exercises-filter-list li');

  const initialFilter = filterItems[0]
    .querySelector('.exercises-filter-button')
    .textContent.trim();

  await drawCategoriesList(initialFilter);

  filterItems.forEach((item) => {
    item.addEventListener('click', async () => {
      filterItems.forEach((filterItem) => {
        filterItem.classList.remove('exercises-filter-item-active');
      });
      item.classList.add('exercises-filter-item-active');

      const buttonValue = item
        .querySelector('.exercises-filter-button')
        .textContent.trim();

      await drawCategoriesList(buttonValue);
    });
  });
});
