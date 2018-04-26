(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = setupValidation;

var _fDom = require('@justeat/f-dom');

var _fDom2 = _interopRequireDefault(_fDom);

var _fValidate = require('@justeat/f-validate');

var _fValidate2 = _interopRequireDefault(_fValidate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Runs f-validate on any forms in the docs
 * tagged with the `test-form` or `test-form-group` name
 */

function setupValidation() {
    var testForms = _fDom2.default.all('form[name="test-form"');

    if (testForms.length > 0) {
        testForms.forEach(function (form) {
            var validateForm = new _fValidate2.default(form);
            validateForm.addCustomValidation('customRule', function (field) {
                if (field.value === 'passTest') {
                    return true;
                }
                return false;
            });
            form.addEventListener('submit', function (e) {
                e.preventDefault();
            });
        });
    }

    var testGroupForms = _fDom2.default.all('form[name="test-form-group"');

    if (testGroupForms.length > 0) {
        testGroupForms.forEach(function (form) {
            var validateForm = new _fValidate2.default(form, { // eslint-disable-line no-unused-vars
                groupErrorPlacement: 'bottom'
            });
            form.addEventListener('submit', function (e) {
                e.preventDefault();
            });
        });
    }
}

},{"@justeat/f-dom":3,"@justeat/f-validate":10}],2:[function(require,module,exports){
'use strict';

require('@justeat/f-footer');

var _fHeader = require('@justeat/f-header');

var _liteReady = require('lite-ready');

var _liteReady2 = _interopRequireDefault(_liteReady);

var _svg4everybody = require('svg4everybody');

var _svg4everybody2 = _interopRequireDefault(_svg4everybody);

var _formValidationSetup = require('./docs/formValidationSetup');

var _formValidationSetup2 = _interopRequireDefault(_formValidationSetup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _liteReady2.default)(function () {
    (0, _svg4everybody2.default)();
    (0, _formValidationSetup2.default)();
    (0, _fHeader.checkForUser)();
});

},{"./docs/formValidationSetup":1,"@justeat/f-footer":4,"@justeat/f-header":5,"lite-ready":23,"svg4everybody":25}],3:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:!0});var _qwery=require('qwery'),_qwery2=_interopRequireDefault(_qwery);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}var first=function(a){var b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:null;return(0,_qwery2.default)(a,b)[0]},all=function(a){var b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:null;return(0,_qwery2.default)(a,b)},exists=function(a){var b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:null;return 0<(0,_qwery2.default)(a,b).length},dom=all;dom.all=all,dom.first=first,dom.exists=exists,exports.default=dom;
},{"qwery":24}],4:[function(require,module,exports){
'use strict';

var _liteReady = require('lite-ready');

var _liteReady2 = _interopRequireDefault(_liteReady);

var _qwery = require('qwery');

var _qwery2 = _interopRequireDefault(_qwery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _liteReady2.default)(function () {

    // Collapse the footer panels on page load
    (0, _qwery2.default)('[data-panel-collapsible]').forEach(function (panel) {
        panel.classList.add('is-collapsed');
    });
});
},{"lite-ready":23,"qwery":24}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.checkForUser = exports.setupHeader = undefined;

var _liteReady = require('lite-ready');

var _liteReady2 = _interopRequireDefault(_liteReady);

var _userAuth = require('./userAuth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Converts an input to a button in order to improve accessibility.
 *
 * @param {string} selector
 */
/**
 * @overview Fozzie header JavaScript behaviour.
 *
 * @module f-header
 */

var convertInputToButton = function convertInputToButton(selector) {
    var input = document.querySelector(selector);

    if (input) {
        var replaceTag = input.outerHTML.replace(/^<input/, '<button');
        input.outerHTML = replaceTag + '</button>';

        // Query the DOM again for this element now it has changed to a button
        var button = document.querySelector(selector);
        button.setAttribute('type', 'button');

        return button;
    }

    return null;
};

/**
 * Setup the behaviour for the header component.
 */
var setupHeader = function setupHeader() {
    var menuButton = convertInputToButton('[data-nav-enhance]');

    if (menuButton) {
        /**
         * Attach click event handler — as this element is now a button this event will
         * trigger when the `enter` and `spacebar` keys are pressed.
         *
         * @see {@link https://www.w3.org/TR/html51/editing.html#running-synthetic-click-activation-steps - synthetic click activation steps}
         */
        menuButton.addEventListener('click', function () {
            var navContainer = document.querySelector('[data-nav-container]');
            var navLabel = document.querySelector('[data-nav-toggle]');

            if (navContainer) {
                navContainer.classList.toggle('is-visible');
            }

            if (navLabel) {
                navLabel.classList.toggle('is-open');
            }

            document.documentElement.classList.toggle('is-navInView');
        });
    }
};

(0, _liteReady2.default)(function () {
    setupHeader();
});

exports.setupHeader = setupHeader;
exports.checkForUser = _userAuth.checkForUser;
},{"./userAuth":6,"lite-ready":23}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.checkForUser = undefined;

var _userData = require('./userData');

var _userData2 = _interopRequireDefault(_userData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var removeElement = function removeElement(element) {
    return element && element.remove();
}; /**
    * @overview Authorisation handler
    *
    * @module userAuth
    */

var removeHiddenClass = function removeHiddenClass(element) {
    return element && element.classList.remove('is-hidden');
};

var updateDom = function updateDom(authData) {
    var authEl = document.querySelector('[data-auth-wrapper]');
    var loginEl = document.querySelector('[data-login]');

    if (authData.isAuthenticated) {
        var headerName = document.querySelector('[data-name]');
        var headerEmail = document.querySelector('[data-email]');

        if (headerName && authData.friendlyName !== '') {
            headerName.textContent = authData.friendlyName;
        }
        if (headerEmail && authData.email !== '') {
            headerEmail.textContent = authData.email;
        }

        removeHiddenClass(authEl);
        removeElement(loginEl);
    } else {
        removeHiddenClass(loginEl);
        removeElement(authEl);
    }

    return authData;
};

/**
 * Checks if authorisation details can be found in the current session hits .net
 * endpoint and is returned valid auth details or no details if not logged in
 */
var checkForUser = exports.checkForUser = function checkForUser() {
    var authEl = document.querySelector('[data-auth-wrapper]');

    // if our auth wrapper exists, get our user details
    if (authEl) {
        // this fetch logic will be extracted to a new module
        return fetch('/api/account/details', {
            method: 'GET',
            credentials: 'same-origin'
        }).then(function (response) {
            return response.json();
        }).then(updateDom).then(_userData2.default)
        // should send this error to the f-logger but for now, just erroring here inline
        .catch(function (error) {
            console.log(error);
        });
    }

    return Promise.resolve();
};
},{"./userData":7}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @overview UserData handler
 *
 * @module userAuth/userData
 */

var storeLocalAnalyticsBlob = function storeLocalAnalyticsBlob(result) {
    window.localStorage.setItem('je-analytics', JSON.stringify(result));
    return result;
};

var enrichUserDataWithCount = function enrichUserDataWithCount(userData, orderCountResponse) {
    userData.orderCount = orderCountResponse.Count;
    return userData;
};

var pushUserData = function pushUserData(userData) {
    return window.dataLayer.push({ userData: userData });
};

var fetchOrderCountAndSave = function fetchOrderCountAndSave(userData) {
    var orderCountLink = document.querySelector('link[rel="ordercountlink"]');
    var orderCountUrl = orderCountLink && orderCountLink.getAttribute('href');

    if (orderCountUrl) {
        return fetch(orderCountUrl, {
            method: 'GET',
            credentials: 'same-origin'
        }).then(function (response) {
            return response.json();
        }).then(storeLocalAnalyticsBlob).then(function (result) {
            return enrichUserDataWithCount(userData, result);
        }).then(pushUserData).catch(function (err) {
            console.log('Unable to get order count. ' + err);
            pushUserData(userData);
        });
    }

    pushUserData(userData);
    return Promise.reject();
};

var getLocalAnalyticsBlob = function getLocalAnalyticsBlob() {
    return window.localStorage.getItem('je-analytics');
};

var orderCountSupported = function orderCountSupported() {
    var supportedEl = document.querySelector('[data-order-count-supported]');
    if (supportedEl && supportedEl.value) {
        // Case insensitive regex test for value="true"
        return (/^true$/i.test(supportedEl.value)
        );
    }
    return Promise.reject();
};

var saveUserData = exports.saveUserData = function saveUserData(authData) {
    if (!authData.isAuthenticated) {
        return Promise.resolve();
    }

    var userData = authData.userData;


    if (!orderCountSupported()) {
        pushUserData(userData);
        return Promise.resolve();
    }

    var savedAnalytics = getLocalAnalyticsBlob();
    if (!savedAnalytics) {
        return fetchOrderCountAndSave(userData);
    }

    var localOrderCount = JSON.parse(savedAnalytics);
    var currentTime = new Date().getTime();
    var localOrderCountExpires = Date.parse(localOrderCount.Expires);

    if (localOrderCountExpires < currentTime) {
        return fetchOrderCountAndSave(userData);
    }

    enrichUserDataWithCount(userData, localOrderCount);
    pushUserData(userData);

    return Promise.resolve();
};
},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var addCallBack = exports.addCallBack = function addCallBack(callBacks, callBack) {

    if (typeof callBack !== 'function') {
        throw new TypeError('call back is not a function');
    }

    callBacks.push(callBack);
};

