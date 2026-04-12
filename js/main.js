import './utils.js';
import './validation.js';
import './filters.js';
import { renderMiniatures } from './widgetMiniatures.js';
import { getPictures } from './api.js';
import { setPictures } from './imageModal.js';

//** Обработка данных с сервера */
getPictures()
  .then((pictures) => {
    setPictures(pictures);
    renderMiniatures(pictures);
  })
  .catch(() => {
    showDataErrorMessage();
  });

function showDataErrorMessage() {
  const dataErrorTemplate = document.querySelector('#data-error').content;
  const dataErrorMessage = dataErrorTemplate.cloneNode(true);

  document.body.append(dataErrorMessage);

  setTimeout(() => {
    const dataErrorElement = document.querySelector('.data-error');

    if (dataErrorElement) {
      dataErrorElement.remove();
    }
  }, 5000);
}
