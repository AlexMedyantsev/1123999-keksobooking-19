'use strict';

(function () {
  var checkInSelect = window.constants.AD_FORM.querySelector('#timein');
  var checkOutSelect = window.constants.AD_FORM.querySelector('#timeout');
  var formSubmitButton = window.constants.AD_FORM.querySelector('.ad-form__submit');

  window.constants.MAIN_MAP_PIN.addEventListener('click', window.form.activate);

  formSubmitButton.addEventListener('click', function () {
    window.form.validate();
  });

  checkInSelect.addEventListener('change', function () {
    window.form.syncCheckinAndCheckout(checkInSelect, checkOutSelect);
  });

  checkOutSelect.addEventListener('change', function () {
    window.form.syncCheckinAndCheckout(checkOutSelect, checkInSelect);
  });

  window.constants.AD_FORM.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.sendData(window.form.getData(), window.form.disableAll(), window.form.onError());
  });

  window.events = {
    // setElementClickHandler: setElementClickHandler,
    // setElementKeyDownHandler: setElementKeyDownHandler,
  };
})();