var runCallbacks = exports.runCallbacks = function runCallbacks(callBacks) {

    if (!callBacks) {
        return;
    }

    callBacks.forEach(function (callback) {
        callback();
    });
};
},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var cssClasses = {
    isHidden: 'is-hidden',
    formError: 'form-error',
    formErrors: 'form-errors',
    hasError: 'has-error',
    hasSuccess: 'has-success'
};

var validationGroup = 'data-val-group';

exports.default = {
    cssClasses: cssClasses,
    email: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    escapeChars: /[|\\{}()[\]^$+*?.]/g,
    fieldValues: 'input, select, textarea, [' + validationGroup + ']',
    validationGroup: validationGroup,
    validateOnOptions: ['blur', 'keyup']
};
},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.defaultOptions = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * @module Validate
                                                                                                                                                                                                                                                                               *
                                                                                                                                                                                                                                                                               * ## Goals
                                                                                                                                                                                                                                                                               *
                                                                                                                                                                                                                                                                               * To validate a form based on the HTML5 attributes each form has, or the data attributes specified on them
                                                                                                                                                                                                                                                                               *
                                                                                                                                                                                                                                                                               * Should accept either:
                                                                                                                                                                                                                                                                               *
                                                                                                                                                                                                                                                                               * 1. A form DOM Element
                                                                                                                                                                                                                                                                               * 2. A string relating to the name of the form
                                                                                                                                                                                                                                                                               *
                                                                                                                                                                                                                                                                               * Should also be able to label a form field with `data-novalidate`
                                                                                                                                                                                                                                                                               * to remove it from those being validated
                                                                                                                                                                                                                                                                               *
                                                                                                                                                                                                                                                                               */

