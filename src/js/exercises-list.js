import state from './exercises-state';
import updatePagination from './exercises-pagination';
import onExerciseClick from './modals';

function buildExcerciseCardDetails(exercise) {
  const templateName = '#excercise-card-detail-template';
  const details = [];

  const cals = document.querySelector(templateName).content.cloneNode(true);
  cals.querySelector('.card-details-title').textContent = 'Burned Calories:';
  cals.querySelector('.card-details-value').textContent =
    `${exercise.burnedCalories} / ${exercise.time} min`;
  details.push(cals);

  const bodyPart = document.querySelector(templateName).content.cloneNode(true);
  bodyPart.querySelector('.card-details-title').textContent = 'Body Part:';
  bodyPart.querySelector('.card-details-value').textContent =
    exercise.bodyPart[0].toUpperCase() + exercise.bodyPart.slice(1);
  details.push(bodyPart);

  const target = document.querySelector(templateName).content.cloneNode(true);
  target.querySelector('.card-details-title').textContent = 'Target:';
  target.querySelector('.card-details-value').textContent =
    exercise.target[0].toUpperCase() + exercise.target.slice(1);
  details.push(target);

  return details;
}
function buildExerciseCard(exercise) {
  const templateName = '#excercise-card-template';

  const card = document.querySelector(templateName).content.cloneNode(true);

  const id = '_id';

  card.children[0].dataset.id = exercise[id];

  // .card-category
  card.querySelector('.card-category').textContent = exercise.bodyPart;

  // .rating-value
  card.querySelector('.rating-value').textContent = exercise.rating.toFixed(1);

  // .start-button
  const startButton = card.querySelector('.start-button');
  startButton.addEventListener('click', (event) => {
    event.preventDefault();
    onExerciseClick(exercise[id]);
  });

  // .card-title
  card.querySelector('.card-title').textContent =
    exercise.name[0].toUpperCase() + exercise.name.slice(1);

  // .card-details-list
  const detailsContainer = card.querySelector('.card-details-list');

  buildExcerciseCardDetails(exercise).forEach((detail) => {
    detailsContainer.append(detail);
  });

  return card;
}

export default async function drawExercisesList(category, page = 1) {
  const results = await state.getExercises(category, page);

  const container = document.querySelector(
    '.exercises-categories,.exercises-list-container',
  );

  container.classList.remove('exercises-categories');

  container.classList.add('exercises-list-container');

  container.innerHTML = '';

  const list = document.createElement('ul');

  list.classList.add('exercises-cards');

  results.forEach((exercise) => {
    const card = buildExerciseCard(exercise);

    card.addEventListener('click', () => {
      onExerciseClick(card);
    });

    list.appendChild(card);
  });

  container.appendChild(list);

  updatePagination((p) => drawExercisesList(category, p));
}
