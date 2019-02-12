(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fDom = _interopRequireDefault(require("@justeat/f-dom"));

var _bezierEasing = _interopRequireDefault(require("bezier-easing"));

var _lodash = _interopRequireDefault(require("lodash.throttle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ScrollSpy =
/*#__PURE__*/
function () {
  function ScrollSpy(_ref) {
    var selector = _ref.selector;

    _classCallCheck(this, ScrollSpy);

    this.items = null;
    this.exact = null;
    this.observer = null;
    this.currentItem = null;
    this.lastActiveItem = null;
    this.offset = 20;
    this.activeClass = 'c-menu-link--active';
    this.duration = 600;
    this.alwaysTrack = false;
    this.bezierEasingValue = '.5,0,.35,1';
    this.modifyUrl = true;
    this.bezierEasing = _bezierEasing.default;
    this.elem = _fDom.default.first(selector); // Have to rebind the event handlers here so that the context is not lost and also so that
    // the events can be correctly removed — when `.bind()` is appended it creates a new function.

    this.onScrollHandler = (0, _lodash.default)(this.onScroll.bind(this), 150);
    this.onClickHandler = this.onClick.bind(this);

    if (this.elem) {
      this.init();
    }
  }

  _createClass(ScrollSpy, [{
    key: "getItemInsideWindow",
    value: function getItemInsideWindow() {
      var _this = this;

      var currItem;
      var _window = window,
          pageYOffset = _window.pageYOffset;
      this.items.forEach(function (item) {
        var target = document.getElementById(item.hash.substr(1));
        if (!target) return;
        var offsetTop = ScrollSpy.getOffsetTop(target);
        var isScreenPastSection = pageYOffset >= offsetTop - _this.offset;
        var isScreenBeforeSectionEnd = pageYOffset < offsetTop - _this.offset + target.offsetHeight;

        if (_this.exact && isScreenPastSection && isScreenBeforeSectionEnd) {
          currItem = item;
        }

        if (!_this.exact && isScreenPastSection) {
          currItem = item;
        }
      });
      return currItem;
    }
  }, {
    key: "removeActiveClass",
    value: function removeActiveClass() {
      var _this2 = this;

      this.items.forEach(function (item) {
        item.classList.remove(_this2.activeClass);
      });
    }
  }, {
    key: "addActiveClass",
    value: function addActiveClass() {
      if (this.currentItem) {
        this.currentItem.classList.add(this.activeClass);
      } else {
        this.items[0].classList.add(this.activeClass);
      }
    }
  }, {
    key: "onScroll",
    value: function onScroll() {
      this.currentItem = this.getItemInsideWindow();

      if (this.currentItem !== this.lastActiveItem) {
        this.removeActiveClass();
        this.lastActiveItem = this.currentItem;
      }

      this.addActiveClass();
    }
  }, {
    key: "scrollTo",
    value: function scrollTo(target) {
      var _this3 = this;

      return new Promise(function (resolve) {
        var targetDistanceFromTop = ScrollSpy.getOffsetTop(target);
        var startingY = window.pageYOffset;
        var difference = targetDistanceFromTop - startingY;

        var easing = _this3.bezierEasing.apply(_this3, _toConsumableArray(_this3.bezierEasingValue.split(',')));

        var start = null;

        var step = function step(timestamp) {
          if (!start) start = timestamp;
          var progress = timestamp - start;
          var progressPercentage = progress / _this3.duration;
          if (progress >= _this3.duration) progress = _this3.duration;
          if (progressPercentage >= 1) progressPercentage = 1;

          var perTick = startingY + easing(progressPercentage) * (difference - _this3.offset);

          window.scrollTo(0, perTick);

          if (progress < _this3.duration) {
            _this3.scrollAnimationFrame = window.requestAnimationFrame(step);
          } else {
            window.addEventListener('scroll', _this3.onScrollHandler);
            resolve();
          }
        };

        window.requestAnimationFrame(step);
      });
    }
  }, {
    key: "onClick",
    value: function onClick(event) {
      var _this4 = this;

      event.preventDefault();
      var hash = event.currentTarget.hash;
      var target = document.getElementById(hash.substr(1));

      if (!target) {
        return;
      }
      /**
       *  Temporarily removes the scroll listener and the request animation frame so the active
       *  class will only be applied to the clicked element, and not all elements while the window
       *  is scrolling.
       */


      if (!this.alwaysTrack) {
        window.removeEventListener('scroll', this.onScrollHandler);
        window.cancelAnimationFrame(this.scrollAnimationFrame);
        this.removeActiveClass();
        event.currentTarget.classList.add(this.activeClass);
      }

      this.scrollTo(target).then(function () {
        if (_this4.modifyUrl) {
          // Update the location hash after we've finished animating
          if (window.history.pushState) {
            window.history.pushState(null, null, hash);
          } else {
            window.location.hash = hash;
          }
        }
      });
    }
  }, {
    key: "initScrollActiveItems",
    value: function initScrollActiveItems() {
      var _this5 = this;

      this.items = (0, _fDom.default)('.c-menu-link', this.elem);
      this.items.forEach(function (item) {
        item.addEventListener('click', _this5.onClickHandler);
      });
    }
  }, {
    key: "init",
    value: function init() {
      var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

      if (!this.observer) {
        this.observer = new MutationObserver(this.initScrollActiveItems);
        this.observer.observe(this.elem, {
          childList: true,
          subtree: true
        });
      }

      this.initScrollActiveItems();
      this.removeActiveClass();
      this.currentItem = this.getItemInsideWindow();
      this.addActiveClass();
      window.addEventListener('scroll', this.onScrollHandler);
    }
  }], [{
    key: "getOffsetTop",
    value: function getOffsetTop(element) {
      var yPosition = 0;
      var nextElement = element;

      while (nextElement) {
        yPosition += nextElement.offsetTop;
        nextElement = nextElement.offsetParent;
      }

      return yPosition;
    }
  }]);

  return ScrollSpy;
}();

exports.default = ScrollSpy;

},{"@justeat/f-dom":4,"bezier-easing":9,"lodash.throttle":12}],2:[function(require,module,exports){
"use strict";

require("@justeat/f-toggle");

var _fDom = _interopRequireDefault(require("@justeat/f-dom"));

require("./ui-components/header");

var _ScrollSpy = _interopRequireDefault(require("../ScrollSpy"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Custom JS for the documentation part of the site
 *
 * Can pull in logging modules – such as those used for the address lookup
 */
// any additional docs functionality goes in here
var docs = {
  demoBtnText: {
    whenHidden: 'Show Code',
    whenVisible: 'Hide Code'
  },
  themeBtn: null,
  themeBtnText: {
    menulogBtnText: 'Switch to JE',
    JEBtnText: 'Switch to Menulog'
  },
  // controls all of our base initialsation functions
  init: function init() {
    docs._demoHandler();

    docs._disableDemoLinks();

    docs._themeHandler();
  },
  _demoHandler: function _demoHandler() {
    (0, _fDom.default)('.demo').forEach(function (demoEl) {
      var codeBlock = _fDom.default.first('.demo-code', demoEl);

      codeBlock.classList.add('is-hidden');
      var demoToggleBtn = document.createElement('button');
      demoToggleBtn.type = 'button';
      demoToggleBtn.classList.add('o-btn', 'o-btn--secondary', 'o-btn--codeToggle');
      demoToggleBtn.textContent = docs.demoBtnText.whenHidden;
      demoToggleBtn.addEventListener('click', docs._demoToggle);
      demoEl.insertBefore(demoToggleBtn, codeBlock);
    });
    (0, _fDom.default)('.sg-sideNav .is-incomplete').forEach(function (el) {
      el.setAttribute('tabindex', -1);
      el.addEventListener('click', function (e) {
        e.preventDefault();
      });
    });
  },
  _demoToggle: function _demoToggle(event) {
    var btn = event.target;
    var codeBlock = btn.nextElementSibling;
    var isHidden = codeBlock.classList.contains('is-hidden');
    codeBlock.classList.toggle('is-hidden');
    btn.classList.toggle('is-clicked');

    if (isHidden) {
      btn.textContent = docs.demoBtnText.whenVisible;
    } else {
      btn.textContent = docs.demoBtnText.whenHidden;
    }
  },
  _disableDemoLinks: function _disableDemoLinks() {
    (0, _fDom.default)('.demo a').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
      });
    });
  },
  // enables a rebrand toggle checkbox which switches between legacy and rebranded styling
  _themeHandler: function _themeHandler() {
    var toggleContainer = document.createElement('div'),
        toggleBtn = document.createElement('btn');
    toggleContainer.classList.add('sg-themeToggle');
    toggleBtn.classList.add('o-btn', 'o-btn--outline', 'sg-themeToggle-btn');
    toggleBtn.textContent = 'Switch to Menulog';
    toggleBtn.addEventListener('click', docs._themeToggle);
    toggleContainer.append(toggleBtn);
    document.body.append(toggleContainer);
    docs.themeBtn = _fDom.default.first('.sg-themeToggle-btn');

    var currentTheme = docs._getTheme();

    if (currentTheme !== 'je') {
      docs._setTheme(currentTheme);
    }
  },
  _themeToggle: function _themeToggle(event) {
    var isMenulog = event.target.innerText.toLowerCase().includes('menulog'); // if the stylesheet currently includes the Menulog prefix, change theme to JE

    if (isMenulog) {
      docs._setTheme('ml');
    } else {
      docs._setTheme('je');
    }
  },
  _getLocalStorageContext: function _getLocalStorageContext(typeItem, name, value) {
    if (window.localStorage) {
      return window.localStorage[typeItem](name, value);
    }

    return null;
  },
  _saveTheme: function _saveTheme(theme) {
    if (theme !== null) {
      docs._getLocalStorageContext('setItem', 'docsTheme', theme);
    }
  },
  _getTheme: function _getTheme() {
    var storedTheme = docs._getLocalStorageContext('getItem', 'docsTheme');

    if (storedTheme !== null) {
      return storedTheme;
    }

    return 'je';
  },
  _setTheme: function _setTheme(theme) {
    var stylesheet = [].slice.call(document.getElementsByTagName('link')).find(function (css) {
      return css.href.includes('/je');
    });
    var isDocsPage = stylesheet.href.includes('docs');
    var btn = docs.themeBtn;

    if (theme === 'je') {
      stylesheet.href = stylesheet.href.replace('.menulog', '');
      btn.textContent = docs.themeBtnText.JEBtnText;

      docs._saveTheme('je');
    } else {
      if (isDocsPage) {
        stylesheet.href = stylesheet.href.replace('/je-docs', '/je-docs.menulog');
      } else {
        stylesheet.href = stylesheet.href.replace('/je', '/je.menulog');
      }

      btn.textContent = docs.themeBtnText.menulogBtnText;

      docs._saveTheme('ml');
    }
  }
};
new _ScrollSpy.default({
  selector: '[data-category-menu]'
}); // eslint-disable-line no-new

docs.init();

},{"../ScrollSpy":1,"./ui-components/header":3,"@justeat/f-dom":4,"@justeat/f-toggle":7}],3:[function(require,module,exports){
"use strict";

var _fDom = _interopRequireDefault(require("@justeat/f-dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var signedOutDemoEl = _fDom.default.first('[data-js-header-signed-out]');

if (signedOutDemoEl) {
  _fDom.default.first('[data-auth-wrapper]', signedOutDemoEl).remove();

  _fDom.default.first('[data-login]', signedOutDemoEl).classList.remove('is-hidden');
}

var signedInDemoEl = _fDom.default.first('[data-js-header-signed-in]');

if (signedInDemoEl) {
  _fDom.default.first('[data-name]', signedInDemoEl).textContent = 'Bear';
  _fDom.default.first('[data-email]', signedInDemoEl).textContent = 'ui@just-eat.com';

  _fDom.default.first('[data-auth-wrapper]', signedInDemoEl).classList.remove('is-hidden');

  _fDom.default.first('[data-login]', signedInDemoEl).remove();
}

},{"@justeat/f-dom":4}],4:[function(require,module,exports){
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
},{"qwery":14}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setToggleCallback = exports.toggleSection = exports.toggleAccordion = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _fDom = require('@justeat/f-dom');

var _fDom2 = _interopRequireDefault(_fDom);

var _internal = require('./internal');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Allows user to toggle an accordion from another module
 *
 * @example <caption>This would 'show' section 'two', and hide all others</caption>
 *
 * import { toggleAccordion } from '@justeat/f-toggle';
 *
 * <div data-toggle-accordion>
 *   <div data-toggle-name="one"></div>
 *   <button data-toggle-target="one"></button>
 *   <div data-toggle-name="two"></div>
 *   <button data-toggle-target="two"></button>
 * </div>
 *
 * toggleAccordion('[data-toggle-accordion]', 'two');
 *
 * @param {string} selector
 * @param {string} target
 */
var toggleAccordion = function toggleAccordion(selector, target) {
    return (0, _internal.handleAccordionToggles)(target, _fDom2.default.first(selector), 'show');
};

/**
 * Allows user to toggle sections based on options passed in
 *
 * @example <caption>This would 'hide' section 'one' and 'two'</caption>
 *
 * import { toggleSection } from '@justeat/f-toggle';
 *
 *   <div data-toggle-name="one"></div>
 *   <button data-toggle-target="one"></button>
 *   <div data-toggle-name="two"></div>
 *   <button data-toggle-target="two"></button>
 *
 * toggleSection('hide:one hide:two');
 *
 * @param {string} target
 * @param {string} toggleClass
 */
var toggleSection = function toggleSection(target) {
    var toggleClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'is-hidden';
    return (0, _internal.handleToggles)(target, toggleClass);
};

/**
 * Allows user to run callback when a section is toggled
 *
 * @example <caption>This would call the callback if any section within the accordion is toggled</caption>
 *
 * setToggleCallback('[data-toggle-accordion]', () => {
 *   callbackFn();
 * });
 *
 * @example <caption>This would call the callback if the section is toggled</caption>
 *
 * setToggleCallback('[data-toggle-target]', () => {
 *   callbackFn();
 * });
 *
 * @param {string|Element} selector
 * @param {function} callback
 */
var setToggleCallback = function setToggleCallback(selector, callback) {
    var container = (typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) === 'object' ? selector : _fDom2.default.first(selector);

    if (!container) {
        throw new Error('f-toggle: unable to find element from selector');
    }

    var isAccordion = container.hasAttribute('data-toggle-accordion');

    if (typeof callback !== 'function') {
        throw new Error('f-toggle: callback expects a function');
    }

    if (!isAccordion && !container.hasAttribute('data-toggle-target')) {
        throw new Error('f-toggle: this element is missing a \'data-toggle-accordion\' or \'data-toggle-target\' attribute');
    }

    if (isAccordion) {
        (0, _fDom2.default)('[data-toggle-target]', container).filter(function (toggle) {
            return !toggle.hasAttribute('data-toggle-accordion-exclude');
        }).forEach(function (toggle) {
            toggle.addEventListener('click', function () {
                callback.call(undefined, toggle);
            });
        });
    } else {
        container.addEventListener('click', function () {
            callback.call(undefined, container);
        });
    }
};

exports.toggleAccordion = toggleAccordion;
exports.toggleSection = toggleSection;
exports.setToggleCallback = setToggleCallback;
},{"./internal":6,"@justeat/f-dom":8}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handleAccordionToggles = exports.handleToggles = exports.toggles = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _fDom = require('@justeat/f-dom');

var _fDom2 = _interopRequireDefault(_fDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Toggles, shows or hides elements by adding/removing 'toggleClass'
 *
 * @example <caption>This would call the 'show' method, removing the class 'is-hidden-custom' from the element</caption>
 *
 * toggles('is-hidden-custom')['show'](element);
 *
 * @param {string} toggleClass
 *
 * @property {object} toggle Toggle an element's visibility.
 * @property {object} show Shows an element.
 * @property {object} hide Hides an element.
 */
var toggles = function toggles(toggleClass) {
    return {
        toggle: function toggle(element) {
            element.classList.toggle(toggleClass);
        },
        show: function show(element) {
            element.classList.remove(toggleClass);
        },
        hide: function hide(element) {
            element.classList.add(toggleClass);
        }
    };
};

/**
 * Applies toggle behaviour to referenced 'data-toggle-name' elements based on options passed in
 *
 * @example <caption>This would attach the 'show' method to the 'data-toggle-name="one"' element, and
 * attach the 'hide' method to the 'data-toggle-name="two"' element</caption
 *
 * handleToggles('show:one hide:two', 'is-hidden-custom');
 *
 * @param {string|string[]} targets
 * @param {string} toggleClass
 */
var handleToggles = function handleToggles(targets, toggleClass) {
    if (!Array.isArray(targets)) {
        handleToggles(targets.split(' '), toggleClass);
        return;
    }

    targets.forEach(function (target) {
        var parts = target.split(':');

        if (parts.length === 1) {
            parts.unshift('toggle');
        }

        var _parts = _slicedToArray(parts, 2),
            toggleType = _parts[0],
            toggleName = _parts[1];

        (0, _fDom2.default)('[data-toggle-name~=' + toggleName + ']').forEach(toggles(toggleClass)[toggleType]);
    });
};

/**
 * Toggles the target you have clicked, and hides all other elements in the accordion
 *
 * @example <caption>This would toggle the section 'one', and close all other accordion sections
 *
 * handleAccordionToggles('one', element);
 *
 * @param {string} target
 * @param {object} accordion
 * @param {string} visibility
 */
var handleAccordionToggles = function handleAccordionToggles(target, accordion) {
    var visibility = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'toggle';

    var toggleClass = accordion.getAttribute('data-toggle-class') || 'is-hidden';

    (0, _fDom2.default)('[data-toggle-name]', accordion).filter(function (toggle) {
        return !toggle.hasAttribute('data-toggle-accordion-exclude');
    }).forEach(function (element) {
        var type = element.getAttribute('data-toggle-name') === target ? visibility : 'hide';
        toggles(toggleClass)[type](element);
    });
};

exports.toggles = toggles;
exports.handleToggles = handleToggles;
exports.handleAccordionToggles = handleAccordionToggles;
},{"@justeat/f-dom":8}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setToggleCallback = exports.toggleSection = exports.toggleAccordion = exports.setupToggle = undefined;

var _fDom = require('@justeat/f-dom');

var _fDom2 = _interopRequireDefault(_fDom);

var _liteReady = require('lite-ready');

var _liteReady2 = _interopRequireDefault(_liteReady);

var _closest = require('closest');

var _closest2 = _interopRequireDefault(_closest);

var _internal = require('./helpers/internal');

var _external = require('./helpers/external');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onKeydown = function onKeydown(event, bindToggleBehaviour, accordion, accordionExclude) {
    // if user has pressed 'enter' bind toggle behaviour
    if (event.key === 'Enter') {
        bindToggleBehaviour(event);
    }

    // if the section clicked is an accordion element
    if (accordion && !accordionExclude) {
        var toggleAccordionClass = accordion.getAttribute('data-toggle-class') || 'is-hidden';
        var parent = event.target.parentNode;
        var tabbed = !event.shiftKey && event.key === 'Tab';
        var reverseTabbed = event.shiftKey && event.key === 'Tab';

        // if user has tabbed then focus on next accordion section
        if (tabbed && parent.nextElementSibling && parent.nextElementSibling.hasAttribute('data-toggle-name') && parent.classList.contains(toggleAccordionClass)) {
            event.preventDefault();
            parent.nextElementSibling.querySelector('[data-toggle-target]').focus();
        }

        // if user has reverse tabbed then focus on previous accordion section
        if (reverseTabbed && parent.previousElementSibling && parent.previousElementSibling.hasAttribute('data-toggle-name') && parent.previousElementSibling.classList.contains(toggleAccordionClass)) {
            event.preventDefault();
            parent.previousElementSibling.querySelector('[data-toggle-target]').focus();
        }
    }
}; /**
    * @overview Fozzie vanilla JS toggle library.
    *
    * @module f-toggle
    */

var setupToggle = function setupToggle() {
    /**
     * If accordion, display first section on initialisation based on "data-toggle-first-section-expanded" attribute presence
     */

    (0, _fDom2.default)('[data-toggle-accordion]').forEach(function (accordion) {
        var toggleClass = accordion.getAttribute('data-toggle-class') || 'is-hidden';
        var isFirstSectionExpanded = accordion.hasAttribute('data-toggle-first-section-expanded');

        (0, _fDom2.default)('[data-toggle-name]', accordion).filter(function (toggle) {
            return !toggle.hasAttribute('data-toggle-accordion-exclude');
        }).slice(isFirstSectionExpanded ? 1 : 0).forEach((0, _internal.toggles)(toggleClass).hide);
    });

    /**
     * Bind the toggle element click events
     */

    (0, _fDom2.default)('[data-toggle-target]').forEach(function (toggle) {
        var target = toggle.getAttribute('data-toggle-target');
        var accordionExclude = toggle.hasAttribute('data-toggle-accordion-exclude');
        var accordion = (0, _closest2.default)(toggle, '[data-toggle-accordion]');
        var toggleClass = toggle.getAttribute('data-toggle-class') || 'is-hidden';

        var addToggleBehaviour = function addToggleBehaviour(event) {
            event.preventDefault();
            return accordion && !accordionExclude ? (0, _internal.handleAccordionToggles)(target, accordion) : (0, _internal.handleToggles)(target, toggleClass);
        };

        toggle.addEventListener('click', addToggleBehaviour);
        toggle.addEventListener('keydown', function (event) {
            onKeydown(event, addToggleBehaviour, accordion, accordionExclude);
        });
    });
};

exports.setupToggle = setupToggle;
exports.toggleAccordion = _external.toggleAccordion;
exports.toggleSection = _external.toggleSection;
exports.setToggleCallback = _external.setToggleCallback;


(0, _liteReady2.default)(function () {
    setupToggle();
});
},{"./helpers/external":5,"./helpers/internal":6,"@justeat/f-dom":8,"closest":10,"lite-ready":11}],8:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:!0});var _qwery=require('qwery'),_qwery2=_interopRequireDefault(_qwery);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}var first=function(a){var b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:null;return(0,_qwery2.default)(a,b)[0]},all=function(a){var b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:null;return(0,_qwery2.default)(a,b)},exists=function(a){var b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:null;return 0<(0,_qwery2.default)(a,b).length},dom=all;dom.all=all,dom.first=first,dom.exists=exists,exports.default=dom;
},{"qwery":14}],9:[function(require,module,exports){
/**
 * https://github.com/gre/bezier-easing
 * BezierEasing - use bezier curve for transition easing function
 * by Gaëtan Renaudeau 2014 - 2015 – MIT License
 */

// These values are established by empiricism with tests (tradeoff: performance VS precision)
var NEWTON_ITERATIONS = 4;
var NEWTON_MIN_SLOPE = 0.001;
var SUBDIVISION_PRECISION = 0.0000001;
var SUBDIVISION_MAX_ITERATIONS = 10;

var kSplineTableSize = 11;
var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

var float32ArraySupported = typeof Float32Array === 'function';

function A (aA1, aA2) { return 1.0 - 3.0 * aA2 + 3.0 * aA1; }
function B (aA1, aA2) { return 3.0 * aA2 - 6.0 * aA1; }
function C (aA1)      { return 3.0 * aA1; }

// Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
function calcBezier (aT, aA1, aA2) { return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT; }

// Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.
function getSlope (aT, aA1, aA2) { return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1); }

function binarySubdivide (aX, aA, aB, mX1, mX2) {
  var currentX, currentT, i = 0;
  do {
    currentT = aA + (aB - aA) / 2.0;
    currentX = calcBezier(currentT, mX1, mX2) - aX;
    if (currentX > 0.0) {
      aB = currentT;
    } else {
      aA = currentT;
    }
  } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
  return currentT;
}

function newtonRaphsonIterate (aX, aGuessT, mX1, mX2) {
 for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
   var currentSlope = getSlope(aGuessT, mX1, mX2);
   if (currentSlope === 0.0) {
     return aGuessT;
   }
   var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
   aGuessT -= currentX / currentSlope;
 }
 return aGuessT;
}

