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

DOMNodeCollection.prototype.attr = function (name, value) {
  if (value === undefined) {
    return this.HTMLElements[0].getAttribute(name);
  } else {
    this.HTMLElements.forEach(function(node){
      node.setAttribute(name, value);
    });
    return this.HTMLElements;
  }
};

DOMNodeCollection.prototype.addClass = function (value) {
  this.HTMLElements.forEach(function(node){
    var existingClasses = node.getAttribute("class");
    if (existingClasses === null) {
      node.setAttribute("class", value);
    } else {
      var existingClassesArr = existingClasses.split(" ");
      if (existingClassesArr.indexOf(value) === -1) {
        node.setAttribute("class", existingClasses + " " + value);
      }
    }
  });
  return this.HTMLElements;
};

DOMNodeCollection.prototype.removeClass = function (value) {
  this.HTMLElements.forEach(function(node){
    var existingClasses = node.getAttribute("class");
    if (existingClasses) {
      var existingClassesArr = existingClasses.split(" ");
      var index = existingClassesArr.indexOf(value);
      if (index >= 0) {
        existingClassesArr.splice(index, 1);
        node.setAttribute("class", existingClassesArr.join(" "));
      }
    }
  });
  return this.HTMLElements;
};

module.exports = DOMNodeCollection;
