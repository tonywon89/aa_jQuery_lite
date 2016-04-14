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
	    this.HTMLElements.forEach(function(element){
	      element.innerHTML = string;
	    });
	    return this.HTMLElements;
	  } else {
	    return this.HTMLElements[0].innerHTML;
	  }
	};
	
	DOMNodeCollection.prototype.empty = function () {
	
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


/***/ }
/******/ ]);
//# sourceMappingURL=jquery_lite.js.map