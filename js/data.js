'use strict';

// (function () {
//   var serverData = [];


//   window.data = {
//     set: function (data) {
//       serverData = data;
//     },
//     get: function () {
//       return serverData;
//     }
//   };
// })();

(function () {
  var serverData = [];

  window.data = {
    set: function (data) {
      serverData = data;
    },
    get: function () {
      return serverData;
    }
  }
})();
