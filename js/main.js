import {getPopup} from './generate-similar-objects.js';
import { getSimilarAds } from './data.js';
const adsData = getSimilarAds();
getPopup(adsData[1]);
