(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _qwery = require('qwery');

var _qwery2 = _interopRequireDefault(_qwery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// any additional docs functionality goes in here
var docs = {
    demoEls: (0, _qwery2.default)('.demo'),
    demoBtnText: {
        whenHidden: 'Show Code',
        whenVisible: 'Hide Code'
    },

    // controls all of our base initialsation functions
    init: function init() {

        docs._demoHandler();
    },

    _demoHandler: function _demoHandler() {

        var demoElCount = docs.demoEls.length;

        for (var i = 0; i < demoElCount; i++) {
            var demoEl = docs.demoEls[i],
                codeBlock = demoEl.querySelector('.demo-code');

            codeBlock.classList.add('is-hidden');

            var demoToggleBtn = document.createElement('a');
            demoToggleBtn.classList.add('o-btn', 'o-btn--codeToggle');
            demoToggleBtn.textContent = docs.demoBtnText.whenHidden;
            demoToggleBtn.addEventListener('click', docs._demoToggle);
            demoEl.insertBefore(demoToggleBtn, codeBlock);
        }
    },

    _demoToggle: function _demoToggle() {

        var btn = event.target,
            codeBlock = btn.nextElementSibling,
            isHidden = codeBlock.classList.contains('is-hidden');

        codeBlock.classList.toggle('is-hidden');
        btn.classList.toggle('is-clicked');

        if (isHidden) {
            btn.textContent = docs.demoBtnText.whenVisible;
        } else {
            btn.textContent = docs.demoBtnText.whenHidden;
        }
    }

}; /**
    * Custom JS for the documentation part of the site
    *
    * Can pull in logging modules – such as those used for the address lookup
    */

docs.init();

},{"qwery":2}],2:[function(require,module,exports){
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
