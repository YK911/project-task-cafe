/* This file is used to avoid circular dipendency on imports
will include resources that are used in exercise cards that are sghared in home and favorites.
*/

// Function to save exercise ID to local storage
function saveExerciseId(id) {
  const exerciseId = id.trim();

  if (exerciseId) {
    const exercises = JSON.parse(localStorage.getItem('favorites')) || [];

    if (!exercises.includes(exerciseId)) {
      exercises.push(exerciseId);
      localStorage.setItem('favorites', JSON.stringify(exercises));
    }
  }
}

export default saveExerciseId;
