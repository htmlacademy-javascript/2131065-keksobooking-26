import { getSimilarAds } from './data.js';

const objectTemplate = document.querySelector('#card').content;
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

const isNull = (adsDataElement) => {
  if (adsDataElement === undefined || adsDataElement.includes('undefined')) {
    return true;
  }
};

let objectFragment = document.createDocumentFragment();

const getPopup = () => {
  adsData.forEach(({ author, offer }) => {
    objectFragment = objectTemplate.cloneNode(true);

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

    const getOfferType = (type) => offerTypes[type];

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
          img.alt = offer.description;
          img.src = photo;
          offerPhoto.appendChild(img);
        });
      }
    };

    addSrc('.popup__avatar', author.avatar);
    getOfferTextContent('.popup__title', offer.title);
    getOfferTextContent('.popup__text--address', offer.address);
    getOfferTextContent('.popup__description', offer.description);
    getOfferTextContent('.popup__type', getOfferType(offer.type));
    getOfferTextContent('.popup__text--price', `${offer.price} ₽/ночь`);
    getOfferTextContent('.popup__text--capacity', `${offer.rooms} комнаты для ${offer.guests} гостей`);
    getOfferTextContent('.popup__text--time', `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`);
    getOfferFeatures(offer.features);
    getOfferPhotos(offer.photos);
  });

  mapCanvas.appendChild(objectFragment);
};
export { getPopup };
