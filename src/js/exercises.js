import axios from 'axios';
import {
  MOBILE_FILTER_ITEMS_QTY,
  REST_DISPLAY_FITTER_ITEMS_QTY,
} from './config';

import getExerciseCategoryNode from './exercise-category';

async function getFilterItemCategories(filter, page = 1, limit = 12) {
  const options = {
    params: {
      filter,
      page,
      limit,
    },
  };
  const stringifiedSearch = JSON.stringify(options);
  const storedValue = sessionStorage.getItem(stringifiedSearch);

  if (storedValue) {
    return JSON.parse(storedValue);
  }

  const result = await axios.get(
    'https://your-energy.b.goit.study/api/filters',
    options,
  );
  const { data } = result;

  if (data) {
    sessionStorage.setItem(stringifiedSearch, JSON.stringify(data));
  }

  return data;
}

async function getCategoryExercises(category, page = 1, limit = 12) {
  const options = {
    params: {
      limit,
      page,
    },
  };

  options.params[category.filter] = category.name;

  const stringifiedSearch = JSON.stringify(options);
  const storedValue = sessionStorage.getItem(stringifiedSearch);

  if (storedValue) {
    return JSON.parse(storedValue);
  }

  const result = await axios.get(
    'https://your-energy.b.goit.study/api/exercises',
    options,
  );
  const { data } = result;

  if (data) {
    sessionStorage.setItem(stringifiedSearch, JSON.stringify(data));
  }

  return data;
}

function getItemsPerPage() {
  const viewportWidth = window.innerWidth;

  if (viewportWidth <= 375) {
    return MOBILE_FILTER_ITEMS_QTY;
  }

  return REST_DISPLAY_FITTER_ITEMS_QTY;
}

function drawCategoriesList(containerSelector, categories) {
  const container = document.querySelector(containerSelector);

  if (!container) {
    console.log('Container not found');
    return;
  }

  container.innerHTML = '';
  const categoriesList = document.createElement('ul');

  categories.forEach((category) => {
    const categoryNode = getExerciseCategoryNode(category, async (c) => {
      const exercisesResponse = await getCategoryExercises(c);
      console.log(exercisesResponse.results);
    });
    const node = document.createElement('li');
    node.appendChild(categoryNode);
    categoriesList.appendChild(node);
  });

  container.appendChild(categoriesList);
}

document.addEventListener('DOMContentLoaded', async () => {
  const filterItems = document.querySelectorAll('.exercises-filter-list li');

  const initialFilter = filterItems[0]
    .querySelector('.exercises-filter-button')
    .textContent.trim();

  const initialCategories = await getFilterItemCategories(
    initialFilter,
    1,
    getItemsPerPage(),
  );

  drawCategoriesList('.exercises-categories', initialCategories.results);

  filterItems.forEach((item) => {
    item.addEventListener('click', async () => {
      filterItems.forEach((filterItem) => {
        filterItem.classList.remove('exercises-filter-item-active');
      });
      item.classList.add('exercises-filter-item-active');

      const buttonValue = item
        .querySelector('.exercises-filter-button')
        .textContent.trim();
      const currentPageNumber = Number(
        document.querySelector('.exercises-filter-current-page') || 1,
      );
      const itemsPerPage = getItemsPerPage();
      const filterItemCategories = await getFilterItemCategories(
        buttonValue,
        currentPageNumber,
        itemsPerPage,
      );

      drawCategoriesList('.exercises-categories', filterItemCategories.results);
    });
  });
});
