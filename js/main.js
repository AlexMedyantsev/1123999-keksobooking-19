'use strict';

var OFFER_TITLES = ['Уютный дом с видом на сад', 'Стильная комната в лучшем районе города', 'Квартира рядом с метро', 'Сдается комната на 3 месяца', 'Квартира для семьи из трех человек', 'Комната с отдельной ванной', 'Комната с балконом и видом на парк', 'Дворец для пары без детей'];
var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_CHECKINS = ['12:00', '13:00', '14:00'];
var OFFER_CHECKOUTS = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_DESCRIPTIONS = ['A comfortable space that can accommodate up to 2 people. This apartment is 3mins from Shinjuku by train and also close to Shibuya ! It is a 6-minute walk from the nearest station of the apartment.The apartment is in a residential area so you can sleep peacefully and sleep at night.', 'We have permission for business as hotel, Japan visitors can legally stay* >3 metro stations nearby take you directly to the best Tokyo spots >Bus to Tokyo airports (Tokyo City Air Terminal) is a short walk distance >Neighborhood has traditional shops, pubs, restaurants for true local experience >Grocery&drug stores, ¥100 shops nearby to fill your shopping needs >Ideal for short stay, but we have had many satisfied long-term guests >Checkin until 12am, convenient in case of arrival by late flight', 'Tateishi Tokyo,Quaint Neighborhood around the Station. Many Bars still exist since right after the World War near the station. You can feel what Tokyo was like back in 1940s. Good access to Major spot (15mins-50mins )'];
var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var AD_AMOUNT = 8;
var MAP = document.querySelector('.map');
// var PIN_WIDTH = 65;
// var PIN_HEIGHT = 65;


var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomStringFromArray = function (array) {
  return array[getRandomInteger(0, array.length - 1)];
};

var shuffleArray = function (array) {
  return array.sort(function () {
    return 0.5 - Math.random();
  });
};

var generateArrayOfStrings = function (array) {
  var resultArrayLength = getRandomInteger(1, array.length);
  var resultArray = [];

  var shuffledArray = shuffleArray(array);

  for (var i = 0; i < resultArrayLength; i++) {
    resultArray[i] = shuffledArray[i];
  }
  return resultArray;
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

var generateMapPin = function (ad) {
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPinElement = mapPinTemplate.cloneNode(true);

  mapPinElement.style.left = ad.location.x - 25 + 'px';
  mapPinElement.style.top = ad.location.y - 70 + 'px';
  mapPinElement.querySelector('img').src = ad.author.avatar;
  mapPinElement.querySelector('img').alt = ad.offer.title;

  return mapPinElement;
};

var generatedAd = generateAd(AD_AMOUNT);

var renderAllMapPins = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < AD_AMOUNT; i++) {
    fragment.appendChild(generateMapPin(generatedAd[i]));
  }

  MAP.appendChild(fragment);
};

var getAdType = function (ad) {
  switch (ad.offer.type) {
    case 'flat': return 'Квартира';
    case 'bungalo': return 'Бунгало';
    case 'house': return 'Дом';
    case 'palace': return 'Дворец';
  }
  return ad.offer.type;
};

var getRoomsAndGuests = function (ad) {
  var roomsAndGuests = '';

  if (ad.offer.rooms && ad.offer.guests) {
    roomsAndGuests = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  }
  return roomsAndGuests;
};

var getCheckinAndCheckoutTime = function (ad) {
  var checkinAndCheckoutTime = '';

  if (ad.offer.checkin && ad.offer.checkout) {
    checkinAndCheckoutTime = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  }
  return checkinAndCheckoutTime;
};

var hideEmptyTextElement = function (element, elementText) {
  if (elementText) {
    element.textContent = elementText;
  } else {
    element.classList.add('hidden');
  }
};

