const DOM = {
  browser: {
    size () {
      return {
        width: window.innerWidth || document.body.clientWidth,
        height: window.innerHeight || document.body.clientHeight
      }
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
      return !!(typeof nodes.length !== undefined && nodes.item !== undefined)
    },

    isUrl (url) {
      const reg = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

      return url.test(reg);
    }
  },

  find: {
    toClassName (el, classNames) {
      let matchFlag = false;

      if (classNames[0] == '*') {
        matchFlag = true;
      }

      classNames = classNames.split(' ');

      while (el.parentNode) {
        el = el.parentNode;

        for (let i = 0; i < classNames.length; i++) {
          if (matchFlag ? el.className.indexOf(classNames[i]) !== -1 : el.classList.contains(classNames[i])) {
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

  events: {
    add (elem, events, callback, bubbling: false) {
      events = events.split(' ');

      if (DOM.type.isElement(elem)) {
        for (let j = 0; j < events.length; j++) {
          elem.addEventListener(events[j], callback, bubbling);
        }
      } else if (DOM.type.isNodeList(elem)) {
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

      if (DOM.type.isElement(elem)) {
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
      const isElement = DOM.type.isElement(elem);
      const isNodeList = !isElement ? DOM.type.isNodeList(elem) : false;

      if (DOM.type.isElement(elem)) {
        elem.remove();
      } else if (DOM.type.isNodeList(elem)) {
        for (let i = 0; i < elem.length; i++) {
          const currentElem = elem[i];
          currentElem.remove();
        }
      }
    },

    attr: {
      remove (elem, removeWhat) {
        const isElement = DOM.type.isElement(elem);
        const isNodeList = !isElement ? DOM.type.isNodeList(elem) : false;

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
        if (DOM.type.isElement(elem)) {
          if ('classList' in elem) {
            elem.classList.add(className);
          }
        }
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
        const junkQuery = '[data-abcpanel], [data-abctoolbox]'
        const junkElements = doc.querySelectorAll(junkQuery);

        DOM.element.remove(junkElements);

        // Remove certain attributes.
        const attributesToRemove = 'contenteditable';
        const attributeJunkQuery = '[contenteditable]';
        const attributeJunkElements = doc.querySelectorAll(attributeJunkQuery);

        DOM.element.attr.remove(attributeJunkElements, attributesToRemove);

        // Remove certain classnames.
        const classNamesJunk = 'ab-ch';
        const classNamesJunkQuery = classNamesJunk.split(',');
        //const classNamesJunkElements = doc.querySelectorAll();

        //DOM.element.classes.remove()

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
}

export default DOM;
