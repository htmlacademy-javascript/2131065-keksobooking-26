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


//Функцию взял здесь https://ru.stackoverflow.com/questions/919701/%D0%A1%D0%B8%D0%BD%D1%85%D1%80%D0%BE%D0%BD%D0%B8%D0%B7%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D1%82%D1%8C-select%D1%8B

function timeSync() {
  const other = document.querySelector(
    (this.id === 'timeout') ? '#timein' : '#timeout');
  other.value = this.value;
}

const changeFormState = (state) => {
  const allDisablingItems = document.querySelectorAll('fieldset, fieldset, .map__filters select');
  if (state === FormStates.Disable) {
    adForm.classList.add('ad-form--disabled');
  }
  allDisablingItems.forEach((element) => {
    if (state === FormStates.Disable) {
      element.disabled = true;
    }
  });
};


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
  pristine.validate();
});

export { changeFormState, FormStates };
