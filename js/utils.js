'use strict';

(function () {
  var getElementLocation = function (element) {
    var locationCoordinates = {
      'location': {
        'x': parseInt(element.offsetLeft + (element.clientWidth / 2), 10),
        'y': parseInt(element.offsetTop + (element.clientHeight / 2), 10)
      }
    };

    return locationCoordinates;
  };

  var setElementPosition = function (element, position) {
    element.style.left = position.location.x + 'px';
    element.style.top = position.location.y + 'px';
  };

  var getElementMiddleBottomPosition = function (element) {
    var elementLocationCoordinates = {
      'location': {
        'x': parseInt(element.offsetLeft + (element.clientWidth / 2), 10),
        'y': parseInt(element.offsetTop + (element.clientHeight), 10)
      }
    };

    return elementLocationCoordinates;
  };

  var writeLocationInInput = function (elementLocation, input) {
    input.value = elementLocation.location.x + ', ' + elementLocation.location.y;
  };

  var setInputRequired = function (input) {
    input.setAttribute('required', 'required');
  };

  var makeInputReadOnly = function (input) {
    input.setAttribute('readonly', true);
  };

  var removeElement = function (element) {
    element.remove();
  };

  window.utils = {
    getElementLocation: getElementLocation,
    setElementPosition: setElementPosition,
    getElementMiddleBottomPosition: getElementMiddleBottomPosition,
    writeLocationInInput: writeLocationInInput,
    setInputRequired: setInputRequired,
    makeInputReadOnly: makeInputReadOnly,
    removeElement: removeElement,
  };
})();
