'use strict';

(function () {
  window.load = function (onSuccess, onError) {
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
  };

  // window.upload = function (form, callback, error) {
  //   var URL = form.action
  //   var xhr = new XMLHttpRequest();

  //   xhr.addEventListener('onload', function () {
  //     if (xhr.status === 200) {
  //       callback();
  //     } else {
  //       error();
  //     }
  //   });

  //   xhr.open('POST', URL);
  //   xhr.send();
  // }

  window.constants.AD_FORM.onsubmit = function (form) {
    form.preventDefault();

    var data = {};
    for (var i = 0, ii = window.constants.AD_FORM.length; i < ii; ++i) {
      var input = window.constants.AD_FORM[i];
      if (input.name) {
        data[input.name] = input.value;
      }
    }

    // Construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.open(window.constants.AD_FORM.method, window.constants.AD_FORM.action, true);
    xhr.setRequestHeader('Accept', 'application/json; charset=utf-8');
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    // Send the collected data as JSON
    xhr.send(JSON.stringify(data));

    // Callback function
    xhr.onloadend = function (response) {
      if (response.target.status === 200) {

        window.form.disableForm();

      }
    };
  }
})();
