/*!
 * print-img.js
 * Just print an image.
 * @author: xovel
 * @license: MIT
 */
(function (root, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory()
  } else if (typeof define === 'function' && define.amd) {
    define('printImg', [], factory)
  } else if (typeof exports === 'object') {
    exports['printImg'] = factory()
  } else {
    root['printImg'] = factory()
  }
})(this, function () {
  var hasOwn = Object.prototype.hasOwnProperty

  // extend an object
  function _extend(dest, source) {
    var ret = {}
    for (var i = 0; i < arguments.length; i++) {
      var current = arguments[i]
      if (current) {
        for (var key in current) {
          if (hasOwn.call(current, key)) {
            ret[key] = current[key]
          }
        }
      }
    }
    return ret
  }

  // IE 6-11
  var isIE = function () {
    return navigator.userAgent.indexOf('MSIE') !== -1 || !!document.documentMode
  }

  // Edge 20+
  var isEdge = function () {
    return !isIE() && !!window.StyleMedia
  }

  /**
   * Print the image
   *
   * @param {string} src image src
   * @param {object} options
   */
  function printImg(src, _options) {
    var options = _extend({}, printImg.defaults, _options)

    var _iframe = document.getElementById(options.id)
    if (_iframe) {
      _iframe.parentNode.removeChild(_iframe)
    }

    _iframe = document.createElement('iframe')
    // hide it
    _iframe.setAttribute('style', 'visibility: hidden; height: 0; width: 0; position: absolute;')
    _iframe.setAttribute('id', options.id)

    // element to print
    var _div = document.createElement('div')
    if (options.wrapStyle) {
      _div.setAttribute('style', options.wrapStyle)
    }

    var _img = document.createElement('img')
    _img.setAttribute('src', src)
    if (options.imgStyle) {
      _img.setAttribute('style', options.imgStyle)
    }

    _div.appendChild(_img)

    document.getElementsByTagName('body')[0].appendChild(_iframe)

    _iframe.onload = function () {
      var _doc = (_iframe.contentWindow || _iframe.contentDocument)
      if (_doc.document) {
        _doc = _doc.document
      }

      _doc.body.appendChild(_div)

      // extra style
      if (options.style) {
        var _style = document.createElement('style')
        _style.innerHTML = options.style
        _doc.head.appendChild(_style)
      }

      pollImage()

      function pollImage() {
        if (typeof _img.naturalWidth === 'undefined' || _img.naturalWidth === 0 || !_img.complete) {
          setTimeout(pollImage, 300)
        } else {
          doPrint()
        }
      }

      function doPrint() {
        try {
          _iframe.focus()

          // try with execCommand in IE or Edge
          if (isIE() || isEdge()) {
            try {
              _iframe.contentWindow.document.execCommand('print', false, null)
            } catch (e) {
              _iframe.contentWindow.print()
            }
          } else {
            _iframe.contentWindow.print()
          }
        } catch (error) {
          if (typeof options.onError === 'function') {
            options.onError(error)
          } else {
            throw error
          }
        }
      }
    }

  }

  printImg.defaults = {
    id: 'print-img-' + Date.now(),
    imgStyle: null,
    wrapStyle: null,
    style: null
  };

  return printImg
})
