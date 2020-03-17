'use strict';

(function () {
  var xhr = new XMLHttpRequest();
  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var GET_URL = 'https://js.dump.academy/keksobooking';

  window.server = {
    loadData: function (onSuccess, onError) {
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
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

      xhr.timeout = 10000; // 10s

      xhr.open('GET', LOAD_URL);
      xhr.send();
    },

    sendData: function (data) {
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case 200:
            window.form.disableAll();
            break;
          case 500:
            window.form.showErrorMessage();
            break;
        }
      });

      xhr.open('POST', GET_URL);

      xhr.send(data);
    },
  };
})();
