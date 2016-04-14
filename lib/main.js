var DOMNodeCollection = require("./dom_node_collection");

window.$l = function(selector){
  if (selector instanceof HTMLElement) {
    return new DOMNodeCollection([selector]);
  } else {
    var elementList = document.querySelectorAll(selector);
    var elementArray = [].slice.call(elementList);

    return new DOMNodeCollection(elementArray);
  }


};
