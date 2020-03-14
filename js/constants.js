'use strict';

(function () {
  window.constants = {
    AD_AMOUNT: 5,
    MAIN: document.querySelector('main'),
    MAP: document.querySelector('.map'),
    MAP_CARD_TEMPLATE: document.querySelector('#card').content.querySelector('.map__card'),
    MAP_PINS: document.querySelector('.map__pins'),
    MAIN_MAP_PIN: document.querySelector('.map__pin--main'),
    MAP_FILTERS_FORM: document.querySelector('.map__filters'),
    MAP_FILTER_HOUSE_TYPE: document.querySelector('#housing-type'),
    AD_FORM: document.querySelector('.ad-form'),
    ADDRESS_INPUT: document.querySelector('#address'),
    AD_FORM_RESET_BUTTON: document.querySelector('.ad-form__reset'),
  };
})();
