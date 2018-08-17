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
},{"qwery":11}],4:[function(require,module,exports){
'use strict';var _typeof='function'==typeof Symbol&&'symbol'==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&'function'==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?'symbol':typeof a},_fDom=require('@justeat/f-dom'),_fDom2=_interopRequireDefault(_fDom),_internal=require('./internal');Object.defineProperty(exports,'__esModule',{value:!0}),exports.setToggleCallback=exports.toggleSection=exports.toggleAccordion=void 0;function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}var toggleAccordion=function(a,b){return(0,_internal.handleAccordionToggles)(b,_fDom2.default.first(a),'show')},toggleSection=function(a){var b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:'is-hidden';return(0,_internal.handleToggles)(a,b)},setToggleCallback=function(a,b){var c='object'===('undefined'==typeof a?'undefined':_typeof(a))?a:_fDom2.default.first(a);if(!c)throw new Error('f-toggle: unable to find element from selector');var d=c.hasAttribute('data-toggle-accordion');if('function'!=typeof b)throw new Error('f-toggle: callback expects a function');if(!d&&!c.hasAttribute('data-toggle-target'))throw new Error('f-toggle: this element is missing a \'data-toggle-accordion\' or \'data-toggle-target\' attribute');d?(0,_fDom2.default)('[data-toggle-target]',c).filter(function(a){return!a.hasAttribute('data-toggle-accordion-exclude')}).forEach(function(a){a.addEventListener('click',function(){b.call(void 0,a)})}):c.addEventListener('click',function(){b.call(void 0,c)})};exports.toggleAccordion=toggleAccordion,exports.toggleSection=toggleSection,exports.setToggleCallback=setToggleCallback;
},{"./internal":5,"@justeat/f-dom":7}],5:[function(require,module,exports){
'use strict';var _slicedToArray=function(){function a(a,b){var c=[],d=!0,e=!1,f=void 0;try{for(var g,h=a[Symbol.iterator]();!(d=(g=h.next()).done)&&(c.push(g.value),!(b&&c.length===b));d=!0);}catch(a){e=!0,f=a}finally{try{!d&&h['return']&&h['return']()}finally{if(e)throw f}}return c}return function(b,c){if(Array.isArray(b))return b;if(Symbol.iterator in Object(b))return a(b,c);throw new TypeError('Invalid attempt to destructure non-iterable instance')}}(),_fDom=require('@justeat/f-dom'),_fDom2=_interopRequireDefault(_fDom);Object.defineProperty(exports,'__esModule',{value:!0}),exports.handleAccordionToggles=exports.handleToggles=exports.toggles=void 0;function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}var toggles=function(a){return{toggle:function toggle(b){b.classList.toggle(a)},show:function show(b){b.classList.remove(a)},hide:function hide(b){b.classList.add(a)}}},handleToggles=function(a,b){return Array.isArray(a)?void a.forEach(function(a){var c=a.split(':');1===c.length&&c.unshift('toggle');var d=_slicedToArray(c,2),e=d[0],f=d[1];(0,_fDom2.default)('[data-toggle-name~='+f+']').forEach(toggles(b)[e])}):void handleToggles(a.split(' '),b)},handleAccordionToggles=function(a,b){var c=2<arguments.length&&arguments[2]!==void 0?arguments[2]:'toggle',d=b.getAttribute('data-toggle-class')||'is-hidden';(0,_fDom2.default)('[data-toggle-name]',b).filter(function(a){return!a.hasAttribute('data-toggle-accordion-exclude')}).forEach(function(b){var e=b.getAttribute('data-toggle-name')===a?c:'hide';toggles(d)[e](b)})};exports.toggles=toggles,exports.handleToggles=handleToggles,exports.handleAccordionToggles=handleAccordionToggles;
},{"@justeat/f-dom":7}],6:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:!0}),exports.setToggleCallback=exports.toggleSection=exports.toggleAccordion=exports.setupToggle=void 0;var _fDom=require('@justeat/f-dom'),_fDom2=_interopRequireDefault(_fDom),_liteReady=require('lite-ready'),_liteReady2=_interopRequireDefault(_liteReady),_closest=require('closest'),_closest2=_interopRequireDefault(_closest),_internal=require('./helpers/internal'),_external=require('./helpers/external');function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}var onKeydown=function(a,b,c,d){if('Enter'===a.key&&b(a),c&&!d){var e=c.getAttribute('data-toggle-class')||'is-hidden',f=a.target.parentNode,g=!a.shiftKey&&'Tab'===a.key,h=a.shiftKey&&'Tab'===a.key;g&&f.nextElementSibling&&f.nextElementSibling.hasAttribute('data-toggle-name')&&f.classList.contains(e)&&(a.preventDefault(),f.nextElementSibling.querySelector('[data-toggle-target]').focus()),h&&f.previousElementSibling&&f.previousElementSibling.hasAttribute('data-toggle-name')&&f.previousElementSibling.classList.contains(e)&&(a.preventDefault(),f.previousElementSibling.querySelector('[data-toggle-target]').focus())}},setupToggle=function(){(0,_fDom2.default)('[data-toggle-accordion]').forEach(function(a){var b=a.getAttribute('data-toggle-class')||'is-hidden',c=a.hasAttribute('data-toggle-first-section-expanded');(0,_fDom2.default)('[data-toggle-name]',a).filter(function(a){return!a.hasAttribute('data-toggle-accordion-exclude')}).slice(c?1:0).forEach((0,_internal.toggles)(b).hide)}),(0,_fDom2.default)('[data-toggle-target]').forEach(function(a){var b=a.getAttribute('data-toggle-target'),c=a.hasAttribute('data-toggle-accordion-exclude'),d=(0,_closest2.default)(a,'[data-toggle-accordion]'),e=a.getAttribute('data-toggle-class')||'is-hidden',f=function(a){return a.preventDefault(),d&&!c?(0,_internal.handleAccordionToggles)(b,d):(0,_internal.handleToggles)(b,e)};a.addEventListener('click',f),a.addEventListener('keydown',function(a){onKeydown(a,f,d,c)})})};exports.setupToggle=setupToggle,exports.toggleAccordion=_external.toggleAccordion,exports.toggleSection=_external.toggleSection,exports.setToggleCallback=_external.setToggleCallback,(0,_liteReady2.default)(function(){setupToggle()});
},{"./helpers/external":4,"./helpers/internal":5,"@justeat/f-dom":7,"closest":8,"lite-ready":9}],7:[function(require,module,exports){
arguments[4][3][0].apply(exports,arguments)
},{"dup":3,"qwery":11}],8:[function(require,module,exports){
var matches = require('matches-selector')

module.exports = function (element, selector, checkYoSelf) {
  var parent = checkYoSelf ? element : element.parentNode

  while (parent && parent !== document) {
    if (matches(parent, selector)) return parent;
    parent = parent.parentNode
  }
}

},{"matches-selector":10}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){

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
},{}],11:[function(require,module,exports){
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