var _fDom = require('@justeat/f-dom');

var _fDom2 = _interopRequireDefault(_fDom);

var _rules = require('./rules');

var _rules2 = _interopRequireDefault(_rules);

var _callbacks = require('./callbacks');

var _messages = require('./messages');

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Load in the set of test definitions to validate against
var VALIDATION_KEYS = Object.keys(_rules2.default);

var defaultOptions = exports.defaultOptions = {
    errorClass: _constants2.default.cssClasses.hasError,
    successClass: _constants2.default.cssClasses.hasSuccess,
    focus: false,
    groupErrorPlacement: false,
    enableHTML5Validation: false
};

var getForm = function getForm(descriptor) {

    if (!descriptor) {
        throw new Error('f-validate: expected form name or form node parameter');
    }

    var form = (typeof descriptor === 'undefined' ? 'undefined' : _typeof(descriptor)) === 'object' && descriptor.tagName === 'FORM' ? descriptor : document.forms[descriptor];

    if (!form) {
        throw new Error('f-validate: form not found');
    }

    return form;
};

var elementsUntouched = function elementsUntouched(element, current, touchedSelectors) {

    var notInErrorState = !current.field.classList.contains(_constants2.default.cssClasses.hasError);
    var elementsNotTouched = touchedSelectors.map(function (childSelector) {
        return _fDom2.default.first(childSelector, element);
    }).filter(function (el) {
        return el && !el.hasAttribute('data-touched');
    });

    // If one select has not been interacted with do not run test method
    return notInErrorState && elementsNotTouched.length > 0;
};

