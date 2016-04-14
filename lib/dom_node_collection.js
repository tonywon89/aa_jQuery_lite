function DOMNodeCollection(HTMLElements) {
  this.HTMLElements = HTMLElements;
}

DOMNodeCollection.prototype.html = function (string) {
  if (typeof string === "string") {
    this.HTMLElements.forEach(function(node){
      node.innerHTML = string;
    });
    return this.HTMLElements;
  } else {
    return this.HTMLElements[0].innerHTML;
  }
};

DOMNodeCollection.prototype.empty = function () {
  this.html("");
  return this.HTMLElements;
};

DOMNodeCollection.prototype.append = function (argument) {
  if (argument instanceof DOMNodeCollection) {
    this.HTMLElements.forEach(function(node){
      argument.HTMLElements.forEach(function(element){
        node.innerHTML += element.outerHTML;
      });
    });
    argument.HTMLElements.forEach(function(element){
      element.parentNode.removeChild(element);
    });
  } else if (argument instanceof HTMLElement) {
    this.HTMLElements.forEach(function(node){
      node.innerHTML += argument.outerHTML;
    });
  } else if (typeof argument === "string") {
    this.HTMLElements.forEach(function(node){
      node.innerHTML += argument;
    });
  }
  return this.HTMLElements;
};

DOMNodeCollection.prototype.attr = function () {

};

DOMNodeCollection.prototype.addClass = function () {

};

DOMNodeCollection.prototype.removeClass = function () {

};

module.exports = DOMNodeCollection;
