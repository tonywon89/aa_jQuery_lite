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

DOMNodeCollection.prototype.append = function () {

};

DOMNodeCollection.prototype.attr = function () {

};

DOMNodeCollection.prototype.addClass = function () {

};

DOMNodeCollection.prototype.removeClass = function () {

};

module.exports = DOMNodeCollection;
