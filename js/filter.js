'use strict';

(function () {

  var checkPin = function (pin) {
    return houseTypeCheck(pin) &&
      priceCheck(pin) &&
      roomsAmountCheck(pin) &&
      guestsAmountCheck(pin) &&
      featureCheck(window.constants.mapFilterWifi, pin) &&
      featureCheck(window.constants.mapFilterDishwasher, pin) &&
      featureCheck(window.constants.mapFilterParking, pin) &&
      featureCheck(window.constants.mapFilterWasher, pin) &&
      featureCheck(window.constants.mapFilterElevator, pin) &&
      featureCheck(window.constants.mapFilterConditioner, pin);
  };

  var houseTypeCheck = function (pin) {
    return (window.constants.mapFilterHouseType.value === 'any') || (pin.offer.type === window.constants.mapFilterHouseType.value);
  };

  var filterPins = function (array, callback) {
    var filteredPins = [];
    for (var i = 0; i < array.length; i++) {
      var result = callback(array[i]);
      if (filteredPins.length === 5) {
        break;
      }
      if (result) {
        filteredPins.push(array[i]);
      }
    }
    return filteredPins;
  };

  var updatePins = function () {
    var resultFilteredPins = filterPins(window.data.get(), checkPin);
    window.pin.render(resultFilteredPins);
  };

  var priceCheck = function (pin) {
    switch (window.constants.mapFilterPrice.value) {
      case 'any':
        return pin;
      case 'middle':
        return pin.offer.price >= 10000 && pin.offer.price <= 50000;
      case 'low':
        return pin.offer.price < 10000;
      case 'high':
        return pin.offer.price > 50000;
      default:
        return pin;
    }
  };

  var roomsAmountCheck = function (pin) {
    switch (window.constants.mapFilterRooms.value) {
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
  };

  var guestsAmountCheck = function (pin) {
    switch (window.constants.mapFilterGuests.value) {
      case 'any':
        return pin;
      case '0':
        return pin.offer.guests === 0;
      case '1':
        return pin.offer.guests === 1;
      case '2':
        return pin.offer.guests === 2;
      default:
        return pin;
    }
  };

  var featureCheck = function (feature, pin) {
    return feature.checked ? pin.offer.features.includes(feature.value) : pin;
  };


  window.filter = {
    updatePins: updatePins,
    pins: filterPins,
  };
})();
