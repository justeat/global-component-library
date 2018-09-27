(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"@justeat/f-dom":3,"@justeat/f-validate":15}],2:[function(require,module,exports){
'use strict';

require('@justeat/f-footer');

var _fHeader = require('@justeat/f-header');

var _fozzie = require('@justeat/fozzie');

var _liteReady = require('lite-ready');

var _liteReady2 = _interopRequireDefault(_liteReady);

var _svg4everybody = require('svg4everybody');

var _svg4everybody2 = _interopRequireDefault(_svg4everybody);

var _formValidationSetup = require('./docs/formValidationSetup');

var _formValidationSetup2 = _interopRequireDefault(_formValidationSetup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _liteReady2.default)(function () {
    (0, _fozzie.stopFoit)();
    (0, _svg4everybody2.default)();
    (0, _formValidationSetup2.default)();
    (0, _fHeader.checkForUser)();
});

},{"./docs/formValidationSetup":1,"@justeat/f-footer":4,"@justeat/f-header":7,"@justeat/fozzie":27,"lite-ready":31,"svg4everybody":34}],3:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:!0});var _qwery=require('qwery'),_qwery2=_interopRequireDefault(_qwery);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}var first=function(a){var b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:null;return(0,_qwery2.default)(a,b)[0]},all=function(a){var b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:null;return(0,_qwery2.default)(a,b)},exists=function(a){var b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:null;return 0<(0,_qwery2.default)(a,b).length},dom=all;dom.all=all,dom.first=first,dom.exists=exists,exports.default=dom;
},{"qwery":33}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resizeInit = exports.tabindexResize = exports.collapseFooterPanels = undefined;

var _liteReady = require('lite-ready');

var _liteReady2 = _interopRequireDefault(_liteReady);

var _qwery = require('qwery');

var _qwery2 = _interopRequireDefault(_qwery);

var _fozzie = require('@justeat/fozzie');

var _lodash = require('lodash.debounce');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var footerPanels = void 0;
var breakpoints = null;

var tabindexResize = function tabindexResize() {

    if (breakpoints === null) {
        breakpoints = (0, _fozzie.getBreakpoints)();
    }

    if (window.matchMedia('(min-width: ' + breakpoints.mid + ')').matches) {
        footerPanels.forEach(function (panel) {
            panel.removeAttribute('tabindex');
        });
    } else {
        footerPanels.forEach(function (panel) {
            panel.tabIndex = 0;
        });
    }
};

var collapseFooterPanels = function collapseFooterPanels() {
    (0, _qwery2.default)('[data-panel-collapsible]').forEach(function (panel) {
        panel.classList.add('is-collapsed');
    });
};

var resizeInit = function resizeInit() {
    window.addEventListener('resize', (0, _lodash2.default)(tabindexResize, 100));
    footerPanels = (0, _qwery2.default)('[data-footer-panel-heading]');
    tabindexResize();
};

(0, _liteReady2.default)(function () {
    collapseFooterPanels();
    resizeInit();
});

exports.collapseFooterPanels = collapseFooterPanels;
exports.tabindexResize = tabindexResize;
exports.resizeInit = resizeInit;
},{"@justeat/fozzie":5,"lite-ready":31,"lodash.debounce":32,"qwery":33}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getCurrentScreenWidth = exports.getBreakpoints = undefined;

var _breakpointHelper = require('./modules/breakpointHelper');

exports.getBreakpoints = _breakpointHelper.getBreakpoints;
exports.getCurrentScreenWidth = _breakpointHelper.getCurrentScreenWidth; // All helper functions will be imported here, so that they can all be exported within one object.
},{"./modules/breakpointHelper":6}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/**
 * @overview Breakpoint handler
 *
 * @module breakpointHelper
 */

