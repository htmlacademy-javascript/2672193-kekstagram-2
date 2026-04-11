import './utils.js';
import './validation.js';
import './filters.js';
import { renderMiniatures } from './widgetMiniatures.js';
import { getPictures } from './api.js';
import { setPictures } from './imageModal.js';

getPictures()
  .then((pictures) => {
    setPictures(pictures);
    renderMiniatures(pictures);
  })
  .catch((err) => {
    const errorElement = document.createElement('p');
    errorElement.textContent = err.message;
    document.body.appendChild(errorElement);
  });
