/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles_index_scss__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles_index_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__styles_index_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__js_nav_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__js_nav_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__js_nav_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__js_form_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__js_form_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__js_form_js__);

// import ejsClient from './js/ejsClient.js';
// import json from "./js/getJson.js";




/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var navToggler = document.querySelector(".nav-toggler");
var navList = document.querySelector(".nav-list");

navToggler.addEventListener("click", function(){
  if(!navList.classList.contains("nav-collapse")) {
    navList.classList.add("nav-collapse");
  } else {
    navList.classList.remove("nav-collapse");
  }
});


/***/ }),
/* 3 */
/***/ (function(module, exports) {

var formState = JSON.parse(sessionStorage.getItem("form-state"));
var registerForm = document.querySelector(".form.register");
var loginForm = document.querySelector(".form.login");
var usernameInput;
var emailInput;
var passwordInput;
var confirmPasswordInput;

var onFormSubmit = function(formState) {
  sessionStorage.setItem("form-state", JSON.stringify(formState));
}

if (loginForm) {
  usernameInput = loginForm.querySelector(".form-input.username");
  passwordInput = loginForm.querySelector(".form-input.password");

  if (formState) {
    usernameInput.value = formState.username;
    passwordInput.value = formState.password;
  }

  loginForm.onsubmit = function() {
    onFormSubmit({
      username: usernameInput.value,
      password: passwordInput,
    })
  }

} else if(registerForm) {

  usernameInput = registerForm.querySelector(".form-input.username");
  emailInput = registerForm.querySelector(".form-input.email");
  passwordInput = registerForm.querySelector(".form-input.password");
  confirmPasswordInput = registerForm.querySelector(".form-input.confirm-password");

  if (formState) {
    usernameInput.value = formState.username;
    emailInput.value = formState.email;
    passwordInput.value = formState.password;
    confirmPasswordInput.value = formState.confirm_password;
  }

  registerForm.onsubmit = function() {
    onFormSubmit({
      username: usernameInput.value,
      email: emailInput.value,
      password: passwordInput,
      confirm_password: confirmPasswordInput.value,
    })
  }
}


/***/ })
/******/ ]);