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

const showErrorMessageTimer = (text) => {
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

const removeItem = (item) => {
  item.remove();
};

const closeMessage = (item) => {
  document.querySelector(item).onclick = function () {
    removeItem(document.querySelector(item));
  };
  window.onkeydown = (evt) => {
    if (evt.keyCode === 27) {
      removeItem(document.querySelector(item));
      window.onkeydown = null;
    }
  };
};

const showErrorMessageButton = () => {
  const errorMessageTemlpate = document.querySelector('#error').content;
  const errorMessage = errorMessageTemlpate.cloneNode(true);
  document.body.append(errorMessage);
  closeMessage('.error');
};

const showSuccessMessage = () => {
  const successMessageTemlpate = document.querySelector('#success').content;
  const successMessage = successMessageTemlpate.cloneNode(true);
  document.body.append(successMessage);
  closeMessage('.success');
  document.querySelector('.ad-form').reset();
  //resetMap();
};

export {
  getRandomValue,
  getRandomIntNumber,
  showSuccessMessage,
  getRandomFloatNumber,
  showErrorMessageTimer,
  showErrorMessageButton
};
