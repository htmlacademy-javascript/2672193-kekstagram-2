import { isEscapeKey } from './utils.js';
import { sendData } from './api.js';

const overlay = document.querySelector('.img-upload__overlay'); // Форма редактирования изображения
const inputImg = document.querySelector('.img-upload__input'); // Форма загрузки изображения
const body = document.body; // Весь body
const buttonCancel = document.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');

const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');
const errorTemplate = document.querySelector('#error').content;
const successTemplate = document.querySelector('#success').content;
const submitButton = form.querySelector('.img-upload__submit');
/**
 * Открывет форму редактирования и модельное окно при загрузке файла.
 */
inputImg.addEventListener('change', () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onEsc); // При открытом окне если пользователь нажмет esc сработает обработчик.
});

/**
 * Закрывает форму редактирования и модельное окно при нажатии на крестик.
 */
buttonCancel.addEventListener('click', closeModal);

/**
 * Обработчик события esc. Запись такая потому что нам ее нужно вызывать выше.
 */
function onEsc(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.activeElement !== hashtagInput &&
      document.activeElement !== commentInput) {
      closeModal();
    }
  }
}
/**
 * Функция отвечающая за все действия при закрытии окна. Запись такая потому что нам ее нужно вызывать выше.
 */
function closeModal() {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEsc);
  form.reset();
  inputImg.value = '';
}


const pristine = new Pristine(form);

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
 * Обработчик отправки формы с условием (условия выше).
 */

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    const formData = new FormData(form);
    submitButton.disabled = true;
    sendData(formData)
      .then(() => {
        closeModal();
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

