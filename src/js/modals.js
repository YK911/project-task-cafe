import capitalize from './capitalize';
import {
  saveExerciseDetails,
  deleteExerciseDetailsById,
} from './exercises-shared';

import { FAVORITES_KEY } from './config';

let exerciseDetails = {};
const exerciseRefs = {
  dialog: document.querySelector('[data-modal="exercise"]'),
  closeBtn: document.querySelector('[data-modal-close]'),
  favouritesBtn: document.querySelector('[data-add-favourites]'),
  ratingBtn: document.querySelector('[data-rating-open]'),
  exercisesLayout: document.querySelector('[data-exercise]'),
};

const showModal = () => exerciseRefs.dialog.showModal();
const closeModal = () => exerciseRefs.dialog.close();
const checkFavExercise = (favId) => {
  const exercisesParsed = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  const exercises = Object.keys(exercisesParsed);
  return exercises.includes(favId);
};
const toggleFavouritesOnBtnClick = (exerciseId, selector, isInFavorites) => {
  const target = selector;
  if (isInFavorites) {
    deleteExerciseDetailsById(exerciseId);
    target.firstElementChild.textContent = 'Add to favorites';
    target.classList.remove('is-favourite');
    return;
  }

  // saveExerciseId(exerciseId);
  saveExerciseDetails(exerciseDetails);
  // console.log(exerciseDetails);
  target.firstElementChild.textContent = 'Remove from favorites';
  target.classList.add('is-favourite');
};
const toggleFavouritesOnModalOpen = (exerciseId, selector, isInFavorites) => {
  const target = selector;
  if (isInFavorites) {
    target.firstElementChild.textContent = 'Add to favorites';
    target.classList.remove('is-favourite');
    return;
  }
  target.firstElementChild.textContent = 'Remove from favorites';
  target.classList.add('is-favourite');
};

const onFavouritesBtnClick = (event) => {
  const target = event.currentTarget;
  const exerciseId = target.dataset.addFavourites;
  const isInFavorites = checkFavExercise(exerciseId);
  toggleFavouritesOnBtnClick(exerciseId, target, isInFavorites);
};
const onRatingBtnClick = () => {
  console.log('Click on rating btn');
};

const getExerciseDetails = async (id) => {
  const response = await fetch(
    `https://your-energy.b.goit.study/api/exercises/${id}`,
  );
  return response.json();
};
const createExerciseDetailsMarkup = (detailsInfo) => {
  const {
    bodyPart,
    equipment,
    gifUrl,
    name,
    target,
    description,
    rating,
    burnedCalories,
    time,
    popularity,
  } = detailsInfo;

  return `<div class="modal-ill">
      <img
        src="${gifUrl}"
        alt="${name}"
        width="295"
        height="258"
        loading="lazy"
      />
    </div>
    <div class="modal-details">
    <h2 class="modal-caption">${capitalize(name)}</h2>
    <div class="modal-rating">
      <p>${rating.toFixed(1)}</p>
      <svg width="98" height="13" id="rating-stars">
        <use style="--shift: -2" href="./assets/icons.svg#star"></use>
        <use style="--shift: -1" href="./assets/icons.svg#star"></use>
        <use style="--shift: 0" href="./assets/icons.svg#star"></use>
        <use style="--shift: 1" href="./assets/icons.svg#star"></use>
        <use style="--shift: 2" href="./assets/icons.svg#star"></use>
      </svg>
    </div>
    <ul class="modal-meta">
      <li>
        <h3 class="modal-meta-caption">Target</h3>
        <p class="modal-meta-info">${capitalize(target)}</p>
      </li>
      <li>
        <h3 class="modal-meta-caption">Body Part</h3>
        <p class="modal-meta-info">${capitalize(bodyPart)}</p>
      </li>
      <li>
        <h3 class="modal-meta-caption">Equipment</h3>
        <p class="modal-meta-info">${capitalize(equipment)}</p>
      </li>
      <li>
        <h3 class="modal-meta-caption">Popular</h3>
        <p class="modal-meta-info">${popularity}</p>
      </li>
      <li>
        <h3 class="modal-meta-caption">Burned Calories</h3>
        <p class="modal-meta-info">${burnedCalories}/${time} min</p>
      </li>
    </ul>
    <p class="modal-desc">${description}</p></div>`;
};

export default async function onExerciseClick(exerciseId) {
  exerciseDetails = await getExerciseDetails(exerciseId);
  const detailsMarkup = createExerciseDetailsMarkup(exerciseDetails);
  const detailsBlock = exerciseRefs.dialog.querySelector('.modal-body');
  const favouritesBtn = exerciseRefs.dialog.querySelector(
    '.modal-btn[data-add-favourites]',
  );
  const isInFavourites = checkFavExercise(exerciseId);

  favouritesBtn.dataset.addFavourites = exerciseId;
  detailsBlock.innerHTML = detailsMarkup;

  toggleFavouritesOnModalOpen(exerciseId, favouritesBtn, !isInFavourites);
  showModal(exerciseId);
}

if (exerciseRefs.closeBtn) {
  exerciseRefs.closeBtn.addEventListener('click', closeModal);
}

if (exerciseRefs.favouritesBtn) {
  exerciseRefs.favouritesBtn.addEventListener('click', onFavouritesBtnClick);
}

if (exerciseRefs.ratingBtn) {
  exerciseRefs.ratingBtn.addEventListener('click', onRatingBtnClick);
}

if (exerciseRefs.exercisesLayout) {
  exerciseRefs.exercisesLayout.addEventListener('click', onExerciseClick);
}