var FormValidation = function () {
    function FormValidation(nameOrNode) {
        var _this = this;

        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, FormValidation);

        this.options = Object.assign({}, defaultOptions, options);
        this.form = getForm(nameOrNode);
        this.fields = this.getFields();

        // Allow fields to be validated on 'enter'
        this.fields.forEach(function (field) {
            field.addEventListener('keydown', function (event) {
                if (event.key === 'Enter') {
                    _this.isValid(event);
                }
            });
        });

        this.customHandlers = {};
        this.callBacks = {};
        this.errorMessages = [];

        if (this.options.onSuccess) {
            this.on('success', this.options.onSuccess);
        }
        if (this.options.onError) {
            this.on('error', this.options.onError);
        }
        if (this.options.validateOn) {
            this.validateOn();
        }

        this.setFormNoValidate();
        this.form.addEventListener('submit', this.isValid.bind(this));
    }

    /**
     * on - Associates a callback with an event.
     * Callbacks associated with an event will be called when the event fires.
     * example:
     *      formValidator.on('success', () => {
     *          Do something when the form is found to be valid.
     *      });
     *      formValidator.on('error', () => {
     *          Do something when the form is found to be invalid.
     *      });
     */


    _createClass(FormValidation, [{
        key: 'on',
        value: function on(callBackEvent, callBack) {

            if (!this.callBacks[callBackEvent]) {
                this.callBacks[callBackEvent] = [];
            }

            try {
                (0, _callbacks.addCallBack)(this.callBacks[callBackEvent], callBack, callBackEvent);
            } catch (exception) {
                throw new TypeError('f-validate: ' + callBackEvent + ' callback must be a function');
            }
        }
    }, {
        key: 'setSuccess',
        value: function setSuccess(element) {
            element.classList.remove(this.options.errorClass);
            element.classList.add(this.options.successClass);
        }
    }, {
        key: 'setError',
        value: function setError(element) {
            element.classList.remove(this.options.successClass);
            element.classList.add(this.options.errorClass);
        }
    }, {
        key: 'setFormNoValidate',
        value: function setFormNoValidate() {

            if (!this.options.enableHTML5Validation) {
                this.form.setAttribute('novalidate', '');
            }
        }

        /**
         * Validates the form
         *
         * @param event
         * @param {object} currentElement
         * @returns {boolean}
         */

    }, {
        key: 'isValid',
        value: function isValid(event, currentElement) {
            var _this2 = this;

            var formValid = true;
            this.errorMessages = [];

            this.fields.forEach(function (field) {

                // currentElement refers to an element that is being validated on blur/keyup
                // only validate on blur/keyup if the field is not empty
                if (currentElement && (currentElement.field !== field || field.value === '')) {
                    return;
                }

                var errorMessage = '';

                // This needs to be set outside of the forEach loop, as otherwise only the final rule will apply the state
                var fieldValid = true;

                // This prevents us from applying state classes to fields without rules
                var fieldHasValidation = false;

                VALIDATION_KEYS.forEach(function (ruleName) {
                    var definition = _rules2.default[ruleName];

                    if (field.getAttribute('data-val-custom')) {
                        _rules2.default.custom.test = _this2.customHandlers[field.getAttribute('data-val-custom')];
                    }

                    if (definition.condition(field)) {
                        fieldHasValidation = true;
                        var skipTest = false;

                        // If rule has elements that need to be checked for touch, and validation is happening on blur/keyup
                        if (definition.touchedSelectors && currentElement) {
                            currentElement.childField.setAttribute('data-touched', true);
                            skipTest = elementsUntouched(field, currentElement, definition.touchedSelectors);
                        }

                        if (!skipTest && !definition.test(field, currentElement)) {
                            fieldValid = false;
                            errorMessage = (0, _messages.getMessage)(field, ruleName);
                            _this2.errorMessages.push(errorMessage);
                        }
                    }
                });

                if (fieldHasValidation) {

                    if (fieldValid) {
                        _this2.setSuccess(field);
                    } else {
                        formValid = false;
                        _this2.setError(field);
                    }

                    // if we aren't handling a group field validation
                    if (!_this2.options.groupErrorPlacement) {
                        var errorElement = (0, _messages.getInlineErrorElement)(field, _this2.form);
                        if (fieldValid) {
                            (0, _messages.hideMessage)(errorElement);
                        } else {
                            (0, _messages.displayInlineMessage)(errorElement, errorMessage, field, _this2.form);
                        }
                    }
                }
            });

            if (!formValid) {
                this.setError(this.form);
                (0, _callbacks.runCallbacks)(this.callBacks.error);

                if (event) {
                    event.preventDefault();
                }
            } else {
                this.setSuccess(this.form);
                (0, _callbacks.runCallbacks)(this.callBacks.success);
            }

            if (this.options.groupErrorPlacement) {
                var groupedErrorElement = this.findGroupedErrorElement();
                if (formValid) {
                    (0, _messages.hideMessage)(groupedErrorElement);
                } else {
                    this.displayGroupedMessages(groupedErrorElement);
                }
            }

            return formValid;
        }
    }, {
        key: 'addCustomValidation',
        value: function addCustomValidation(name, handler) {
            if (!name || typeof name !== 'string') {
                throw new Error('f-validate: please provide the name');
            }
            if (!handler || typeof handler !== 'function') {
                throw new Error('f-validate: please provide a custom method');
            }

            this.customHandlers[name] = handler;
        }
    }, {
        key: 'getFields',
        value: function getFields() {
            var fields = (0, _fDom2.default)(_constants2.default.fieldValues, this.form);

            return fields.filter(function (f) {
                return !(f.hasAttribute('type') && f.getAttribute('type') === 'hidden') && !f.hasAttribute('disabled') && !f.hasAttribute('data-novalidate') && !f.parentElement.hasAttribute(_constants2.default.validationGroup);
            });
        }
    }, {
        key: 'findGroupedErrorElement',
        value: function findGroupedErrorElement() {
            var groupedErrorElement = _fDom2.default.first('.' + _constants2.default.cssClasses.formErrors, this.form);

            return groupedErrorElement;
        }
    }, {
        key: 'displayGroupedMessages',
        value: function displayGroupedMessages(groupedErrorElement) {

            var updateElement = groupedErrorElement;

            if (!groupedErrorElement) {
                updateElement = document.createElement('ul');
                updateElement.classList.add(_constants2.default.cssClasses.formErrors);

                this.form.insertBefore(updateElement, this.getGroupedErrorPosition());
            } else {
                groupedErrorElement.innerHTML = '';
            }

            this.errorMessages.forEach(function (error) {
                var li = document.createElement('li');
                li.textContent = error;
                updateElement.appendChild(li);
            });
        }
    }, {
        key: 'getGroupedErrorPosition',
        value: function getGroupedErrorPosition() {

            var groupElement = _fDom2.default.first(this.options.groupErrorPlacement, this.form);

            if (groupElement) {
                return groupElement;
            }

            if (this.options.groupErrorPlacement === 'bottom') {
                return this.form.lastChild;
            }

            return this.form.firstChild;
        }

        /**
         * Validates form field(s) based on the event passed into options.validateOn
         *
         * example:
         *       this.validation = new FormValidation(this.form, {
         *           validateOn: 'blur'
         *       });
         */

    }, {
        key: 'validateOn',
        value: function validateOn() {
            var _this3 = this;

            if (this.options.groupErrorPlacement) {
                throw new Error('f-validate: validation on \'blur\' or \'keyup\' cannot be performed if errors are grouped');
            }

            if (_constants2.default.validateOnOptions.indexOf(this.options.validateOn) === -1) {
                throw new Error('f-validate: valid options for the \'validateOn\' property are \'blur\' or \'keyup\'');
            }

            this.fields.forEach(function (field) {
                if (field.hasAttribute(_constants2.default.validationGroup)) {
                    (0, _fDom2.default)(_constants2.default.fieldValues, field).forEach(function (childField) {
                        return (

                            // Binds each form element within a validation-group to the specified event.
                            // When this event is triggered the validation-group element will be passed as the element to test.
                            // The child field is also passed for use within a rule test method
                            // Null is being passed as the isValid method expects 'field' as its second argument
                            childField.addEventListener(_this3.options.validateOn, _this3.isValid.bind(_this3, null, {
                                field: field,
                                childField: childField
                            }))
                        );
                    });
                } else {
                    // Null is being passed as the isValid method expects 'field' as its second argument
                    field.addEventListener(_this3.options.validateOn, _this3.isValid.bind(_this3, null, { field: field }));
                }
            });
        }
    }]);

    return FormValidation;
}();

