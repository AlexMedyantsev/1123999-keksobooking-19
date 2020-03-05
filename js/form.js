'use strict';

(function () {
  var titleInput = window.constants.AD_FORM.querySelector('#title');
  var roomNumberInput = window.constants.AD_FORM.querySelector('#room_number');
  var capacityInput = window.constants.AD_FORM.querySelector('#capacity');
  var priceInput = window.constants.AD_FORM.querySelector('#price');
  var addressInput = window.constants.AD_FORM.querySelector('#address');
  var placeInput = window.constants.AD_FORM.querySelector('#type');

  var disableForm = function (form) {
    var formElements = form.elements;

    for (var i = 0; i < form.length; i++) {
      formElements[i].disabled = true;
    }
  };

  var enableForm = function (form) {
    var formElements = form.elements;

    for (var i = 0; i < form.length; i++) {
      formElements[i].disabled = false;
    }
  };

  var fadeInMap = function () {
    window.constants.MAP.classList.remove('map--faded');
  };

  var fadeInForm = function () {
    window.constants.AD_FORM.classList.remove('ad-form--disabled');
  };

  // Действия которые выполняются по дефолту
  disableForm(window.constants.MAP_FILTERS_FORM);
  disableForm(window.constants.AD_FORM);
  window.utils.makeInputReadOnly(addressInput);
  window.utils.writeLocationInInput(window.utils.getElementLocation(window.constants.MAIN_MAP_PIN), addressInput);


  var activatePage = function () {
    enableForm(window.constants.AD_FORM);
    enableForm(window.constants.MAP_FILTERS_FORM);
    fadeInMap();
    fadeInForm();
    window.utils.writeLocationInInput(window.utils.getElementMiddleBottomPosition(window.constants.MAIN_MAP_PIN), addressInput);
    window.pin.render();
    window.constants.MAIN_MAP_PIN.removeEventListener('click', window.form.activate);
  };

  var validateForm = function () {
    var validateRoomAndGuestsSelects = function () {
      var rooms = parseInt(roomNumberInput.value, 10);
      var guests = parseInt(capacityInput.value, 10);
      if (guests && rooms === 100) {
        roomNumberInput.setCustomValidity('какое-то сообщение');
        capacityInput.setCustomValidity('');
      } else if (guests === 0 && rooms !== 100) {
        capacityInput.setCustomValidity('какое-то сообщение (2)');
        roomNumberInput.setCustomValidity('');
      } else if (guests > rooms) {
        roomNumberInput.setCustomValidity('Нужно больше комнат');
        capacityInput.setCustomValidity('');
      } else {
        roomNumberInput.setCustomValidity('');
        capacityInput.setCustomValidity('');
      }
    };

    validateRoomAndGuestsSelects();

    var validateTitleInput = function (el) {
      window.utils.setInputRequired(el);
      var title = titleInput.value;
      if (title.length < 30) {
        titleInput.setCustomValidity('Минимум 30 символов');
      } else if (title.length > 100) {
        titleInput.setCustomValidity('Вы превысили максимально допустимое количество символов (100)');
      } else {
        titleInput.setCustomValidity('');
      }
    };

    validateTitleInput(titleInput);


    var validatePriceInput = function (price) {
      window.utils.setInputRequired(price);
      if (parseInt(price.value, 10) > 1000000) {
        priceInput.setCustomValidity('Маскимальная цена 1.000.000 Рублей');
      }
    };

    validatePriceInput(priceInput);

    var syncPlaceTypeAndMinPrice = function (place, price) {
      if (place.value === 'bungalo') {
        price.setAttribute('min', 0);
        price.setAttribute('placeholder', 0);
      } else if (place.value === 'flat') {
        price.setAttribute('min', 1000);
        price.setAttribute('placeholder', 1000);
      } else if (place.value === 'house') {
        price.setAttribute('min', 5000);
        price.setAttribute('placeholder', 5000);
      } else if (place.value === 'palace') {
        price.setAttribute('min', 10000);
        price.setAttribute('placeholder', 10000);
      }
    };

    syncPlaceTypeAndMinPrice(placeInput, priceInput);
  };

  var syncCheckinAndCheckout = function (firstSelect, secondSelect) {
    switch (firstSelect.value) {
      case '12:00':
        secondSelect.value = '12:00';
        break;
      case '13:00':
        secondSelect.value = '13:00';
        break;
      case '14:00':
        secondSelect.value = '14:00';
        break;
    }
  };

  window.form = {
    activate: activatePage,
    disable: disableForm,
    validate: validateForm,
    syncCheckinAndCheckout: syncCheckinAndCheckout,
  };
})();
