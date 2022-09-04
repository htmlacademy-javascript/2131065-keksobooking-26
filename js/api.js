
const getData = (onSuccess, onError) => {
  fetch('https://26.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then((response) => response.json())
    .then(onSuccess)
    .catch((error) => {
      onError(`Ошибка загрузки данных с сервера <br><sub>(${error})</sub>`);
    });
};

const sendData = (formData, onError, onSuccess) => {
  fetch(
    'https://26.javascript.pages.academy/keksboking',
    {
      method: 'POST',
      body: formData,
    })

    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error();
    })

    .then((response) => response.json())
    .then(onSuccess)
    .catch(() => {
      onError();
    });
};

export { getData, sendData };
