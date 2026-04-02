import { miniaturesList } from './widgetMiniatures.js';
import { isEscapeKey } from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const pictureContainer = document.querySelector('.pictures');
const closeButton = document.querySelector('.big-picture__cancel');

const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsShownCount = bigPicture.querySelector('.social__comment-shown-count');
const commentsTotalCount = bigPicture.querySelector('.social__comment-total-count');
const commentsList = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const commentsCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

/**
 * Функция которая создает один комментарий
 * Если не использовать деструктуризацию, то можно сначала обртаиться к объекту и затем уже отдельно доставать из него значения по ключам.
 * const createComment = (comment) => {
   const avatar = comment.avatar;
   const name = comment.name;
   const message = comment.message;
}
 * @param {*} Аватар (), имя (), содержимое ().
 * @returns Объект комментария.
 */

const createComment = ({ avatar, name, message }) => {
  // Создали элемент комментария
  const commentItem = document.createElement('li');
  commentItem.classList.add('social__comment');

  // Создали элемент аватарка для комментатора
  const commentAvatar = document.createElement('img');
  commentAvatar.classList.add('social__picture');
  commentAvatar.src = avatar;
  commentAvatar.alt = name;
  commentAvatar.width = 35;
  commentAvatar.height = 35;

  // Создали элемент текст комментария
  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = message;

  commentItem.append(commentAvatar, commentText);

  return commentItem;
};

/**
 * Заполняем список комментариями
 * @param {*} Комментарии ()
 */

const renderComments = (comments) => {
  commentsList.innerHTML = ''; // Очистили список перед тем как заполнять

  const commentsFragment = document.createDocumentFragment(); // Создали фрагмент куда сложим прежде чем отрисовывать.

  // Добавим в фрагмент все комментарии из массива комментариев.
  comments.forEach((comment) => {
    commentsFragment.append(createComment(comment));
  });

  commentsList.append(commentsFragment); // Отрисуем.
};

/**
 * Закрытое окно
 */
const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
};

/**
 * Событие нажатие клавиши esc
 * @param {*} evt
 */
function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

/**
 * Берет данные из миниатюры и подставляет их в большую картинку.
 * @param {*} post
 */
const openBigPicture = (post) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPictureImg.src = post.url;
  bigPictureImg.alt = post.description;
  likesCount.textContent = post.likes;
  commentsShownCount.textContent = post.comments.length;
  commentsTotalCount.textContent = post.comments.length;
  socialCaption.textContent = post.description;

  renderComments(post.comments);

  commentsCountBlock.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
};

/**
 *
 */
pictureContainer.addEventListener('click', (evt) => {
  const picture = evt.target.closest('.picture'); // Клик на элменте у которого у самого или у родителя есть .picture.
  // Делегируем потому что количество картинок может меняться + создавать обработчик на каждую картику не целесообразно.

  if (!picture) {
    return;
  }

  evt.preventDefault(); // Потому что ссылка

  const post = miniaturesList[picture.dataset.index];
  openBigPicture(post);
});

closeButton.addEventListener('click', closeBigPicture);

export { openBigPicture };