var getBreakpoints = exports.getBreakpoints = function getBreakpoints() {
    var output = {};

    // Append hidden element to body
    var screenSizer = document.createElement('div');
    screenSizer.classList.add('c-screen-sizer');

    document.body.appendChild(screenSizer);

    // It should have a 'content' property containing the breakpoints
    var breakpoints = window.getComputedStyle(document.querySelector('.c-screen-sizer')).getPropertyValue('content').replace(/["']/g, '').split(',');
    // Gives a list of breakpoints in the form ['narrow:414px', ...etc]

    // When there is no content, at this stage breakpoints should be ['']
    if (breakpoints.length === 1 && breakpoints[0] === '') {
        return output;
    }

    return breakpoints.reduce(function (prev, current) {
        // `current` is of the form 'narrow:414px'
        var _current$split = current.split(':'),
            _current$split2 = _slicedToArray(_current$split, 2),
            breakpointName = _current$split2[0],
            breakpointValue = _current$split2[1];

        prev[breakpointName] = breakpointValue; // <- the initial value is used for the first iteration
        // The object, e.g., { 'narrow': '414px' } is returned to be used as `prev` in the next iteration
        return prev;
    }, output); // <- initial value
};

var getCurrentScreenWidth = exports.getCurrentScreenWidth = function getCurrentScreenWidth() {
    var currentWidth = window.innerWidth;

    var breakpoints = getBreakpoints();

    // Order the breakpoints from widest to narrowest,
    // takes the form [['narrow', '414px'], [...etc]]
    var bps = [];
    Object.keys(breakpoints).forEach(function (key) {
        bps.unshift([key, breakpoints[key]]);
    });

    for (var i = 0; i < bps.length; i++) {
        // Loops through the breakpoints (in descending order)
        // returning the first one that is narrower than currentWidth.

        var breakpointWidth = parseInt(bps[i][1], 10); // This also strips the 'px' from the string

        if (i === bps.length - 1 || currentWidth > breakpointWidth) {
            // If we've reached the last breakpoint, and there still hasn't been a match, return the smallest breakpoint
            return bps[i][0];
        }
    }
    // If no breakpoints have been set
    return false;
};
},{}],7:[function(require,module,exports){
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
},{"./userAuth":8,"lite-ready":31}],8:[function(require,module,exports){
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
},{"./userData":9}],9:[function(require,module,exports){
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
},{}],10:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:!0}),exports.getDebugMode=exports.disableDebugMode=exports.enableDebugMode=exports.clearHistory=exports.getHistory=exports.errorLogInit=exports.logError=exports.logWarning=exports.log=void 0;var _Logger=require('./modules/Logger'),_Logger2=_interopRequireDefault(_Logger),_ErrorLogger=require('./modules/ErrorLogger'),_ErrorLogger2=_interopRequireDefault(_ErrorLogger);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}var debugMode=!1,logger=new _Logger2.default({debugMode:debugMode}),errorLogger=new _ErrorLogger2.default({logger:logger}),log=function(a){logger.log(a)},logError=function(a){errorLogger.log(a,'Error')},logWarning=function(a){errorLogger.log(a,'Warn')},getHistory=function(){logger.getPersistentData()},clearHistory=function(){logger.clearPersistentData()},enableDebugMode=function(){debugMode=!0,logger=new _Logger2.default({debugMode:debugMode}),errorLogger=new _ErrorLogger2.default({logger:logger})},disableDebugMode=function(){debugMode=!1,logger=new _Logger2.default({debugMode:debugMode}),errorLogger=new _ErrorLogger2.default({logger:logger})},errorLogInit=function(a){errorLogger.init(a)},getDebugMode=function(){return debugMode};exports.log=log,exports.logWarning=logWarning,exports.logError=logError,exports.errorLogInit=errorLogInit,exports.getHistory=getHistory,exports.clearHistory=clearHistory,exports.enableDebugMode=enableDebugMode,exports.disableDebugMode=disableDebugMode,exports.getDebugMode=getDebugMode;
},{"./modules/ErrorLogger":11,"./modules/Logger":12}],11:[function(require,module,exports){
'use strict';var _typeof='function'==typeof Symbol&&'symbol'==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&'function'==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?'symbol':typeof a},_createClass=function(){function a(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,'value'in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();Object.defineProperty(exports,'__esModule',{value:!0});function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}var ErrorLogger=function(){function a(b){_classCallCheck(this,a),this.config=b,this.logger=b.logger,this.debugMode=b.logger.debugMode,this.config.serverFileUrl=b.serverFileUrl||'/js/shared/js-error.js',this.config.loggerCallback=b.loggerCallback||null,this.config.winlogCallback=b.winlogCallback||null,this.bindOnError()}return _createClass(a,[{key:'log',value:function log(a,b,c){var d=window.location.toString(),e={pageUrl:d,Exception:a,Level:b};this.logger.log(e),this.debugMode||(this.logToServer(e),'function'==typeof this.config.loggerCallback&&('Error'===b?this.config.winlogCallback.call(this,a,d,c):this.config.loggerCallback.call(this,a,d)))}},{key:'init',value:function init(a){this.config.serverFileUrl=a.serverFileUrl||this.config.serverFileUrl,this.config.loggerCallback=a.loggerCallback||this.config.loggerCallback,this.config.winlogCallback=a.winlogCallback||this.config.winlogCallback}},{key:'logToServer',value:function logToServer(a){var b,c='';c='object'===('undefined'==typeof a?'undefined':_typeof(a))?JSON.stringify(a):a;var d=this.config.serverFileUrl+'?error='+encodeURIComponent(c);if(window.XMLHttpRequest)b=new XMLHttpRequest;else if(window.ActiveXObject)b=new ActiveXObject('Microsoft.XMLHTTP');else return;b.open('GET',d),b.send()}},{key:'bindOnError',value:function bindOnError(){var a=this;window.onerror=function(b,c,d,e,f){var g=b+' : '+c+' : Line '+d+' : Char '+e+' : StackTrace '+(f?f.stack:'');return a.log(g,'Error',d),!0}}}]),a}();exports.default=ErrorLogger;
},{}],12:[function(require,module,exports){
'use strict';var _typeof='function'==typeof Symbol&&'symbol'==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&'function'==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?'symbol':typeof a},_createClass=function(){function a(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,'value'in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();Object.defineProperty(exports,'__esModule',{value:!0});function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}var output=function(a){if('undefined'!=typeof window.console)window.console.log(a);else throw new Error('Console is not supported')},getPersistentData=function(){if(!localStorage)output('Local storage not available');else if(0<localStorage.length){var a,b,c,d;for(output('/***** Output local storage *****/'),a=0;a<localStorage.length;a++)b=+localStorage.key(a),c=localStorage[b],d=new Date(b),'Invalid Date'!==(d+'').valueOf()&&output(d+' => '+c);output('/***** End of local storage *****/')}else output('Local storage is empty')},clearPersistentData=function(){localStorage&&(localStorage.clear(),output('Local storage cleared'))},Logger=function(){function a(b){_classCallCheck(this,a),this.config=b,this.debugMode=this.config.debugMode,this.data={}}return _createClass(a,[{key:'log',value:function log(a){var b=a;if(this.debugMode){var c=Date.now().toString();this.data[c]=b,'object'===('undefined'==typeof localStorage?'undefined':_typeof(localStorage))&&(b=JSON.stringify(b),localStorage.setItem(c,b)),output(b)}}}]),a}();exports.getPersistentData=getPersistentData,exports.clearPersistentData=clearPersistentData,exports.default=Logger;
},{}],13:[function(require,module,exports){
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
},{}],14:[function(require,module,exports){
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
},{}],15:[function(require,module,exports){
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
                // only validate on blur/keyup if the field is not empty and is not required
                if (currentElement && (currentElement.field !== field || field.value === '' && !_rules2.default.required.condition(field))) {
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
},{"./callbacks":13,"./constants":14,"./messages":16,"./rules":21,"@justeat/f-dom":3}],16:[function(require,module,exports){
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
},{"./constants":14,"./rules":21,"@justeat/f-dom":3}],17:[function(require,module,exports){
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
},{"@justeat/f-dom":3}],18:[function(require,module,exports){
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
},{}],19:[function(require,module,exports){
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
},{"@justeat/f-dom":3}],20:[function(require,module,exports){
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
},{"../constants":14}],21:[function(require,module,exports){
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
},{"./conditionalRequired":17,"./custom":18,"./dateInFuture":19,"./email":20,"./matches":22,"./maxlength":23,"./minlength":24,"./pattern":25,"./required":26}],22:[function(require,module,exports){
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
},{"@justeat/f-dom":3}],23:[function(require,module,exports){
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
},{}],24:[function(require,module,exports){
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
},{}],25:[function(require,module,exports){
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
},{"../constants":14}],26:[function(require,module,exports){
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
},{"@justeat/f-dom":3}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getCurrentScreenWidth = exports.getBreakpoints = exports.stopFoit = undefined;

var _stopFoit = require('./modules/stopFoit');

var _breakpointHelper = require('./modules/breakpointHelper');

exports.stopFoit = _stopFoit.stopFoit;
exports.getBreakpoints = _breakpointHelper.getBreakpoints;
exports.getCurrentScreenWidth = _breakpointHelper.getCurrentScreenWidth;

// All helper functions will be imported here, so that they can all be exported within one object.
},{"./modules/breakpointHelper":28,"./modules/stopFoit":29}],28:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.stopFoit = undefined;

