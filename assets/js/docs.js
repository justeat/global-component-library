(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

require('@justeat/f-toggle');

var _fDom = require('@justeat/f-dom');

var _fDom2 = _interopRequireDefault(_fDom);

require('./ui-components/header');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// any additional docs functionality goes in here
var docs = {
    demoBtnText: {
        whenHidden: 'Show Code',
        whenVisible: 'Hide Code'
    },

    // controls all of our base initialsation functions
    init: function init() {
        docs._demoHandler();
        docs._disableDemoLinks();
    },

    _demoHandler: function _demoHandler() {
        (0, _fDom2.default)('.demo').forEach(function (demoEl) {
            var codeBlock = _fDom2.default.first('.demo-code', demoEl);

            codeBlock.classList.add('is-hidden');

            var demoToggleBtn = document.createElement('button');

            demoToggleBtn.type = 'button';
            demoToggleBtn.classList.add('o-btn', 'o-btn--secondary', 'o-btn--codeToggle');
            demoToggleBtn.textContent = docs.demoBtnText.whenHidden;
            demoToggleBtn.addEventListener('click', docs._demoToggle);

            demoEl.insertBefore(demoToggleBtn, codeBlock);
        });

        (0, _fDom2.default)('.sg-sideNav .is-incomplete').forEach(function (el) {
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
        (0, _fDom2.default)('.demo a').forEach(function (link) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
            });
        });
    }

}; /**
    * Custom JS for the documentation part of the site
    *
    * Can pull in logging modules – such as those used for the address lookup
    */

docs.init();

},{"./ui-components/header":2,"@justeat/f-dom":3,"@justeat/f-toggle":6}],2:[function(require,module,exports){
'use strict';

var _fDom = require('@justeat/f-dom');

var _fDom2 = _interopRequireDefault(_fDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var signedOutDemoEl = _fDom2.default.first('[data-js-header-signed-out]');
if (signedOutDemoEl) {
    _fDom2.default.first('[data-auth-wrapper]', signedOutDemoEl).remove();
    _fDom2.default.first('[data-login]', signedOutDemoEl).classList.remove('is-hidden');
}

var signedInDemoEl = _fDom2.default.first('[data-js-header-signed-in]');
if (signedInDemoEl) {
    _fDom2.default.first('[data-name]', signedInDemoEl).textContent = 'Bear';
    _fDom2.default.first('[data-email]', signedInDemoEl).textContent = 'ui@just-eat.com';

    _fDom2.default.first('[data-auth-wrapper]', signedInDemoEl).classList.remove('is-hidden');
    _fDom2.default.first('[data-login]', signedInDemoEl).remove();
}

},{"@justeat/f-dom":3}],3:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:!0});var _qwery=require('qwery'),_qwery2=_interopRequireDefault(_qwery);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}var first=function(a){var b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:null;return(0,_qwery2.default)(a,b)[0]},all=function(a){var b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:null;return(0,_qwery2.default)(a,b)},exists=function(a){var b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:null;return 0<(0,_qwery2.default)(a,b).length},dom=all;dom.all=all,dom.first=first,dom.exists=exists,exports.default=dom;
},{"qwery":10}],4:[function(require,module,exports){
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
},{"./internal":5,"@justeat/f-dom":3}],5:[function(require,module,exports){
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
},{"@justeat/f-dom":3}],6:[function(require,module,exports){
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
},{"./helpers/external":4,"./helpers/internal":5,"@justeat/f-dom":3,"closest":7,"lite-ready":8}],7:[function(require,module,exports){
var matches = require('matches-selector')

module.exports = function (element, selector, checkYoSelf) {
  var parent = checkYoSelf ? element : element.parentNode

  while (parent && parent !== document) {
    if (matches(parent, selector)) return parent;
    parent = parent.parentNode
  }
}

},{"matches-selector":9}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){

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
},{}],10:[function(require,module,exports){
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

},{}]},{},[1])
//# sourceMappingURL=docs.js.map
