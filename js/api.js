// Запрос данных с сервера

const getPictures = () => fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error('Не удалось получить данные');
  });

const sendData = (body) => fetch('https://31.javascript.htmlacademy.pro/kekstagram/', {
  method: 'POST',
  body,
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Не удалось отправить данные');
    }
  });

export { getPictures, sendData };
