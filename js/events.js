'use strict';

(function () {
  var checkInSelect = window.constants.adForm.querySelector('#timein');
  var checkOutSelect = window.constants.adForm.querySelector('#timeout');
  var priceInput = window.constants.adForm.querySelector('#price');
  var placeInput = window.constants.adForm.querySelector('#type');
  var formSubmitButton = window.constants.adForm.querySelector('.ad-form__submit');

  formSubmitButton.addEventListener('click', function () {
    window.form.validate();
  });

  placeInput.addEventListener('change', function () {
    window.form.syncPlaceTypeAndMinPrice(placeInput, priceInput);
  });

  checkInSelect.addEventListener('change', function () {
    window.form.syncCheckinAndCheckout(checkInSelect, checkOutSelect);
  });

  checkOutSelect.addEventListener('change', function () {
    window.form.syncCheckinAndCheckout(checkOutSelect, checkInSelect);
  });

  window.constants.adFormResetButton.addEventListener('click', function (evt) {
    window.form.disableAllNoMessage();
    evt.preventDefault();
    window.constants.mapFiltersForm.reset();
    window.utils.writeLocationInInput(window.utils.getElementLocation(window.constants.mainMapPin), window.constants.addressInput);
    window.constants.mainMapPin.addEventListener('click', window.pin.onMainClick);
    window.card.remove();
    window.form.syncPlaceTypeAndMinPrice(placeInput, priceInput);
  });

  window.constants.mapFiltersForm.addEventListener('change', function () {
    window.debounce(function () {
      window.pin.removeAll();
      window.filter.updatePins();
      window.card.remove();
    });
  });

  window.constants.adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.server.sendData(window.form.getData());
    window.constants.mainMapPin.addEventListener('click', window.pin.onMainClick);
    window.constants.mapFiltersForm.reset();
  });
})();
