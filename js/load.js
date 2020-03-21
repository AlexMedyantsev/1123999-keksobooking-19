'use strict';

(function () {
  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var xhr = new XMLHttpRequest();

  window.loadData = function (onSuccess, onError) {
    xhr.addEventListener('load', function () {
      if (xhr.status === window.constants.STATUS_CODE_OK) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    xhr.open('GET', LOAD_URL);
    xhr.responseType = 'json';
    xhr.send();
  };
})();
