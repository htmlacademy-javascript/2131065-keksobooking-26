import { initMap } from './map.js';

const showErrorMessage = (text) => {
  const div = document.createElement('div');
  const divMessage = document.createElement('p');
  div.className = 'error fetch-error';
  divMessage.className = 'error__message';
  divMessage.innerHTML = text;
  div.append(divMessage);
  document.body.append(div);
  setTimeout(() => {
    div.remove();
  }, 2000);
};

const getData = () => {
  fetch('https://26.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then((response) => response.json())
    .then((ads) => {
      initMap(ads);
    }
    )
    .catch((error) => {
      showErrorMessage(`Ошибка загрузки данных с сервера <br><sub>(${error})</sub>`);
    });
};


export { getData };

