'use strict';

(function () {
  var generateMapPin = function (ad) {
    var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var mapPinElement = mapPinTemplate.cloneNode(true);

    mapPinElement.style.left = ad.location.x - 25 + 'px';
    mapPinElement.style.top = ad.location.y - 70 + 'px';
    mapPinElement.querySelector('img').src = ad.author.avatar;
    mapPinElement.querySelector('img').alt = ad.offer.title;

    return mapPinElement;
  };

  var renderAllMapPins = function () {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.constants.AD_AMOUNT; i++) {
      var pin = generateMapPin(window.data.generatedAd[i]);
      window.pin.setHandlers(pin, i, window.card.open);
      fragment.appendChild(pin);
    }

    window.constants.MAP_PINS.appendChild(fragment);
  };

  var setPinHandlers = function (pin, index, handler) {
    pin.addEventListener('click', function () {
      var mapPinsList = document.querySelectorAll('.map__pin');
      mapPinsList.forEach(function (element) {
        element.classList.remove('map__pin--active');
      });
      pin.classList.add('map__pin--active');
      handler(index);
    });
    pin.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 13) {
        handler(index);
      }
    });
  };

  window.pin = {
    generate: generateMapPin,
    render: renderAllMapPins,
    setHandlers: setPinHandlers,
  };
})();