var _fontfaceobserver = require('fontfaceobserver');

var _fontfaceobserver2 = _interopRequireDefault(_fontfaceobserver);

var _fLogger = require('@justeat/f-logger');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @overview stopFOIT reduces the amount of time a user has invisible text when using webfonts.
 *
 * @module stopFOIT
 */

/**
* Init method initialises the FontFaceObserver events
*
*/

var stopFoit = exports.stopFoit = function stopFoit() {
    // Create a new `FontFaceObserver` for each webfont
    var baseFont = new _fontfaceobserver2.default('Hind Vadodara');
    var headingFont = new _fontfaceobserver2.default('Ubuntu');

    // On load of each font we add `has-fontsLoaded` class with the font type modifier
    baseFont.load(null, 3000).then(function () {
        document.body.classList.remove('is-fontsLoading--base');
    }).catch(function () {
        (0, _fLogger.logError)('Custom font is unable to load');
    });

    headingFont.load(null, 3000).then(function () {
        document.body.classList.remove('is-fontsLoading--heading');
    }).catch(function () {
        (0, _fLogger.logError)('Custom font is unable to load');
    });
};

exports.default = stopFoit;
},{"@justeat/f-logger":10,"fontfaceobserver":30}],30:[function(require,module,exports){
/* Font Face Observer v2.0.13 - © Bram Stein. License: BSD-3-Clause */(function(){function l(a,b){document.addEventListener?a.addEventListener("scroll",b,!1):a.attachEvent("scroll",b)}function m(a){document.body?a():document.addEventListener?document.addEventListener("DOMContentLoaded",function c(){document.removeEventListener("DOMContentLoaded",c);a()}):document.attachEvent("onreadystatechange",function k(){if("interactive"==document.readyState||"complete"==document.readyState)document.detachEvent("onreadystatechange",k),a()})};function r(a){this.a=document.createElement("div");this.a.setAttribute("aria-hidden","true");this.a.appendChild(document.createTextNode(a));this.b=document.createElement("span");this.c=document.createElement("span");this.h=document.createElement("span");this.f=document.createElement("span");this.g=-1;this.b.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";this.c.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";
this.f.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";this.h.style.cssText="display:inline-block;width:200%;height:200%;font-size:16px;max-width:none;";this.b.appendChild(this.h);this.c.appendChild(this.f);this.a.appendChild(this.b);this.a.appendChild(this.c)}
function t(a,b){a.a.style.cssText="max-width:none;min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;white-space:nowrap;font-synthesis:none;font:"+b+";"}function y(a){var b=a.a.offsetWidth,c=b+100;a.f.style.width=c+"px";a.c.scrollLeft=c;a.b.scrollLeft=a.b.scrollWidth+100;return a.g!==b?(a.g=b,!0):!1}function z(a,b){function c(){var a=k;y(a)&&a.a.parentNode&&b(a.g)}var k=a;l(a.b,c);l(a.c,c);y(a)};function A(a,b){var c=b||{};this.family=a;this.style=c.style||"normal";this.weight=c.weight||"normal";this.stretch=c.stretch||"normal"}var B=null,C=null,E=null,F=null;function G(){if(null===C)if(J()&&/Apple/.test(window.navigator.vendor)){var a=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))(?:\.([0-9]+))/.exec(window.navigator.userAgent);C=!!a&&603>parseInt(a[1],10)}else C=!1;return C}function J(){null===F&&(F=!!document.fonts);return F}
function K(){if(null===E){var a=document.createElement("div");try{a.style.font="condensed 100px sans-serif"}catch(b){}E=""!==a.style.font}return E}function L(a,b){return[a.style,a.weight,K()?a.stretch:"","100px",b].join(" ")}
A.prototype.load=function(a,b){var c=this,k=a||"BESbswy",q=0,D=b||3E3,H=(new Date).getTime();return new Promise(function(a,b){if(J()&&!G()){var M=new Promise(function(a,b){function e(){(new Date).getTime()-H>=D?b():document.fonts.load(L(c,'"'+c.family+'"'),k).then(function(c){1<=c.length?a():setTimeout(e,25)},function(){b()})}e()}),N=new Promise(function(a,c){q=setTimeout(c,D)});Promise.race([N,M]).then(function(){clearTimeout(q);a(c)},function(){b(c)})}else m(function(){function u(){var b;if(b=-1!=
f&&-1!=g||-1!=f&&-1!=h||-1!=g&&-1!=h)(b=f!=g&&f!=h&&g!=h)||(null===B&&(b=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent),B=!!b&&(536>parseInt(b[1],10)||536===parseInt(b[1],10)&&11>=parseInt(b[2],10))),b=B&&(f==v&&g==v&&h==v||f==w&&g==w&&h==w||f==x&&g==x&&h==x)),b=!b;b&&(d.parentNode&&d.parentNode.removeChild(d),clearTimeout(q),a(c))}function I(){if((new Date).getTime()-H>=D)d.parentNode&&d.parentNode.removeChild(d),b(c);else{var a=document.hidden;if(!0===a||void 0===a)f=e.a.offsetWidth,
g=n.a.offsetWidth,h=p.a.offsetWidth,u();q=setTimeout(I,50)}}var e=new r(k),n=new r(k),p=new r(k),f=-1,g=-1,h=-1,v=-1,w=-1,x=-1,d=document.createElement("div");d.dir="ltr";t(e,L(c,"sans-serif"));t(n,L(c,"serif"));t(p,L(c,"monospace"));d.appendChild(e.a);d.appendChild(n.a);d.appendChild(p.a);document.body.appendChild(d);v=e.a.offsetWidth;w=n.a.offsetWidth;x=p.a.offsetWidth;I();z(e,function(a){f=a;u()});t(e,L(c,'"'+c.family+'",sans-serif'));z(n,function(a){g=a;u()});t(n,L(c,'"'+c.family+'",serif'));
z(p,function(a){h=a;u()});t(p,L(c,'"'+c.family+'",monospace'))})})};"object"===typeof module?module.exports=A:(window.FontFaceObserver=A,window.FontFaceObserver.prototype.load=A.prototype.load);}());

},{}],31:[function(require,module,exports){
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

},{}],32:[function(require,module,exports){
(function (global){
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = debounce;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],33:[function(require,module,exports){
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

},{}],34:[function(require,module,exports){
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
