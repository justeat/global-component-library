(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setupValidation;

var _fDom = _interopRequireDefault(require("@justeat/f-dom"));

var _fValidate = _interopRequireDefault(require("@justeat/f-validate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Runs f-validate on any forms in the docs
 * tagged with the `test-form` or `test-form-group` name
 */
function setupValidation() {
  var testForms = _fDom.default.all('form[name="test-form"');

  if (testForms.length > 0) {
    testForms.forEach(function (form) {
      var validateForm = new _fValidate.default(form);
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

  var testGroupForms = _fDom.default.all('form[name="test-form-group"');

  if (testGroupForms.length > 0) {
    testGroupForms.forEach(function (form) {
      var validateForm = new _fValidate.default(form, {
        // eslint-disable-line no-unused-vars
        groupErrorPlacement: 'bottom'
      });
      form.addEventListener('submit', function (e) {
        e.preventDefault();
      });
    });
  }
}

},{"@justeat/f-dom":3,"@justeat/f-validate":23}],2:[function(require,module,exports){
"use strict";

require("@justeat/f-footer");

var _fHeader = require("@justeat/f-header");

var _fozzie = require("@justeat/fozzie");

var _liteReady = _interopRequireDefault(require("lite-ready"));

var _svg4everybody = _interopRequireDefault(require("svg4everybody"));

var utils = _interopRequireWildcard(require("@justeat/f-utilities"));

var _formValidationSetup = _interopRequireDefault(require("./docs/formValidationSetup"));

require("picturefill");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _liteReady.default)(function () {
  (0, _fozzie.stopFoit)();
  (0, _svg4everybody.default)();
  (0, _formValidationSetup.default)();
  (0, _fHeader.checkForUser)();
  utils.cookieBanner.init('#CookieAnchor');
});

},{"./docs/formValidationSetup":1,"@justeat/f-footer":4,"@justeat/f-header":8,"@justeat/f-utilities":14,"@justeat/fozzie":35,"lite-ready":39,"picturefill":42,"svg4everybody":44}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _qwery = _interopRequireDefault(require("qwery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Returns first element in the DOM for the specified selector.
*
* @param {string} selector
* @param {string} root (optional) - if defined, search is performed relatively from this element
*
* @return {Element}
*/
var first = function first(selector) {
  var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return (0, _qwery.default)(selector, root)[0];
};
/**
* Returns all elements in the DOM for the specified selector.
*
* @param {string} selector
* @param {string} root (optional) - if defined, search is performed relatively from this element
*
* @return {Array.<Element>}
*/


var all = function all(selector) {
  var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return (0, _qwery.default)(selector, root);
};
/**
* Returns true, if at least one element exists in the DOM, otherwise returns false.
*
* @param {string} selector
* @param {string} root (optional) - if defined, search is performed relatively from this element
*
* @return {boolean}
*/


var exists = function exists(selector) {
  var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return (0, _qwery.default)(selector, root).length > 0;
};
/**
* Returns all elements in the DOM for the specified selector. Short syntax of `all` method.
*
* @param {string} selector
* @param {string} root (optional) - if defined, search is performed relatively from this element
*
* @return {Array.<Element>}
*/


var dom = all;
dom.all = all;
dom.first = first;
dom.exists = exists;
var _default = dom;
exports.default = _default;
},{"qwery":43}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resizeInit = exports.tabindexResize = exports.collapseFooterPanels = void 0;

var _liteReady = _interopRequireDefault(require("lite-ready"));

var _qwery = _interopRequireDefault(require("qwery"));

var _fozzie = require("@justeat/fozzie");

var _lodash = _interopRequireDefault(require("lodash.debounce"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var footerPanels;
var breakpoints = null;

var tabindexResize = function tabindexResize() {
  if (breakpoints === null) {
    breakpoints = (0, _fozzie.getBreakpoints)();
  }

  if (window.matchMedia("(min-width: ".concat(breakpoints.wide, ")")).matches) {
    footerPanels.forEach(function (panel) {
      panel.removeAttribute('tabindex');
    });
  } else {
    footerPanels.forEach(function (panel) {
      panel.tabIndex = 0;
    });
  }
};

exports.tabindexResize = tabindexResize;

var collapseFooterPanels = function collapseFooterPanels() {
  (0, _qwery.default)('[data-panel-collapsible]').forEach(function (panel) {
    panel.classList.add('is-collapsed');
  });
};

exports.collapseFooterPanels = collapseFooterPanels;

var resizeInit = function resizeInit() {
  window.addEventListener('resize', (0, _lodash.default)(tabindexResize, 100));
  footerPanels = (0, _qwery.default)('[data-footer-panel-heading]');
  tabindexResize();
};

exports.resizeInit = resizeInit;
(0, _liteReady.default)(function () {
  collapseFooterPanels();
  resizeInit();
});
},{"@justeat/fozzie":5,"lite-ready":39,"lodash.debounce":40,"qwery":43}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "stopFoit", {
  enumerable: true,
  get: function get() {
    return _stopFoit.stopFoit;
  }
});
Object.defineProperty(exports, "getBreakpoints", {
  enumerable: true,
  get: function get() {
    return _breakpointHelper.getBreakpoints;
  }
});
Object.defineProperty(exports, "getCurrentScreenWidth", {
  enumerable: true,
  get: function get() {
    return _breakpointHelper.getCurrentScreenWidth;
  }
});
Object.defineProperty(exports, "isWithinBreakpoint", {
  enumerable: true,
  get: function get() {
    return _breakpointHelper.isWithinBreakpoint;
  }
});

var _stopFoit = require("./modules/stopFoit");

var _breakpointHelper = require("./modules/breakpointHelper");
},{"./modules/breakpointHelper":6,"./modules/stopFoit":7}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isWithinBreakpoint = exports.getCurrentScreenWidth = exports.createBreakpointArray = exports.getBreakpoints = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * @overview Breakpoint handler
 *
 * @module breakpointHelper
 */
var getBreakpoints = function getBreakpoints() {
  var output = {}; // Append hidden element to body

  var screenSizer = document.createElement('div');
  screenSizer.classList.add('c-screen-sizer');
  document.body.appendChild(screenSizer); // It should have a 'content' property containing the breakpoints

  var breakpoints = window.getComputedStyle(document.querySelector('.c-screen-sizer')).getPropertyValue('content').replace(/["']/g, '').split(','); // Gives a list of breakpoints in the form ['narrow:414px', ...etc]
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

exports.getBreakpoints = getBreakpoints;

var createBreakpointArray = function createBreakpointArray(breakpoints) {
  // Order the breakpoints from widest to narrowest,
  // takes the form [['narrow', '414px'], [...etc]]
  var bps = [];
  Object.keys(breakpoints).forEach(function (key) {
    bps.unshift([key, breakpoints[key]]);
  });
  return bps;
};

exports.createBreakpointArray = createBreakpointArray;

var getCurrentScreenWidth = function getCurrentScreenWidth() {
  var currentWidth = window.innerWidth;
  var breakpoints = getBreakpoints();
  var bps = createBreakpointArray(breakpoints);

  for (var i = 0; i < bps.length; i++) {
    // Loops through the breakpoints (in descending order)
    // returning the first one that is narrower than currentWidth.
    var breakpointWidth = parseInt(bps[i][1], 10); // This also strips the 'px' from the string

    if (i === bps.length - 1 || currentWidth > breakpointWidth) {
      // If we've reached the last breakpoint, and there still hasn't been a match, return the smallest breakpoint
      return bps[i][0];
    }
  } // If no breakpoints have been set


  return false;
};

exports.getCurrentScreenWidth = getCurrentScreenWidth;

var isWithinBreakpoint = function isWithinBreakpoint(breakpointString) {
  var operatorRegex = /[<>=]+/;
  var operatorMatch = breakpointString.match(operatorRegex);
  var operator = operatorMatch ? operatorMatch[0] : '';

  var _breakpointString$spl = breakpointString.split(operatorRegex),
      _breakpointString$spl2 = _slicedToArray(_breakpointString$spl, 2),
      breakpoint = _breakpointString$spl2[1];

  var currentScreenWidth = window.innerWidth;
  var breakpoints = getBreakpoints();
  var bps = createBreakpointArray(breakpoints); // We loop through the breakpoint array until we get a match.
  // If we match we return the px value as an int. If we do not match we return false

  var breakpointToPX = function breakpointToPX(breakpointName) {
    var match = false;
    bps.forEach(function (bp) {
      if (bp[0] === breakpointName) {
        match = parseInt(bp[1], 10);
      }
    });
    return match;
  };

  var breakpointInPX = breakpointToPX(breakpoint); // If the breakpoint passed in does not match any we;

  if (!breakpointInPX) {
    return false;
  }

  var mediaQuery = {
    '>': currentScreenWidth > breakpointInPX,
    '<': currentScreenWidth < breakpointInPX,
    '=': currentScreenWidth === breakpointInPX,
    '>=': currentScreenWidth >= breakpointInPX,
    '<=': currentScreenWidth <= breakpointInPX
  };
  var result = mediaQuery[operator];

  if (result == null) {
    return false;
  }

  return result;
};

exports.isWithinBreakpoint = isWithinBreakpoint;
},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.stopFoit = void 0;

var _fontfaceobserver = _interopRequireDefault(require("fontfaceobserver"));

var _fLogger = require("@justeat/f-logger");

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
var stopFoit = function stopFoit() {
  // Create a new `FontFaceObserver` for each webfont
  var baseFont = new _fontfaceobserver.default('Hind Vadodara');
  var headingFont = new _fontfaceobserver.default('Ubuntu'); // On load of each font we add `has-fontsLoaded` class with the font type modifier

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

exports.stopFoit = stopFoit;
var _default = stopFoit;
exports.default = _default;
},{"@justeat/f-logger":11,"fontfaceobserver":38}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "checkForUser", {
  enumerable: true,
  get: function get() {
    return _userAuth.checkForUser;
  }
});
exports.setupHeader = void 0;

var _liteReady = _interopRequireDefault(require("lite-ready"));

var _userAuth = require("./userAuth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @overview Fozzie header JavaScript behaviour.
 *
 * @module f-header
 */
var CLASSNAMES = {
  headerTransparent: 'c-header--transparent'
};
/**
 * Setup the behaviour for the header component.
 */

var setupHeader = function setupHeader() {
  var headerEl = document.querySelector('[data-header]');
  var navButton = document.querySelector('[data-nav-button]');
  var navToggleLabel = document.querySelector('[data-nav-toggle]');
  var navToggleCheckbox = document.querySelector('[data-nav-accessible-button]');

  if (navButton) {
    navButton.addEventListener('click', function () {
      var navContainer = document.querySelector('[data-nav-container]');

      if (navContainer) {
        navContainer.classList.toggle('is-visible');
      }

      if (navToggleLabel) {
        navToggleLabel.classList.toggle('is-open');
      } // This is added to remove the ability to scroll the page content when the mobile navigation is open


      document.documentElement.classList.toggle('is-navInView'); // If the header is already fixed/absolute (as it is when the header is transparent)
      // then the content doesn't need to be padded down when the nav comes into view, as it's already flush with the top of the screen

      if (headerEl && headerEl.classList.contains(CLASSNAMES.headerTransparent)) {
        document.documentElement.classList.toggle('is-navInView--noPad');
      }
    });
  } // make sure that hamburger menu is closed when the user navigates back to the page


  if (navToggleCheckbox) {
    navToggleCheckbox.checked = false;
  } // setup click event on the navigation label, as the button is hidden by default (as used for tabbing only)


  if (navToggleLabel) {
    navToggleLabel.addEventListener('click', function () {
      navButton.click();
    });
  }
};

exports.setupHeader = setupHeader;
(0, _liteReady.default)(function () {
  setupHeader();
});
},{"./userAuth":9,"lite-ready":39}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkForUser = void 0;

var _fLogger = require("@justeat/f-logger");

var _userData = _interopRequireDefault(require("./userData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @overview Authorisation handler
 *
 * @module userAuth
 */
var removeElement = function removeElement(element) {
  return element && element.remove();
};

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


var checkForUser = function checkForUser() {
  var authEl = document.querySelector('[data-auth-wrapper]'); // if our auth wrapper exists, get our user details

  if (authEl) {
    // this fetch logic will be extracted to a new module
    return fetch('/api/account/details', {
      method: 'GET',
      credentials: 'same-origin'
    }).then(function (response) {
      return response.json();
    }).then(updateDom).then(_userData.default) // should send this error to the f-logger but for now, just erroring here inline
    .catch(function (error) {
      (0, _fLogger.logError)(error);
    });
  }

  return Promise.resolve();
};

exports.checkForUser = checkForUser;
},{"./userData":10,"@justeat/f-logger":11}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveUserData = void 0;

var _fLogger = require("@justeat/f-logger");

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
  return window.dataLayer.push({
    userData: userData
  });
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
      (0, _fLogger.logError)("Unable to get order count. ".concat(err));
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
    return /^true$/i.test(supportedEl.value);
  }

  return Promise.reject();
};

var saveUserData = function saveUserData(authData) {
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

exports.saveUserData = saveUserData;
},{"@justeat/f-logger":11}],11:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:!0}),exports.getDebugMode=exports.disableDebugMode=exports.enableDebugMode=exports.clearHistory=exports.getHistory=exports.errorLogInit=exports.logError=exports.logWarning=exports.log=void 0;var _Logger=require('./modules/Logger'),_Logger2=_interopRequireDefault(_Logger),_ErrorLogger=require('./modules/ErrorLogger'),_ErrorLogger2=_interopRequireDefault(_ErrorLogger);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}var debugMode=!1,logger=new _Logger2.default({debugMode:debugMode}),errorLogger=new _ErrorLogger2.default({logger:logger}),log=function(a){logger.log(a)},logError=function(a){errorLogger.log(a,'Error')},logWarning=function(a){errorLogger.log(a,'Warn')},getHistory=function(){logger.getPersistentData()},clearHistory=function(){logger.clearPersistentData()},enableDebugMode=function(){debugMode=!0,logger=new _Logger2.default({debugMode:debugMode}),errorLogger=new _ErrorLogger2.default({logger:logger})},disableDebugMode=function(){debugMode=!1,logger=new _Logger2.default({debugMode:debugMode}),errorLogger=new _ErrorLogger2.default({logger:logger})},errorLogInit=function(a){errorLogger.init(a)},getDebugMode=function(){return debugMode};exports.log=log,exports.logWarning=logWarning,exports.logError=logError,exports.errorLogInit=errorLogInit,exports.getHistory=getHistory,exports.clearHistory=clearHistory,exports.enableDebugMode=enableDebugMode,exports.disableDebugMode=disableDebugMode,exports.getDebugMode=getDebugMode;
},{"./modules/ErrorLogger":12,"./modules/Logger":13}],12:[function(require,module,exports){
'use strict';var _typeof='function'==typeof Symbol&&'symbol'==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&'function'==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?'symbol':typeof a},_createClass=function(){function a(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,'value'in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();Object.defineProperty(exports,'__esModule',{value:!0});function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}var ErrorLogger=function(){function a(b){_classCallCheck(this,a),this.config=b,this.logger=b.logger,this.debugMode=b.logger.debugMode,this.config.serverFileUrl=b.serverFileUrl||'/js/shared/js-error.js',this.config.loggerCallback=b.loggerCallback||null,this.config.winlogCallback=b.winlogCallback||null,this.bindOnError()}return _createClass(a,[{key:'log',value:function log(a,b,c){var d=window.location.toString(),e={pageUrl:d,Exception:a,Level:b};this.logger.log(e),this.debugMode||(this.logToServer(e),'function'==typeof this.config.loggerCallback&&('Error'===b?this.config.winlogCallback.call(this,a,d,c):this.config.loggerCallback.call(this,a,d)))}},{key:'init',value:function init(a){this.config.serverFileUrl=a.serverFileUrl||this.config.serverFileUrl,this.config.loggerCallback=a.loggerCallback||this.config.loggerCallback,this.config.winlogCallback=a.winlogCallback||this.config.winlogCallback}},{key:'logToServer',value:function logToServer(a){var b,c='';c='object'===('undefined'==typeof a?'undefined':_typeof(a))?JSON.stringify(a):a;var d=this.config.serverFileUrl+'?error='+encodeURIComponent(c);if(window.XMLHttpRequest)b=new XMLHttpRequest;else if(window.ActiveXObject)b=new ActiveXObject('Microsoft.XMLHTTP');else return;b.open('GET',d),b.send()}},{key:'bindOnError',value:function bindOnError(){var a=this;window.onerror=function(b,c,d,e,f){var g=b+' : '+c+' : Line '+d+' : Char '+e+' : StackTrace '+(f?f.stack:'');return a.log(g,'Error',d),!0}}}]),a}();exports.default=ErrorLogger;
},{}],13:[function(require,module,exports){
'use strict';var _typeof='function'==typeof Symbol&&'symbol'==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&'function'==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?'symbol':typeof a},_createClass=function(){function a(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,'value'in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();Object.defineProperty(exports,'__esModule',{value:!0});function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}var output=function(a){if('undefined'!=typeof window.console)window.console.log(a);else throw new Error('Console is not supported')},getPersistentData=function(){if(!localStorage)output('Local storage not available');else if(0<localStorage.length){var a,b,c,d;for(output('/***** Output local storage *****/'),a=0;a<localStorage.length;a++)b=+localStorage.key(a),c=localStorage[b],d=new Date(b),'Invalid Date'!==(d+'').valueOf()&&output(d+' => '+c);output('/***** End of local storage *****/')}else output('Local storage is empty')},clearPersistentData=function(){localStorage&&(localStorage.clear(),output('Local storage cleared'))},Logger=function(){function a(b){_classCallCheck(this,a),this.config=b,this.debugMode=this.config.debugMode,this.data={}}return _createClass(a,[{key:'log',value:function log(a){var b=a;if(this.debugMode){var c=Date.now().toString();this.data[c]=b,'object'===('undefined'==typeof localStorage?'undefined':_typeof(localStorage))&&(b=JSON.stringify(b),localStorage.setItem(c,b)),output(b)}}}]),a}();exports.getPersistentData=getPersistentData,exports.clearPersistentData=clearPersistentData,exports.default=Logger;
},{}],14:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:!0}),exports.elementHelper=exports.cookieBanner=exports.lazyLoad=exports.formReset=void 0;var _formReset=require('./modules/formReset'),_formReset2=_interopRequireDefault(_formReset),_lazyLoad=require('./modules/lazyLoad'),_lazyLoad2=_interopRequireDefault(_lazyLoad),_cookieBanner=require('./modules/cookieBanner'),_cookieBanner2=_interopRequireDefault(_cookieBanner),_elementHelper=require('./modules/elementHelper'),_elementHelper2=_interopRequireDefault(_elementHelper);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}exports.formReset=_formReset2.default,exports.lazyLoad=_lazyLoad2.default,exports.cookieBanner=_cookieBanner2.default,exports.elementHelper=_elementHelper2.default;
},{"./modules/cookieBanner":15,"./modules/elementHelper":17,"./modules/formReset":18,"./modules/lazyLoad":19}],15:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:!0});var _translations=require('./translations'),anchorElement={},cookieName='je-banner_cookie',cookieBannerMarkup='\n    <div class="c-cookieWarning">\n        <div class="c-cookieWarning-inner">\n            '+(0,_translations.getBodyTranslation)()+'\n            <button class="c-cookieWarning-btn" data-test-id="cookieBanner-close-button" aria-label="Close"></button>\n        </div>\n    </div>',hideBanner=function(){var a=document.querySelector('.c-cookieWarning');a.classList.contains('is-hidden')||(a.classList.add('is-hidden'),document.cookie='je-banner_cookie=130315')},createBannerElements=function(){anchorElement.insertAdjacentHTML('beforeend',cookieBannerMarkup);var a=document.querySelector('.c-cookieWarning-btn');a.addEventListener('click',function(){return hideBanner()})},init=function(a){var b=-1!==document.cookie.indexOf(cookieName);if(!b){if(anchorElement=document.querySelector(a),!anchorElement)throw new Error('no matching element found to anchor cookie banner');createBannerElements()}};exports.default={init:init};
},{"./translations":16}],16:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:!0}),exports.getBodyTranslation=getBodyTranslation;var tranlsations={"en-GB":'<p>We use cookies to improve your browsing experience. By continuing, you agree to receive cookies on our website. <a class="c-cookieWarning-link" href="/cookies-policy">Learn more about our cookies policy.</a></p>',"es-ES":'<p class="u-hideTextOverflow--narrow">Just Eat utiliza cookies para mejorar tu experiencia en la p\xE1gina. Si contin\xFAas navegando consideramos que aceptas su uso, si no es as\xED puedes limitar la configuraci\xF3n de cookies en tu explorador. Lee nuestra <a href="/cookies-policy">pol\xEDtica sobre cookies</a> para m\xE1s informaci\xF3n</p>',"it-IT":'<p class="u-hideTextOverflow--narrow"><span style="font-weight: bold;">JUST EAT</span> utilizza cookie di profilazione, propri e di terzi, per inviarti pubblicit\xE0 online in funzione delle tue preferenze manifestate nella navigazione e consentirti una miglior esperienza di navigazione. Se accedi ad un qualunque elemento del sito sottostante acconsenti all\u2019uso di tali cookie. Per avere maggiori informazioni su come noi, o i terzi, usiamo i cookie, sapere come negare il consenso a tutti o solo alcuni cookie, e come impostare il proprio browser si prega di leggere la nostra <a href="/cookies-policy">cookie policy</a></p>',"en-IE":'<p class="u-hideTextOverflow--narrow"><span style="font-weight: bold;">Updated cookies policy:</span> Just Eat uses cookies to improve your browsing experience. If you continue, we\'ll assume that you are happy to receive cookies on our website. You can change your browser\'s cookie settings at any time. To find out more about how we use cookies and how to manage your browser settings read our <a href="/cookies-policy"> cookies policy</a>.</p>',"da-DK":'<p class="u-hideTextOverflow--narrow"><span style="font-weight: bold;">JUST EAT</span> anvender cookies til at forbedre din brugeroplevelse og til at g\xF8re det muligt for dig at bestille mad. Hvis du forts\xE6tter brugen af hjemmesiden, antager vi, at du er indforst\xE5et med og accepterer at modtage cookies fra JUST EAT hjemmesiden. Hvis du \xF8nsker det, kan du \xE6ndre dine cookie-indstillinger i din browser p\xE5 ethvert tidspunkt. L\xE6s vores cookiebetingelser for mere information <a href="/cookies-policy"> her</a>.</p>',fr:'<p>En poursuivant votre navigation sur notre site, vous acceptez l\'utilisation de cookies. Pour en savoir plus &nbsp;<a href="https://www.just-eat.fr/accept-cookie-policy" data-url="https://www.just-eat.fr/accept-cookie-policy">cliquez-ici.</a></p>'};function getBodyTranslation(){var a=document.querySelector('html').lang;return tranlsations[a]||tranlsations['en-GB']}
},{}],17:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:!0});var hide=function(a){a.classList.add('is-hidden')},hideVisually=function(a){a.classList.add('is-visuallyHidden')},hideVisibility=function(a){a.classList.add('is-invisible')},show=function(a){a.classList.remove('is-hidden'),a.classList.remove('is-visuallyHidden'),a.classList.remove('is-invisible')},toggle=function(a,b){a&&('undefined'==typeof b?a.classList.contains('is-hidden')?show(a):hide(a):b?show(a):hide(a))};exports.default={hide:hide,hideVisually:hideVisually,hideVisibility:hideVisibility,show:show,toggle:toggle};
},{}],18:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:!0}),exports.init=exports.resetInputs=void 0;var _fDom=require('@justeat/f-dom'),_fDom2=_interopRequireDefault(_fDom);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}var resetInputs=exports.resetInputs=function(a){var b=a.target,c=b.getAttribute('data-js-reset'),d=(0,_fDom2.default)('[data-js-reset-input="'+c+'"]');d.forEach(function(a){if(a.checked){a.checked=!1;var b=new Event('change');return void a.dispatchEvent(b)}0<a.value.length&&(a.value='')})},init=exports.init=function(){var a=(0,_fDom2.default)('[data-js-reset]');0<a.length&&a.forEach(function(a){a.addEventListener('click',function(a){return resetInputs(a)})})};exports.default=init;
},{"@justeat/f-dom":20}],19:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:!0}),exports.init=exports.lazyLoadItems=exports.inViewport=exports.swapAttribute=void 0;var _fDom=require('@justeat/f-dom'),_fDom2=_interopRequireDefault(_fDom),_lodash=require('lodash.throttle'),_lodash2=_interopRequireDefault(_lodash);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}var lazyLoadElements=void 0,swapAttribute=exports.swapAttribute=function(a){var b=a.getAttribute('data-js-lazy-src');return!!b&&(a.setAttribute('src',b),!0)},inViewport=exports.inViewport=function(a){var b=a.getBoundingClientRect();return-250<=b.bottom&&0<=b.right&&b.top<=window.innerHeight+250&&b.left<=window.innerWidth},lazyLoadItems=exports.lazyLoadItems=function(a){return!!Array.isArray(a)&&(a.forEach(function(a){var b=inViewport(a);b&&(swapAttribute(a),lazyLoadElements=lazyLoadElements.filter(function(b){return b!==a}))}),!0)},init=exports.init=function(){return lazyLoadElements=(0,_fDom2.default)('[data-js-lazy]'),!!(0<lazyLoadElements.length)&&(lazyLoadItems(lazyLoadElements),window.addEventListener('scroll',(0,_lodash2.default)(function(){lazyLoadItems(lazyLoadElements)},125)),window.addEventListener('resize',(0,_lodash2.default)(function(){lazyLoadItems(lazyLoadElements)},250)),window.addEventListener('lazyload',function(){lazyLoadItems(lazyLoadElements)}),!0)};exports.default=init;
},{"@justeat/f-dom":20,"lodash.throttle":41}],20:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:!0});var _qwery=require('qwery'),_qwery2=_interopRequireDefault(_qwery);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}var first=function(a){var b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:null;return(0,_qwery2.default)(a,b)[0]},all=function(a){var b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:null;return(0,_qwery2.default)(a,b)},exists=function(a){var b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:null;return 0<(0,_qwery2.default)(a,b).length},dom=all;dom.all=all,dom.first=first,dom.exists=exists,exports.default=dom;
},{"qwery":43}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runCallbacks = exports.addCallBack = void 0;

