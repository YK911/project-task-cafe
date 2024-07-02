const modalRefs = {
  dialog: document.querySelector('[data-modal="exercise"]'),
  openBtn: document.querySelector('[data-modal-open]'),
  closeBtn: document.querySelector('[data-modal-close]'),
  favouritesBtn: document.querySelector('[data-add-favourites]'),
  ratingBtn: document.querySelector('[data-rating-open]'),
};

const showModal = () => modalRefs.dialog.showModal();
const closeModal = () => modalRefs.dialog.close();

const onFavouritesBtnClick = () => {
  console.log('Click on favourites btn');
};
const onRatingBtnClick = () => {
  console.log('Click on rating btn');
};

modalRefs.openBtn.addEventListener('click', showModal);
modalRefs.closeBtn.addEventListener('click', closeModal);

modalRefs.favouritesBtn.addEventListener('click', onFavouritesBtnClick);
modalRefs.ratingBtn.addEventListener('click', onRatingBtnClick);