function LinearEasing (x) {
  return x;
}

module.exports = function bezier (mX1, mY1, mX2, mY2) {
  if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
    throw new Error('bezier x values must be in [0, 1] range');
  }

  if (mX1 === mY1 && mX2 === mY2) {
    return LinearEasing;
  }

  // Precompute samples table
  var sampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
  for (var i = 0; i < kSplineTableSize; ++i) {
    sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
  }

  function getTForX (aX) {
    var intervalStart = 0.0;
    var currentSample = 1;
    var lastSample = kSplineTableSize - 1;

    for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
      intervalStart += kSampleStepSize;
    }
    --currentSample;

    // Interpolate to provide an initial guess for t
    var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
    var guessForT = intervalStart + dist * kSampleStepSize;

    var initialSlope = getSlope(guessForT, mX1, mX2);
    if (initialSlope >= NEWTON_MIN_SLOPE) {
      return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
    } else if (initialSlope === 0.0) {
      return guessForT;
    } else {
      return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
    }
  }

  return function BezierEasing (x) {
    // Because JavaScript number are imprecise, we should guarantee the extremes are right.
    if (x === 0) {
      return 0;
    }
    if (x === 1) {
      return 1;
    }
    return calcBezier(getTForX(x), mY1, mY2);
  };
};

},{}],10:[function(require,module,exports){
var matches = require('matches-selector')

module.exports = function (element, selector, checkYoSelf) {
  var parent = checkYoSelf ? element : element.parentNode

  while (parent && parent !== document) {
    if (matches(parent, selector)) return parent;
    parent = parent.parentNode
  }
}

},{"matches-selector":13}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){

/**
 * Element prototype.
 */

var proto = Element.prototype;

/**
 * Vendor function.
 */

var vendor = proto.matchesSelector
  || proto.webkitMatchesSelector
  || proto.mozMatchesSelector
  || proto.msMatchesSelector
  || proto.oMatchesSelector;

/**
 * Expose `match()`.
 */

module.exports = match;

/**
 * Match `el` to `selector`.
 *
 * @param {Element} el
 * @param {String} selector
 * @return {Boolean}
 * @api public
 */

function match(el, selector) {
  if (vendor) return vendor.call(el, selector);
  var nodes = el.parentNode.querySelectorAll(selector);
  for (var i = 0; i < nodes.length; ++i) {
    if (nodes[i] == el) return true;
  }
  return false;
}
},{}],14:[function(require,module,exports){
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

},{}]},{},[2])
//# sourceMappingURL=docs.js.map
