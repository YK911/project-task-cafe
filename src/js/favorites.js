import { getExerciseById, buildExerciseCard } from './exercise-service';

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
      exerciseList.appendChild(fragment);
    });
  }
}

// Function to save exercise ID to local storage
function saveExerciseId(id) {
  const exerciseId = id.trim();

  if (exerciseId) {
    const exercises = JSON.parse(localStorage.getItem('favorites')) || [];

    if (!exercises.includes(exerciseId)) {
      exercises.push(exerciseId);
      localStorage.setItem('favorites', JSON.stringify(exercises));
      displayExerciseIds();
    }
  }
}

// Load and display exercise IDs when the page is loaded
window.onload = () => {
  displayExerciseIds();
};

export default saveExerciseId;
