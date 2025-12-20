const BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';
const Routes = {
  GET_DATA: '/data',
  SEND_DATA: '/'
};

const Method = {
  GET: 'GET',
  POST: 'POST'
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить фотографии. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз'
};

const loadData = async () => {
  try {
    const response = await fetch(`${BASE_URL}${Routes.GET_DATA}`);

    if (!response.ok) {
      throw new Error(ErrorText.GET_DATA);
    }

    return await response.json();
  } catch (error) {
    throw new Error(ErrorText.GET_DATA);
  }
};

const sendData = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}${Routes.SEND_DATA}`, {
      method: Method.POST,
      body: formData
    });

    if (!response.ok) {
      throw new Error(ErrorText.SEND_DATA);
    }

    return await response.json();
  } catch (error) {
    throw new Error(ErrorText.SEND_DATA);
  }
};

export { loadData, sendData };
