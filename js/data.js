'use strict';

(function () {
  var OFFER_TITLES = ['Уютный дом с видом на сад', 'Стильная комната в лучшем районе города', 'Квартира рядом с метро', 'Сдается комната на 3 месяца', 'Квартира для семьи из трех человек', 'Комната с отдельной ванной', 'Комната с балконом и видом на парк', 'Дворец для пары без детей'];
  var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var OFFER_CHECKINS = ['12:00', '13:00', '14:00'];
  var OFFER_CHECKOUTS = ['12:00', '13:00', '14:00'];
  var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var OFFER_DESCRIPTIONS = ['A comfortable space that can accommodate up to 2 people. This apartment is 3mins from Shinjuku by train and also close to Shibuya ! It is a 6-minute walk from the nearest station of the apartment.The apartment is in a residential area so you can sleep peacefully and sleep at night.', 'We have permission for business as hotel, Japan visitors can legally stay* >3 metro stations nearby take you directly to the best Tokyo spots >Bus to Tokyo airports (Tokyo City Air Terminal) is a short walk distance >Neighborhood has traditional shops, pubs, restaurants for true local experience >Grocery&drug stores, ¥100 shops nearby to fill your shopping needs >Ideal for short stay, but we have had many satisfied long-term guests >Checkin until 12am, convenient in case of arrival by late flight', 'Tateishi Tokyo,Quaint Neighborhood around the Station. Many Bars still exist since right after the World War near the station. You can feel what Tokyo was like back in 1940s. Good access to Major spot (15mins-50mins )'];
  var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var generateAd = function (amount) {
    var ad = [];
    for (var i = 0; i < amount; i++) {
      var location = {x: window.utils.getRandomInteger(0, 1200), y: window.utils.getRandomInteger(130, 630)};
      ad[i] = {
        'author': {
          'avatar': 'img/avatars/user0' + (i + 1) + '.png'
        },

        'offer': {
          'title': window.utils.getRandomStringFromArray(OFFER_TITLES),
          'address': location.x + ',' + location.y,
          'price': window.utils.getRandomInteger(100, 2000),
          'type': window.utils.getRandomStringFromArray(OFFER_TYPES),
          'rooms': window.utils.getRandomInteger(1, 5),
          'guests': window.utils.getRandomInteger(1, 5),
          'checkin': window.utils.getRandomStringFromArray(OFFER_CHECKINS),
          'checkout': window.utils.getRandomStringFromArray(OFFER_CHECKOUTS),
          'features': window.utils.generateArrayOfStrings(OFFER_FEATURES),
          'description': window.utils.getRandomStringFromArray(OFFER_DESCRIPTIONS),
          'photos': window.utils.generateArrayOfStrings(OFFER_PHOTOS)
        },

        'location': {
          'x': location.x,
          'y': location.y
        }
      };
    }
    return ad;
  };

  window.data = {
    generatedAd: generateAd(window.constants.AD_AMOUNT),
  };
})();
