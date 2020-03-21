'use strict';

(function () {
  var MAIN_PIN_LEFT_OFFSET = 34;
  var MAIN_PIN_RIGHT_OFFSET = 32;
  var MAIN_PIN_ACCESSED_AREA_BOTTOM = 64;
  var MAIN_PIN_ACCESSED_AREA_TOP = 565;

  var generateMapPin = function (pinData) {
    var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var mapPinElement = mapPinTemplate.cloneNode(true);

    mapPinElement.style.left = pinData.location.x - window.constants.MAP_PIN_WIDTH / 2 + 'px';
    mapPinElement.style.top = pinData.location.y - window.constants.MAP_PIN_HEIGHT + 'px';
    mapPinElement.querySelector('img').setAttribute('src', pinData.author.avatar);
    mapPinElement.querySelector('img').setAttribute('alt', pinData.offer.title);

    return mapPinElement;
  };

  var renderAllMapPins = function (pinData) {
    var fragment = document.createDocumentFragment();

    var pinsAmount = pinData.length < window.constants.AD_AMOUNT ? pinData.length : window.constants.AD_AMOUNT;

    for (var i = 0; i < pinsAmount; i++) {
      var pin = generateMapPin(pinData[i]);
      setPinHandlers(pin, pinData[i], window.card.open);
      fragment.appendChild(pin);
    }

    window.constants.mapPins.appendChild(fragment);
  };

  var setPinHandlers = function (pin, pinData, handler) {

    pin.addEventListener('click', function () {
      window.card.remove();
      var mapPinsList = document.querySelectorAll('.map__pin.map__pin--active');
      mapPinsList.forEach(function (element) {
        element.classList.remove('map__pin--active');
      });
      pin.classList.add('map__pin--active');
      handler(pinData);
    });

    pin.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.constants.ENTER_KEYCODE) {
        var mapPinsList = document.querySelectorAll('.map__pin.map__pin--active');
        window.card.remove();
        mapPinsList.forEach(function (element) {
          element.classList.remove('map__pin--active');
        });
        pin.classList.add('map__pin--active');
        handler(pinData);
      }
    });
  };

  window.constants.mainMapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };


      var currentX = window.constants.mainMapPin.offsetLeft - shift.x;
      var currentY = window.constants.mainMapPin.offsetTop - shift.y;

      if (currentX > 0 - MAIN_PIN_LEFT_OFFSET && currentX <= window.constants.map.offsetWidth - MAIN_PIN_RIGHT_OFFSET && currentY > MAIN_PIN_ACCESSED_AREA_BOTTOM && currentY <= MAIN_PIN_ACCESSED_AREA_TOP) {
        window.constants.mainMapPin.style.top = (window.constants.mainMapPin.offsetTop - shift.y) + 'px';
        window.constants.mainMapPin.style.left = (window.constants.mainMapPin.offsetLeft - shift.x) + 'px';
        window.utils.writeLocationInInput({
          'location': {
            'x': parseInt(currentX + (window.constants.mainMapPin.clientWidth / 2), 10),
            'y': parseInt(currentY + (window.constants.mainMapPin.clientHeight), 10)
          }
        }, window.constants.addressInput);
      }

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var onPinDataLoaded = function (offers) {
    window.data.set(offers);
    renderAllMapPins(offers);
  };

  var onMainPinClick = function (evt) {
    evt.stopPropagation();
    window.form.activate();
    window.loadData(window.pin.onDataLoaded, window.form.showLoadDataError);
    window.constants.mainMapPin.removeEventListener('click', onMainPinClick);
  };

  var onMainPinClickAfterSubmit = function () {
    window.form.activate();
    renderAllMapPins(window.data.get());
    window.constants.mainMapPin.removeEventListener('click', onMainPinClickAfterSubmit);
  };

  window.constants.mainMapPin.addEventListener('click', onMainPinClick);

  var removeAllPins = function () {
    var allMapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < allMapPins.length; i++) {
      allMapPins[i].remove();
    }
  };

  window.pin = {
    generate: generateMapPin,
    render: renderAllMapPins,
    setHandlers: setPinHandlers,
    onDataLoaded: onPinDataLoaded,
    removeAll: removeAllPins,
    onMainClick: onMainPinClick,
    onMainClickAfterSubmit: onMainPinClickAfterSubmit,
  };
})();
