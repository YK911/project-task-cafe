import axios from 'axios';
import onExerciseClick from './modals';

import { FAVORITES_KEY } from './config';

async function getExerciseById(id) {
  const response = await axios.get(
    `https://your-energy.b.goit.study/api/exercises/${id}`,
  );

  return response.data;
}

async function getExerciseDetailsById(key) {
  // Retrieve the stored data from local storage
  const storedData = localStorage.getItem(FAVORITES_KEY);

  // Check if storedData exists
  if (!storedData) {
    console.log('No data found in local storage');
    return null;
  }

  // Parse the stored data to get the objects
  const parsedData = JSON.parse(storedData);

  // Retrieve the object by the specified key
  const retrievedObject = parsedData[key];

  // Check if the object exists for the given key
  if (!retrievedObject) {
    console.log(`No object found for key: ${key}`);
    return null;
  }

  return retrievedObject;
}

function buildExcerciseCardDetails(exercise) {
  const templateName = '#excercise-card-detail-template';
  const details = [];

  const cals = document.querySelector(templateName).content.cloneNode(true);
  cals.querySelector('.card-details-title').textContent = 'Burned Calories:';
  cals.querySelector('.card-details-value').textContent =
    `${exercise.burnedCalories} / ${exercise.time} min`;
  details.push(cals);

  const bodyPart = document.querySelector(templateName).content.cloneNode(true);
  bodyPart.querySelector('.card-details-title').textContent = 'Body Part:';
  bodyPart.querySelector('.card-details-value').textContent =
    exercise.bodyPart[0].toUpperCase() + exercise.bodyPart.slice(1);
  details.push(bodyPart);

  const target = document.querySelector(templateName).content.cloneNode(true);
  target.querySelector('.card-details-title').textContent = 'Target:';
  target.querySelector('.card-details-value').textContent =
    exercise.target[0].toUpperCase() + exercise.target.slice(1);
  details.push(target);

  return details;
}

function buildExerciseCard(exercise) {
  // console.log(exercise);
  const templateName = '#excercise-card-template';

  const card = document.querySelector(templateName).content.cloneNode(true);

  const id = '_id';

  card.children[0].dataset.id = exercise[id];

  // .card-category
  card.querySelector('.card-category').textContent = exercise.bodyPart;

  // .rating-value
  card.querySelector('.rating-value').textContent = exercise.rating.toFixed(1);

  // .start-button
  const startButton = card.querySelector('.start-button');
  startButton.addEventListener('click', (event) => {
    event.preventDefault();
    onExerciseClick(exercise[id]);
  });

  // .card-title
  card.querySelector('.card-title').textContent =
    exercise.name[0].toUpperCase() + exercise.name.slice(1);

  // .card-details-list
  const detailsContainer = card.querySelector('.card-details-list');

  buildExcerciseCardDetails(exercise).forEach((detail) => {
    detailsContainer.append(detail);
  });

  return card;
}

export {
  getExerciseById,
  getExerciseDetailsById,
  buildExerciseCard,
  buildExcerciseCardDetails,
};
