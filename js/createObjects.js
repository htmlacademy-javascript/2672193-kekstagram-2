import {getRandomPositivInteger, getRandomArrayElement} from './utils.js';
import {MESSAGE, NAME, DESCRIPTION} from './data.js';


// эта функция увеличивает значение переменной counter на 1
const increasByOne = function (min, max) {
  let counter = min;

  return function () {
    if (max === undefined) {
      counter += 1;
    } else if (counter <= max) {
      counter += 1;
    }

    return counter;
  };
};

// эта функция выберет количество сообщений и выберет их содерждаие из массива MESSAGE
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

//Функция создает объект комментария
const createComment = function (countIdComment) {
  return {
    id: countIdComment(),
    avatar: `img/avatar-${getRandomPositivInteger(1, 6)}.svg`,
    message: choseMessage(),
    name: getRandomArrayElement(NAME),
  };
};

//Функция собирает все объекты комментариев в массив
const generateComments = function (countIdComment) {
  const countComment = getRandomPositivInteger(0, 30);

  return Array.from({ length: countComment }, () =>
    createComment(countIdComment),
  );
};

//Функция создает объект публикации
const createObject = function (countUrl, countId, countIdComment) {
  return {
    id: countId(),
    url: `photos/${countUrl()}.jpg`,
    description: getRandomArrayElement(DESCRIPTION),
    likes: getRandomPositivInteger(15, 200),
    comments: generateComments(countIdComment),
  };
};

// Функция которая формирует массив из объектов публикаций
const generateObjects = function () {
  const countUrl = increasByOne(0, 25);
  const countId = increasByOne(0, 25);
  const countIdComment = increasByOne(0);

  return Array.from({ length: 25 }, () =>
    createObject(countUrl, countId, countIdComment),
  );
};

generateObjects();

export { generateObjects };
