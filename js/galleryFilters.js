import { renderMiniatures } from './widgetMiniatures';
import { debounce } from './utils.js';

const imgFilters = document.querySelector('.img-filters');
const imgFiltersForm = document.querySelector('.img-filters__form');
const RANDOM_PHOTOS_COUNT = 10;

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
    if (!evt.target.closest('.img-filters__button')) {
      return;
    }
    const activeButton = document.querySelector('.img-filters__button--active');

    if (activeButton) {
      activeButton.classList.remove('img-filters__button--active');
    }
    const button = evt.target.closest('.img-filters__button');
    button.classList.add('img-filters__button--active');

    if (button.id === 'filter-default') {
      debouncedRenderMiniatures(pictures);
    } else if (button.id === 'filter-random') {
      debouncedRenderMiniatures(getRandomPictures(pictures));
    } else {
      debouncedRenderMiniatures(getDiscussedPictures(pictures));
    }
  }
  );
};

export { initializeFilters };
