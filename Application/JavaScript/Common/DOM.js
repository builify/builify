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

  element: {
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
        const junkQuery = '[data-abcpanel], [data-abctoolbox]'
        const junkElements = doc.querySelectorAll(junkQuery);

        DOM.element.remove(junkElements);

        const attributesToRemove = 'contenteditable';
        const attributeJunkQuery = '[contenteditable]';
        const attributeJunkElements = doc.querySelectorAll(attributeJunkQuery);

        DOM.element.attr.remove(attributeJunkElements, attributesToRemove);

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
