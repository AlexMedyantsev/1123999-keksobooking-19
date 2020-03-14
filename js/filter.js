'use strict';

(function () {

  var filterPins = function (pin) {
    houseTypeCheck(pin);
    // priceCheck();
    // roomsAmountCheck(pin);
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

  // var priceCheck = function () {
  //   switch (window.constants.MAP_FILTER_PRICE.value) {
  //      case any:
  //        return pin.offer.price === window.constants.MAP_FILTER_PRICE.value;
  //        break;
  //   }
  // };

  // var roomsAmountCheck = function (pin) {
  //   if (window.constants.MAP_FILTER_ROOMS.value === 'any') {
  //     return pin;
  //   }
  //   return pin.offer.rooms === window.constants.MAP_FILTER_ROOMS.value;
  // };


  window.filter = {
    updatePins: updatePins,
  };
})();