var addCallBack = function addCallBack(callBacks, callBack) {
  if (typeof callBack !== 'function') {
    throw new TypeError('call back is not a function');
  }

  callBacks.push(callBack);
};

exports.addCallBack = addCallBack;

var runCallbacks = function runCallbacks(callBacks) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  if (!callBacks) {
    return;
  }

  callBacks.forEach(function (callback) {
    callback.apply(void 0, args);
  });
};

exports.runCallbacks = runCallbacks;
},{}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var cssClasses = {
  isHidden: 'is-hidden',
  formError: 'form-error',
  formErrors: 'form-errors',
  hasError: 'has-error',
  hasSuccess: 'has-success'
};
var validationGroup = 'data-val-group';
var _default = {
  cssClasses: cssClasses,
  email: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  escapeChars: /[|\\{}()[\]^$+*?.]/g,
  fieldValues: "input, select, textarea, [".concat(validationGroup, "]"),
  validationGroup: validationGroup,
  blurredAttr: 'data-blurred',
  validateOnOptions: ['blur', 'keyup']
};
exports.default = _default;
},{}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.defaultOptions = void 0;

var _fDom = _interopRequireDefault(require("@justeat/f-dom"));

var _rules = _interopRequireDefault(require("./rules"));

var _callbacks = require("./callbacks");

