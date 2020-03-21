'use strict';

(function () {
  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var GET_URL = 'https://js.dump.academy/keksobooking';

  var statusCode = {
    OK: 200,
  };

  window.server = {
    loadData: function (onSuccess, onError) {
      var xhr = new XMLHttpRequest();

      xhr.addEventListener('load', function () {
        if (xhr.status === statusCode.OK) {
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
    },

    sendData: function (data) {
      var xhr = new XMLHttpRequest();
      xhr.addEventListener('load', function () {
        if (xhr.status === statusCode.OK) {
          window.form.disableAll();
        } else {
          window.form.showErrorMessage();
        }
      });

      xhr.open('POST', GET_URL);
      xhr.responseType = 'json';
      xhr.send(data);
    },
  };
})();
