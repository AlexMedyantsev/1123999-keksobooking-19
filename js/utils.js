'use strict';
// Модуль util.js
(function () {
  var getRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var getRandomStringFromArray = function (array) {
    return array[getRandomInteger(0, array.length - 1)];
  };

  var shuffleArray = function (array) {
    return array.sort(function () {
      return 0.5 - Math.random();
    });
  };

  var generateArrayOfStrings = function (array) {
    var resultArrayLength = getRandomInteger(1, array.length);
    var resultArray = [];

    var shuffledArray = shuffleArray(array);

    for (var i = 0; i < resultArrayLength; i++) {
      resultArray[i] = shuffledArray[i];
    }
    return resultArray;
  };

  var getElementLocation = function (element) {
    var locationCoordinates = {
      'location': {
        'x': parseInt(element.offsetLeft + (element.clientWidth / 2), 10),
        'y': parseInt(element.offsetTop + (element.clientHeight / 2), 10)
      }
    };

    return locationCoordinates;
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

  window.utils = {
    getRandomInteger: getRandomInteger,
    getRandomStringFromArray: getRandomStringFromArray,
    shuffleArray: shuffleArray,
    generateArrayOfStrings: generateArrayOfStrings,
    getElementLocation: getElementLocation,
    getElementMiddleBottomPosition: getElementMiddleBottomPosition,
    writeLocationInInput: writeLocationInInput,
    setInputRequired: setInputRequired,
  };
})();
