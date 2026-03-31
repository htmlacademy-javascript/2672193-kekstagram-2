/**
 * Эта функция вернет число из диапозона а и b
 * @param {*} a Минимальное значение интервала.
 * @param {*} b Максимальное значение интервала.
 * @returns Рандомное число из диапозона.
 */
const getRandomPositivInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

/**
 * Эта функция вернет число, которое будет соответствовать индексу элемента массива.
 * @param {*} elements Название массива, от куда будем брать элемент.
 * @returns Элементы из заданного массива.
 */
const getRandomArrayElement = (elements) =>
  elements[getRandomPositivInteger(0, elements.length - 1)];

export {getRandomPositivInteger, getRandomArrayElement};
