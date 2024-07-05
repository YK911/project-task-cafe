import axios from 'axios';
import { showLoader, hideLoader } from './loader';

export default {
  filters: [
    {
      name: 'Muscles',
      value: 'muscles',
    },
    {
      name: 'Body parts',
      value: 'bodypart',
    },
    {
      name: 'Equipment',
      value: 'equipment',
    },
  ],
  selectedFilter: {
    name: 'Muscles',
    value: 'muscles',
  },
  currentPage: 1,
  totalPages: 1,
  isMobile: () => window.innerWidth < 768,
  async getRequestResults(apiUrl, options) {
    showLoader();
    const { data } = await axios.get(apiUrl, options);
    this.currentPage = parseInt(data.page, 10);
    this.totalPages = data.totalPages;
    hideLoader();
    return data.results;
  },
  async getCategories(page = 1) {
    const params = {
      filter: this.selectedFilter.name,
      page,
      limit: this.isMobile() ? 9 : 12,
    };

    return this.getRequestResults(
      'https://your-energy.b.goit.study/api/filters',
      { params },
    );
  },
  async getExercises(category, page = 1) {
    const params = {
      page,
      limit: this.isMobile() ? 8 : 10,
    };

    params[this.selectedFilter.value] = category.name;

    return this.getRequestResults(
      'https://your-energy.b.goit.study/api/exercises',
      { params },
    );
  },
};