exports.default = FormValidation;
},{"./callbacks":8,"./constants":9,"./messages":11,"./rules":16,"@justeat/f-dom":22}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getMessage = exports.hideMessage = exports.displayInlineMessage = exports.getInlineErrorElement = undefined;

var _fDom = require('@justeat/f-dom');

var _fDom2 = _interopRequireDefault(_fDom);

var _rules = require('./rules');

var _rules2 = _interopRequireDefault(_rules);

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getCustomErrorElement = function getCustomErrorElement(field, form) {
    var errorPlacement = field.getAttribute('data-val-error-placement');
    var errorElement = _fDom2.default.first(errorPlacement, form);

    if (errorElement) {
        return errorElement;
    }

    return false;
};

var getInlineErrorElement = exports.getInlineErrorElement = function getInlineErrorElement(field, form) {
    var nextSibling = field.nextElementSibling;
    var customErrorEl = getCustomErrorElement(field, form);

    if (customErrorEl && customErrorEl.nextElementSibling && customErrorEl.nextElementSibling.classList.contains(_constants2.default.cssClasses.formError)) {
        return customErrorEl.nextElementSibling;
    }

    if (nextSibling && nextSibling.classList.contains(_constants2.default.cssClasses.formError)) {

        return nextSibling;
    }

    return false;
};

var displayInlineMessage = exports.displayInlineMessage = function displayInlineMessage(errorElement, customMessage, field, form) {

    var updateElement = errorElement;
    var customErrorEl = getCustomErrorElement(field, form) || field;

    if (!errorElement) {
        updateElement = document.createElement('p');
        updateElement.classList.add(_constants2.default.cssClasses.formError);
        field.parentNode.insertBefore(updateElement, customErrorEl.nextSibling);
    }

    updateElement.textContent = customMessage;
    updateElement.classList.remove(_constants2.default.cssClasses.isHidden);
};

var hideMessage = exports.hideMessage = function hideMessage(errorElement) {
    if (!errorElement) {
        return;
    }

    errorElement.classList.add(_constants2.default.cssClasses.isHidden);
    errorElement.innerHTML = '';
};

var getDefaultMessage = function getDefaultMessage(field, ruleName) {

    if (!_rules2.default[ruleName].defaultMessageValue) {
        return _rules2.default[ruleName].defaultMessage;
    }

    return _rules2.default[ruleName].defaultMessage.replace('{0}', _rules2.default[ruleName].defaultMessageValue(field));
};

var getMessage = exports.getMessage = function getMessage(field, ruleName) {
    return field.getAttribute('data-val-' + ruleName + '-error') || getDefaultMessage(field, ruleName);
};
},{"./constants":9,"./rules":16,"@justeat/f-dom":22}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fDom = require('@justeat/f-dom');

var _fDom2 = _interopRequireDefault(_fDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    condition: function condition(field) {
        return field.hasAttribute('data-val-conditionalRequired');
    },

    test: function test(field) {
        var input = _fDom2.default.first('[name=\'' + field.getAttribute('data-val-conditionalRequired') + '\']');
        var isChecked = input ? input.checked : true;

        return isChecked || field.value.trim().length > 0;
    },

    defaultMessage: 'This field is required.'
}; /**
    * Conditional Required Rule
    * -------------------------
    * This validation rule checks that if a specified checkbox is not checked, then it is required that a value must be entered in the field with this validation check.
    *
    * This also means that if the specified checkbox is checked, then the field is not required and the form will return valid when the field is empty.
    *
    */
},{"@justeat/f-dom":22}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Custom Rule
 * --------------
 * This validation rule allows the addition of a custom validation check to be added to the field.
 *
 */
exports.default = {
    condition: function condition(field) {
        var hasCustom = field.hasAttribute('data-val-custom');
        var hasCustomError = field.hasAttribute('data-val-custom-error');

        if (hasCustomError && !hasCustom) {
            throw new Error('f-validate: specify data-val-custom along with data-val-custom-error attribute');
        }

        return hasCustom;
    },

    test: null,

    defaultMessage: 'Custom validation failed.'
};
},{}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fDom = require('@justeat/f-dom');

