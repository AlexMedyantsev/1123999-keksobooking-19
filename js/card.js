'use strict';

(function () {
  var getAdType = function (pinData) {
    switch (pinData.offer.type) {
      case 'flat': return 'Квартира';
      case 'bungalo': return 'Бунгало';
      case 'house': return 'Дом';
      case 'palace': return 'Дворец';
    }
    return pinData.offer.type;
  };

  var getRoomsAndGuests = function (pinData) {
    var roomsAndGuests = '';

    if (pinData.offer.rooms && pinData.offer.guests) {
      roomsAndGuests = pinData.offer.rooms + ' комнаты для ' + pinData.offer.guests + ' гостей';
    }
    return roomsAndGuests;
  };

  var getCheckinAndCheckoutTime = function (pinData) {
    var checkinAndCheckoutTime = '';

    if (pinData.offer.checkin && pinData.offer.checkout) {
      checkinAndCheckoutTime = 'Заезд после ' + pinData.offer.checkin + ', выезд до ' + pinData.offer.checkout;
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
  var generateOneMapCard = function (pinData) {
    var mapCardElement = window.constants.mapCardTemplate.cloneNode(true);

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

    hideEmptyTextElement(mapCardTitle, pinData.offer.title);
    hideEmptyTextElement(mapCardAddress, pinData.offer.address);
    hideEmptyTextElement(mapCardPrice, pinData.offer.price);
    hideEmptyTextElement(mapCardType, getAdType(pinData));
    hideEmptyTextElement(mapCardRoomsAndGuests, getRoomsAndGuests(pinData));
    hideEmptyTextElement(mapCardCheckinAndCheckouts, getCheckinAndCheckoutTime(pinData));

    if (pinData.offer.features.length > 0) {
      mapCardFeatures.innerHTML = '';
      for (var i = 0; i < pinData.offer.features.length; i++) {
        var featureElement = featureTemplate.cloneNode(false);
        featureElement.className = 'popup__feature popup__feature--' + pinData.offer.features[i];
        mapCardFeatures.appendChild(featureElement);
      }
    } else {
      mapCardFeatures.classList.add('hidden');
    }

    hideEmptyTextElement(mapCardDescription, pinData.offer.description);

    mapCardPhotos.innerHTML = '';
    if (pinData.offer.photos.length > 0) {
      for (var j = 0; j < pinData.offer.photos.length; j++) {
        var photoElement = photoTemplate.cloneNode(false);
        photoElement.setAttribute('src', pinData.offer.photos[j]);
        mapCardPhotos.appendChild(photoElement);
      }
    } else {
      mapCardPhotos.classList.add('hidden');
    }

    if (pinData.author.avatar) {
      mapCardAvatar.setAttribute('src', pinData.author.avatar);
    } else {
      mapCardAvatar.classList.add('hidden');
    }

    return mapCardElement;
  };

  var renderMapCard = function (card) {
    card.classList.remove('hidden');
    window.constants.mapPins.appendChild(card);
  };

  var openCard = function (pinData) {
    var mapCard = generateOneMapCard(pinData);
    renderMapCard(mapCard);
    var closeButton = mapCard.querySelector('.popup__close');
    closeButton.addEventListener('click', removeRenderedCard);
    document.addEventListener('keydown', onEscapePress);
  };

  var onEscapePress = function (evt) {
    if (evt.keyCode === window.constants.ESC_KEYCODE) {
      removeRenderedCard();
    }
  };

  var removeRenderedCard = function () {
    var mapCard = window.constants.map.querySelector('.map__card');
    var mapPinsList = document.querySelectorAll('.map__pin');

    if (mapCard) {
      mapCard.remove();
      document.removeEventListener('keydown', onEscapePress);
      mapPinsList.forEach(function (element) {
        element.classList.remove('map__pin--active');
      });
    }
  };

  window.card = {
    open: openCard,
    remove: removeRenderedCard,
  };
})();
