import { changeFormState, FormStates } from './form.js';
import { getSimilarAds } from './data.js';
import { getPopup } from './generate-similar-objects.js';


const locationAddress = document.querySelector('#address');

const map = L.map('map-canvas')
  .on('load', () => {
    changeFormState(FormStates.Enable);
  })
  .setView({
    lat: 35.71029782997218,
    lng: 139.81067892339962,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker(
  {
    lat: 35.710,
    lng: 139.810,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainMarker.addTo(map);
mainMarker.on('moveend', (evt) => {
  const locationAddressValues = evt.target.getLatLng();
  locationAddress.value = `${locationAddressValues.lat.toFixed(5)}, ${locationAddressValues.lng.toFixed(5)}`;
});


const points = [
  {
    lat: getSimilarAds()[1].location.lat,
    lng: getSimilarAds()[1].location.lng,
  },
  {
    lat: getSimilarAds()[1].location.lat,
    lng: getSimilarAds()[1].location.lng,
  },
  {
    lat: getSimilarAds()[1].location.lat,
    lng: getSimilarAds()[1].location.lng,
  },
  {
    lat: getSimilarAds()[1].location.lat,
    lng: getSimilarAds()[1].location.lng,
  },
];

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

points.forEach(({ lat, lng }) => {
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  marker
    .addTo(map)
    .bindPopup(getPopup(getSimilarAds()[1]));
});

const getMap = () => map;
export {getMap};
