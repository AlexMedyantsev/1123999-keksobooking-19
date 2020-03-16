'use strict';

(function () {
  window.server = {
    loadData: function (onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      var URL = 'https://js.dump.academy/keksobooking/data';

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

      xhr.open('GET', URL);
      xhr.send();
    },

    sendData: function (data) {
      var xhr = new XMLHttpRequest();
      var URL = 'https://js.dump.academy/keksobooking';

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

      xhr.open('POST', URL);

      xhr.send(data);
    },
  };
})();