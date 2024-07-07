/* This file is used to avoid circular dipendency on imports
 *  It will include resources that are used in exercise cards that are sghared in home and favorites.
 */

import { FAVORITES_KEY } from './config';

// Function to save exercise details to local storage
function saveExerciseDetails(exercise) {
  console.log(exercise);

  // Extract the _id key from the object
  // eslint-disable-next-line no-underscore-dangle
  const objectId = exercise._id;
  console.log(objectId);

  // Get the existing array of objects from local storage
  const arrayOfFavorites =
    JSON.parse(localStorage.getItem(FAVORITES_KEY)) || {};

  // Add the new object to the array
  arrayOfFavorites[objectId] = exercise;

  // Convert the array back to JSON
  const jsonArray = JSON.stringify(arrayOfFavorites);
  console.log(jsonArray);

  // Save the updated array to local storage
  localStorage.setItem(FAVORITES_KEY, jsonArray);
}

// Function to delete exercise details from local storage
function deleteExerciseDetailsById(id) {
  // Retrieve the stored data from local storage
  const storedData = localStorage.getItem(FAVORITES_KEY);

  // Check if storedData exists
  if (!storedData) {
    console.log('No data found in local storage');
    return false;
  }

  // Parse the stored data to get the objects
  const parsedData = JSON.parse(storedData);

  // Check if the object with the given id exists
  if (!parsedData[id]) {
    console.log(`No object found for id: ${id}`);
    return false;
  }

  // Delete the object with the given id
  delete parsedData[id];

  // Save the updated data back to local storage
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(parsedData));

  return true;
}

export { saveExerciseDetails, deleteExerciseDetailsById };