var _fDom2 = _interopRequireDefault(_fDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    condition: function condition(field) {
        return field.hasAttribute('data-val-dateInFuture');
    },

    test: function test(element) {

        var dateToday = new Date();
        var currentMonth = dateToday.getMonth() + 1;
        var currentYear = dateToday.getFullYear();

        var selectedMonthEl = _fDom2.default.first('[data-val-dateInFuture-type="month"]', element);
        var selectedYearEl = _fDom2.default.first('[data-val-dateInFuture-type="year"]', element);
        var selectedMonthVal = Number(selectedMonthEl.value);
        var selectedYearVal = Number(selectedYearEl.value);

        if (selectedYearVal > currentYear && selectedMonthVal > 0) {
            return true;
        }

        return selectedYearVal === currentYear && selectedMonthVal >= currentMonth;
    },

    touchedSelectors: ['[data-val-dateInFuture-type="month"]', '[data-val-dateInFuture-type="year"]'],

    defaultMessage: 'This date must be in the future.'
}; /**
    * Date In Future Rule
    * -------------------
    * This rule is for validating dates entered by a collection of `select` fields.
    * When applied to a validation group, it returns true if the date entered in these fields is in the future.
    *
    */
},{"@justeat/f-dom":22}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    condition: function condition(field) {
        return field.getAttribute('type') === 'email';
    },

    test: function test(field) {
        // if the field is empty, should validate as true
        if (field.value === '') {
            return true;
        }
        return _constants2.default.email.test(field.value);
    },

    defaultMessage: 'This field must contain a valid email address.'
}; /**
    * Email Rule
    * --------------
    * Checks for a valid email address
    *
    */
},{"../constants":9}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _required = require('./required');

var _required2 = _interopRequireDefault(_required);

var _maxlength = require('./maxlength');

var _maxlength2 = _interopRequireDefault(_maxlength);

var _minlength = require('./minlength');

var _minlength2 = _interopRequireDefault(_minlength);

var _pattern = require('./pattern');

var _pattern2 = _interopRequireDefault(_pattern);

var _email = require('./email');

var _email2 = _interopRequireDefault(_email);

var _matches = require('./matches');

var _matches2 = _interopRequireDefault(_matches);

var _dateInFuture = require('./dateInFuture');

var _dateInFuture2 = _interopRequireDefault(_dateInFuture);

var _conditionalRequired = require('./conditionalRequired');

var _conditionalRequired2 = _interopRequireDefault(_conditionalRequired);

var _custom = require('./custom');

var _custom2 = _interopRequireDefault(_custom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    custom: _custom2.default,
    dateInFuture: _dateInFuture2.default,
    conditionalRequired: _conditionalRequired2.default,
    maxlength: _maxlength2.default,
    minlength: _minlength2.default,
    pattern: _pattern2.default,
    email: _email2.default,
    matches: _matches2.default,
    required: _required2.default
};
},{"./conditionalRequired":12,"./custom":13,"./dateInFuture":14,"./email":15,"./matches":17,"./maxlength":18,"./minlength":19,"./pattern":20,"./required":21}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fDom = require('@justeat/f-dom');

var _fDom2 = _interopRequireDefault(_fDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    condition: function condition(field) {
        return field.hasAttribute('data-val-equalto');
    },

    test: function test(field) {
        var matchedFieldName = field.getAttribute('data-val-equalto');

        if (matchedFieldName) {
            var input = _fDom2.default.first('input[name=' + matchedFieldName + ']');

            return matchedFieldName && input && field.value === input.value;
        }

        return false;
    },

    defaultMessage: 'This field does not match the {0} field.',

    defaultMessageValue: function defaultMessageValue(field) {
        return field.getAttribute('data-val-equalto').replace('*.', '');
    }
}; /**
    * Matches Rule
    * ------------
    * Checks that the value of the field being validated matches the value of a separate specified field
    *
    */
},{"@justeat/f-dom":22}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Maxlength Rule
 * --------------
 * Checks that the value of the field is not greater than the specified maximum length.
 *
 */
exports.default = {
    condition: function condition(field) {
        return field.hasAttribute('maxlength') || field.hasAttribute('data-val-maxlength');
    },

    test: function test(field) {
        // if the field is empty, or attribute is set with no value, should validate as true
        if (field.value === '' || field.getAttribute('maxlength') === '' || field.getAttribute('data-val-maxlength') === '') {
            return true;
        }
        return field.value.trim().length <= parseInt(field.getAttribute('maxlength') || field.getAttribute('data-val-maxlength'), 10);
    },

    defaultMessage: 'This field must not exceed {0} characters in length.',

    defaultMessageValue: function defaultMessageValue(field) {
        return parseInt(field.getAttribute('maxlength') || field.getAttribute('data-val-maxlength'), 10);
    }
};
},{}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Minlength Rule
 * --------------
 * Checks that the value of the field is of a specified minimum length.
 *
 */
exports.default = {
    condition: function condition(field) {
        return field.hasAttribute('minlength') || field.hasAttribute('data-val-minlength');
    },

    test: function test(field) {
        // if the field is empty, or attribute is set with no value, should validate as true
        if (field.value === '' || field.getAttribute('minlength') === '' || field.getAttribute('data-val-minlength') === '') {
            return true;
        }

        return field.value.trim().length >= parseInt(field.getAttribute('minlength') || field.getAttribute('data-val-minlength'), 10);
    },

    defaultMessage: 'This field must be at least {0} characters in length.',

    defaultMessageValue: function defaultMessageValue(field) {
        return parseInt(field.getAttribute('minlength') || field.getAttribute('data-val-minlength'), 10);
    }
};
},{}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Pattern Rule
 * --------------
 * Allows definition of a rule to validate the input value using Regular Expressions (RegEx)
 *
 */
