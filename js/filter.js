'use strict';

(function () {
  var houseTypeCheck = function (pin) {
    if (window.constants.MAP_FILTER_HOUSE_TYPE.value === 'any') {
      return pin;
    }
    return pin.offer.type === window.constants.MAP_FILTER_HOUSE_TYPE.value;
  };

  var updatePins = function () {
    var filteredPins = window.data.get().filter(houseTypeCheck);
    window.pin.render(filteredPins);
  };

  window.filter = {
    updatePins: updatePins,
  };
})();
