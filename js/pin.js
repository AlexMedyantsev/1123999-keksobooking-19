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
    var pinsArray = window.data.get();

    for (var i = 0; i < window.constants.AD_AMOUNT; i++) {
      var pin = generateMapPin(pinsArray[i]);
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

      if (currentX > 0 - 31 && currentX <= 1200 - 31 && currentY > 130 - 62 && currentY <= 630) {
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

  // var onPinDataLoaded = function (pins) {
  //   window.data.set(pins);
  //   renderAllMapPins();
  // };

  // var onPinDataLoadError = function (error) {
  //   // eslint-disable-next-line no-console
  //   console.log(error);
  // };

  var onPinDataLoaded = function (pins) {
    window.data.set(pins);
    renderAllMapPins();
  };

  var onPinDataLoadError = function () {
    // eslint-disable-next-line no-console
    console.log('Error 2');
  };

  window.pin = {
    generate: generateMapPin,
    render: renderAllMapPins,
    setHandlers: setPinHandlers,
    onDataLoaded: onPinDataLoaded,
    onDataLoadError: onPinDataLoadError,
  };
})();
