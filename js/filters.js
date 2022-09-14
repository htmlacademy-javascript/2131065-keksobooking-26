const filtersForm = document.querySelector('.map__filters');
const typeElement = filtersForm.querySelector('#housing-type');
// const priceElement = filtersForm.querySelector('#housing-price');
// const roomsElement = filtersForm.querySelector('#housing-rooms');
const guestsElement = filtersForm.querySelector('#housing-guests');
// const featuresElements = Array.from(filtersForm.querySelectorAll('.map__checkbox'));

const ADS_NUMBER = 10;

const changeFilterValue = (target, cb) => {
  target.addEventListener('change', () => {
    console.log('Call');
    cb();
  }
  );
};

const filterType = (ad) => {
  if (typeElement.value === ad.offer.type || typeElement.value === 'any') {
    return true;
  }
};

const filterAds = (ads) => {
  const filteredAds = [];
  for (const ad of ads) {
    const isFiltered = filterType(ad);
    if (isFiltered) {
      filteredAds.push(ad);
      if (filteredAds.length >= ADS_NUMBER) {
        break;
      }
    }
  }
  return filteredAds;
};

export { filterAds, changeFilterValue, typeElement, guestsElement };
