// текс комментария message, нужно взять 1 или 2 случайных из списка ниже
const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

// имя автора подставить случайное 1
const NAME = [
  'CrimsonDrifter',
  'Starlight Nomad',
  'Shadow Weaver',
  'Ironclad Soul',
  'Velvet Phantom',
  'Golden Horizon',
  'Silent Sentinel',
  'Mystic Bloom',
  'Frostbite Knight',
  'Ember Glow',
  'Lunar Tide',
  'Serpent Kiss',
  'Rune Master',
  'Obsidian Heart',
  'Whispering Wind',
  'Crimson Quill',
  'Starfall Guardian',
  'Emerald Shadow',
];

// строка — описание фотографии. Описание придумайте самостоятельно.
const DESCRIPTION = [
  'Просто момент, который захотелось сохранить',
  'Немного солнца, немного настроения',
  'Иногда лучшая подпись — это просто жить',
  'Кадры, в которых осталось настроение дня',
  'Маленький фрагмент большого дня',
  'В этот момент всё было именно так',
  'Оставлю это здесь, чтобы не забыть',
  'Когда настроение совпадает с погодой',
  'Просто ещё один хороший день',
  'Случайный кадр, но правильное настроение',
  'Иногда всё складывается само',
  'Настроение: повторить этот день ещё раз',
  'Поймал момент между «было» и «будет»',
  'Чуть-чуть атмосферы в ленту',
  'Иногда один кадр говорит больше слов',
];

// эта функция вернет число из диапозона а и b
const getRandomPositivInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomArrayElement = (elements) =>
  elements[getRandomPositivInteger(0, elements.length - 1)];

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
