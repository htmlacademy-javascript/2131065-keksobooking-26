const adForm = document.querySelector('.ad-form');
const getRandomIntNumber = (min, max) => {
  if (min >= max) {
    throw Error(`Первое число диапазона должно быть меньше второго.\nВы ввели ${min} и ${max}`);
  }
  else if (min < 0) {
    throw Error(`Первое число диапазона не может быть меньше нуля.\nВы ввели ${min} и ${max}`);
  } else {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
};


const getRandomFloatNumber = (min, max, amount) => {
  if (min >= max) {
    throw Error(`Первое число диапазона должно быть меньше второго.\nВы ввели ${min} и ${max}`);
  }
  else if (min < 0) {
    throw Error(`Первое число диапазона не может быть меньше нуля.\nВы ввели ${min} и ${max}`);
  } else {
    const num = (Math.random() * (max - min) + min);
    return num.toFixed(amount);
  }
};

const getRandomValue = (value) => {
  const item = getRandomIntNumber(0, value.length - 1);
  return value[item];
};

const removeMessage = (item) => {
  const pressEsc = (evt) => {
    if (evt.key === 'Escape') {
      document.querySelector(item).remove();
      window.removeEventListener('keydown', pressEsc);
    }
  };
  document.querySelector(item).addEventListener('click', () => {
    document.querySelector(item).remove();
    window.removeEventListener('keydown', pressEsc);
  });
  window.addEventListener('keydown', pressEsc);
};
const refreshPage = () => {
  location.reload();
};

const showErrorMessageTimer = (text) => {
  const div = document.createElement('div');
  const divMessage = document.createElement('p');
  const divButton = document.createElement('button');
  divButton.textContent = 'Обновить страницу';
  div.className = 'error fetch-error';
  divMessage.className = 'error__message';
  divButton.className = 'error__button';
  divMessage.textContent = text;
  div.append(divMessage);
  div.append(divButton);
  document.body.append(div);
  divButton.addEventListener('click', refreshPage);
  removeMessage('.error');
};


const showErrorMessageButton = () => {
  const errorMessageTemlpate = document.querySelector('#error').content;
  const errorMessage = errorMessageTemlpate.cloneNode(true);
  document.body.append(errorMessage);
  removeMessage('.error');
};

const showSuccessMessage = () => {
  const successMessageTemlpate = document.querySelector('#success').content;
  const successMessage = successMessageTemlpate.cloneNode(true);
  document.body.append(successMessage);
  removeMessage('.success');
  adForm.reset();
};

export {
  getRandomValue,
  getRandomIntNumber,
  showSuccessMessage,
  getRandomFloatNumber,
  showErrorMessageTimer,
  showErrorMessageButton
};
