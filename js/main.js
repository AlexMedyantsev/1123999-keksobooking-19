'use strict';

var OFFER_TITLES = ['Уютный дом с видом на сад', 'Стильная комната в лучшем районе города', 'Квартира рядом с метро', 'Сдается комната на 3 месяца', 'Квартира для семьи из трех человек', 'Комната с отдельной ванной', 'Комната с балконом и видом на парк', 'Дворец для пары без детей'];
var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_CHECKINS = ['12:00', '13:00', '14:00'];
var OFFER_CHECKOUTS = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_DESCRIPTIONS = ['A comfortable space that can accommodate up to 2 people. This apartment is 3mins from Shinjuku by train and also close to Shibuya ! It is a 6-minute walk from the nearest station of the apartment.The apartment is in a residential area so you can sleep peacefully and sleep at night.', 'We have permission for business as hotel, Japan visitors can legally stay* >3 metro stations nearby take you directly to the best Tokyo spots >Bus to Tokyo airports (Tokyo City Air Terminal) is a short walk distance >Neighborhood has traditional shops, pubs, restaurants for true local experience >Grocery&drug stores, ¥100 shops nearby to fill your shopping needs >Ideal for short stay, but we have had many satisfied long-term guests >Checkin until 12am, convenient in case of arrival by late flight', 'Tateishi Tokyo,Quaint Neighborhood around the Station. Many Bars still exist since right after the World War near the station. You can feel what Tokyo was like back in 1940s. Good access to Major spot (15mins-50mins )'];
var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var AD_AMOUNT = 8;

var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomStringFromArray = function (array) {
  return array[getRandomInteger(0, array.length - 1)];
};

var generateArrayOfStrings = function (array) {
  var resultArrayLength = getRandomInteger(1, array.length);
  var resultArray = [];

  var shuffledArray = shuffleArray(array);

  for (var i = 0; i < resultArrayLength; i++) {
    resultArray[i] = shuffledArray[i];
  }
};

var shuffleArray = function (array) {
  return array.sort(function () {
    return 0.5 - Math.random();
  });
};

var generateAd = function (amount) {
  var ad = [];
  for (var i = 0; i < amount; i++) {
    var location = {x: getRandomInteger(0, 1200), y: getRandomInteger(130, 630)};
    ad[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },

      'offer': {
        'title': getRandomStringFromArray(OFFER_TITLES),
        'address': location.x + ',' + location.y,
        'price': getRandomInteger(100, 2000),
        'type': getRandomStringFromArray(OFFER_TYPES),
        'rooms': getRandomInteger(1, 5),
        'guests': getRandomInteger(1, 5),
        'checkin': getRandomStringFromArray(OFFER_CHECKINS),
        'checkout': getRandomStringFromArray(OFFER_CHECKOUTS),
        'features': generateArrayOfStrings(OFFER_FEATURES),
        'description': getRandomStringFromArray(OFFER_DESCRIPTIONS),
        'photos': generateArrayOfStrings(OFFER_PHOTOS)
      },

      'location': {
        'x': location.x,
        'y': location.y
      }
    };
  }
  return ad;
};

var MAP = document.querySelector('.map');

var generatePin = function (pin) {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = pin.location.x - 25 + 'px';
  pinElement.style.top = pin.location.y - 70 + 'px';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;
  return pinElement;
};

var generatedAd = generateAd(AD_AMOUNT);
var fragment = document.createDocumentFragment();


for (var i = 0; i < AD_AMOUNT; i++) {
  fragment.appendChild(generatePin(generatedAd[i]));
}

MAP.appendChild(fragment);


