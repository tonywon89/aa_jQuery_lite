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
	
	window.$l.ajax = function (options) {
	  var defaults = {
	    type: "GET",
	    url: "http://api.openweathermap.org/data/2.5/weather?q=NY,NY&appid=bcb83c4b54aee8418983c2aff3073b3b",
	    success: function(data) {
	      console.log("It was a success");
	      console.log(data);
	    },
	    error: function () {
	      console.log("It was a failure");
	    },
	    contentType: "text/html",
	    data: {},
	  };
	
	  options = window.$l.extend(defaults, options);
	
	  var xhr = new XMLHttpRequest();
	
	  xhr.open(options["type"], options.url);
	
	  xhr.onload = function () {
	    console.log(xhr.status); // for status info
	    console.log(xhr.responseType); //the type of data that was returned
	    console.log(xhr.response);
	  };
	
	  xhr.send(options["data"]);
	};
	
	window.$l.ajax({type: "GET"});
	
	// window.$l(console.log.bind(console, "hello"));
	// window.$l(console.log.bind(console, "goodbye"));
	// window.$l(console.log.bind(console, "hellogoodbye"));


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
	
	DOMNodeCollection.prototype.find = function (selector) {
	  var nodes = [];
	
	  this.HTMLElements.forEach(function(node){
	    var nodeList = node.querySelectorAll(selector);
	    nodes = nodes.concat([].slice.call(nodeList));
	  });
	
	  return new DOMNodeCollection(nodes);
	};
	
	DOMNodeCollection.prototype.remove = function () {
	  this.HTMLElements.forEach(function(node){
	    node.parentNode.removeChild(node);
	  });
	};
	
	DOMNodeCollection.prototype.on = function (type, listener) {
	  this.HTMLElements.forEach(function(node){
	    node.addEventListener(type, listener);
	  });
	  return this.HTMLElements;
	};
	
	DOMNodeCollection.prototype.off = function (type, listener) {
	  this.HTMLElements.forEach(function(node){
	    node.removeEventListener(type, listener);
	  });
	  return this.HTMLElements;
	};
	
	
	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);
//# sourceMappingURL=jquery_lite.js.map