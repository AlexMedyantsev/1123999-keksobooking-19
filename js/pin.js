'use strict';

(function () {
  var MainPinLeftOffset = 34;
  var MainPinRightOffset = 32;
  var mainPinAccessedAreaTop = 64;
  var mainPinAccessedAreaBottom = 565;

  var generateMapPin = function (ad) {
    var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var mapPinElement = mapPinTemplate.cloneNode(true);

    mapPinElement.style.left = ad.location.x - window.constants.MAP_PIN_WIDTH / 2 + 'px';
    mapPinElement.style.top = ad.location.y - window.constants.MAP_PIN_HEIGHT + 'px';
    mapPinElement.querySelector('img').src = ad.author.avatar;
    mapPinElement.querySelector('img').alt = ad.offer.title;

    return mapPinElement;
  };

  var renderAllMapPins = function (pinsArray) {
    var fragment = document.createDocumentFragment();

    var pinsAmount = pinsArray.length < window.constants.AD_AMOUNT ? pinsArray.length : window.constants.AD_AMOUNT;

    for (var i = 0; i < pinsAmount; i++) {
      var pin = generateMapPin(pinsArray[i]);
      setPinHandlers(pin, pinsArray[i], window.card.open);
      fragment.appendChild(pin);
    }

    window.constants.MAP_PINS.appendChild(fragment);
  };

  var setPinHandlers = function (pin, pinData, handler) {
    pin.addEventListener('click', function () {
      var mapPinsList = document.querySelectorAll('.map__pin');
      mapPinsList.forEach(function (element) {
        element.classList.remove('map__pin--active');
      });
      pin.classList.add('map__pin--active');
      handler(pinData);
    });
    pin.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 13) {
        handler(pinData);
      }
    });
  };

  window.constants.MAIN_MAP_PIN.addEventListener('mousedown', function (evt) {
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


      var currentX = window.constants.MAIN_MAP_PIN.offsetLeft - shift.x;
      var currentY = window.constants.MAIN_MAP_PIN.offsetTop - shift.y;

      if (currentX > 0 - MainPinLeftOffset && currentX <= window.constants.MAP.offsetWidth - MainPinRightOffset && currentY > mainPinAccessedAreaTop && currentY <= mainPinAccessedAreaBottom) {
        window.constants.MAIN_MAP_PIN.style.top = (window.constants.MAIN_MAP_PIN.offsetTop - shift.y) + 'px';
        window.constants.MAIN_MAP_PIN.style.left = (window.constants.MAIN_MAP_PIN.offsetLeft - shift.x) + 'px';
        window.utils.writeLocationInInput({
          'location': {
            'x': parseInt(currentX + (window.constants.MAIN_MAP_PIN.clientWidth / 2), 10),
            'y': parseInt(currentY + (window.constants.MAIN_MAP_PIN.clientHeight), 10)
          }
        }, window.constants.ADDRESS_INPUT);
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

  var onPinDataLoaded = function (pins) {
    window.form.activate();
    var ArrayWithOffer = pins.filter(function (element) {
      return element.offer;
    });
    window.data.set(ArrayWithOffer);
    renderAllMapPins(ArrayWithOffer);
  };

  var onMainPinClick = function () {
    window.constants.MAIN_MAP_PIN.addEventListener('click', function handler() {
      window.server.loadData(window.pin.onDataLoaded, function (){
      });
      window.constants.MAIN_MAP_PIN.removeEventListener('click', handler);
    });
  };

  onMainPinClick();

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
  };
})();
