import capitalize from './capitalize';

const exerciseRefs = {
  dialog: document.querySelector('[data-modal="exercise"]'),
  closeBtn: document.querySelector('[data-modal-close]'),
  favouritesBtn: document.querySelector('[data-add-favourites]'),
  ratingBtn: document.querySelector('[data-rating-open]'),
  exercisesLayout: document.querySelector('[data-exercise]'),
};

const showModal = () => exerciseRefs.dialog.showModal();
const closeModal = () => exerciseRefs.dialog.close();

const onFavouritesBtnClick = (event) => {
  const target = event.currentTarget;
  const exerciseId = target.dataset.addFavourites;
  console.log(`Click on favourites btn ${exerciseId}`);
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
    <h2 class="modal-caption">${capitalize(name)}</h2>
    <div class="modal-rating">
      <p>${rating}</p>
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
    <p class="modal-desc">${description}</p>`;
};

const onExerciseClick = async (event) => {
  let { target } = event;
  let exerciseId;
  if (target === event.currentTarget) return;

  while (target && target !== this) {
    if (target.classList.contains('js-exercise-category')) {
      exerciseId = target.dataset.id;
      break;
    }
    target = target.parentElement;
  }

  const exerciseDetails = await getExerciseDetails(exerciseId);
  const detailsMarkup = createExerciseDetailsMarkup(exerciseDetails);
  const detailsBlock = exerciseRefs.dialog.querySelector('.modal-body');
  const favouritesBtn = exerciseRefs.dialog.querySelector(
    '.modal-btn[data-add-favourites]',
  );
  favouritesBtn.dataset.addFavourites = exerciseId;
  detailsBlock.innerHTML = detailsMarkup;

  showModal(exerciseId);
};

exerciseRefs.closeBtn.addEventListener('click', closeModal);

exerciseRefs.favouritesBtn.addEventListener('click', onFavouritesBtnClick);
exerciseRefs.ratingBtn.addEventListener('click', onRatingBtnClick);

exerciseRefs.exercisesLayout.addEventListener('click', onExerciseClick);