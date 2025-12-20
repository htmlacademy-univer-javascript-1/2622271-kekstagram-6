const RANDOM_PHOTOS_COUNT = 10;
const DEBOUNCE_DELAY = 500;

const filterButtons = document.querySelectorAll('.img-filters__button');
const filtersContainer = document.querySelector('.img-filters');
let currentFilter = 'default';
let photos = [];
let renderFunction = null;

const setActiveButton = (button) => {
  filterButtons.forEach((btn) => btn.classList.remove('img-filters__button--active'));
  button.classList.add('img-filters__button--active');
};

const getRandomPhotos = (items) => {
  const shuffled = [...items].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, RANDOM_PHOTOS_COUNT);
};

const getDiscussedPhotos = (items) => [...items].sort((a, b) => b.comments.length - a.comments.length);

const getFilteredPhotos = () => {
  switch (currentFilter) {
    case 'random':
      return getRandomPhotos(photos);
    case 'discussed':
      return getDiscussedPhotos(photos);
    default:
      return photos;
  }
};

const debounce = (callback, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

const renderFilteredPhotos = () => {
  const filteredPhotos = getFilteredPhotos();
  if (renderFunction) {
    renderFunction(filteredPhotos);
  }
};

const debouncedRender = debounce(renderFilteredPhotos, DEBOUNCE_DELAY);

const onFilterButtonClick = (evt) => {
  const button = evt.target;
  if (!button.classList.contains('img-filters__button')) {
    return;
  }

  const filterType = button.id.replace('filter-', '');
  if (filterType === currentFilter) {
    return;
  }

  currentFilter = filterType;
  setActiveButton(button);
  debouncedRender();
};

const initFilters = (loadedPhotos, renderCallback) => {
  photos = loadedPhotos;
  renderFunction = renderCallback;

  filtersContainer.classList.remove('img-filters--inactive');

  document.querySelector('.img-filters__form').addEventListener('click', onFilterButtonClick);
};

export { initFilters };
