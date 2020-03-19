'use strict';

(function () {
  var titleInput = window.constants.adForm.querySelector('#title');
  var roomNumberInput = window.constants.adForm.querySelector('#room_number');
  var capacityInput = window.constants.adForm.querySelector('#capacity');
  var priceInput = window.constants.adForm.querySelector('#price');
  var placeInput = window.constants.adForm.querySelector('#type');
  var addressInput = window.constants.adForm.querySelector('#address');

  var getFormData = function () {
    var formData = new FormData(window.constants.adForm);
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
    window.constants.map.classList.remove('map--faded');
  };

  var fadeInForm = function () {
    window.constants.adForm.classList.remove('ad-form--disabled');
  };

  var fadeOutForm = function () {
    window.constants.adForm.classList.add('ad-form--disabled');
  };

  var fadeOutMap = function () {
    window.constants.map.classList.add('map--faded');
  };

  var resetAll = function () {
    window.constants.adForm.reset();
    window.utils.writeLocationInInput(window.utils.getElementLocation(window.constants.mainMapPin), addressInput);
    fadeOutForm();
    fadeOutMap();
    window.pin.removeAll();
    window.constants.mainMapPin.addEventListener('click', window.form.activate);
    window.utils.setElementPosition(window.constants.mainMapPin, mainMapPinInitialPosition);
  };


  // Действия которые выполняются по дефолту
  disableForm(window.constants.mapFiltersForm);
  disableForm(window.constants.adForm);
  window.utils.makeInputReadOnly(addressInput);
  window.utils.writeLocationInInput(window.utils.getElementLocation(window.constants.mainMapPin), addressInput);

  var mainMapPinInitialPosition = window.utils.getElementLocation(window.constants.mainMapPin);


  var activatePage = function () {
    enableForm(window.constants.adForm);
    enableForm(window.constants.mapFiltersForm);
    fadeInMap();
    fadeInForm();
    window.utils.writeLocationInInput(window.utils.getElementMiddleBottomPosition(window.constants.mainMapPin), addressInput);
    window.constants.mainMapPin.removeEventListener('click', window.form.activate);
  };

  var validateRoomAndGuestsSelects = function () {
    var rooms = parseInt(roomNumberInput.value, 10);
    var guests = parseInt(capacityInput.value, 10);
    if (guests && rooms === 100) {
      roomNumberInput.setCustomValidity('Выберите меньшее количество комнат');
      capacityInput.setCustomValidity('');
    } else if (guests === 0 && rooms !== 100) {
      capacityInput.setCustomValidity('Выберите большее количество гостей');
      roomNumberInput.setCustomValidity('');
    } else if (guests > rooms) {
      roomNumberInput.setCustomValidity('Выберите большее количество комнат');
      capacityInput.setCustomValidity('');
    } else {
      roomNumberInput.setCustomValidity('');
      capacityInput.setCustomValidity('');
    }
  };

  var validateTitleInput = function (element) {
    window.utils.setInputRequired(element);
    var title = titleInput.value;
    if (title.length < 30) {
      titleInput.setCustomValidity('Минимум 30 символов');
    } else if (title.length > 100) {
      titleInput.setCustomValidity('Вы превысили максимально допустимое количество символов (100)');
    } else {
      titleInput.setCustomValidity('');
    }
  };

  var validatePriceInput = function (price) {
    window.utils.setInputRequired(price);
    if (parseInt(price.value, 10) > 1000000) {
      priceInput.setCustomValidity('Маскимальная цена 1.000.000 Рублей');
    } else {
      priceInput.setCustomValidity('');
    }
  };

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

  var validateForm = function () {
    validateRoomAndGuestsSelects();
    validateTitleInput(titleInput);
    validatePriceInput(priceInput);
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
    window.constants.map.appendChild(successMessageTemplate);

    var removeSuccessMessage = function () {
      window.utils.removeElement(successMessageTemplate);
      document.removeEventListener('click', removeSuccessMessage);
      document.removeEventListener('keydown', removeSuccessMessage);
    };

    document.addEventListener('click', removeSuccessMessage);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.constants.ESC_KEYCODE) {
        removeSuccessMessage();
      }
    });
  };

  var showErrorMessage = function () {
    var errorMessage = document.querySelector('#error').content.querySelector('.error');
    var errorMessageTemplate = errorMessage.cloneNode(true);
    window.constants.main.appendChild(errorMessageTemplate);

    var removeErrorMessage = function () {
      window.utils.removeElement(errorMessageTemplate);
      document.removeEventListener('click', removeErrorMessage);
      document.removeEventListener('keydown', removeErrorMessage);
    };

    document.addEventListener('click', removeErrorMessage);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.constants.ESC_KEYCODE) {
        removeErrorMessage();
      }
    });
    // Навесит  обработчик на кнопку
  };

  var showLoadDataError = function (text) {
    var errorMessage = document.querySelector('#error').content.querySelector('.error');
    var errorMessageTemplate = errorMessage.cloneNode(true);
    errorMessageTemplate.querySelector('.error__button').remove();
    errorMessageTemplate.querySelector('.error__message').textContent = text;
    window.constants.main.appendChild(errorMessageTemplate);

    var removeErrorMessage = function () {
      window.utils.removeElement(errorMessageTemplate);
      document.removeEventListener('click', removeErrorMessage);
      document.removeEventListener('keydown', removeErrorMessage);
    };

    document.addEventListener('click', removeErrorMessage);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.constants.ESC_KEYCODE) {
        removeErrorMessage();
      }
    });
  };

  var disableAll = function () {
    disableForm(window.constants.adForm);
    resetAll();
    showSuccessMessage();
  };

  var disableAllNoMessage = function () {
    disableForm(window.constants.adForm);
    resetAll();
  };

  window.form = {
    activate: activatePage,
    disable: disableForm,
    validate: validateForm,
    syncCheckinAndCheckout: syncCheckinAndCheckout,
    syncPlaceTypeAndMinPrice: syncPlaceTypeAndMinPrice,
    getData: getFormData,
    resetAll: resetAll,
    showSuccessMessage: showSuccessMessage,
    showErrorMessage: showErrorMessage,
    showLoadDataError: showLoadDataError,
    disableAll: disableAll,
    disableAllNoMessage: disableAllNoMessage,
  };
})();
