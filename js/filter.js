'use strict';

(function () {

  var filterPins = function (pin) {
    var a = houseTypeCheck(pin);
    var b = priceCheck(pin);
    var c = roomsAmountCheck(pin);
    var d = guestsAmountCheck(pin);
    var e = featureCheck(window.constants.MAP_FILTER_WIFI, pin);
    var f = featureCheck(window.constants.MAP_FILTER_DISHWASHER, pin);
    var j = featureCheck(window.constants.MAP_FILTER_PARKING, pin);
    var h = featureCheck(window.constants.MAP_FILTER_WASHER, pin);
    var i = featureCheck(window.constants.MAP_FILTER_ELEVATOR, pin);
    var k = featureCheck(window.constants.MAP_FILTER_CONDITIONER, pin);

    return a && b && c && d && e && f && j && h && i && k;
  };

  var houseTypeCheck = function (pin) {
    if (window.constants.MAP_FILTER_HOUSE_TYPE.value === 'any') {
      return pin;
    }
    return pin.offer.type === window.constants.MAP_FILTER_HOUSE_TYPE.value;
  };

  var updatePins = function () {
    var filteredPins = window.data.get().filter(filterPins);
    window.pin.render(filteredPins);
  };

  var priceCheck = function (pin) {
    switch (window.constants.MAP_FILTER_PRICE.value) {
      case 'any':
        return pin;
      case 'middle':
        if (pin.offer.price >= 10000 && pin.offer.price <= 50000) {
          return pin.offer.price;
        }
        break;
      case 'low':
        if (pin.offer.price < 10000) {
          return pin.offer.price;
        }
        break;
      case 'high':
        if (pin.offer.price > 50000) {
          return pin.offer.price;
        }
        break;
      default:
        return pin;
    }
  };

  var roomsAmountCheck = function (pin) {
    switch (window.constants.MAP_FILTER_ROOMS.value) {
      case 'any':
        return pin;
      case '1':
        return pin.offer.rooms === 1;
      case '2':
        return pin.offer.rooms === 2;
      case '3':
        return pin.offer.rrooms === 3;
        default:
          return pin;
      }
    }
  };

  var guestsAmountCheck = function (pin) {
    switch (window.constants.MAP_FILTER_GUESTS.value) {
      case 'any':
        return pin;
      case '0':
        return pin.offer.guests === 0;
      case '1':
        return pin.offer.guests === 1;
      case '2':
        return pin.offer.guests === 2;
    }
  };

  var featureCheck = function (feature, pin) {
    if (feature.checked) {
      return pin.offer.features.includes(feature.value);
    } else {
      return pin;
    }
  };


  window.filter = {
    updatePins: updatePins,
  };
})();
