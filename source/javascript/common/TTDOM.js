const TTDOM = {
  browser: {
    size () {
      return {
        width: window.innerWidth || document.body.clientWidth,
        height: window.innerHeight || document.body.clientHeight
      };
    }
  },

  colors: {
    rgbToHex: function(rgb) {
      if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb;

      rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
      function hex(x) {
          return ("0" + parseInt(x).toString(16)).slice(-2);
      }
      return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    },

    hexToRgb: function (hex) {
      // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
      var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(shorthandRegex, function(m, r, g, b) {
          return r + r + g + g + b + b;
      });

      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
      } : null;
    }
  },

  support: {
    isRemoveSupported: !!('remove' in document.createElement('p'))
  },

  type: {
    isElement (node) {
      return !!(node && (node.nodeName || (node.prop && node.attr && node.find)));
    },

    isNodeList (nodes) {
      return !!(typeof nodes.length !== undefined && nodes.item !== undefined);
    },

    isUrl (url) {
      const reg = /\(?(?:(http|https|ftp):\/\/)?(?:((?:[^\W\s]|\.|-|[:]{1})+)@{1})?((?:www.)?(?:[^\W\s]|\.|-)+[\.][^\W\s]{2,4}|localhost(?=\/)|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(\d*))?([\/]?[^\s\?]*[\/]{1})*(?:\/?([^\s\n\?\[\]\{\}\#]*(?:(?=\.)){1}|[^\s\n\?\[\]\{\}\.\#]*)?([\.]{1}[^\s\?\#]*)?)?(?:\?{1}([^\s\n\#\[\]]*))?([\#][^\s\n]*)?\)?/gi;
      return url.test(reg);
    }
  },

  find: {
    toClassName (el, classNames) {
      let matchFlag = false;

      if (classNames[0] === '*') {
        matchFlag = true;
      }

      classNames = classNames.split(' ');

      while (el.parentNode) {
        el = el.parentNode;

        for (let i = 0; i < classNames.length; i++) {
          if (matchFlag ?
            el.className.indexOf(classNames[i]) !== -1 :
            el.classList.contains(classNames[i])) {
            return el;
          }
        }

        if (el.tagName === 'HTML') {
          break;
        }
      }

      return null;
    }
  },

  misc: {
    getAbsPosition (elem, win) {
      var box = elem.getBoundingClientRect();

      var body = win.document.body;
      var docEl = win.document.documentElement;

      var scrollTop = win.pageYOffset || docEl.scrollTop || body.scrollTop;
      var scrollLeft = win.pageXOffset || docEl.scrollLeft || body.scrollLeft;

      var clientTop = docEl.clientTop || body.clientTop || 0;
      var clientLeft = docEl.clientLeft || body.clientLeft || 0;

      var top  = box.top +  scrollTop - clientTop;
      var left = box.left + scrollLeft - clientLeft;

      return [Math.round(top), Math.round(left)];
    }
  },

  events: {
    add (elem, events, callback, bubbling: false) {
      events = events.split(' ');

      if (TTDOM.type.isElement(elem) || elem === window) {
        for (let j = 0; j < events.length; j++) {
          elem.addEventListener(events[j], callback, bubbling);
        }
      } else if (TTDOM.type.isNodeList(elem)) {
        for (let i = 0; i < elem.length; i++) {
          const currentElem = elem[i];

          for (let j = 0; j < events.length; j++) {
            currentElem.addEventListener(events[j], callback, bubbling);
          }
        }
      }
    }
  },

  element: {
    is (elem, tags) {
      tags = tags.toLowerCase().split(',');

      if (TTDOM.type.isElement(elem)) {
        const tagName = elem.tagName.toLowerCase();

        for (let i = 0; i < tags.length; i++) {
          const tag = tags[i].trim();

          if (tagName === tag) {
            return true;
          }
        }
      }

      return false;
    },

    remove (elem) {
      if (TTDOM.type.isElement(elem)) {
        elem.remove();
      } else if (TTDOM.type.isNodeList(elem)) {
        for (let i = 0; i < elem.length; i++) {
          const currentElem = elem[i];
          currentElem.remove();
        }
      }
    },

    attr: {
      remove (elem, removeWhat) {
        const isElement = TTDOM.type.isElement(elem);
        const isNodeList = !isElement ? TTDOM.type.isNodeList(elem) : false;

        removeWhat = removeWhat.split(',');

        if (isElement) {
          for (let j = 0; j < removeWhat.length; j++) {
            elem.removeAttribute(removeWhat[j]);
          }
        } else if (isNodeList) {
          for (let i = 0; i < elem.length; i++) {
            const currentElem = elem[i];

            for (let j = 0; j < removeWhat.length; j++) {
              currentElem.removeAttribute(removeWhat[j]);
            }
          }
        }
      }
    },

    classes: {
      add (elem, className) {
        if (TTDOM.type.isElement(elem)) {
          if ('classList' in elem) {
            elem.classList.add(className);
          }
        }

        return this;
      },

      remove (elem, className) {
        if (TTDOM.type.isElement(elem)) {
          if ('classList' in elem) {
            elem.classList.remove(className);
          }
        }

        return this;
      },

      has (elem, className) {
        if ('classList' in elem) {
          return elem.classList.contains(className);
        }

        return this;
      },

      alter (elem, removals, additions) {
        removals = removals
          .replace(/\*/g, '[A-Za-z0-9-_]+')
          .split(' ')
          .join('\\s|\\s');
        const pattern = new RegExp(`\\s${removals}\\s`, 'g');

        var cn = ` ${elem.className} `;

        while (pattern.test(cn)) {
          cn = cn.replace(pattern, ' ');
        }

        if (additions) {
          cn += additions;
        }

        elem.className = cn.trim();

        return this;
      }
    }
  },

  iframe: {
    get (iFrameName) {
      const frame = window.frames[String(iFrameName)];

      if (frame === undefined) {
        throw Error(`Could not find iFrame called "${iFrameName}"`);
      }

      return frame;
    },

    getWindow (iFrame) {
      let doc;

      if (iFrame.contentWindow) {
        return iFrame.contentWindow;
      }

      if (iFrame.window) {
        return iFrame.window;
      }

      if (!doc && iFrame.contentDocument) {
        doc = iFrame.contentDocument;
      }

      if (!doc && iFrame.document) {
        doc = iFrame.document;
      }

      if (doc && doc.defaultView) {
        return doc.defaultView;
      }

      if (doc && doc.parentWindow) {
        return doc.parentWindow;
      }

      throw Error('Could not get iFrame window.');
    },

    getFullHTML (iFrameWindowObject) {
      const iFrameDocument = iFrameWindowObject.document;
      const iFrameDocumentElement = iFrameDocument.documentElement;
      const cloneDocElem = iFrameDocumentElement.cloneNode(true);

      function removeJunk (doc) {
        // Remove certain elements.
        const junkElementsQuery = [
          '[data-abcpanel]',
          '[data-abcjunk]',
          '[data-abctoolbox]',
          '[data-tteditor]',
          '[data-ttbaseline]'
        ].join(',');
        const junkElements = doc.querySelectorAll(junkElementsQuery);

        TTDOM.element.remove(junkElements);

        // Remove certain attributes.
        const attributesToRemove = 'contenteditable, data-abctype, data-abccorent, data-abcid, data-reactid';
        const attributeJunkQuery = '[contenteditable], [data-abctype], [data-abccorent], [data-abcid], [data-reactid]';
        const attributeJunkElements = doc.querySelectorAll(attributeJunkQuery);

        TTDOM.element.attr.remove(attributeJunkElements, attributesToRemove);

        return doc;
      }

      function addDcotypeToHTML (html) {
        return (
          `
<!DOCTYPE html>
${html}
          `
        );
      }

      const HTML = addDcotypeToHTML(removeJunk(cloneDocElem).innerHTML);

      return HTML;
    }
  }
};

export default TTDOM;
