'use strict';

(function () {
  window.constants = {
    AD_AMOUNT: 5,
    MAP_PIN_WIDTH: 50,
    MAP_PIN_HEIGHT: 70,
    ENTER_KEYCODE: 13,
    ESC_KEYCODE: 27,
    STATUS_CODE_OK: 200,
    main: document.querySelector('main'),
    map: document.querySelector('.map'),
    mapCardTemplate: document.querySelector('#card').content.querySelector('.map__card'),
    mapPins: document.querySelector('.map__pins'),
    mapPinsList: document.querySelector('.map__pin'),
    mainMapPin: document.querySelector('.map__pin--main'),
    mapFiltersForm: document.querySelector('.map__filters'),
    mapFilterHouseType: document.querySelector('#housing-type'),
    mapFilterPrice: document.querySelector('#housing-price'),
    mapFilterRooms: document.querySelector('#housing-rooms'),
    mapFilterGuests: document.querySelector('#housing-guests'),
    mapFilterWifi: document.querySelector('#filter-wifi'),
    mapFilterDishwasher: document.querySelector('#filter-dishwasher'),
    mapFilterParking: document.querySelector('#filter-parking'),
    mapFilterWasher: document.querySelector('#filter-washer'),
    mapFilterElevator: document.querySelector('#filter-elevator'),
    mapFilterConditioner: document.querySelector('#filter-conditioner'),
    mapFilterFeatures: document.querySelector('#housing-features'),
    adForm: document.querySelector('.ad-form'),
    addressInput: document.querySelector('#address'),
    adFormResetButton: document.querySelector('.ad-form__reset'),
  };
})();