var CONSTANTS = require('../constants');

exports.default = {
    condition: function condition(field) {
        return field.hasAttribute('pattern') || field.hasAttribute('data-val-regex');
    },

    test: function test(field) {
        // if the field is empty, should validate as true
        if (field.value === '') {
            return true;
        }
        // escape characters that have special meaning inside a regular expression in field value
        var fieldValue = field.value.replace(CONSTANTS.escapeChars, '\\$&');
        var pattern = field.getAttribute('pattern') || field.getAttribute('data-val-regex');

        return RegExp('^(?:' + pattern + ')$', 'gim').test(fieldValue);
    },

    defaultMessage: 'This field contains a value that isn’t accepted.'
};
},{"../constants":9}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fDom = require('@justeat/f-dom');

var _fDom2 = _interopRequireDefault(_fDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    condition: function condition(field) {
        return field.hasAttribute('required') || field.hasAttribute('data-val-required');
    },

    test: function test(field) {
        // Required checkbox & radio, 1 should be checked.
        if (field.type === 'radio') {
            var radioInputs = (0, _fDom2.default)('[name=\'' + field.name + '\']:checked');
            return radioInputs.length > 0;
        }

        if (field.type === 'checkbox') {
            return field.checked === true;
        }

        return field.value.trim().length > 0;
    },

    defaultMessage: 'This field is required.'
}; /**
    * Required Rule
    * -------------
    * Checks that a value is present for the field being validated
    *
    */
},{"@justeat/f-dom":22}],22:[function(require,module,exports){
arguments[4][3][0].apply(exports,arguments)
},{"dup":3,"qwery":24}],23:[function(require,module,exports){
module.exports = function (callback) {

	if (document.readyState === 'complete' || document.readyState === 'interactive') {
		// Already ready or interactive, execute callback
		callback.call();
	}
	else if (document.attachEvent) {
		// Old browsers
		document.attachEvent('onreadystatechange', function () {
			if (document.readyState === 'interactive')
				callback.call();
		});
	}
	else if (document.addEventListener) {
		// Modern browsers
		document.addEventListener('DOMContentLoaded', callback);
	}
}

},{}],24:[function(require,module,exports){
/*!
  * @preserve Qwery - A selector engine
  * https://github.com/ded/qwery
  * (c) Dustin Diaz 2014 | License MIT
  */

(function (name, context, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports = definition()
  else if (typeof define == 'function' && define.amd) define(definition)
  else context[name] = definition()
})('qwery', this, function () {

  var classOnly = /^\.([\w\-]+)$/
    , doc = document
    , win = window
    , html = doc.documentElement
    , nodeType = 'nodeType'
  var isAncestor = 'compareDocumentPosition' in html ?
    function (element, container) {
      return (container.compareDocumentPosition(element) & 16) == 16
    } :
    function (element, container) {
      container = container == doc || container == window ? html : container
      return container !== element && container.contains(element)
    }

  function toArray(ar) {
    return [].slice.call(ar, 0)
  }

  function isNode(el) {
    var t
    return el && typeof el === 'object' && (t = el.nodeType) && (t == 1 || t == 9)
  }

  function arrayLike(o) {
    return (typeof o === 'object' && isFinite(o.length))
  }

  function flatten(ar) {
    for (var r = [], i = 0, l = ar.length; i < l; ++i) arrayLike(ar[i]) ? (r = r.concat(ar[i])) : (r[r.length] = ar[i])
    return r
  }

  function uniq(ar) {
    var a = [], i, j
    label:
    for (i = 0; i < ar.length; i++) {
      for (j = 0; j < a.length; j++) {
        if (a[j] == ar[i]) {
          continue label
        }
      }
      a[a.length] = ar[i]
    }
    return a
  }


  function normalizeRoot(root) {
    if (!root) return doc
    if (typeof root == 'string') return qwery(root)[0]
    if (!root[nodeType] && arrayLike(root)) return root[0]
    return root
  }

  /**
   * @param {string|Array.<Element>|Element|Node} selector
   * @param {string|Array.<Element>|Element|Node=} opt_root
   * @return {Array.<Element>}
   */
  function qwery(selector, opt_root) {
    var m, root = normalizeRoot(opt_root)
    if (!root || !selector) return []
    if (selector === win || isNode(selector)) {
      return !opt_root || (selector !== win && isNode(root) && isAncestor(selector, root)) ? [selector] : []
    }
    if (selector && arrayLike(selector)) return flatten(selector)


    if (doc.getElementsByClassName && selector == 'string' && (m = selector.match(classOnly))) {
      return toArray((root).getElementsByClassName(m[1]))
    }
    // using duck typing for 'a' window or 'a' document (not 'the' window || document)
    if (selector && (selector.document || (selector.nodeType && selector.nodeType == 9))) {
      return !opt_root ? [selector] : []
    }
    return toArray((root).querySelectorAll(selector))
  }

  qwery.uniq = uniq

  return qwery
}, this);

},{}],25:[function(require,module,exports){
!function(root, factory) {
    "function" == typeof define && define.amd ? // AMD. Register as an anonymous module unless amdModuleId is set
    define([], function() {
        return root.svg4everybody = factory();
    }) : "object" == typeof module && module.exports ? // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory() : root.svg4everybody = factory();
}(this, function() {
    /*! svg4everybody v2.1.9 | github.com/jonathantneal/svg4everybody */
    function embed(parent, svg, target) {
        // if the target exists
        if (target) {
            // create a document fragment to hold the contents of the target
            var fragment = document.createDocumentFragment(), viewBox = !svg.hasAttribute("viewBox") && target.getAttribute("viewBox");
            // conditionally set the viewBox on the svg
            viewBox && svg.setAttribute("viewBox", viewBox);
            // copy the contents of the clone into the fragment
            for (// clone the target
            var clone = target.cloneNode(!0); clone.childNodes.length; ) {
                fragment.appendChild(clone.firstChild);
            }
            // append the fragment into the svg
            parent.appendChild(fragment);
        }
    }
    function loadreadystatechange(xhr) {
        // listen to changes in the request
        xhr.onreadystatechange = function() {
            // if the request is ready
            if (4 === xhr.readyState) {
                // get the cached html document
                var cachedDocument = xhr._cachedDocument;
                // ensure the cached html document based on the xhr response
                cachedDocument || (cachedDocument = xhr._cachedDocument = document.implementation.createHTMLDocument(""), 
                cachedDocument.body.innerHTML = xhr.responseText, xhr._cachedTarget = {}), // clear the xhr embeds list and embed each item
                xhr._embeds.splice(0).map(function(item) {
                    // get the cached target
                    var target = xhr._cachedTarget[item.id];
                    // ensure the cached target
                    target || (target = xhr._cachedTarget[item.id] = cachedDocument.getElementById(item.id)), 
                    // embed the target into the svg
                    embed(item.parent, item.svg, target);
                });
            }
        }, // test the ready state change immediately
        xhr.onreadystatechange();
    }
    function svg4everybody(rawopts) {
        function oninterval() {
            // while the index exists in the live <use> collection
            for (// get the cached <use> index
            var index = 0; index < uses.length; ) {
                // get the current <use>
                var use = uses[index], parent = use.parentNode, svg = getSVGAncestor(parent), src = use.getAttribute("xlink:href") || use.getAttribute("href");
                if (!src && opts.attributeName && (src = use.getAttribute(opts.attributeName)), 
                svg && src) {
                    if (polyfill) {
                        if (!opts.validate || opts.validate(src, svg, use)) {
                            // remove the <use> element
                            parent.removeChild(use);
                            // parse the src and get the url and id
                            var srcSplit = src.split("#"), url = srcSplit.shift(), id = srcSplit.join("#");
                            // if the link is external
                            if (url.length) {
                                // get the cached xhr request
                                var xhr = requests[url];
                                // ensure the xhr request exists
                                xhr || (xhr = requests[url] = new XMLHttpRequest(), xhr.open("GET", url), xhr.send(), 
                                xhr._embeds = []), // add the svg and id as an item to the xhr embeds list
                                xhr._embeds.push({
                                    parent: parent,
                                    svg: svg,
                                    id: id
                                }), // prepare the xhr ready state change event
                                loadreadystatechange(xhr);
                            } else {
                                // embed the local id into the svg
                                embed(parent, svg, document.getElementById(id));
                            }
                        } else {
                            // increase the index when the previous value was not "valid"
                            ++index, ++numberOfSvgUseElementsToBypass;
                        }
                    }
                } else {
                    // increase the index when the previous value was not "valid"
                    ++index;
                }
            }
            // continue the interval
            (!uses.length || uses.length - numberOfSvgUseElementsToBypass > 0) && requestAnimationFrame(oninterval, 67);
        }
        var polyfill, opts = Object(rawopts), newerIEUA = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/, webkitUA = /\bAppleWebKit\/(\d+)\b/, olderEdgeUA = /\bEdge\/12\.(\d+)\b/, edgeUA = /\bEdge\/.(\d+)\b/, inIframe = window.top !== window.self;
        polyfill = "polyfill" in opts ? opts.polyfill : newerIEUA.test(navigator.userAgent) || (navigator.userAgent.match(olderEdgeUA) || [])[1] < 10547 || (navigator.userAgent.match(webkitUA) || [])[1] < 537 || edgeUA.test(navigator.userAgent) && inIframe;
        // create xhr requests object
        var requests = {}, requestAnimationFrame = window.requestAnimationFrame || setTimeout, uses = document.getElementsByTagName("use"), numberOfSvgUseElementsToBypass = 0;
        // conditionally start the interval if the polyfill is active
        polyfill && oninterval();
    }
    function getSVGAncestor(node) {
        for (var svg = node; "svg" !== svg.nodeName.toLowerCase() && (svg = svg.parentNode); ) {}
        return svg;
    }
    return svg4everybody;
});
},{}]},{},[2])
//# sourceMappingURL=script.js.map
