'use strict';

(function () {
  var titleInput = window.constants.AD_FORM.querySelector('#title');
  var roomNumberInput = window.constants.AD_FORM.querySelector('#room_number');
  var capacityInput = window.constants.AD_FORM.querySelector('#capacity');
  var priceInput = window.constants.AD_FORM.querySelector('#price');
  var addressInput = window.constants.AD_FORM.querySelector('#address');
  var placeInput = window.constants.AD_FORM.querySelector('#type');
  var getFormData = function () {
    var formData = new FormData(window.constants.AD_FORM);
    return formData;
  };

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

  var fadeOutForm = function () {
    window.constants.AD_FORM.classList.add('ad-form--disabled');
  };

  var fadeOutMap = function () {
    window.constants.MAP.classList.add('map--faded');
  };

  var resetAll = function () {
    window.constants.AD_FORM.reset();
    window.utils.writeLocationInInput(window.utils.getElementLocation(window.constants.MAIN_MAP_PIN), addressInput);
    fadeOutForm();
    fadeOutMap();
    window.pin.removeAll();
    window.constants.MAIN_MAP_PIN.addEventListener('click', window.form.activate);
    window.utils.setElementPosition(window.constants.MAIN_MAP_PIN, mainMapPinInitialPosition);
  };


  // Действия которые выполняются по дефолту
  disableForm(window.constants.MAP_FILTERS_FORM);
  disableForm(window.constants.AD_FORM);
  window.utils.makeInputReadOnly(addressInput);
  window.utils.writeLocationInInput(window.utils.getElementLocation(window.constants.MAIN_MAP_PIN), addressInput);

  var mainMapPinInitialPosition = window.utils.getElementLocation(window.constants.MAIN_MAP_PIN);


  var activatePage = function () {
    enableForm(window.constants.AD_FORM);
    enableForm(window.constants.MAP_FILTERS_FORM);
    fadeInMap();
    fadeInForm();
    window.utils.writeLocationInInput(window.utils.getElementMiddleBottomPosition(window.constants.MAIN_MAP_PIN), addressInput);
    window.constants.MAIN_MAP_PIN.removeEventListener('click', window.form.activate);
    window.load(window.pin.onDataLoaded, window.pin.onDataLoadError);
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

  var showSuccessMessage = function () {
    var successMessage = document.querySelector('#success').content.querySelector('.success');
    var successMessageTemplate = successMessage.cloneNode(true);
    window.constants.MAP.appendChild(successMessageTemplate);

    var removeSuccessMessage = function () {
      window.utils.removeElement(successMessageTemplate);
      document.removeEventListener('click', removeSuccessMessage);
      document.removeEventListener('keydown', removeSuccessMessage);
    };

    document.addEventListener('click', removeSuccessMessage);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        removeSuccessMessage();
      }
    });
  };

  var showErrorMessage = function () {
    var errorMessage = document.querySelector('#error').content.querySelector('.error');
    var errorMessageTemplate = errorMessage.cloneNode(true);
    window.constants.MAP.appendChild(errorMessageTemplate);

    var removeErrorMessage = function () {
      window.utils.removeElement(errorMessageTemplate);
      document.removeEventListener('click', removeErrorMessage);
      document.removeEventListener('keydown', removeErrorMessage);
    };

    document.addEventListener('click', removeErrorMessage);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        removeErrorMessage();
      }
    });
  };

  var disableAll = function () {
    disableForm(window.constants.AD_FORM);
    resetAll();
    showSuccessMessage();
  };

  var onError = function () {
    showErrorMessage();
  };

  window.form = {
    activate: activatePage,
    disable: disableForm,
    validate: validateForm,
    syncCheckinAndCheckout: syncCheckinAndCheckout,
    getData: getFormData,
    resetAll: resetAll,
    showSuccessMessage: showSuccessMessage,
    showErrorMessage: showErrorMessage,
    disableAll: disableAll,
    onError: onError,
  };
})();
