'use strict';

(function () {
  var GET_URL = 'https://js.dump.academy/keksobooking';
  var xhr = new XMLHttpRequest();

  window.sendData = function (data) {
    xhr.addEventListener('load', function () {
      if (xhr.status === window.constants.STATUS_CODE_OK) {
        window.form.disableAll();
      } else {
        window.form.showErrorMessage();
      }
    });

    xhr.addEventListener('error', function () {
      window.form.showErrorMessage('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      window.form.showErrorMessage('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    xhr.open('POST', GET_URL);
    xhr.responseType = 'json';
    xhr.send(data);
  };
})();
