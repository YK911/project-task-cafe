import axios from 'axios';

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
  selectedFilter: null,
  selectedCategory: null,
  keyword: '',
  currentPage: 1,
  totalPages: 1,
  isMobile: () => window.innerWidth < 768,
  selectFilter(filter) {
    this.selectedFilter = filter;
    this.selectedCategory = null;
    this.page = 1;
  },
  selectCategory(category) {
    this.selectedCategory = category;
    this.page = 1;
  },
  setKeyword(keyword) {
    this.keyword = keyword;
    this.page = 1;
  },
  async getRequestResults(apiUrl, options) {
    const { data } = await axios.get(apiUrl, options);
    this.totalPages = data.totalPages;
    return data.results;
  },
  async getCategories() {
    const params = {
      filter: this.selectedFilter.name,
      page: this.currentPage,
      limit: this.isMobile() ? 9 : 12,
    };

    return this.getRequestResults(
      'https://your-energy.b.goit.study/api/filters',
      { params },
    );
  },
  async getExercises() {
    const params = {
      page: this.currentPage,
      limit: this.isMobile() ? 8 : 10,
    };

    params[this.selectedFilter.value] = this.selectedCategory.name;

    if (this.keyword) {
      params.keyword = this.keyword;
    }

    return this.getRequestResults(
      'https://your-energy.b.goit.study/api/exercises',
      { params },
    );
  },
};
