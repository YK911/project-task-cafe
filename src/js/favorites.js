import { getExerciseById, buildExerciseCard } from './exercise-service';
import { showLoader, hideLoader } from './loader';

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
    Promise.all(exercisePromises).then((cards) => {
      cards.forEach((card) => {
        fragment.appendChild(card);
      });
      hideLoader();
      exerciseList.appendChild(fragment);
    });
  }
}

// Load and display exercise IDs when the page is loaded
window.onload = () => {
  displayExerciseIds();
};
