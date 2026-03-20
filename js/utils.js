// эта функция вернет число из диапозона а и b
const getRandomPositivInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomArrayElement = (elements) =>
  elements[getRandomPositivInteger(0, elements.length - 1)];

export {getRandomPositivInteger, getRandomArrayElement};
