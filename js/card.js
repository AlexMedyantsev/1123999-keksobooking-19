'use strict';

(function () {
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
    var mapCardElement = window.constants.MAP_CARD_TEMPLATE.cloneNode(true);

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

    mapCardPhotos.innerHTML = '';
    if (ad.offer.photos.length > 0) {
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

  var renderMapCard = function (card) {
    card.classList.remove('hidden');
    window.constants.MAP_PINS.appendChild(card);
  };

  var openCard = function (pinData) {
    var mapCard = generateOneMapCard(pinData);
    removeRenderedCard();
    renderMapCard(mapCard);
    // var closeButton = mapCard.querySelector('.popup_close');
    mapCard.addEventListener('click', removeRenderedCard);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        removeRenderedCard();
      }
    });
  };

  var removeRenderedCard = function () {
    var mapCard = window.constants.MAP.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
  };

  window.card = {
    open: openCard,
  };
})();