var generateOneMapCard = function (ad) {
  var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var mapCardElement = mapCardTemplate.cloneNode(true);

  var mapCardTitle = mapCardElement.querySelector('.popup__title');
  var mapCardAddress = mapCardElement.querySelector('.popup__text--address');
  var mapCardPrice = mapCardElement.querySelector('.popup__text--price');
  var mapCardType = mapCardElement.querySelector('.popup__type');
  var mapCardRoomsAndGuests = mapCardElement.querySelector('.popup__text--capacity');
  var mapCardCheckinAndCheckouts = mapCardElement.querySelector('.popup__text--time');
  var mapCardFeatures = mapCardElement.querySelector('.popup__features');
  var featureTemplate = mapCardFeatures.querySelector('li');
  var mapCardDescription = mapCardElement.querySelector('.popup__description');
  var mapCardPhotos = mapCardElement.querySelector('.popup__photos');
  var photoTemplate = mapCardPhotos.querySelector('img');
  var mapCardAvatar = mapCardElement.querySelector('.popup__avatar');

  hideEmptyTextElement(mapCardTitle, ad.offer.title);
  hideEmptyTextElement(mapCardAddress, ad.offer.address);
  hideEmptyTextElement(mapCardPrice, ad.offer.price);
  hideEmptyTextElement(mapCardType, getAdType(ad));
  hideEmptyTextElement(mapCardRoomsAndGuests, getRoomsAndGuests(ad));
  hideEmptyTextElement(mapCardCheckinAndCheckouts, getCheckinAndCheckoutTime(ad));

  if (ad.offer.features.length > 0) {
    mapCardFeatures.innerHTML = '';
    for (var i = 0; i < ad.offer.features.length; i++) {
      var featureElement = featureTemplate.cloneNode(false);
      featureElement.className = 'popup__feature popup__feature--' + ad.offer.features[i];
      mapCardFeatures.appendChild(featureElement);
    }
  } else {
    mapCardFeatures.classList.add('hidden');
  }

  hideEmptyTextElement(mapCardDescription, ad.offer.description);


  if (ad.offer.photos.length > 0) {
    mapCardPhotos.innerHTML = '';
    for (var j = 0; j < ad.offer.photos.length; j++) {
      var photoElement = photoTemplate.cloneNode(false);
      photoElement.setAttribute('src', ad.offer.photos[j]);
      mapCardPhotos.appendChild(photoElement);
    }
  } else {
    mapCardPhotos.classList.add('hidden');
  }

  if (ad.author.avatar) {
    mapCardAvatar.setAttribute('src', ad.author.avatar);
  } else {
    mapCardAvatar.classList.add('hidden');
  }

  return mapCardElement;
};

// Модуль 4.

// Главная метка на карте
var mainMapPin = document.querySelector('.map__pin--main');

var mapFiltersForm = document.querySelector('.map__filters');
var adForm = document.querySelector('.ad-form');

var disableForm = function (form) {
  var formElements = form.elements;

  for (var i = 0; i < form.length; i++) {
    formElements[i].disabled = true;
  }
};

var enableForm = function (form) {
  var formElements = form.elements;

  for (var i = 0; i < form.length; i++) {
    formElements[i].disabled = false;
  }
};

var fadeInMap = function () {
  MAP.classList.remove('map--faded');
};

var fadeInForm = function () {
  adForm.classList.remove('ad-form--disabled');
};

disableForm(mapFiltersForm);
disableForm(adForm);

var getElementLocation = function (element) {
  var locationCoordinates = {
    'location': {
      'x': parseInt(element.offsetLeft + (element.clientWidth / 2), 10),
      'y': parseInt(element.offsetTop + (element.clientHeight / 2), 10)
    }
  };

  return locationCoordinates;
};


var getPinMiddleBottomPosition = function (sharpPin) {
  var sharpPinLocationCoordinates = {
    'location': {
      'x': parseInt(sharpPin.offsetLeft + (sharpPin.clientWidth / 2), 10),
      'y': parseInt(sharpPin.offsetTop - (sharpPin.clientHeight), 10)
    }
  };

  return sharpPinLocationCoordinates;
};

var inputAddress = adForm.querySelector('#address');
var mainMapPinLocation = getElementLocation(mainMapPin);
var sharpPinLocation = getPinMiddleBottomPosition(mainMapPin);

var writeLocationInInput = function (elementLocation, input) {
  input.value = elementLocation.location.x + ', ' + elementLocation.location.y;
};


writeLocationInInput(mainMapPinLocation, inputAddress);

var activatePage = function () {
  generateOneMapCard(generatedAd[0]);
  MAP.appendChild(generateOneMapCard(generatedAd[0]));
  enableForm(adForm);
  enableForm(mapFiltersForm);
  fadeInMap();
  fadeInForm();
  writeLocationInInput(sharpPinLocation, inputAddress);
  // inputAddress.value = (Math.floor(MAP_WIDTH / 2)) + ', ' + (Math.floor(MAP_HEIGHT / 2 - PIN_HEIGHT));
  renderAllMapPins();
};

var roomNumberInput = adForm.querySelector('#room_number');
var capacityInput = adForm.querySelector('#capacity');

mainMapPin.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    activatePage();
  }
});

mainMapPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    activatePage();
  }
});

function validateRoomAndGuestsSelects() {
  var rooms = parseInt(roomNumberInput.value, 10);
  var guests = parseInt(capacityInput.value, 10);
  if (guests > rooms) {
    roomNumberInput.setCustomValidity('Нужно больше комнат');
  } else {
    roomNumberInput.setCustomValidity('');
  }
}

roomNumberInput.addEventListener('change', function () {
  validateRoomAndGuestsSelects();
});

capacityInput.addEventListener('change', function () {
  validateRoomAndGuestsSelects();
});

validateRoomAndGuestsSelects();
