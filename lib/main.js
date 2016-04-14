var DOMNodeCollection = require("./dom_node_collection");

var callbacks = [];
document.addEventListener("DOMContentLoaded", function(event) {
  console.log("was not ready");
  callbacks.forEach(function(callback) {
    callback();
  });
});

window.$l = function(selector){
  if (selector instanceof HTMLElement) {
    return new DOMNodeCollection([selector]);
  } else if (selector instanceof Function) {

    if (document.readyState === "complete") {
      selector();
    } else {
      callbacks.push(selector);
    }
  } else {
    var elementList = document.querySelectorAll(selector);
    var elementArray = [].slice.call(elementList);

    return new DOMNodeCollection(elementArray);
  }
};

window.$l.extend = function (){
  var obj = arguments[0];

  for (var i = 1; i < arguments.length; i++) {
    obj = Object.assign(obj, arguments[i]);
  }

  return obj;
};

// window.$l.ajax = function (options) {
//   var defaults = {
//     type: "GET",
//     url: "www.google.com",
//     success: function(data) {
//       console.log("It was a success");
//       console.log(data);
//     },
//     error: function () {
//       console.log("It was a failure");
//     }
//
//   };
//
//   var xhr = new XMLHttpRequest();
//
//   xhr.open(options["type"], options.url);
//
//   xhr.onload = options.success;
//
//   xhr.send(options["data"]);
// };

// window.$l(console.log.bind(console, "hello"));
// window.$l(console.log.bind(console, "goodbye"));
// window.$l(console.log.bind(console, "hellogoodbye"));
