import { getSimilarAds } from './data.js';
import {initMap} from './map.js';

const ads = getSimilarAds();
initMap(ads);
