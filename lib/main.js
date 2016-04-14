var DOMNodeCollection = require("./dom_node_collection");

window.$l = function(selector){
  var callbacks = [];
  if (selector instanceof HTMLElement) {
    return new DOMNodeCollection([selector]);
  } else if (selector instanceof Function) {

    if (document.readyState === "complete") {
      selector();
    } else {
      callbacks.push(selector);
      var interval = setInterval(function () {
        if (document.readyState === "complete") {
          callbacks.forEach(function(callback) {
            console.log("was not ready");
            callback();
          });
          clearInterval(interval);
        }
      }, 1);
    }
  } else {
    var elementList = document.querySelectorAll(selector);
    var elementArray = [].slice.call(elementList);

    return new DOMNodeCollection(elementArray);
  }


};

var funct = function() {
  alert("hello");
};

window.$l(funct);
