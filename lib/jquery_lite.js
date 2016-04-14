/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/lib/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var DOMNodeCollection = __webpack_require__(1);
	
	window.$l = function(selector){
	  if (selector instanceof HTMLElement) {
	    return new DOMNodeCollection([selector]);
	  } else {
	    var elementList = document.querySelectorAll(selector);
	    var elementArray = [].slice.call(elementList);
	
	    return new DOMNodeCollection(elementArray);
	  }
	
	
	};


/***/ },
/* 1 */
/***/ function(module, exports) {

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
	
	DOMNodeCollection.prototype.children = function () {
	  var children = [];
	
	  this.HTMLElements.forEach(function(node) {
	    var childNodeList = node.children;
	    childNodeList = [].slice.call(childNodeList);
	    children = children.concat(childNodeList);
	  });
	  return new DOMNodeCollection(children);
	};
	
	DOMNodeCollection.prototype.parent = function () {
	  var parents = [];
	
	  this.HTMLElements.forEach(function(node) {
	    var parent = node.parentNode;
	    if (parents.indexOf(parent) === -1) {
	      parents.push(parent);
	    }
	  });
	  return new DOMNodeCollection(parents);
	};
	
	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);
//# sourceMappingURL=jquery_lite.js.map