const FormStates = {
  Enable: true,
  Disable: false,
};

const adForm = document.querySelector('.ad-form');
const sliderPrice = document.querySelector('.ad-form__slider');
const updateSliderPrice = document.querySelector('input#price');

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

noUiSlider.create(sliderPrice, {
  range: {
    'min': 1000,
    'max': 100000
  },
  start: 0,
  margin: 2,
  step: 1000,
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
  '1 комната': ['для 1 гостя'],
  '2 комнаты': ['для 2 гостей', 'для 1 гостя'],
  '3 комнаты': ['для 3 гостей', 'для 2 гостей', 'для 1 гостя'],
  '100 комнат': ['не для гостей']
};

const roomNumber = adForm.querySelector('[name="rooms"]');
const capacity = adForm.querySelector('[name="capacity"]');

function validateCapacity() {
  return capacityOptions[roomNumber.value].includes(capacity.value);
}


const errorText = () => {
  if (roomNumber.value === '1 комната') {
    return `${roomNumber.value} подходит только для 1 гостя`;
  } if (roomNumber.value === '2 комнаты') {
    return `${roomNumber.value} подходят для только 1 или 2 гостей`;
  } if (roomNumber.value === '3 комнаты') {
    return `${roomNumber.value} подходят для только 1, 2 или 3 гостей`;
  } else {
    return `${roomNumber.value} только не для гостей`;
  }
};

pristine.addValidator(roomNumber, validateCapacity, errorText);
pristine.addValidator(capacity, validateCapacity, errorText);


adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

export { changeFormState, FormStates };
