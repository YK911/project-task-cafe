import StarRating from 'star-rating.js';

class CustomStarRating extends StarRating {
  constructor(element, options) {
    super(element, options);
    this.setRating(options.initialRating);
  }

  setRating(rating) {
    this.element.setAttribute('data-rating', rating);
    console.log(`Rating set to: ${rating}`);
    // Можна додати логіку для оновлення відображення рейтингу
  }
}

export default { CustomStarRating };
