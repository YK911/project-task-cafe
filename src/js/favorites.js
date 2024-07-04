/* const exerciseRefs = {
  favouritesBtn: document.querySelector('[data-add-favourites]'),
}; */

// Function to display exercise IDs from local storage
function displayExerciseIds() {
  const exerciseList = document.getElementById('exerciseList');
  const exerciseListEmpty = document.getElementById('exerciseListEmpty');

  if (exerciseList) {
    exerciseList.innerHTML = '';
  }

  const exercises = JSON.parse(localStorage.getItem('exercises')) || [];
  if (exercises.length === 0 && exerciseListEmpty) {
    exerciseListEmpty.classList.remove('visually-hidden');
  } else {
    exercises.forEach((exerciseId) => {
      const listItem = document.createElement('li');
      listItem.textContent = exerciseId;
      exerciseList.appendChild(listItem);
    });
  }
}

// Function to save exercise ID to local storage
function saveExerciseId(id) {
  const exerciseId = id.trim();

  if (exerciseId) {
    const exercises = JSON.parse(localStorage.getItem('exercises')) || [];
    exercises.push(exerciseId);
    localStorage.setItem('exercises', JSON.stringify(exercises));

    displayExerciseIds();
  }
}

/* if (exerciseRefs.favouritesBtn) {
  exerciseRefs.favouritesBtn.addEventListener('click', saveExerciseId);
} */

// Load and display exercise IDs when the page is loaded
window.onload = () => {
  displayExerciseIds();
};

export default saveExerciseId;
