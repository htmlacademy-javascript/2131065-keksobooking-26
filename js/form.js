const FormStates = {
  Enable: true,
  Disable: false,
};

const changeFormState = (state) => {

  const adForm = document.querySelector('.ad-form');
  const allDisablingItems = document.querySelectorAll('fieldset, fieldset, .map__filters select');

  if (state === FormStates.Disable) {
    adForm.classList.add('ad-form--disabled');
  }
  allDisablingItems.forEach((element) => {
    element.disabled = state;
  });
};

export { changeFormState, FormStates };
