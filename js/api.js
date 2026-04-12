// запрос данных с сервера

const getPictures = () => fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('текст ошибки');
    }
  });

const sendData = (body) => fetch('https://31.javascript.htmlacademy.pro/kekstagram/',
  { method: 'POST',
    body
  })
  .then((response) => {
    if (response.ok) {
      return response;
    } else {
      throw new Error('текст ошибки');
    }
  });

export { getPictures, sendData };
