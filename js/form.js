import { initMap } from './map.js';
import { getData } from './api.js';
import { sendData } from './api.js';
import { showErrorMessageTimer, showSuccessMessage, showErrorMessageButton } from './tools.js';


const FormStates = {
  Enable: true,
  Disable: false,
};


const adForm = document.querySelector('.ad-form');
const sliderPrice = document.querySelector('.ad-form__slider');
const updateSliderPrice = document.querySelector('input#price');
const adFormElementTime = adForm.querySelector('.ad-form__element--time');
const housingType = adForm.querySelector('#type');
const housingPrice = adForm.querySelector('#price');
const roomNumber = adForm.querySelector('[name="rooms"]');
const capacity = adForm.querySelector('[name="capacity"]');
adFormElementTime.querySelector('#timein').addEventListener('change', timeSync);
adFormElementTime.querySelector('#timeout').addEventListener('change', timeSync);


function timeSync() {
  const other = document.querySelector(
    (this.id === 'timeout') ? '#timein' : '#timeout');
  other.value = this.value;
}

const changeFormState = (state) => {
  const allDisablingItems = document.querySelectorAll('fieldset, fieldset, .map__filters select');
  if (state === FormStates.Disable) {
    adForm.classList.add('ad-form--disabled');
  } else {
    adForm.classList.remove('ad-form--disabled');
  }
  allDisablingItems.forEach((element) => {
    if (state === FormStates.Disable) {
      element.disabled = true;
    } else {
      element.disabled = false;
    }
  });
};

changeFormState(FormStates.Disable);

housingType.addEventListener('change', () => {
  if (housingType.value === 'flat') {
    housingPrice.min = 1000;
  } if (housingType.value === 'hotel') {
    housingPrice.min = 3000;
  } if (housingType.value === 'house') {
    housingPrice.min = 5000;
  } if (housingType.value === 'palace') {
    housingPrice.min = 10000;
  } if (housingType.value === 'bungalow') {
    housingPrice.min = 0;
  }
  housingPrice.value = '';
  housingPrice.placeholder = `от ${housingPrice.min} ₽`;
  housingPrice.dataset.pristineMinMessage = `Цена не может быть меньше ${housingPrice.min} ₽`;
});

const validatePrice = () => housingPrice.value > housingPrice.min - 1;

noUiSlider.create(sliderPrice, {
  range: {
    'min': 0,
    'max': 100000
  },
  start: 0,
  step: 500,
});

sliderPrice.noUiSlider.on('update', (values, handle) => {
  updateSliderPrice.value = values[handle];
});

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});


const capacityOptions = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0']
};

const validateCapacity = () => capacityOptions[roomNumber.value].includes(capacity.value);

const errorText = () => {
  if (roomNumber.value === '1') {
    return `${roomNumber.value} комната подходит только для 1 гостя`;
  } if (roomNumber.value === '2') {
    return `${roomNumber.value} комнаты подходят только для 1 или 2 гостей`;
  } if (roomNumber.value === '3') {
    return `${roomNumber.value} комнаты подходят только для 1, 2 или 3 гостей`;
  } else {
    return `${roomNumber.value} комнат не для гостей`;
  }
};
pristine.addValidator(roomNumber, validateCapacity, errorText);
pristine.addValidator(capacity, validateCapacity, errorText);
pristine.addValidator(housingPrice, validatePrice, 'Проверьте цену');


adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    const formData = new FormData(evt.target);
    sendData(formData, showErrorMessageButton, showSuccessMessage);
    getData(initMap, showErrorMessageTimer);
  }
});

export { changeFormState, FormStates, adForm };
