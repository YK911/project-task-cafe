import axios from 'axios';

const FILTER_ITEM_CATEGORIES_URL =
  'https://your-energy.b.goit.study/api/filters';
const MOBILE_FILTER_ITEMS_QTY = 9;
const REST_DISPLAY_FITTER_ITEMS_QTY = 12;

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

  const result = await axios.get(FILTER_ITEM_CATEGORIES_URL, options);
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

document.addEventListener('DOMContentLoaded', () => {
  const filterItems = document.querySelectorAll('.exercises-filter-list li');

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
      const { totalPages = 0 } = filterItemCategories;

      console.log('filterItemCategories: ', filterItemCategories);
      console.log('totalPages: ', totalPages);
    });
  });
});
