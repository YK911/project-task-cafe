import { getExerciseById, buildExerciseCard } from './exercise-service';
import { showLoader, hideLoader } from './loader';
import { removeExerciseId } from './exercises-shared';

// Function to display exercise IDs from local storage
function displayExerciseIds() {
  const exerciseList = document.getElementById('exerciseList');
  const exerciseListEmpty = document.getElementById('exerciseListEmpty');

  if (exerciseList) {
    exerciseList.innerHTML = '';
  }

  const exercises = JSON.parse(localStorage.getItem('favorites')) || [];
  const fragment = document.createDocumentFragment();
  if (exercises.length === 0 && exerciseListEmpty) {
    exerciseListEmpty.classList.remove('visually-hidden');
  } else if (exerciseList) {
    showLoader();
    // Map each exercise ID to a promise that fetches its data
    const exercisePromises = exercises.map((exerciseId) => {
      return getExerciseById(exerciseId).then((data) => {
        const exercise = data;
        const card = buildExerciseCard(exercise);
        return card;
      });
    });

    // Wait for all promises to resolve before appending to the DOM
    Promise.all(exercisePromises)
      .then((cards) => {
        cards.forEach((card) => {
          fragment.appendChild(card);
        });
        hideLoader();
        exerciseList.appendChild(fragment);
      })
      .then(() => {
        const cardCategoryDivs = document.querySelectorAll('.card-category');

        cardCategoryDivs.forEach((cardCategoryDiv) => {
          const romoveButton = document.createElement('button');
          romoveButton.className = 'remove-button';
          romoveButton.textContent = 'X';

          // Get the data-id attribute value from the parent element
          const parentDiv = cardCategoryDiv.closest('.excercise-card-item');
          const dataId = parentDiv.getAttribute('data-id');

          // Set the data-id attribute on the new div
          romoveButton.setAttribute('data-id', dataId);

          // Insert the new div after each card-category div
          cardCategoryDiv.insertAdjacentElement('afterend', romoveButton);

          romoveButton.addEventListener('click', () => {
            const clickedDataId = romoveButton.getAttribute('data-id');
            removeExerciseId(clickedDataId);
            displayExerciseIds();
          });
        });
      });
  }
}

// Load and display exercise IDs when the page is loaded
window.onload = () => {
  displayExerciseIds();
};
