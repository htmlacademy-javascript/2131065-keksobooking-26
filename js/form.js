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

const housingType = adForm.querySelector('#type');
const housingPrice = adForm.querySelector('#price');
console.log(housingPrice, housingType);

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
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0']
};

const roomNumber = adForm.querySelector('[name="rooms"]');
const capacity = adForm.querySelector('[name="capacity"]');

function validateCapacity() {
  return capacityOptions[roomNumber.value].includes(capacity.value);
}


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


adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

export { changeFormState, FormStates };
