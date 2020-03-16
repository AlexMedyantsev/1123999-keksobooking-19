'use strict';

(function () {
  window.constants = {
    AD_AMOUNT: 5,
    MAP_PIN_WIDTH: 50,
    MAP_PIN_HEIGHT: 70,
    MAIN: document.querySelector('main'),
    MAP: document.querySelector('.map'),
    MAP_CARD_TEMPLATE: document.querySelector('#card').content.querySelector('.map__card'),
    MAP_PINS: document.querySelector('.map__pins'),
    MAIN_MAP_PIN: document.querySelector('.map__pin--main'),
    MAP_FILTERS_FORM: document.querySelector('.map__filters'),
    MAP_FILTER_HOUSE_TYPE: document.querySelector('#housing-type'),
    MAP_FILTER_PRICE: document.querySelector('#housing-price'),
    MAP_FILTER_ROOMS: document.querySelector('#housing-rooms'),
    MAP_FILTER_GUESTS: document.querySelector('#housing-guests'),
    MAP_FILTER_WIFI: document.querySelector('#filter-wifi'),
    MAP_FILTER_DISHWASHER: document.querySelector('#filter-dishwasher'),
    MAP_FILTER_PARKING: document.querySelector('#filter-parking'),
    MAP_FILTER_WASHER: document.querySelector('#filter-washer'),
    MAP_FILTER_ELEVATOR: document.querySelector('#filter-elevator'),
    MAP_FILTER_CONDITIONER: document.querySelector('#filter-conditioner'),
    MAP_FILTER_FEATURES: document.querySelector('#housing-features'),
    AD_FORM: document.querySelector('.ad-form'),
    ADDRESS_INPUT: document.querySelector('#address'),
    AD_FORM_RESET_BUTTON: document.querySelector('.ad-form__reset'),
  };
})();
