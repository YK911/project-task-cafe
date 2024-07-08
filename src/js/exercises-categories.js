import iziToast from 'izitoast';
import state from './exercises-state';
import drawExercisesList from './exercises-list';
import updatePagination from './exercises-pagination';
import { updateSearchVisibility } from './exercises-search';

function getExerciseCategoryNode(category, clickHandler) {
  const categoryItem = document
    .querySelector('#exercise-category-template')
    .content.cloneNode(true);

  categoryItem.querySelector('h3').textContent = category.name;
  categoryItem.querySelector('p').textContent = category.filter;
  categoryItem.querySelector('.exercise-category').style.backgroundImage =
    `url(${category.imgURL})`;

  if (clickHandler) {
    categoryItem
      .querySelector('.exercise-category')
      .addEventListener('click', () => clickHandler(category));
  }

  return categoryItem;
}

function updateCategoryName() {
  if (!state.selectedCategory) {
    document
      .querySelector('.exercises-header-selected-category')
      .classList.add('visually-hidden');
    document.querySelector('.exercises-header-category-name').textContent = '';
    return;
  }
  document.querySelector('.exercises-header-category-name').textContent =
    state.selectedCategory.name;
  document
    .querySelector('.exercises-header-selected-category')
    .classList.remove('visually-hidden');
}

async function drawCategoriesList(page = 1) {
  state.currentPage = page;
  const categories = await state.getCategories();

  const container = document.querySelector(
    '.exercises-categories, .exercises-list-container',
  );

  if (!container) {
    iziToast.error({
      title: 'Oops',
      message: 'Container not found',
      position: 'topRight',
    });
    return;
  }

  container.classList.add('exercises-categories');
  container.classList.remove('exercises-list-container');

  container.innerHTML = '';
  const categoriesList = document.createElement('ul');

  categoriesList.classList.add('categories-cards');

  categories.forEach((category) => {
    const categoryNode = getExerciseCategoryNode(category, (c) => {
      state.selectCategory(c);
      updateCategoryName();
      updateSearchVisibility();
      drawExercisesList();
    });
    const node = document.createElement('li');
    node.appendChild(categoryNode);
    categoriesList.appendChild(node);
  });

  container.appendChild(categoriesList);

  updatePagination((p) => {
    drawCategoriesList(p);
    document
      .getElementById('exercises-filters')
      ?.scrollIntoView({ behavior: 'smooth' });
  });
}

export { drawCategoriesList, getExerciseCategoryNode, updateCategoryName };
