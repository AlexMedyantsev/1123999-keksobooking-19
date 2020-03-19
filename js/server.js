'use strict';

(function () {
  var xhr = new XMLHttpRequest();
  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var GET_URL = 'https://js.dump.academy/keksobooking';

  var statusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
  };

  window.server = {
    loadData: function (onSuccess, onError) {

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
      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case statusCode.OK:
            window.form.disableAll();
            break;
          case statusCode.INTERNAL_SERVER_ERROR:
            window.form.showErrorMessage();
            break;
          default:
            window.form.showErrorMessage();
            break;
        }
      });

      xhr.open('POST', GET_URL);
      xhr.responseType = 'json';
      xhr.send(data);
    },
  };
})();
