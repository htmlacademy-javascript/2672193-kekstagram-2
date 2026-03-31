import { generateObjects } from './createObjects.js';

const miniaturesContainer = document.createDocumentFragment();

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture'); // шаблон с содержимым конкретно сразу <a>
const pictureContainer = document.querySelector('.pictures'); //нужно будет вставить последним элементом внутри этой секции
const miniaturesList = generateObjects(); // массив объектов из 25 публикаций случайных

/**
 * Цикл в котором каждый объект массива со случайными данными подставляется в шаблон. Результат добавляется в секцию с миниатюрами.
 */
miniaturesList.forEach((post) => { //post - текущий объект массива
  const pictureElement = pictureTemplate.cloneNode(true);
  // подставим данные в шаблон
  const img = pictureElement.querySelector('.picture__img');
  const likes = pictureElement.querySelector('.picture__likes');
  const comments = pictureElement.querySelector('.picture__comments');

  img.src = post.url;
  img.alt = post.description;
  likes.textContent = post.likes;
  comments.textContent = post.comments.length;

  miniaturesContainer.appendChild(pictureElement); // добавили сначала в Fragment
});
pictureContainer.appendChild(miniaturesContainer);
