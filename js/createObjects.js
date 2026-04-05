import { getRandomPositivInteger, getRandomArrayElement } from './utils.js';
import { MESSAGE, NAME, DESCRIPTION } from './data.js';
import { increaseByOne } from './utils.js';

/**
 * Эта функция увеличивает значение переменной counter на 1.
 * @param {number} min Значение с которого следует начать счетчик.
 * @param {number} max Не ограничено максимальным значением.
 * @returns {() => number} Функция-счетчик.
 */

/**
 * Эта функция выберет количество сообщений и выберет их содержание из массива MESSAGE.
 * @returns Строку из двух или одного разных комментариев (работет с ограничением по количеству -2).
 */

/*
const choseMessage = function () {
  const messages = [
    getRandomArrayElement(MESSAGE),
    getRandomArrayElement(MESSAGE),
  ];

  const countMessage = getRandomPositivInteger(1, 2);

  if (countMessage === 1) {
    return messages[0];
  } else {
    while (messages[0] === messages[1]) {
      messages[1] = getRandomArrayElement(MESSAGE); // проверка на совпадение 2х случайных комментариев, елси совпали выбери новый
    }

    return `${messages[0]} ${messages[1]}`;
  }
};
*/

/**
 * Эта функция выберет количество сообщений и выберет их содержание из массива MESSAGE.
 * @param {*} max Максимальное количество комментариев не ограничено (при вызове учитывать только количество элементов в массиве).
 * @returns Строку из всех разных комментариев (работет без ограничений по количеству).
 */

const choseMessage = function (max) {
  const messages = [];

  const countMessage = getRandomPositivInteger(1, max);
  for (let i = 0; i < countMessage; i++) {
    let message = getRandomArrayElement(MESSAGE);

    while (messages.some((mes) => mes === message)) {
      message = getRandomArrayElement(MESSAGE);
    }

    messages.push(message);
  }

  return messages.join(' ');
};

/**
 * Функция создает объект комментария
 * @param {() => number} countIdComment Функция, возвращающая id
 * @returns Объект комментария
 */
const createComment = function (countIdComment) {
  return {
    id: countIdComment(),
    avatar: `img/avatar-${getRandomPositivInteger(1, 6)}.svg`,
    message: choseMessage(2),
    name: getRandomArrayElement(NAME),
  };
};

/**
 * Функция собирает все объекты комментариев в массив
 * @param {() => number} countIdComment Функция, возвращающая id
 * @returns Массив из комментариев
 */
const generateComments = function (countIdComment) {
  const countComment = getRandomPositivInteger(0, 30);

  return Array.from({ length: countComment }, () =>
    createComment(countIdComment),
  );
};

/**
 * Функция создает объект публикации
 * @param {() => number} countUrl Функция, возвращающая число соответствующее url.
 * @param {() => number} countId Функция, возвращающая число соответствующее id.
 * @param {() => number} countIdComment Функция, возвращающая число соответствующее id комментария.
 * @returns Объект всей публикации
 */
const createObject = function (countUrl, countId, countIdComment) {
  return {
    id: countId(),
    url: `photos/${countUrl()}.jpg`,
    description: getRandomArrayElement(DESCRIPTION),
    likes: getRandomPositivInteger(15, 200),
    comments: generateComments(countIdComment),
  };
};

/**
 * Функция которая формирует массив из объектов публикаций
 * @returns Массив из публикаций.
 */
const generateObjects = function () {
  const countUrl = increaseByOne(0, 25);
  const countId = increaseByOne(0, 25);
  const countIdComment = increaseByOne(0);

  return Array.from({ length: 25 }, () =>
    createObject(countUrl, countId, countIdComment),
  );
};

generateObjects();

export { generateObjects };
