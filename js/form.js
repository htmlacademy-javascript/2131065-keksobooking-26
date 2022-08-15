const setFormDisabled = (state) => {

  const adForm = document.querySelector('.ad-form');
  const adFormsFieldset = document.querySelectorAll('fieldset');
  const mapFilters = document.querySelectorAll('.map__filters select');
  const allDisablingItems = [...mapFilters, ...adFormsFieldset];
  if (state) {
    adForm.classList.add('ad-form--disabled');
  }
  allDisablingItems.forEach((element) => {
    element.disabled = state;
  });
};

export { setFormDisabled };
