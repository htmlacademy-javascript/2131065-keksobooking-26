
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

const addSrc = (objectTemplate, objectFragmentClass, adsDataElement) => {
  if (isNull(adsDataElement)) {
    hideElement(objectTemplate.querySelector(objectFragmentClass));
  } else {
    objectTemplate.querySelector(objectFragmentClass).src = adsDataElement;
  }
};

const getOfferTextContent = (objectTemplate, objectFragmentClass, adsDataElement) => {
  const element = objectTemplate.querySelector(objectFragmentClass);
  if (isNull(adsDataElement)) {
    hideElement(element);
  } else {
    element.textContent = adsDataElement;
  }
};
const getOfferPriceContent = (objectTemplate, adsDataElement) => {
  if (isNull(adsDataElement)) {
    hideElement(objectTemplate.querySelector('.popup__text--price'));
  } else {
    objectTemplate.querySelector('.popup__text--price').textContent = `${adsDataElement} ₽/ночь`;
  }
};

const getOfferTimeContent = (objectTemplate, adsDataElement, adsDataElement1) => {
  if (isNull(adsDataElement) || isNull(adsDataElement1)) {
    hideElement(objectTemplate.querySelector('.popup__text--time'));
  } else {
    objectTemplate.querySelector('.popup__text--time').textContent = `Заезд после ${adsDataElement}, выезд до ${adsDataElement1}`;
  }
};

const getOfferCapacityContent = (objectTemplate, adsDataElement, adsDataElement1) => {
  if (isNull(adsDataElement) || isNull(adsDataElement1)) {
    hideElement(objectTemplate.querySelector('.popup__text--capacity'));
  } else {
    objectTemplate.querySelector('.popup__text--capacity').textContent = `${adsDataElement} комнаты для ${adsDataElement1} гостей`;
  }
};

const getOfferFeatures = (objectTemplate, features) => {
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

const getOfferPhotos = (objectTemplate, photos) => {
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
  const objectTemplate = document.querySelector('#card').content.querySelector('.popup');
  const popupElement = objectTemplate.cloneNode(true);
  addSrc(popupElement, '.popup__avatar', data.author.avatar);
  getOfferTextContent(popupElement, '.popup__title', data.offer.title);
  getOfferTextContent(popupElement, '.popup__text--address', data.offer.address);
  getOfferTextContent(popupElement, '.popup__description', data.offer.description);
  getOfferTextContent(popupElement, '.popup__type', offerTypes[data.offer.type]);
  getOfferPriceContent(popupElement, data.offer.price);
  getOfferTimeContent(popupElement, data.offer.checkin, data.offer.checkout);
  getOfferCapacityContent(popupElement, data.offer.rooms, data.offer.guests);
  getOfferFeatures(popupElement, data.offer.features);
  getOfferPhotos(popupElement, data.offer.photos);

  return popupElement;
};
export { getPopup };
