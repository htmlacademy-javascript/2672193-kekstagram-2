import { renderMiniatures } from './widgetMiniatures.js';
import { debounce } from './utils.js';

const RANDOM_PHOTOS_COUNT = 10;
const imgFilters = document.querySelector('.img-filters');
const imgFiltersForm = document.querySelector('.img-filters__form');

// Массив фотографий по умолчанию и есть изначальный массив (filter-default)
// Массива случайных фотографий (filter-random)
const getRandomPictures = (pictures) =>
  [...pictures]
    .sort(() => Math.random() - 0.5)
    .slice(0, RANDOM_PHOTOS_COUNT);

// Массив обсудаемых фотографий (filter-discussed)
const getDiscussedPictures = (pictures) =>
  [...pictures].sort((pictureA, pictureB) =>
    pictureB.comments.length - pictureA.comments.length
  );

const initializeFilters = (pictures) => {
  const debouncedRenderMiniatures = debounce(renderMiniatures, 500);

  imgFilters.classList.remove('img-filters--inactive');

  imgFiltersForm.addEventListener('click', (evt) => {
    const button = evt.target.closest('.img-filters__button');

    if (!button) {
      return;
    }

    evt.preventDefault();

    const activeButton = imgFiltersForm.querySelector('.img-filters__button--active');

    if (activeButton) {
      activeButton.classList.remove('img-filters__button--active');
    }

    button.classList.add('img-filters__button--active');

    if (button.id === 'filter-default') {
      debouncedRenderMiniatures(pictures);
    }

    if (button.id === 'filter-random') {
      debouncedRenderMiniatures(getRandomPictures(pictures));
    }

    if (button.id === 'filter-discussed') {
      debouncedRenderMiniatures(getDiscussedPictures(pictures));
    }
  });
};
export { initializeFilters };

