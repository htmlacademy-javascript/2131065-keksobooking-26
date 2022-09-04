//import { getSimilarAds } from './data.js';
import {initMap} from './map.js';
import {getData} from './api.js';
import {showErrorMessageTimer} from './tools.js';

getData(initMap, showErrorMessageTimer);
