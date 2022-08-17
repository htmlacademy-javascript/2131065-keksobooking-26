const adForm = document.querySelector('.ad-form');

const FormStates = {
  Enable: true,
  Disable: false,
};

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

export { changeFormState, FormStates };
