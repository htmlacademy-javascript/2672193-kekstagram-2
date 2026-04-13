import { isEscapeKey } from './utils.js';
import { sendData } from './api.js';
import { resetEditorState } from './filters.js';

// Элементы формы загрузки изображения
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadInput = document.querySelector('.img-upload__input');
const body = document.body;
const closeButton = document.querySelector('.img-upload__cancel');
const uploadForm = document.querySelector('.img-upload__form');
// Поля ввода
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');
// Шаблоны сообщений
const errorTemplate = document.querySelector('#error').content;
const successTemplate = document.querySelector('#success').content;
// Кнопка отправки
const submitButton = uploadForm.querySelector('.img-upload__submit');

/**
 * Открывет форму редактирования и модельное окно при загрузке файла.
 */
uploadInput.addEventListener('change', () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onFormEsc);
});

/**
 * Закрывает форму редактирования и модельное окно при нажатии на крестик.
 */
closeButton.addEventListener('click', closeUploadModal);

// Так как появился второй обработчик на esc нужна дополнительная проверка на что сработает обработчик на модальное окно или сообщение ошибки/успеха.
function isMessageOpen() {
  return document.querySelector('.error') || document.querySelector('.success');
}

/**
 * Обработчик события esc.
 */
function onFormEsc(evt) {
  if (isEscapeKey(evt)) {
    if (isMessageOpen()) { // Так как появился второй обработчик на esc нужна дополнительная проверка на что сработает обработчик на модальное окно или сообщение ошибки/успеха.
      return;
    }
    evt.preventDefault();
    if (document.activeElement !== hashtagInput &&
      document.activeElement !== commentInput) {
      closeUploadModal();
    }
  }
}
/**
 * Полностью закрывает форму и сбрасывает фильтры, форму
 */
function closeUploadModal() {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onFormEsc);
  uploadForm.reset();
  resetEditorState();
  uploadInput.value = '';
}


const pristine = new Pristine(uploadForm);

/**
 * Условия по хэштегам.
 */
pristine.addValidator(
  hashtagInput,
  (value) => {
    if (!value.trim()) { // Проверка: поле необязательное.
      return true;
    }

    return getTags(value)
      .every((tag) => /^#[a-zа-яё0-9]{1,19}$/i.test(tag));
  },
  'Некорректный формат'
);

pristine.addValidator(hashtagInput,
  (value) => getTags(value).length <= 5,
  'Сократите количество хэштегов до 5');


pristine.addValidator(
  hashtagInput,
  (value) => {
    const tags = getTags(value)
      .map((tag) => tag.toLowerCase());

    return tags.length === new Set(tags).size;
  },
  'Удалите повторяющиеся хэштеги'
);

function getTags(value) {
  return value.split(/\s+/).filter(Boolean);
}

/**
 * Условия по комментариям.
 */
pristine.addValidator(
  commentInput,
  (value) => value.length <= 140,
  'Комментарий не может быть длиннее 140 символов'
);

/**
 * Обработчик отправки формы.
 */
uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    const formData = new FormData(uploadForm);
    submitButton.disabled = true;

    sendData(formData)
      .then(() => {
        closeUploadModal();
        showSuccessMessage();
        // по кнопке удаляем сообщение
      })
      .catch(() => {
        showErrorMessage();
      })
      .finally(() => {
        submitButton.disabled = false;
      });
  }
});

/**
 * Показывает сообщение об ошибке (закрывается 3мя способами).
 */
function showErrorMessage() {
  const errorMessage = errorTemplate.cloneNode(true);
  const errorElement = errorMessage.querySelector('.error');
  const errorButton = errorMessage.querySelector('.error__button');

  document.body.append(errorMessage);

  function closeErrorMessage() {
    errorElement.remove();
    document.removeEventListener('keydown', onEscError);
  }

  function onEscError(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeErrorMessage();
    }
  }

  document.addEventListener('keydown', onEscError);
  errorButton.addEventListener('click', closeErrorMessage);

  errorElement.addEventListener('click', (evt) => {
    if (evt.target === errorElement) {
      closeErrorMessage();
    }
  });
}

/**
 * Показывает сообщение об успешной отправке (закрывается 3мя способами).
 */
function showSuccessMessage() {
  const successMessage = successTemplate.cloneNode(true);
  const successElement = successMessage.querySelector('.success');
  const successButton = successMessage.querySelector('.success__button');

  document.body.append(successMessage);

  function closeSuccessMessage() {
    successElement.remove();
    document.removeEventListener('keydown', onEscSuccess);
  }

  function onEscSuccess(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeSuccessMessage();
    }
  }

  document.addEventListener('keydown', onEscSuccess);
  successButton.addEventListener('click', closeSuccessMessage);

  successElement.addEventListener('click', (evt) => {
    if (evt.target === successElement) {
      closeSuccessMessage();
    }
  });
}
