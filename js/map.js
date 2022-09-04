import { getPopup } from './generate-similar-objects.js';
import { changeFormState, FormStates, adForm } from './form.js';

const ADS_NUMBER = 4;

const MARKER_COORDINATES = {
  lat: 35.710,
  lng: 139.810,
};
const MAP_COORDINATES = {
  lat: 35.71029,
  lng: 139.81067,
};
const MAP_ZOOM = 12;
let map = undefined;
const markerGroup = L.layerGroup();
const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', },
);


const locationAddress = document.querySelector('#address');

const getMap = () => {
  if (!map) {
    map = L.map('map-canvas')
      .setView(MAP_COORDINATES, MAP_ZOOM);
  }
  return map;
};

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
const secondaryPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainMarker = L.marker(
  MARKER_COORDINATES,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainMarker.on('moveend', (evt) => {
  const locationAddressValues = evt.target.getLatLng();
  locationAddress.value = `${locationAddressValues.lat.toFixed(5)}, ${locationAddressValues.lng.toFixed(5)}`;
});
const setAdMarkers = (ads) => {
  ads.forEach((element) => {
    const marker = L.marker(
      {
        lat: element.location.lat,
        lng: element.location.lng,
      },
      {
        icon: secondaryPinIcon,
      },
    );
    marker.addTo(markerGroup).bindPopup(() => getPopup(element));
  });
};

const resetMap = (ads) => {
  getMap().setView(MAP_COORDINATES, MAP_ZOOM);
  markerGroup.closePopup();
  markerGroup.clearLayers();
  setAdMarkers(ads);
};

const initMap = (ads) => {
  getMap();
  ads = ads.slice(0, ADS_NUMBER);
  resetMap(ads);
  tileLayer.addTo(map);
  mainMarker.addTo(map);
  markerGroup.addTo(map);
  changeFormState(FormStates.Enable);
  adForm.addEventListener('reset', () => resetMap(ads));
};

export { initMap, resetMap };
