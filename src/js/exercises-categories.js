import state from './exercises-state';
import drawExercisesList from './exercises-list';
import updatePagination from './exercises-pagination';

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

async function drawCategoriesList(page = 1) {
  const categories = await state.getCategories(page);

  const container = document.querySelector(
    '.exercises-categories, .exercises-list-container',
  );

  if (!container) {
    console.log('Container not found');
    return;
  }

  container.classList.add('exercises-categories');
  container.classList.remove('exercises-list-container');

  container.innerHTML = '';
  const categoriesList = document.createElement('ul');

  categoriesList.classList.add('categories-cards');

  categories.forEach((category) => {
    const categoryNode = getExerciseCategoryNode(category, (c) =>
      drawExercisesList(c),
    );
    const node = document.createElement('li');
    node.appendChild(categoryNode);
    categoriesList.appendChild(node);
  });

  container.appendChild(categoriesList);

  updatePagination((p) => drawCategoriesList(p));
}

export { drawCategoriesList, getExerciseCategoryNode };
