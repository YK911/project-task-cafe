export default function getExerciseCategoryNode(
  category,
  filterName,
  clickHandler,
) {
  const categoryItem = document
    .querySelector('#exercise-category-template')
    .content.cloneNode(true);

  categoryItem.querySelector('h3').textContent = category.name;
  categoryItem.querySelector('p').textContent = filterName;
  categoryItem.querySelector('.exercise-category').style.backgroundImage =
    `url(${category.imgURL})`;

  if (clickHandler) {
    categoryItem
      .querySelector('.exercise-category')
      .addEventListener('click', () => clickHandler(category));
  }

  return categoryItem;
}
