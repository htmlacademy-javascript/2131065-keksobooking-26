import {getRandomFloatNumber, getRandomIntNumber, getRandomValue} from './tools.js';

const ADS_OFFER_NUMBER = 10;
const ADS_OFFER_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];
const ADS_OFFER_TITLES = [
  'Месторождение ураново-радиевых руд иллюстрирует шведский кандым.',
  'Ветеринарное свидетельство постоянно.',
  'Винный фестиваль проходит в приусадебном музее Георгикон.',
  'Визовая наклейка притягивает глубокий Дом-музей Риддера Шмидта (XVIII в.).',
  'Производство зерна и зернобобовых, несмотря на внешние воздействия, отражает белый саксаул.',
  'Растительность притягивает официальный язык.',
  'Храмовый комплекс, посвященный дилмунскому богу Енки.',
  'Архипелаг текстологически оформляет бесплатный Суэцкий перешеек.',
  'Провоз кошек и собак начинает ураган.',
  'Королевство волнообразно.',
  'В ресторане стоимость обслуживания (15%) включена в счет.',
  'Верховье последовательно притягивает заснеженный снежный покров.'
];
const ADS_OFFER_TIMES = [
  '12:00',
  '13:00',
  '14:00'
];

const ADS_OFFER_DESCRIPTION = [
  'Эстетика пространственно отражает горизонт ожидания. Королевство формирует шток. Архетип, по определению, аккумулирует глетчерный классический реализм.',
  'Процессы же, понимание которых имеет решающее значение для прогнозирования землетрясений, искусство монотонно связывает невротический Бенгальский залив.',
  'Флобер, описывая нервный припадок Эммы Бовари, переживает его сам: гармония исключительна.',
  'Батиаль, при том, что королевские полномочия находятся в руках исполнительной власти - кабинета министров, изящно покрывает официальный язык. Лакколит органичен.',
  'Грабен аккумулирует традиционный фабульный каркас. Если принять во внимание огромный вес Гималайев, эзотерическое инверсионно.',
  'Праздник франко-говорящего культурного сообщества существенно иллюстрирует оз. Центральная площадь, несмотря на то, что в воскресенье некоторые станции метро закрыты, возможна.',
  'Винный фестиваль проходит в приусадебном музее Георгикон, там же фабула разогревает монтаж.'
];

const ADS_OFFER_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];


const ADS_OFFER_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const similarAd = () => ({
  author: {
    avatar: `img/avatars/user0${getRandomIntNumber(1, 9 )}.png`,
  },
  offer: {
    title: getRandomValue(ADS_OFFER_TITLES),
    address: `${getRandomFloatNumber(35.65000, 35.70000, 5)}, ${getRandomFloatNumber(139.70000, 139.80000, 5)}`,
    price: getRandomIntNumber(10, 100),
    type: getRandomValue(ADS_OFFER_TYPES),
    rooms: getRandomIntNumber(1, 4),
    guests: getRandomIntNumber(1, 10),
    checkin: getRandomValue(ADS_OFFER_TIMES),
    checkout: getRandomValue(ADS_OFFER_TIMES),
    features: ADS_OFFER_FEATURES.slice(0, getRandomIntNumber(1, 5)),
    description: getRandomValue(ADS_OFFER_DESCRIPTION),
    photos: ADS_OFFER_PHOTOS.slice(0, getRandomIntNumber(1, 12)),
  },
  location: {
    lat: getRandomFloatNumber(35.65000, 35.70000, 5),
    lng: getRandomFloatNumber(139.70000, 139.80000, 5),
  }
});

const getSimilarAds = () => Array.from({ length: ADS_OFFER_NUMBER }, similarAd);

export { getSimilarAds };
