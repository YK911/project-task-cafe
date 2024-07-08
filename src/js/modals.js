// eslint-disable-next-line
import StarRating from 'star-rating.js';
import axios from 'axios';
import iziToast from 'izitoast';
import capitalize from './capitalize';
import { FAVORITES_KEY } from './config';
import {
  saveExerciseDetails,
  deleteExerciseDetailsById,
} from './exercises-shared';

// eslint-disable-next-line
import 'star-rating.js/dist/star-rating.min.css';
// Set base URL
axios.defaults.baseURL = 'https://your-energy.b.goit.study/api/exercises/';

let exerciseDetails = {};
const ratingOptions = {
  starSize: 18,
  maxStars: 5,
  tooltip: false,
  stars: (el) => {
    const star = el;
    star.innerHTML =
      '<svg viewBox="0 0 20 19" xmlns="http://www.w3.org/2000/svg"><path class="gl-star-full" d="M9.049.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 0 0 .95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 0 0-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.539 1.118l-3.975-2.888a1 1 0 0 0-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 0 0-.363-1.118L1.077 8.101c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 0 0 .951-.69L9.05.927Z"/></svg>';
  },
};
const exerciseRefs = {
  dialog: document.querySelector('[data-modal="exercise"]'),
  closeBtn: document.querySelector('[data-modal-close]'),
  favouritesBtn: document.querySelector('[data-add-favourites]'),
  ratingBtn: document.querySelector('[data-rating-open]'),
  exercisesLayout: document.querySelector('[data-exercise]'),
};
const ratingRefs = {
  dialog: document.querySelector('[data-modal="rating"]'),
  closeBtn: document.querySelector('[data-modal-close="rating"]'),
  form: document.querySelector('[data-modal="rating"] .rating-form'),
  ratingRate: document.querySelector('.rating-form-value'),
};

const showDetailsModal = () => exerciseRefs.dialog.showModal();
const closeDetailsModal = () => exerciseRefs.dialog.close();
const showRatingModal = () => ratingRefs.dialog.showModal();
const closeRatingModal = () => {
  ratingRefs.dialog.close();
  ratingRefs.ratingRate.textContent = '0.0';
  ratingRefs.form.reset();
  showDetailsModal();
};

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
  target.firstElementChild.textContent = 'Remove';
  target.classList.add('is-favourite');
};
const toggleFavouritesOnModalOpen = (exerciseId, selector, isInFavorites) => {
  const target = selector;
  if (isInFavorites) {
    target.firstElementChild.textContent = 'Add to favorites';
    target.classList.remove('is-favourite');
    return;
  }
  target.firstElementChild.textContent = 'Remove';
  target.classList.add('is-favourite');
};

const onFavouritesBtnClick = (event) => {
  const target = event.currentTarget;
  const exerciseId = target.dataset.addFavourites;
  const isInFavorites = checkFavExercise(exerciseId);
  toggleFavouritesOnBtnClick(exerciseId, target, isInFavorites);
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
  const starsOptions = Array.from(
    { length: 5 },
    (_, i) =>
      `<option value="${i + 1}" ${i + 1 === Math.round(rating) ? 'selected' : ''}>${i + 1} Stars</option>`,
  ).join('');

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
      <select class="star-rating">
          <option value="">Select a rating</option>
          ${starsOptions}
      </select>
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

const handleUpdateRate = (event) => {
  const { value } = event.currentTarget.dataset;
  const rate = Number(value);
  ratingRefs.ratingRate.textContent = rate.toFixed(1);
};
const onRatingBtnClick = () => {
  const { _id } = exerciseDetails;
  closeDetailsModal();
  showRatingModal();

  // eslint-disable-next-line
  new StarRating('.rating-form-star', ratingOptions);
  ratingRefs.form.setAttribute('data-exs-id', _id);
  const stars = document.querySelectorAll(
    '[data-modal="rating"] .gl-star-rating .gl-star-rating--stars span',
  );
  stars.forEach((star) => star.addEventListener('click', handleUpdateRate));
};
const onRatingFormSubmit = async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const { exsId } = form.dataset;
  const ratingScoreEl = form.querySelector('.gl-star-rating--stars');
  const { rating } = ratingScoreEl.dataset;
  const { ratingEmail, ratingMessage } = form.elements;

  try {
    await axios.patch(`${exsId}/rating`, {
      rate: +rating,
      email: ratingEmail.value,
      review: ratingMessage.value,
    });
    ratingRefs.ratingRate.textContent = '0.0';
    form.reset();
    closeRatingModal();

    iziToast.success({
      title: 'OK',
      message: 'Rated!',
      position: 'topRight',
    });
  } catch (err) {
    if (err.response) {
      if (err.response.status === 409) {
        ratingRefs.ratingRate.textContent = '0.0';
        form.reset();
        closeRatingModal();

        iziToast.warning({
          title: 'OK',
          message: 'You have already rated this.',
          position: 'topRight',
        });
      } else {
        iziToast.error({
          title: 'Oops',
          message: err.response.statusText,
          position: 'topRight',
        });
      }
    } else {
      iziToast.error({
        title: 'Oops',
        message: err.message,
        position: 'topRight',
      });
    }
  }
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
  showDetailsModal(exerciseId);
  // eslint-disable-next-line
  new StarRating('.star-rating', ratingOptions);
}

if (exerciseRefs.closeBtn) {
  exerciseRefs.closeBtn.addEventListener('click', closeDetailsModal);
}
if (exerciseRefs.favouritesBtn) {
  exerciseRefs.favouritesBtn.addEventListener('click', onFavouritesBtnClick);
}
if (exerciseRefs.exercisesLayout) {
  exerciseRefs.exercisesLayout.addEventListener('click', onExerciseClick);
}

if (exerciseRefs.ratingBtn) {
  exerciseRefs.ratingBtn.addEventListener('click', onRatingBtnClick);
}
if (ratingRefs.closeBtn) {
  ratingRefs.closeBtn.addEventListener('click', closeRatingModal);
}
if (ratingRefs.closeBtn) {
  ratingRefs.closeBtn.addEventListener('click', closeRatingModal);
}
if (ratingRefs.form) {
  ratingRefs.form.addEventListener('submit', onRatingFormSubmit);
}
