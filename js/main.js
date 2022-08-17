import {getPopup} from './generate-similar-objects.js';
import {changeFormState, FormStates} from './form.js';
import { getSimilarAds } from './data.js';

changeFormState(FormStates.Enable);


getPopup(getSimilarAds()[1]);
