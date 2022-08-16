import { getSimilarAds } from './data.js';

let objectTemplate = '';
const mapCanvas = document.querySelector('#map-canvas');
const adsData = getSimilarAds();

const offerTypes = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const hideElement = (element) => {
  element.style = 'display: none;';
};

const isNull = (adsDataElement) => (!adsDataElement || 0 === adsDataElement.length);

const addSrc = (objectFragmentClass, adsDataElement) => {
  if (isNull(adsDataElement)) {
    hideElement(objectTemplate.querySelector(`${objectFragmentClass}`));
  } else {
    objectTemplate.querySelector(`${objectFragmentClass}`).src = adsDataElement;
  }
};

const getOfferTextContent = (objectFragmentClass, adsDataElement) => {
  if (isNull(adsDataElement)) {
    hideElement(objectTemplate.querySelector(`${objectFragmentClass}`));
  } else {
    objectTemplate.querySelector(`${objectFragmentClass}`).textContent = adsDataElement;
  }
};
const getOfferPriceContent = (adsDataElement) => {
  if (isNull(adsDataElement)) {
    hideElement(objectTemplate.querySelector('.popup__text--price'));
  } else {
    objectTemplate.querySelector('.popup__text--price').textContent = `${adsDataElement} ₽/ночь`;
  }
};

const getOfferTimeContent = (adsDataElement, adsDataElement1) => {
  if (isNull(adsDataElement) || isNull(adsDataElement1)) {
    hideElement(objectTemplate.querySelector('.popup__text--time'));
  } else {
    objectTemplate.querySelector('.popup__text--time').textContent = `Заезд после ${adsDataElement}, выезд до ${adsDataElement1}`;
  }
};

const getOfferCapacityContent = (adsDataElement, adsDataElement1) => {
  if (isNull(adsDataElement) || isNull(adsDataElement1)) {
    hideElement(objectTemplate.querySelector('.popup__text--capacity'));
  } else {
    objectTemplate.querySelector('.popup__text--capacity').textContent = `${adsDataElement} комнаты для ${adsDataElement1} гостей`;
  }
};

const getOfferFeatures = (features) => {
  const offerFeatures = objectTemplate.querySelector('.popup__features');
  offerFeatures.textContent = '';
  if (!isNull(features)) {
    features.forEach((feature) => {
      const li = document.createElement('li');
      li.classList.add('popup__feature', `popup__feature--${feature}`);
      offerFeatures.appendChild(li);
    });
  }
};

const getOfferPhotos = (photos) => {
  const offerPhoto = objectTemplate.querySelector('.popup__photos');
  offerPhoto.textContent = '';
  if (!isNull(photos)) {
    photos.forEach((photo) => {
      const img = document.createElement('img');
      img.classList.add('popup__photo');
      img.width = 45;
      img.width = 40;
      img.alt = 'Фотография жилья';
      img.src = photo;
      offerPhoto.appendChild(img);
    });
  }
};

const getPopup = (data) => {
  objectTemplate = document.querySelector('#card').content;
  addSrc('.popup__avatar', data.author.avatar);
  getOfferTextContent('.popup__title', data.offer.title);
  getOfferTextContent('.popup__text--address', data.offer.address);
  getOfferTextContent('.popup__description', data.offer.description);
  getOfferTextContent('.popup__type', offerTypes[data.offer.type]);
  getOfferPriceContent(data.offer.price);
  getOfferTimeContent(data.offer.checkin, data.offer.checkout);
  getOfferCapacityContent(data.offer.rooms, data.offer.guests);
  getOfferFeatures(data.offer.features);
  getOfferPhotos(data.offer.photos);


  mapCanvas.appendChild(objectTemplate);
};
export { getPopup, adsData };