var _messages = require("./messages");

var _constants = _interopRequireDefault(require("./constants"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// Load in the set of test definitions to validate against
var VALIDATION_KEYS = Object.keys(_rules.default);
var defaultOptions = {
  errorClass: _constants.default.cssClasses.hasError,
  successClass: _constants.default.cssClasses.hasSuccess,
  focus: false,
  groupErrorPlacement: false,
  enableHTML5Validation: false,
  hybridMode: false // setups both onblur and onkeydown events

};
exports.defaultOptions = defaultOptions;

var getForm = function getForm(descriptor) {
  if (!descriptor) {
    throw new Error('f-validate: expected form name or form node parameter');
  }

  var form = _typeof(descriptor) === 'object' && descriptor.tagName === 'FORM' ? descriptor : document.forms[descriptor];

  if (!form) {
    throw new Error('f-validate: form not found');
  }

  return form;
};

var elementsUntouched = function elementsUntouched(element, current, touchedSelectors) {
  var notInErrorState = !current.field.classList.contains(_constants.default.cssClasses.hasError);
  var elementsNotTouched = touchedSelectors.map(function (childSelector) {
    return _fDom.default.first(childSelector, element);
  }).filter(function (el) {
    return el && !el.hasAttribute('data-touched');
  }); // If one select has not been interacted with do not run test method

  return notInErrorState && elementsNotTouched.length > 0;
};

var FormValidation =
/*#__PURE__*/
function () {
  function FormValidation(nameOrNode) {
    var _this = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, FormValidation);

    this.options = Object.assign({}, defaultOptions, options);
    this.form = getForm(nameOrNode);
    this.fields = this.getFields(); // Allow fields to be validated on 'enter'

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

    if (this.options.onElementError) {
      this.on('elementError', this.options.onElementError);
    }

    if (this.options.validateOn) {
      this.validateOn();
    }

    if (this.options.hybridMode) {
      this.setupHybridValidate();
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
    key: "on",
    value: function on(callBackEvent, callBack) {
      if (!this.callBacks[callBackEvent]) {
        this.callBacks[callBackEvent] = [];
      }

      try {
        (0, _callbacks.addCallBack)(this.callBacks[callBackEvent], callBack, callBackEvent);
      } catch (exception) {
        throw new TypeError("f-validate: ".concat(callBackEvent, " callback must be a function"));
      }
    }
  }, {
    key: "setSuccess",
    value: function setSuccess(element) {
      element.classList.remove(this.options.errorClass);
      element.classList.add(this.options.successClass);
    }
  }, {
    key: "setError",
    value: function setError(element) {
      element.classList.remove(this.options.successClass);
      element.classList.add(this.options.errorClass);
    }
  }, {
    key: "setFormNoValidate",
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
    key: "isValid",
    value: function isValid(event, currentElement, eventType) {
      var _this2 = this;

      var formValid = true;
      this.errorMessages = [];
      this.fields.forEach(function (field) {
        // currentElement refers to an element that is being validated on blur/keyup
        // only validate on blur/keyup if the field is not empty and is not required
        if (currentElement && (currentElement.field !== field || field.value === '' && !_rules.default.required.condition(field))) {
          return;
        } // if hybrid validation is active, give the user a chance to input a value before we start validating


        if (_this2.options.hybridMode && currentElement && eventType === 'keyup' && !field.hasAttribute(_constants.default.blurredAttr)) {
          return;
        }

        var errorMessage = ''; // This needs to be set outside of the forEach loop, as otherwise only the final rule will apply the state

        var fieldValid = true; // This prevents us from applying state classes to fields without rules

        var fieldHasValidation = false;
        VALIDATION_KEYS.forEach(function (ruleName) {
          var definition = _rules.default[ruleName];

          if (field.getAttribute('data-val-custom')) {
            _rules.default.custom.test = _this2.customHandlers[field.getAttribute('data-val-custom')];
          }

          if (definition.condition(field)) {
            fieldHasValidation = true;
            var skipTest = false; // If rule has elements that need to be checked for touch, and validation is happening on blur/keyup

            if (definition.touchedSelectors && currentElement) {
              currentElement.childField.setAttribute('data-touched', true);
              skipTest = elementsUntouched(field, currentElement, definition.touchedSelectors);
            }

            if (!skipTest && !definition.test(field, currentElement)) {
              fieldValid = false;
              errorMessage = (0, _messages.getMessage)(field, ruleName);

              _this2.errorMessages.push(errorMessage);

              (0, _callbacks.runCallbacks)(_this2.callBacks.elementError, field, ruleName);
            }
          }
        });

        if (fieldHasValidation) {
          if (fieldValid) {
            _this2.setSuccess(field);
          } else {
            formValid = false;

            _this2.setError(field);
          } // if we aren't handling a group field validation


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
    key: "addCustomValidation",
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
    key: "getFields",
    value: function getFields() {
      var fields = (0, _fDom.default)(_constants.default.fieldValues, this.form);
      return fields.filter(function (f) {
        return !(f.hasAttribute('type') && f.getAttribute('type') === 'hidden') && !f.hasAttribute('disabled') && !f.hasAttribute('data-novalidate') && !f.parentElement.hasAttribute(_constants.default.validationGroup);
      });
    }
  }, {
    key: "findGroupedErrorElement",
    value: function findGroupedErrorElement() {
      var groupedErrorElement = _fDom.default.first(".".concat(_constants.default.cssClasses.formErrors), this.form);

      return groupedErrorElement;
    }
  }, {
    key: "displayGroupedMessages",
    value: function displayGroupedMessages(groupedErrorElement) {
      var updateElement = groupedErrorElement;

      if (!groupedErrorElement) {
        updateElement = document.createElement('ul');
        updateElement.classList.add(_constants.default.cssClasses.formErrors);
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
    key: "getGroupedErrorPosition",
    value: function getGroupedErrorPosition() {
      var groupElement = _fDom.default.first(this.options.groupErrorPlacement, this.form);

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
    key: "validateOn",
    value: function validateOn() {
      var _this3 = this;

      if (this.options.groupErrorPlacement) {
        throw new Error('f-validate: validation on \'blur\' or \'keyup\' cannot be performed if errors are grouped');
      }

      if (_constants.default.validateOnOptions.indexOf(this.options.validateOn) === -1) {
        throw new Error('f-validate: valid options for the \'validateOn\' property are \'blur\' or \'keyup\'');
      }

      this.fields.forEach(function (field) {
        if (field.hasAttribute(_constants.default.validationGroup)) {
          (0, _fDom.default)(_constants.default.fieldValues, field).forEach(function (childField) {
            return (// Binds each form element within a validation-group to the specified event.
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
          field.addEventListener(_this3.options.validateOn, _this3.isValid.bind(_this3, null, {
            field: field
          }));
        }
      });
    }
  }, {
    key: "markFieldAsBlurred",
    value: function markFieldAsBlurred(field) {
      if (!field.hasAttribute(_constants.default.blurredAttr)) {
        field.setAttribute(_constants.default.blurredAttr, '');
      }
    }
    /**
     * Validates form field(s) on both blur and keyup events.
     * Initial validate is delayed until user blurs to avoid untimely validation errors.
     *
     * example:
     *       this.validation = new FormValidation(this.form, {
     *           hybridMode: true
     *       });
     */

  }, {
    key: "setupHybridValidate",
    value: function setupHybridValidate() {
      var _this4 = this;

      if (this.options.groupErrorPlacement) {
        throw new Error('f-validate: hybridMode cannot be used if errors are grouped');
      }

      if (this.options.validateOn) {
        throw new Error('f-validate: hybridMode cannot be used with the validateOn option');
      } // 'hybridMode' listens to both keyup and blur events, delaying validation until the first blur event


      this.fields.forEach(function (field) {
        field.addEventListener('blur', _this4.isValid.bind(_this4, null, {
          field: field
        }, 'blur'));
        field.addEventListener('blur', _this4.markFieldAsBlurred.bind(_this4, field));
        field.addEventListener('keyup', _this4.isValid.bind(_this4, null, {
          field: field
        }, 'keyup'));
      });
    }
  }]);

  return FormValidation;
}();

exports.default = FormValidation;
},{"./callbacks":21,"./constants":22,"./messages":24,"./rules":29,"@justeat/f-dom":3}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMessage = exports.hideMessage = exports.displayInlineMessage = exports.getInlineErrorElement = void 0;

var _fDom = _interopRequireDefault(require("@justeat/f-dom"));

var _rules = _interopRequireDefault(require("./rules"));

var _constants = _interopRequireDefault(require("./constants"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getCustomErrorElement = function getCustomErrorElement(field, form) {
  var errorPlacement = field.getAttribute('data-val-error-placement');

  var errorElement = _fDom.default.first(errorPlacement, form);

  if (errorElement) {
    return errorElement;
  }

  return false;
};

var getInlineErrorElement = function getInlineErrorElement(field, form) {
  var nextSibling = field.nextElementSibling;
  var customErrorEl = getCustomErrorElement(field, form);

  if (customErrorEl && customErrorEl.nextElementSibling && customErrorEl.nextElementSibling.classList.contains(_constants.default.cssClasses.formError)) {
    return customErrorEl.nextElementSibling;
  }

  if (nextSibling && nextSibling.classList.contains(_constants.default.cssClasses.formError)) {
    return nextSibling;
  }

  return false;
};

exports.getInlineErrorElement = getInlineErrorElement;

var displayInlineMessage = function displayInlineMessage(errorElement, customMessage, field, form) {
  var updateElement = errorElement;
  var customErrorEl = getCustomErrorElement(field, form) || field;

  if (!errorElement) {
    updateElement = document.createElement('p');
    updateElement.classList.add(_constants.default.cssClasses.formError);
    field.parentNode.insertBefore(updateElement, customErrorEl.nextSibling);
  }

  updateElement.textContent = customMessage;
  updateElement.classList.remove(_constants.default.cssClasses.isHidden);
};

exports.displayInlineMessage = displayInlineMessage;

var hideMessage = function hideMessage(errorElement) {
  if (!errorElement) {
    return;
  }

  errorElement.classList.add(_constants.default.cssClasses.isHidden);
  errorElement.innerHTML = '';
};

exports.hideMessage = hideMessage;

var getDefaultMessage = function getDefaultMessage(field, ruleName) {
  if (!_rules.default[ruleName].defaultMessageValue) {
    return _rules.default[ruleName].defaultMessage;
  }

  return _rules.default[ruleName].defaultMessage.replace('{0}', _rules.default[ruleName].defaultMessageValue(field));
};

var getMessage = function getMessage(field, ruleName) {
  return field.getAttribute("data-val-".concat(ruleName, "-error")) || getDefaultMessage(field, ruleName);
};

exports.getMessage = getMessage;
},{"./constants":22,"./rules":29,"@justeat/f-dom":3}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fDom = _interopRequireDefault(require("@justeat/f-dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Conditional Required Rule
 * -------------------------
 * This validation rule checks that if a specified checkbox is not checked, then it is required that a value must be entered in the field with this validation check.
 *
 * This also means that if the specified checkbox is checked, then the field is not required and the form will return valid when the field is empty.
 *
 */
var _default = {
  condition: function condition(field) {
    return field.hasAttribute('data-val-conditionalRequired');
  },
  test: function test(field) {
    var input = _fDom.default.first("[name='".concat(field.getAttribute('data-val-conditionalRequired'), "']"));

    var isChecked = input ? input.checked : true;
    return isChecked || field.value.trim().length > 0;
  },
  defaultMessage: 'This field is required.'
};
exports.default = _default;
},{"@justeat/f-dom":3}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Custom Rule
 * --------------
 * This validation rule allows the addition of a custom validation check to be added to the field.
 *
 */
var _default = {
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
exports.default = _default;
},{}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fDom = _interopRequireDefault(require("@justeat/f-dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Date In Future Rule
 * -------------------
 * This rule is for validating dates entered by a collection of `select` fields.
 * When applied to a validation group, it returns true if the date entered in these fields is in the future.
 *
 */
var _default = {
  condition: function condition(field) {
    return field.hasAttribute('data-val-dateInFuture');
  },
  test: function test(element) {
    var dateToday = new Date();
    var currentMonth = dateToday.getMonth() + 1;
    var currentYear = dateToday.getFullYear();

    var selectedMonthEl = _fDom.default.first('[data-val-dateInFuture-type="month"]', element);

    var selectedYearEl = _fDom.default.first('[data-val-dateInFuture-type="year"]', element);

    var selectedMonthVal = Number(selectedMonthEl.value);
    var selectedYearVal = Number(selectedYearEl.value);

    if (selectedYearVal > currentYear && selectedMonthVal > 0) {
      return true;
    }

    return selectedYearVal === currentYear && selectedMonthVal >= currentMonth;
  },
  touchedSelectors: ['[data-val-dateInFuture-type="month"]', '[data-val-dateInFuture-type="year"]'],
  defaultMessage: 'This date must be in the future.'
};
exports.default = _default;
},{"@justeat/f-dom":3}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constants = _interopRequireDefault(require("../constants"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Email Rule
 * --------------
 * Checks for a valid email address
 *
 */
var _default = {
  condition: function condition(field) {
    return field.getAttribute('type') === 'email';
  },
  test: function test(field) {
    // if the field is empty, should validate as true
    if (field.value === '') {
      return true;
    }

    return _constants.default.email.test(field.value);
  },
  defaultMessage: 'This field must contain a valid email address.'
};
exports.default = _default;
},{"../constants":22}],29:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _required = _interopRequireDefault(require("./required"));

var _maxlength = _interopRequireDefault(require("./maxlength"));

var _minlength = _interopRequireDefault(require("./minlength"));

var _pattern = _interopRequireDefault(require("./pattern"));

var _email = _interopRequireDefault(require("./email"));

var _matches = _interopRequireDefault(require("./matches"));

var _dateInFuture = _interopRequireDefault(require("./dateInFuture"));

var _conditionalRequired = _interopRequireDefault(require("./conditionalRequired"));

var _custom = _interopRequireDefault(require("./custom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  custom: _custom.default,
  dateInFuture: _dateInFuture.default,
  conditionalRequired: _conditionalRequired.default,
  maxlength: _maxlength.default,
  minlength: _minlength.default,
  pattern: _pattern.default,
  email: _email.default,
  matches: _matches.default,
  required: _required.default
};
exports.default = _default;
},{"./conditionalRequired":25,"./custom":26,"./dateInFuture":27,"./email":28,"./matches":30,"./maxlength":31,"./minlength":32,"./pattern":33,"./required":34}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fDom = _interopRequireDefault(require("@justeat/f-dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Matches Rule
 * ------------
 * Checks that the value of the field being validated matches the value of a separate specified field
 *
 */
var _default = {
  condition: function condition(field) {
    return field.hasAttribute('data-val-equalto');
  },
  test: function test(field) {
    var matchedFieldName = field.getAttribute('data-val-equalto');

    if (matchedFieldName) {
      var input = _fDom.default.first("input[name=".concat(matchedFieldName, "]"));

      return matchedFieldName && input && field.value === input.value;
    }

    return false;
  },
  defaultMessage: 'This field does not match the {0} field.',
  defaultMessageValue: function defaultMessageValue(field) {
    return field.getAttribute('data-val-equalto').replace('*.', '');
  }
};
exports.default = _default;
},{"@justeat/f-dom":3}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Maxlength Rule
 * --------------
 * Checks that the value of the field is not greater than the specified maximum length.
 *
 */
var _default = {
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
exports.default = _default;
},{}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Minlength Rule
 * --------------
 * Checks that the value of the field is of a specified minimum length.
 *
 */
var _default = {
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
exports.default = _default;
},{}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Pattern Rule
 * --------------
 * Allows definition of a rule to validate the input value using Regular Expressions (RegEx)
 *
 */
var CONSTANTS = require('../constants');

var _default = {
  condition: function condition(field) {
    return field.hasAttribute('pattern') || field.hasAttribute('data-val-regex');
  },
  test: function test(field) {
    // if the field is empty, should validate as true
    if (field.value === '') {
      return true;
    } // escape characters that have special meaning inside a regular expression in field value


    var fieldValue = field.value.replace(CONSTANTS.escapeChars, '\\$&');
    var pattern = field.getAttribute('pattern') || field.getAttribute('data-val-regex');
    return RegExp("^(?:".concat(pattern, ")$"), 'gim').test(fieldValue);
  },
  defaultMessage: 'This field contains a value that isn’t accepted.'
};
exports.default = _default;
},{"../constants":22}],34:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fDom = _interopRequireDefault(require("@justeat/f-dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Required Rule
 * -------------
 * Checks that a value is present for the field being validated
 *
 */
var _default = {
  condition: function condition(field) {
    return field.hasAttribute('required') || field.hasAttribute('data-val-required');
  },
  test: function test(field) {
    // Required checkbox & radio, 1 should be checked.
    if (field.type === 'radio') {
      var radioInputs = (0, _fDom.default)("[name='".concat(field.name, "']:checked"));
      return radioInputs.length > 0;
    }

    if (field.type === 'checkbox') {
      return field.checked === true;
    }

    return field.value.trim().length > 0;
  },
  defaultMessage: 'This field is required.'
};
exports.default = _default;
},{"@justeat/f-dom":3}],35:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"./modules/breakpointHelper":36,"./modules/stopFoit":37,"dup":5}],36:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],37:[function(require,module,exports){
arguments[4][7][0].apply(exports,arguments)
},{"@justeat/f-logger":11,"dup":7,"fontfaceobserver":38}],38:[function(require,module,exports){
/* Font Face Observer v2.1.0 - © Bram Stein. License: BSD-3-Clause */(function(){function l(a,b){document.addEventListener?a.addEventListener("scroll",b,!1):a.attachEvent("scroll",b)}function m(a){document.body?a():document.addEventListener?document.addEventListener("DOMContentLoaded",function c(){document.removeEventListener("DOMContentLoaded",c);a()}):document.attachEvent("onreadystatechange",function k(){if("interactive"==document.readyState||"complete"==document.readyState)document.detachEvent("onreadystatechange",k),a()})};function t(a){this.a=document.createElement("div");this.a.setAttribute("aria-hidden","true");this.a.appendChild(document.createTextNode(a));this.b=document.createElement("span");this.c=document.createElement("span");this.h=document.createElement("span");this.f=document.createElement("span");this.g=-1;this.b.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";this.c.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";
this.f.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";this.h.style.cssText="display:inline-block;width:200%;height:200%;font-size:16px;max-width:none;";this.b.appendChild(this.h);this.c.appendChild(this.f);this.a.appendChild(this.b);this.a.appendChild(this.c)}
function u(a,b){a.a.style.cssText="max-width:none;min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;white-space:nowrap;font-synthesis:none;font:"+b+";"}function z(a){var b=a.a.offsetWidth,c=b+100;a.f.style.width=c+"px";a.c.scrollLeft=c;a.b.scrollLeft=a.b.scrollWidth+100;return a.g!==b?(a.g=b,!0):!1}function A(a,b){function c(){var a=k;z(a)&&a.a.parentNode&&b(a.g)}var k=a;l(a.b,c);l(a.c,c);z(a)};function B(a,b){var c=b||{};this.family=a;this.style=c.style||"normal";this.weight=c.weight||"normal";this.stretch=c.stretch||"normal"}var C=null,D=null,E=null,F=null;function G(){if(null===D)if(J()&&/Apple/.test(window.navigator.vendor)){var a=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))(?:\.([0-9]+))/.exec(window.navigator.userAgent);D=!!a&&603>parseInt(a[1],10)}else D=!1;return D}function J(){null===F&&(F=!!document.fonts);return F}
function K(){if(null===E){var a=document.createElement("div");try{a.style.font="condensed 100px sans-serif"}catch(b){}E=""!==a.style.font}return E}function L(a,b){return[a.style,a.weight,K()?a.stretch:"","100px",b].join(" ")}
B.prototype.load=function(a,b){var c=this,k=a||"BESbswy",r=0,n=b||3E3,H=(new Date).getTime();return new Promise(function(a,b){if(J()&&!G()){var M=new Promise(function(a,b){function e(){(new Date).getTime()-H>=n?b(Error(""+n+"ms timeout exceeded")):document.fonts.load(L(c,'"'+c.family+'"'),k).then(function(c){1<=c.length?a():setTimeout(e,25)},b)}e()}),N=new Promise(function(a,c){r=setTimeout(function(){c(Error(""+n+"ms timeout exceeded"))},n)});Promise.race([N,M]).then(function(){clearTimeout(r);a(c)},
b)}else m(function(){function v(){var b;if(b=-1!=f&&-1!=g||-1!=f&&-1!=h||-1!=g&&-1!=h)(b=f!=g&&f!=h&&g!=h)||(null===C&&(b=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent),C=!!b&&(536>parseInt(b[1],10)||536===parseInt(b[1],10)&&11>=parseInt(b[2],10))),b=C&&(f==w&&g==w&&h==w||f==x&&g==x&&h==x||f==y&&g==y&&h==y)),b=!b;b&&(d.parentNode&&d.parentNode.removeChild(d),clearTimeout(r),a(c))}function I(){if((new Date).getTime()-H>=n)d.parentNode&&d.parentNode.removeChild(d),b(Error(""+
n+"ms timeout exceeded"));else{var a=document.hidden;if(!0===a||void 0===a)f=e.a.offsetWidth,g=p.a.offsetWidth,h=q.a.offsetWidth,v();r=setTimeout(I,50)}}var e=new t(k),p=new t(k),q=new t(k),f=-1,g=-1,h=-1,w=-1,x=-1,y=-1,d=document.createElement("div");d.dir="ltr";u(e,L(c,"sans-serif"));u(p,L(c,"serif"));u(q,L(c,"monospace"));d.appendChild(e.a);d.appendChild(p.a);d.appendChild(q.a);document.body.appendChild(d);w=e.a.offsetWidth;x=p.a.offsetWidth;y=q.a.offsetWidth;I();A(e,function(a){f=a;v()});u(e,
L(c,'"'+c.family+'",sans-serif'));A(p,function(a){g=a;v()});u(p,L(c,'"'+c.family+'",serif'));A(q,function(a){h=a;v()});u(q,L(c,'"'+c.family+'",monospace'))})})};"object"===typeof module?module.exports=B:(window.FontFaceObserver=B,window.FontFaceObserver.prototype.load=B.prototype.load);}());

},{}],39:[function(require,module,exports){
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

},{}],40:[function(require,module,exports){
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

},{}],41:[function(require,module,exports){
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
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
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

module.exports = throttle;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],42:[function(require,module,exports){
/*! picturefill - v3.0.2 - 2016-02-12
 * https://scottjehl.github.io/picturefill/
 * Copyright (c) 2016 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT
 */
/*! Gecko-Picture - v1.0
 * https://github.com/scottjehl/picturefill/tree/3.0/src/plugins/gecko-picture
 * Firefox's early picture implementation (prior to FF41) is static and does
 * not react to viewport changes. This tiny module fixes this.
 */
(function(window) {
	/*jshint eqnull:true */
	var ua = navigator.userAgent;

	if ( window.HTMLPictureElement && ((/ecko/).test(ua) && ua.match(/rv\:(\d+)/) && RegExp.$1 < 45) ) {
		addEventListener("resize", (function() {
			var timer;

			var dummySrc = document.createElement("source");

			var fixRespimg = function(img) {
				var source, sizes;
				var picture = img.parentNode;

				if (picture.nodeName.toUpperCase() === "PICTURE") {
					source = dummySrc.cloneNode();

					picture.insertBefore(source, picture.firstElementChild);
					setTimeout(function() {
						picture.removeChild(source);
					});
				} else if (!img._pfLastSize || img.offsetWidth > img._pfLastSize) {
					img._pfLastSize = img.offsetWidth;
					sizes = img.sizes;
					img.sizes += ",100vw";
					setTimeout(function() {
						img.sizes = sizes;
					});
				}
			};

			var findPictureImgs = function() {
				var i;
				var imgs = document.querySelectorAll("picture > img, img[srcset][sizes]");
				for (i = 0; i < imgs.length; i++) {
					fixRespimg(imgs[i]);
				}
			};
			var onResize = function() {
				clearTimeout(timer);
				timer = setTimeout(findPictureImgs, 99);
			};
			var mq = window.matchMedia && matchMedia("(orientation: landscape)");
			var init = function() {
				onResize();

				if (mq && mq.addListener) {
					mq.addListener(onResize);
				}
			};

			dummySrc.srcset = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

			if (/^[c|i]|d$/.test(document.readyState || "")) {
				init();
			} else {
				document.addEventListener("DOMContentLoaded", init);
			}

			return onResize;
		})());
	}
})(window);

/*! Picturefill - v3.0.2
 * http://scottjehl.github.io/picturefill
 * Copyright (c) 2015 https://github.com/scottjehl/picturefill/blob/master/Authors.txt;
 *  License: MIT
 */

(function( window, document, undefined ) {
	// Enable strict mode
	"use strict";

	// HTML shim|v it for old IE (IE9 will still need the HTML video tag workaround)
	document.createElement( "picture" );

	var warn, eminpx, alwaysCheckWDescriptor, evalId;
	// local object for method references and testing exposure
	var pf = {};
	var isSupportTestReady = false;
	var noop = function() {};
	var image = document.createElement( "img" );
	var getImgAttr = image.getAttribute;
	var setImgAttr = image.setAttribute;
	var removeImgAttr = image.removeAttribute;
	var docElem = document.documentElement;
	var types = {};
	var cfg = {
		//resource selection:
		algorithm: ""
	};
	var srcAttr = "data-pfsrc";
	var srcsetAttr = srcAttr + "set";
	// ua sniffing is done for undetectable img loading features,
	// to do some non crucial perf optimizations
	var ua = navigator.userAgent;
	var supportAbort = (/rident/).test(ua) || ((/ecko/).test(ua) && ua.match(/rv\:(\d+)/) && RegExp.$1 > 35 );
	var curSrcProp = "currentSrc";
	var regWDesc = /\s+\+?\d+(e\d+)?w/;
	var regSize = /(\([^)]+\))?\s*(.+)/;
	var setOptions = window.picturefillCFG;
	/**
	 * Shortcut property for https://w3c.github.io/webappsec/specs/mixedcontent/#restricts-mixed-content ( for easy overriding in tests )
	 */
	// baseStyle also used by getEmValue (i.e.: width: 1em is important)
	var baseStyle = "position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)";
	var fsCss = "font-size:100%!important;";
	var isVwDirty = true;

	var cssCache = {};
	var sizeLengthCache = {};
	var DPR = window.devicePixelRatio;
	var units = {
		px: 1,
		"in": 96
	};
	var anchor = document.createElement( "a" );
	/**
	 * alreadyRun flag used for setOptions. is it true setOptions will reevaluate
	 * @type {boolean}
	 */
	var alreadyRun = false;

	// Reusable, non-"g" Regexes

	// (Don't use \s, to avoid matching non-breaking space.)
	var regexLeadingSpaces = /^[ \t\n\r\u000c]+/,
	    regexLeadingCommasOrSpaces = /^[, \t\n\r\u000c]+/,
	    regexLeadingNotSpaces = /^[^ \t\n\r\u000c]+/,
	    regexTrailingCommas = /[,]+$/,
	    regexNonNegativeInteger = /^\d+$/,

	    // ( Positive or negative or unsigned integers or decimals, without or without exponents.
	    // Must include at least one digit.
	    // According to spec tests any decimal point must be followed by a digit.
	    // No leading plus sign is allowed.)
	    // https://html.spec.whatwg.org/multipage/infrastructure.html#valid-floating-point-number
	    regexFloatingPoint = /^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/;

	var on = function(obj, evt, fn, capture) {
		if ( obj.addEventListener ) {
			obj.addEventListener(evt, fn, capture || false);
		} else if ( obj.attachEvent ) {
			obj.attachEvent( "on" + evt, fn);
		}
	};

	/**
	 * simple memoize function:
	 */

	var memoize = function(fn) {
		var cache = {};
		return function(input) {
			if ( !(input in cache) ) {
				cache[ input ] = fn(input);
			}
			return cache[ input ];
		};
	};

	// UTILITY FUNCTIONS

	// Manual is faster than RegEx
	// http://jsperf.com/whitespace-character/5
	function isSpace(c) {
		return (c === "\u0020" || // space
		        c === "\u0009" || // horizontal tab
		        c === "\u000A" || // new line
		        c === "\u000C" || // form feed
		        c === "\u000D");  // carriage return
	}

	/**
	 * gets a mediaquery and returns a boolean or gets a css length and returns a number
	 * @param css mediaqueries or css length
	 * @returns {boolean|number}
	 *
	 * based on: https://gist.github.com/jonathantneal/db4f77009b155f083738
	 */
	var evalCSS = (function() {

		var regLength = /^([\d\.]+)(em|vw|px)$/;
		var replace = function() {
			var args = arguments, index = 0, string = args[0];
			while (++index in args) {
				string = string.replace(args[index], args[++index]);
			}
			return string;
		};

		var buildStr = memoize(function(css) {

			return "return " + replace((css || "").toLowerCase(),
				// interpret `and`
				/\band\b/g, "&&",

				// interpret `,`
				/,/g, "||",

				// interpret `min-` as >=
				/min-([a-z-\s]+):/g, "e.$1>=",

				// interpret `max-` as <=
				/max-([a-z-\s]+):/g, "e.$1<=",

				//calc value
				/calc([^)]+)/g, "($1)",

				// interpret css values
				/(\d+[\.]*[\d]*)([a-z]+)/g, "($1 * e.$2)",
				//make eval less evil
				/^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/ig, ""
			) + ";";
		});

		return function(css, length) {
			var parsedLength;
			if (!(css in cssCache)) {
				cssCache[css] = false;
				if (length && (parsedLength = css.match( regLength ))) {
					cssCache[css] = parsedLength[ 1 ] * units[parsedLength[ 2 ]];
				} else {
					/*jshint evil:true */
					try{
						cssCache[css] = new Function("e", buildStr(css))(units);
					} catch(e) {}
					/*jshint evil:false */
				}
			}
			return cssCache[css];
		};
	})();

	var setResolution = function( candidate, sizesattr ) {
		if ( candidate.w ) { // h = means height: || descriptor.type === 'h' do not handle yet...
			candidate.cWidth = pf.calcListLength( sizesattr || "100vw" );
			candidate.res = candidate.w / candidate.cWidth ;
		} else {
			candidate.res = candidate.d;
		}
		return candidate;
	};

	/**
	 *
	 * @param opt
	 */
	var picturefill = function( opt ) {

		if (!isSupportTestReady) {return;}

		var elements, i, plen;

		var options = opt || {};

		if ( options.elements && options.elements.nodeType === 1 ) {
			if ( options.elements.nodeName.toUpperCase() === "IMG" ) {
				options.elements =  [ options.elements ];
			} else {
				options.context = options.elements;
				options.elements =  null;
			}
		}

		elements = options.elements || pf.qsa( (options.context || document), ( options.reevaluate || options.reselect ) ? pf.sel : pf.selShort );

		if ( (plen = elements.length) ) {

			pf.setupRun( options );
			alreadyRun = true;

			// Loop through all elements
			for ( i = 0; i < plen; i++ ) {
				pf.fillImg(elements[ i ], options);
			}

			pf.teardownRun( options );
		}
	};

	/**
	 * outputs a warning for the developer
	 * @param {message}
	 * @type {Function}
	 */
	warn = ( window.console && console.warn ) ?
		function( message ) {
			console.warn( message );
		} :
		noop
	;

	if ( !(curSrcProp in image) ) {
		curSrcProp = "src";
	}

	// Add support for standard mime types.
	types[ "image/jpeg" ] = true;
	types[ "image/gif" ] = true;
	types[ "image/png" ] = true;

	function detectTypeSupport( type, typeUri ) {
		// based on Modernizr's lossless img-webp test
		// note: asynchronous
		var image = new window.Image();
		image.onerror = function() {
			types[ type ] = false;
			picturefill();
		};
		image.onload = function() {
			types[ type ] = image.width === 1;
			picturefill();
		};
		image.src = typeUri;
		return "pending";
	}

	// test svg support
	types[ "image/svg+xml" ] = document.implementation.hasFeature( "http://www.w3.org/TR/SVG11/feature#Image", "1.1" );

	/**
	 * updates the internal vW property with the current viewport width in px
	 */
	function updateMetrics() {

		isVwDirty = false;
		DPR = window.devicePixelRatio;
		cssCache = {};
		sizeLengthCache = {};

		pf.DPR = DPR || 1;

		units.width = Math.max(window.innerWidth || 0, docElem.clientWidth);
		units.height = Math.max(window.innerHeight || 0, docElem.clientHeight);

		units.vw = units.width / 100;
		units.vh = units.height / 100;

		evalId = [ units.height, units.width, DPR ].join("-");

		units.em = pf.getEmValue();
		units.rem = units.em;
	}

	function chooseLowRes( lowerValue, higherValue, dprValue, isCached ) {
		var bonusFactor, tooMuch, bonus, meanDensity;

		//experimental
		if (cfg.algorithm === "saveData" ){
			if ( lowerValue > 2.7 ) {
				meanDensity = dprValue + 1;
			} else {
				tooMuch = higherValue - dprValue;
				bonusFactor = Math.pow(lowerValue - 0.6, 1.5);

				bonus = tooMuch * bonusFactor;

				if (isCached) {
					bonus += 0.1 * bonusFactor;
				}

				meanDensity = lowerValue + bonus;
			}
		} else {
			meanDensity = (dprValue > 1) ?
				Math.sqrt(lowerValue * higherValue) :
				lowerValue;
		}

		return meanDensity > dprValue;
	}

	function applyBestCandidate( img ) {
		var srcSetCandidates;
		var matchingSet = pf.getSet( img );
		var evaluated = false;
		if ( matchingSet !== "pending" ) {
			evaluated = evalId;
			if ( matchingSet ) {
				srcSetCandidates = pf.setRes( matchingSet );
				pf.applySetCandidate( srcSetCandidates, img );
			}
		}
		img[ pf.ns ].evaled = evaluated;
	}

	function ascendingSort( a, b ) {
		return a.res - b.res;
	}

	function setSrcToCur( img, src, set ) {
		var candidate;
		if ( !set && src ) {
			set = img[ pf.ns ].sets;
			set = set && set[set.length - 1];
		}

		candidate = getCandidateForSrc(src, set);

		if ( candidate ) {
			src = pf.makeUrl(src);
			img[ pf.ns ].curSrc = src;
			img[ pf.ns ].curCan = candidate;

			if ( !candidate.res ) {
				setResolution( candidate, candidate.set.sizes );
			}
		}
		return candidate;
	}

	function getCandidateForSrc( src, set ) {
		var i, candidate, candidates;
		if ( src && set ) {
			candidates = pf.parseSet( set );
			src = pf.makeUrl(src);
			for ( i = 0; i < candidates.length; i++ ) {
				if ( src === pf.makeUrl(candidates[ i ].url) ) {
					candidate = candidates[ i ];
					break;
				}
			}
		}
		return candidate;
	}

	function getAllSourceElements( picture, candidates ) {
		var i, len, source, srcset;

		// SPEC mismatch intended for size and perf:
		// actually only source elements preceding the img should be used
		// also note: don't use qsa here, because IE8 sometimes doesn't like source as the key part in a selector
		var sources = picture.getElementsByTagName( "source" );

		for ( i = 0, len = sources.length; i < len; i++ ) {
			source = sources[ i ];
			source[ pf.ns ] = true;
			srcset = source.getAttribute( "srcset" );

			// if source does not have a srcset attribute, skip
			if ( srcset ) {
				candidates.push( {
					srcset: srcset,
					media: source.getAttribute( "media" ),
					type: source.getAttribute( "type" ),
					sizes: source.getAttribute( "sizes" )
				} );
			}
		}
	}

	/**
	 * Srcset Parser
	 * By Alex Bell |  MIT License
	 *
	 * @returns Array [{url: _, d: _, w: _, h:_, set:_(????)}, ...]
	 *
	 * Based super duper closely on the reference algorithm at:
	 * https://html.spec.whatwg.org/multipage/embedded-content.html#parse-a-srcset-attribute
	 */

	// 1. Let input be the value passed to this algorithm.
	// (TO-DO : Explain what "set" argument is here. Maybe choose a more
	// descriptive & more searchable name.  Since passing the "set" in really has
	// nothing to do with parsing proper, I would prefer this assignment eventually
	// go in an external fn.)
	function parseSrcset(input, set) {

		function collectCharacters(regEx) {
			var chars,
			    match = regEx.exec(input.substring(pos));
			if (match) {
				chars = match[ 0 ];
				pos += chars.length;
				return chars;
			}
		}

		var inputLength = input.length,
		    url,
		    descriptors,
		    currentDescriptor,
		    state,
		    c,

		    // 2. Let position be a pointer into input, initially pointing at the start
		    //    of the string.
		    pos = 0,

		    // 3. Let candidates be an initially empty source set.
		    candidates = [];

		/**
		* Adds descriptor properties to a candidate, pushes to the candidates array
		* @return undefined
		*/
		// (Declared outside of the while loop so that it's only created once.
		// (This fn is defined before it is used, in order to pass JSHINT.
		// Unfortunately this breaks the sequencing of the spec comments. :/ )
		function parseDescriptors() {

			// 9. Descriptor parser: Let error be no.
			var pError = false,

			// 10. Let width be absent.
			// 11. Let density be absent.
			// 12. Let future-compat-h be absent. (We're implementing it now as h)
			    w, d, h, i,
			    candidate = {},
			    desc, lastChar, value, intVal, floatVal;

			// 13. For each descriptor in descriptors, run the appropriate set of steps
			// from the following list:
			for (i = 0 ; i < descriptors.length; i++) {
				desc = descriptors[ i ];

				lastChar = desc[ desc.length - 1 ];
				value = desc.substring(0, desc.length - 1);
				intVal = parseInt(value, 10);
				floatVal = parseFloat(value);

				// If the descriptor consists of a valid non-negative integer followed by
				// a U+0077 LATIN SMALL LETTER W character
				if (regexNonNegativeInteger.test(value) && (lastChar === "w")) {

					// If width and density are not both absent, then let error be yes.
					if (w || d) {pError = true;}

					// Apply the rules for parsing non-negative integers to the descriptor.
					// If the result is zero, let error be yes.
					// Otherwise, let width be the result.
					if (intVal === 0) {pError = true;} else {w = intVal;}

				// If the descriptor consists of a valid floating-point number followed by
				// a U+0078 LATIN SMALL LETTER X character
				} else if (regexFloatingPoint.test(value) && (lastChar === "x")) {

					// If width, density and future-compat-h are not all absent, then let error
					// be yes.
					if (w || d || h) {pError = true;}

					// Apply the rules for parsing floating-point number values to the descriptor.
					// If the result is less than zero, let error be yes. Otherwise, let density
					// be the result.
					if (floatVal < 0) {pError = true;} else {d = floatVal;}

				// If the descriptor consists of a valid non-negative integer followed by
				// a U+0068 LATIN SMALL LETTER H character
				} else if (regexNonNegativeInteger.test(value) && (lastChar === "h")) {

					// If height and density are not both absent, then let error be yes.
					if (h || d) {pError = true;}

					// Apply the rules for parsing non-negative integers to the descriptor.
					// If the result is zero, let error be yes. Otherwise, let future-compat-h
					// be the result.
					if (intVal === 0) {pError = true;} else {h = intVal;}

				// Anything else, Let error be yes.
				} else {pError = true;}
			} // (close step 13 for loop)

			// 15. If error is still no, then append a new image source to candidates whose
			// URL is url, associated with a width width if not absent and a pixel
			// density density if not absent. Otherwise, there is a parse error.
			if (!pError) {
				candidate.url = url;

				if (w) { candidate.w = w;}
				if (d) { candidate.d = d;}
				if (h) { candidate.h = h;}
				if (!h && !d && !w) {candidate.d = 1;}
				if (candidate.d === 1) {set.has1x = true;}
				candidate.set = set;

				candidates.push(candidate);
			}
		} // (close parseDescriptors fn)

		/**
		* Tokenizes descriptor properties prior to parsing
		* Returns undefined.
		* (Again, this fn is defined before it is used, in order to pass JSHINT.
		* Unfortunately this breaks the logical sequencing of the spec comments. :/ )
		*/
		function tokenize() {

			// 8.1. Descriptor tokeniser: Skip whitespace
			collectCharacters(regexLeadingSpaces);

			// 8.2. Let current descriptor be the empty string.
			currentDescriptor = "";

			// 8.3. Let state be in descriptor.
			state = "in descriptor";

			while (true) {

				// 8.4. Let c be the character at position.
				c = input.charAt(pos);

				//  Do the following depending on the value of state.
				//  For the purpose of this step, "EOF" is a special character representing
				//  that position is past the end of input.

				// In descriptor
				if (state === "in descriptor") {
					// Do the following, depending on the value of c:

				  // Space character
				  // If current descriptor is not empty, append current descriptor to
				  // descriptors and let current descriptor be the empty string.
				  // Set state to after descriptor.
					if (isSpace(c)) {
						if (currentDescriptor) {
							descriptors.push(currentDescriptor);
							currentDescriptor = "";
							state = "after descriptor";
						}

					// U+002C COMMA (,)
					// Advance position to the next character in input. If current descriptor
					// is not empty, append current descriptor to descriptors. Jump to the step
					// labeled descriptor parser.
					} else if (c === ",") {
						pos += 1;
						if (currentDescriptor) {
							descriptors.push(currentDescriptor);
						}
						parseDescriptors();
						return;

					// U+0028 LEFT PARENTHESIS (()
					// Append c to current descriptor. Set state to in parens.
					} else if (c === "\u0028") {
						currentDescriptor = currentDescriptor + c;
						state = "in parens";

					// EOF
					// If current descriptor is not empty, append current descriptor to
					// descriptors. Jump to the step labeled descriptor parser.
					} else if (c === "") {
						if (currentDescriptor) {
							descriptors.push(currentDescriptor);
						}
						parseDescriptors();
						return;

					// Anything else
					// Append c to current descriptor.
					} else {
						currentDescriptor = currentDescriptor + c;
					}
				// (end "in descriptor"

				// In parens
				} else if (state === "in parens") {

					// U+0029 RIGHT PARENTHESIS ())
					// Append c to current descriptor. Set state to in descriptor.
					if (c === ")") {
						currentDescriptor = currentDescriptor + c;
						state = "in descriptor";

					// EOF
					// Append current descriptor to descriptors. Jump to the step labeled
					// descriptor parser.
					} else if (c === "") {
						descriptors.push(currentDescriptor);
						parseDescriptors();
						return;

					// Anything else
					// Append c to current descriptor.
					} else {
						currentDescriptor = currentDescriptor + c;
					}

				// After descriptor
				} else if (state === "after descriptor") {

					// Do the following, depending on the value of c:
					// Space character: Stay in this state.
					if (isSpace(c)) {

					// EOF: Jump to the step labeled descriptor parser.
					} else if (c === "") {
						parseDescriptors();
						return;

					// Anything else
					// Set state to in descriptor. Set position to the previous character in input.
					} else {
						state = "in descriptor";
						pos -= 1;

					}
				}

				// Advance position to the next character in input.
				pos += 1;

			// Repeat this step.
			} // (close while true loop)
		}

		// 4. Splitting loop: Collect a sequence of characters that are space
		//    characters or U+002C COMMA characters. If any U+002C COMMA characters
		//    were collected, that is a parse error.
		while (true) {
			collectCharacters(regexLeadingCommasOrSpaces);

			// 5. If position is past the end of input, return candidates and abort these steps.
			if (pos >= inputLength) {
				return candidates; // (we're done, this is the sole return path)
			}

			// 6. Collect a sequence of characters that are not space characters,
			//    and let that be url.
			url = collectCharacters(regexLeadingNotSpaces);

			// 7. Let descriptors be a new empty list.
			descriptors = [];

			// 8. If url ends with a U+002C COMMA character (,), follow these substeps:
			//		(1). Remove all trailing U+002C COMMA characters from url. If this removed
			//         more than one character, that is a parse error.
			if (url.slice(-1) === ",") {
				url = url.replace(regexTrailingCommas, "");
				// (Jump ahead to step 9 to skip tokenization and just push the candidate).
				parseDescriptors();

			//	Otherwise, follow these substeps:
			} else {
				tokenize();
			} // (close else of step 8)

		// 16. Return to the step labeled splitting loop.
		} // (Close of big while loop.)
	}

	/*
	 * Sizes Parser
	 *
	 * By Alex Bell |  MIT License
	 *
	 * Non-strict but accurate and lightweight JS Parser for the string value <img sizes="here">
	 *
	 * Reference algorithm at:
	 * https://html.spec.whatwg.org/multipage/embedded-content.html#parse-a-sizes-attribute
	 *
	 * Most comments are copied in directly from the spec
	 * (except for comments in parens).
	 *
	 * Grammar is:
	 * <source-size-list> = <source-size># [ , <source-size-value> ]? | <source-size-value>
	 * <source-size> = <media-condition> <source-size-value>
	 * <source-size-value> = <length>
	 * http://www.w3.org/html/wg/drafts/html/master/embedded-content.html#attr-img-sizes
	 *
	 * E.g. "(max-width: 30em) 100vw, (max-width: 50em) 70vw, 100vw"
	 * or "(min-width: 30em), calc(30vw - 15px)" or just "30vw"
	 *
	 * Returns the first valid <css-length> with a media condition that evaluates to true,
	 * or "100vw" if all valid media conditions evaluate to false.
	 *
	 */

	function parseSizes(strValue) {

		// (Percentage CSS lengths are not allowed in this case, to avoid confusion:
		// https://html.spec.whatwg.org/multipage/embedded-content.html#valid-source-size-list
		// CSS allows a single optional plus or minus sign:
		// http://www.w3.org/TR/CSS2/syndata.html#numbers
		// CSS is ASCII case-insensitive:
		// http://www.w3.org/TR/CSS2/syndata.html#characters )
		// Spec allows exponential notation for <number> type:
		// http://dev.w3.org/csswg/css-values/#numbers
		var regexCssLengthWithUnits = /^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i;

		// (This is a quick and lenient test. Because of optional unlimited-depth internal
		// grouping parens and strict spacing rules, this could get very complicated.)
		var regexCssCalc = /^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i;

		var i;
		var unparsedSizesList;
		var unparsedSizesListLength;
		var unparsedSize;
		var lastComponentValue;
		var size;

		// UTILITY FUNCTIONS

		//  (Toy CSS parser. The goals here are:
		//  1) expansive test coverage without the weight of a full CSS parser.
		//  2) Avoiding regex wherever convenient.
		//  Quick tests: http://jsfiddle.net/gtntL4gr/3/
		//  Returns an array of arrays.)
		function parseComponentValues(str) {
			var chrctr;
			var component = "";
			var componentArray = [];
			var listArray = [];
			var parenDepth = 0;
			var pos = 0;
			var inComment = false;

			function pushComponent() {
				if (component) {
					componentArray.push(component);
					component = "";
				}
			}

			function pushComponentArray() {
				if (componentArray[0]) {
					listArray.push(componentArray);
					componentArray = [];
				}
			}

			// (Loop forwards from the beginning of the string.)
			while (true) {
				chrctr = str.charAt(pos);

				if (chrctr === "") { // ( End of string reached.)
					pushComponent();
					pushComponentArray();
					return listArray;
				} else if (inComment) {
					if ((chrctr === "*") && (str[pos + 1] === "/")) { // (At end of a comment.)
						inComment = false;
						pos += 2;
						pushComponent();
						continue;
					} else {
						pos += 1; // (Skip all characters inside comments.)
						continue;
					}
				} else if (isSpace(chrctr)) {
					// (If previous character in loop was also a space, or if
					// at the beginning of the string, do not add space char to
					// component.)
					if ( (str.charAt(pos - 1) && isSpace( str.charAt(pos - 1) ) ) || !component ) {
						pos += 1;
						continue;
					} else if (parenDepth === 0) {
						pushComponent();
						pos +=1;
						continue;
					} else {
						// (Replace any space character with a plain space for legibility.)
						chrctr = " ";
					}
				} else if (chrctr === "(") {
					parenDepth += 1;
				} else if (chrctr === ")") {
					parenDepth -= 1;
				} else if (chrctr === ",") {
					pushComponent();
					pushComponentArray();
					pos += 1;
					continue;
				} else if ( (chrctr === "/") && (str.charAt(pos + 1) === "*") ) {
					inComment = true;
					pos += 2;
					continue;
				}

				component = component + chrctr;
				pos += 1;
			}
		}

		function isValidNonNegativeSourceSizeValue(s) {
			if (regexCssLengthWithUnits.test(s) && (parseFloat(s) >= 0)) {return true;}
			if (regexCssCalc.test(s)) {return true;}
			// ( http://www.w3.org/TR/CSS2/syndata.html#numbers says:
			// "-0 is equivalent to 0 and is not a negative number." which means that
			// unitless zero and unitless negative zero must be accepted as special cases.)
			if ((s === "0") || (s === "-0") || (s === "+0")) {return true;}
			return false;
		}

		// When asked to parse a sizes attribute from an element, parse a
		// comma-separated list of component values from the value of the element's
		// sizes attribute (or the empty string, if the attribute is absent), and let
		// unparsed sizes list be the result.
		// http://dev.w3.org/csswg/css-syntax/#parse-comma-separated-list-of-component-values

		unparsedSizesList = parseComponentValues(strValue);
		unparsedSizesListLength = unparsedSizesList.length;

		// For each unparsed size in unparsed sizes list:
		for (i = 0; i < unparsedSizesListLength; i++) {
			unparsedSize = unparsedSizesList[i];

			// 1. Remove all consecutive <whitespace-token>s from the end of unparsed size.
			// ( parseComponentValues() already omits spaces outside of parens. )

			// If unparsed size is now empty, that is a parse error; continue to the next
			// iteration of this algorithm.
			// ( parseComponentValues() won't push an empty array. )

			// 2. If the last component value in unparsed size is a valid non-negative
			// <source-size-value>, let size be its value and remove the component value
			// from unparsed size. Any CSS function other than the calc() function is
			// invalid. Otherwise, there is a parse error; continue to the next iteration
			// of this algorithm.
			// http://dev.w3.org/csswg/css-syntax/#parse-component-value
			lastComponentValue = unparsedSize[unparsedSize.length - 1];

			if (isValidNonNegativeSourceSizeValue(lastComponentValue)) {
				size = lastComponentValue;
				unparsedSize.pop();
			} else {
				continue;
			}

			// 3. Remove all consecutive <whitespace-token>s from the end of unparsed
			// size. If unparsed size is now empty, return size and exit this algorithm.
			// If this was not the last item in unparsed sizes list, that is a parse error.
			if (unparsedSize.length === 0) {
				return size;
			}

			// 4. Parse the remaining component values in unparsed size as a
			// <media-condition>. If it does not parse correctly, or it does parse
			// correctly but the <media-condition> evaluates to false, continue to the
			// next iteration of this algorithm.
			// (Parsing all possible compound media conditions in JS is heavy, complicated,
			// and the payoff is unclear. Is there ever an situation where the
			// media condition parses incorrectly but still somehow evaluates to true?
			// Can we just rely on the browser/polyfill to do it?)
			unparsedSize = unparsedSize.join(" ");
			if (!(pf.matchesMedia( unparsedSize ) ) ) {
				continue;
			}

			// 5. Return size and exit this algorithm.
			return size;
		}

		// If the above algorithm exhausts unparsed sizes list without returning a
		// size value, return 100vw.
		return "100vw";
	}

	// namespace
	pf.ns = ("pf" + new Date().getTime()).substr(0, 9);

	// srcset support test
	pf.supSrcset = "srcset" in image;
	pf.supSizes = "sizes" in image;
	pf.supPicture = !!window.HTMLPictureElement;

	// UC browser does claim to support srcset and picture, but not sizes,
	// this extended test reveals the browser does support nothing
	if (pf.supSrcset && pf.supPicture && !pf.supSizes) {
		(function(image2) {
			image.srcset = "data:,a";
			image2.src = "data:,a";
			pf.supSrcset = image.complete === image2.complete;
			pf.supPicture = pf.supSrcset && pf.supPicture;
		})(document.createElement("img"));
	}

	// Safari9 has basic support for sizes, but does't expose the `sizes` idl attribute
	if (pf.supSrcset && !pf.supSizes) {

		(function() {
			var width2 = "data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw==";
			var width1 = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
			var img = document.createElement("img");
			var test = function() {
				var width = img.width;

				if (width === 2) {
					pf.supSizes = true;
				}

				alwaysCheckWDescriptor = pf.supSrcset && !pf.supSizes;

				isSupportTestReady = true;
				// force async
				setTimeout(picturefill);
			};

			img.onload = test;
			img.onerror = test;
			img.setAttribute("sizes", "9px");

			img.srcset = width1 + " 1w," + width2 + " 9w";
			img.src = width1;
		})();

	} else {
		isSupportTestReady = true;
	}

	// using pf.qsa instead of dom traversing does scale much better,
	// especially on sites mixing responsive and non-responsive images
	pf.selShort = "picture>img,img[srcset]";
	pf.sel = pf.selShort;
	pf.cfg = cfg;

	/**
	 * Shortcut property for `devicePixelRatio` ( for easy overriding in tests )
	 */
	pf.DPR = (DPR  || 1 );
	pf.u = units;

	// container of supported mime types that one might need to qualify before using
	pf.types =  types;

	pf.setSize = noop;

	/**
	 * Gets a string and returns the absolute URL
	 * @param src
	 * @returns {String} absolute URL
	 */

	pf.makeUrl = memoize(function(src) {
		anchor.href = src;
		return anchor.href;
	});

	/**
	 * Gets a DOM element or document and a selctor and returns the found matches
	 * Can be extended with jQuery/Sizzle for IE7 support
	 * @param context
	 * @param sel
	 * @returns {NodeList|Array}
	 */
	pf.qsa = function(context, sel) {
		return ( "querySelector" in context ) ? context.querySelectorAll(sel) : [];
	};

	/**
	 * Shortcut method for matchMedia ( for easy overriding in tests )
	 * wether native or pf.mMQ is used will be decided lazy on first call
	 * @returns {boolean}
	 */
	pf.matchesMedia = function() {
		if ( window.matchMedia && (matchMedia( "(min-width: 0.1em)" ) || {}).matches ) {
			pf.matchesMedia = function( media ) {
				return !media || ( matchMedia( media ).matches );
			};
		} else {
			pf.matchesMedia = pf.mMQ;
		}

		return pf.matchesMedia.apply( this, arguments );
	};

	/**
	 * A simplified matchMedia implementation for IE8 and IE9
	 * handles only min-width/max-width with px or em values
	 * @param media
	 * @returns {boolean}
	 */
	pf.mMQ = function( media ) {
		return media ? evalCSS(media) : true;
	};

	/**
	 * Returns the calculated length in css pixel from the given sourceSizeValue
	 * http://dev.w3.org/csswg/css-values-3/#length-value
	 * intended Spec mismatches:
	 * * Does not check for invalid use of CSS functions
	 * * Does handle a computed length of 0 the same as a negative and therefore invalid value
	 * @param sourceSizeValue
	 * @returns {Number}
	 */
	pf.calcLength = function( sourceSizeValue ) {

		var value = evalCSS(sourceSizeValue, true) || false;
		if (value < 0) {
			value = false;
		}

		return value;
	};

	/**
	 * Takes a type string and checks if its supported
	 */

	pf.supportsType = function( type ) {
		return ( type ) ? types[ type ] : true;
	};

	/**
	 * Parses a sourceSize into mediaCondition (media) and sourceSizeValue (length)
	 * @param sourceSizeStr
	 * @returns {*}
	 */
	pf.parseSize = memoize(function( sourceSizeStr ) {
		var match = ( sourceSizeStr || "" ).match(regSize);
		return {
			media: match && match[1],
			length: match && match[2]
		};
	});

	pf.parseSet = function( set ) {
		if ( !set.cands ) {
			set.cands = parseSrcset(set.srcset, set);
		}
		return set.cands;
	};

	/**
	 * returns 1em in css px for html/body default size
	 * function taken from respondjs
	 * @returns {*|number}
	 */
	pf.getEmValue = function() {
		var body;
		if ( !eminpx && (body = document.body) ) {
			var div = document.createElement( "div" ),
				originalHTMLCSS = docElem.style.cssText,
				originalBodyCSS = body.style.cssText;

			div.style.cssText = baseStyle;

			// 1em in a media query is the value of the default font size of the browser
			// reset docElem and body to ensure the correct value is returned
			docElem.style.cssText = fsCss;
			body.style.cssText = fsCss;

			body.appendChild( div );
			eminpx = div.offsetWidth;
			body.removeChild( div );

			//also update eminpx before returning
			eminpx = parseFloat( eminpx, 10 );

			// restore the original values
			docElem.style.cssText = originalHTMLCSS;
			body.style.cssText = originalBodyCSS;

		}
		return eminpx || 16;
	};

	/**
	 * Takes a string of sizes and returns the width in pixels as a number
	 */
	pf.calcListLength = function( sourceSizeListStr ) {
		// Split up source size list, ie ( max-width: 30em ) 100%, ( max-width: 50em ) 50%, 33%
		//
		//                           or (min-width:30em) calc(30% - 15px)
		if ( !(sourceSizeListStr in sizeLengthCache) || cfg.uT ) {
			var winningLength = pf.calcLength( parseSizes( sourceSizeListStr ) );

			sizeLengthCache[ sourceSizeListStr ] = !winningLength ? units.width : winningLength;
		}

		return sizeLengthCache[ sourceSizeListStr ];
	};

	/**
	 * Takes a candidate object with a srcset property in the form of url/
	 * ex. "images/pic-medium.png 1x, images/pic-medium-2x.png 2x" or
	 *     "images/pic-medium.png 400w, images/pic-medium-2x.png 800w" or
	 *     "images/pic-small.png"
	 * Get an array of image candidates in the form of
	 *      {url: "/foo/bar.png", resolution: 1}
	 * where resolution is http://dev.w3.org/csswg/css-values-3/#resolution-value
	 * If sizes is specified, res is calculated
	 */
	pf.setRes = function( set ) {
		var candidates;
		if ( set ) {

			candidates = pf.parseSet( set );

			for ( var i = 0, len = candidates.length; i < len; i++ ) {
				setResolution( candidates[ i ], set.sizes );
			}
		}
		return candidates;
	};

	pf.setRes.res = setResolution;

	pf.applySetCandidate = function( candidates, img ) {
		if ( !candidates.length ) {return;}
		var candidate,
			i,
			j,
			length,
			bestCandidate,
			curSrc,
			curCan,
			candidateSrc,
			abortCurSrc;

		var imageData = img[ pf.ns ];
		var dpr = pf.DPR;

		curSrc = imageData.curSrc || img[curSrcProp];

		curCan = imageData.curCan || setSrcToCur(img, curSrc, candidates[0].set);

		// if we have a current source, we might either become lazy or give this source some advantage
		if ( curCan && curCan.set === candidates[ 0 ].set ) {

			// if browser can abort image request and the image has a higher pixel density than needed
			// and this image isn't downloaded yet, we skip next part and try to save bandwidth
			abortCurSrc = (supportAbort && !img.complete && curCan.res - 0.1 > dpr);

			if ( !abortCurSrc ) {
				curCan.cached = true;

				// if current candidate is "best", "better" or "okay",
				// set it to bestCandidate
				if ( curCan.res >= dpr ) {
					bestCandidate = curCan;
				}
			}
		}

		if ( !bestCandidate ) {

			candidates.sort( ascendingSort );

			length = candidates.length;
			bestCandidate = candidates[ length - 1 ];

			for ( i = 0; i < length; i++ ) {
				candidate = candidates[ i ];
				if ( candidate.res >= dpr ) {
					j = i - 1;

					// we have found the perfect candidate,
					// but let's improve this a little bit with some assumptions ;-)
					if (candidates[ j ] &&
						(abortCurSrc || curSrc !== pf.makeUrl( candidate.url )) &&
						chooseLowRes(candidates[ j ].res, candidate.res, dpr, candidates[ j ].cached)) {

						bestCandidate = candidates[ j ];

					} else {
						bestCandidate = candidate;
					}
					break;
				}
			}
		}

		if ( bestCandidate ) {

			candidateSrc = pf.makeUrl( bestCandidate.url );

			imageData.curSrc = candidateSrc;
			imageData.curCan = bestCandidate;

			if ( candidateSrc !== curSrc ) {
				pf.setSrc( img, bestCandidate );
			}
			pf.setSize( img );
		}
	};

	pf.setSrc = function( img, bestCandidate ) {
		var origWidth;
		img.src = bestCandidate.url;

		// although this is a specific Safari issue, we don't want to take too much different code paths
		if ( bestCandidate.set.type === "image/svg+xml" ) {
			origWidth = img.style.width;
			img.style.width = (img.offsetWidth + 1) + "px";

			// next line only should trigger a repaint
			// if... is only done to trick dead code removal
			if ( img.offsetWidth + 1 ) {
				img.style.width = origWidth;
			}
		}
	};

	pf.getSet = function( img ) {
		var i, set, supportsType;
		var match = false;
		var sets = img [ pf.ns ].sets;

		for ( i = 0; i < sets.length && !match; i++ ) {
			set = sets[i];

			if ( !set.srcset || !pf.matchesMedia( set.media ) || !(supportsType = pf.supportsType( set.type )) ) {
				continue;
			}

			if ( supportsType === "pending" ) {
				set = supportsType;
			}

			match = set;
			break;
		}

		return match;
	};

	pf.parseSets = function( element, parent, options ) {
		var srcsetAttribute, imageSet, isWDescripor, srcsetParsed;

		var hasPicture = parent && parent.nodeName.toUpperCase() === "PICTURE";
		var imageData = element[ pf.ns ];

		if ( imageData.src === undefined || options.src ) {
			imageData.src = getImgAttr.call( element, "src" );
			if ( imageData.src ) {
				setImgAttr.call( element, srcAttr, imageData.src );
			} else {
				removeImgAttr.call( element, srcAttr );
			}
		}

		if ( imageData.srcset === undefined || options.srcset || !pf.supSrcset || element.srcset ) {
			srcsetAttribute = getImgAttr.call( element, "srcset" );
			imageData.srcset = srcsetAttribute;
			srcsetParsed = true;
		}

		imageData.sets = [];

		if ( hasPicture ) {
			imageData.pic = true;
			getAllSourceElements( parent, imageData.sets );
		}

		if ( imageData.srcset ) {
			imageSet = {
				srcset: imageData.srcset,
				sizes: getImgAttr.call( element, "sizes" )
			};

			imageData.sets.push( imageSet );

			isWDescripor = (alwaysCheckWDescriptor || imageData.src) && regWDesc.test(imageData.srcset || "");

			// add normal src as candidate, if source has no w descriptor
			if ( !isWDescripor && imageData.src && !getCandidateForSrc(imageData.src, imageSet) && !imageSet.has1x ) {
				imageSet.srcset += ", " + imageData.src;
				imageSet.cands.push({
					url: imageData.src,
					d: 1,
					set: imageSet
				});
			}

		} else if ( imageData.src ) {
			imageData.sets.push( {
				srcset: imageData.src,
				sizes: null
			} );
		}

		imageData.curCan = null;
		imageData.curSrc = undefined;

		// if img has picture or the srcset was removed or has a srcset and does not support srcset at all
		// or has a w descriptor (and does not support sizes) set support to false to evaluate
		imageData.supported = !( hasPicture || ( imageSet && !pf.supSrcset ) || (isWDescripor && !pf.supSizes) );

		if ( srcsetParsed && pf.supSrcset && !imageData.supported ) {
			if ( srcsetAttribute ) {
				setImgAttr.call( element, srcsetAttr, srcsetAttribute );
				element.srcset = "";
			} else {
				removeImgAttr.call( element, srcsetAttr );
			}
		}

		if (imageData.supported && !imageData.srcset && ((!imageData.src && element.src) ||  element.src !== pf.makeUrl(imageData.src))) {
			if (imageData.src === null) {
				element.removeAttribute("src");
			} else {
				element.src = imageData.src;
			}
		}

		imageData.parsed = true;
	};

	pf.fillImg = function(element, options) {
		var imageData;
		var extreme = options.reselect || options.reevaluate;

		// expando for caching data on the img
		if ( !element[ pf.ns ] ) {
			element[ pf.ns ] = {};
		}

		imageData = element[ pf.ns ];

		// if the element has already been evaluated, skip it
		// unless `options.reevaluate` is set to true ( this, for example,
		// is set to true when running `picturefill` on `resize` ).
		if ( !extreme && imageData.evaled === evalId ) {
			return;
		}

		if ( !imageData.parsed || options.reevaluate ) {
			pf.parseSets( element, element.parentNode, options );
		}

		if ( !imageData.supported ) {
			applyBestCandidate( element );
		} else {
			imageData.evaled = evalId;
		}
	};

	pf.setupRun = function() {
		if ( !alreadyRun || isVwDirty || (DPR !== window.devicePixelRatio) ) {
			updateMetrics();
		}
	};

	// If picture is supported, well, that's awesome.
	if ( pf.supPicture ) {
		picturefill = noop;
		pf.fillImg = noop;
	} else {

		 // Set up picture polyfill by polling the document
		(function() {
			var isDomReady;
			var regReady = window.attachEvent ? /d$|^c/ : /d$|^c|^i/;

			var run = function() {
				var readyState = document.readyState || "";

				timerId = setTimeout(run, readyState === "loading" ? 200 :  999);
				if ( document.body ) {
					pf.fillImgs();
					isDomReady = isDomReady || regReady.test(readyState);
					if ( isDomReady ) {
						clearTimeout( timerId );
					}

				}
			};

			var timerId = setTimeout(run, document.body ? 9 : 99);

			// Also attach picturefill on resize and readystatechange
			// http://modernjavascript.blogspot.com/2013/08/building-better-debounce.html
			var debounce = function(func, wait) {
				var timeout, timestamp;
				var later = function() {
					var last = (new Date()) - timestamp;

					if (last < wait) {
						timeout = setTimeout(later, wait - last);
					} else {
						timeout = null;
						func();
					}
				};

				return function() {
					timestamp = new Date();

					if (!timeout) {
						timeout = setTimeout(later, wait);
					}
				};
			};
			var lastClientWidth = docElem.clientHeight;
			var onResize = function() {
				isVwDirty = Math.max(window.innerWidth || 0, docElem.clientWidth) !== units.width || docElem.clientHeight !== lastClientWidth;
				lastClientWidth = docElem.clientHeight;
				if ( isVwDirty ) {
					pf.fillImgs();
				}
			};

			on( window, "resize", debounce(onResize, 99 ) );
			on( document, "readystatechange", run );
		})();
	}

	pf.picturefill = picturefill;
	//use this internally for easy monkey patching/performance testing
	pf.fillImgs = picturefill;
	pf.teardownRun = noop;

	/* expose methods for testing */
	picturefill._ = pf;

	window.picturefillCFG = {
		pf: pf,
		push: function(args) {
			var name = args.shift();
			if (typeof pf[name] === "function") {
				pf[name].apply(pf, args);
			} else {
				cfg[name] = args[0];
				if (alreadyRun) {
					pf.fillImgs( { reselect: true } );
				}
			}
		}
	};

	while (setOptions && setOptions.length) {
		window.picturefillCFG.push(setOptions.shift());
	}

	/* expose picturefill */
	window.picturefill = picturefill;

	/* expose picturefill */
	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// CommonJS, just export
		module.exports = picturefill;
	} else if ( typeof define === "function" && define.amd ) {
		// AMD support
		define( "picturefill", function() { return picturefill; } );
	}

	// IE8 evals this sync, so it must be the last thing we do
	if ( !pf.supPicture ) {
		types[ "image/webp" ] = detectTypeSupport("image/webp", "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==" );
	}

} )( window, document );

},{}],43:[function(require,module,exports){
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

},{}],44:[function(require,module,exports){
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
