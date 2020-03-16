'use strict';

(function () {
  var checkInSelect = window.constants.AD_FORM.querySelector('#timein');
  var checkOutSelect = window.constants.AD_FORM.querySelector('#timeout');
  var priceInput = window.constants.AD_FORM.querySelector('#price');
  var placeInput = window.constants.AD_FORM.querySelector('#type');
  var formSubmitButton = window.constants.AD_FORM.querySelector('.ad-form__submit');

  formSubmitButton.addEventListener('click', function () {
    window.form.validate();
    window.pin.onMainClick();
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

  window.constants.AD_FORM_RESET_BUTTON.addEventListener('click', function (evt) {
    window.form.disableAllNoMessage();
    evt.preventDefault();
    window.constants.MAP_FILTERS_FORM.reset();
    window.utils.writeLocationInInput(window.utils.getElementLocation(window.constants.MAIN_MAP_PIN), window.constants.ADDRESS_INPUT);
    window.pin.onMainClick();
  });

  window.constants.MAP_FILTERS_FORM.addEventListener('change', function () {
    window.debounce(function () {
      window.pin.removeAll();
      window.filter.updatePins();
      window.card.remove();
    });
  });

  window.constants.AD_FORM.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.sendData(window.form.getData());
    window.constants.MAP_FILTERS_FORM.reset();
  });
})();
