import stripJSONComments from 'strip-json-comments';
import JSZip from 'jszip';
import _ from 'lodash';
import { saveAs } from './FileSaver';
import builderConfiguration from '../Data/Builder/Builder';
import templateManifest from '../Data/Template/Manifest';

export function getConfiguration (callback) {
  callback(JSON.parse(stripJSONComments(JSON.stringify(builderConfiguration))));
}

export function getTemplateMani (callback) {
  callback(JSON.parse(stripJSONComments(JSON.stringify(templateManifest))));
}

export function setSessionStoreParameters (setWhat, value) {
  switch (setWhat) {
    case 'PAGE':
      sessionStore.set('ab-page', value);
      break;

    default:
      break;
  }
}

export function setURI (URI) {
  location.hash = URI;
}

export function getURI () {
  return location.hash;
}

export function setURI (type, value) {
  switch (type) {
    case 'PAGE':
      let currentUrl = getURI();
      let newUrl = currentUrl;
      let pageInUrl = currentUrl.indexOf('page-7');

      if (pageInUrl === -1) {
        let lastCharacterOfUrl = currentUrl.slice(-1);

        if (lastCharacterOfUrl == '/') {
          newUrl = currentUrl + value.toString();
        } else {
          newUrl = currentUrl + '/' + value.toString();
        }
      }

      setURI(newUrl);

      break;
  }
}

export function on (eventName, eventFunction, isBubble) {
  if (typeof isBubble === 'undefined') {
    isBubble = false;
  }

  if (addEventListener in window) {
    window['addEventListener'](eventName, eventFunction, isBubble);
  }
}

export function getBrowserSize () {
  return {
    width: window.innerWidth || document.body.clientWidth,
    height: window.innerHeight || document.body.clientHeight
  }
}

export function getOffset (element) {
  element = element.getBoundingClientRect();

  return {
    left: element.left + window.scrollX,
    top: element.top + window.scrollY
  }
}

export function randomKey (str) {
  return _.uniqueId((str ? str : null));
}

export function getIframeWindow (iFrame) {
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

  return undefined;
}

export function actionMirror (isSymbol, arr) {
  let result = {};

  if (!(arr instanceof Array)) {
    throw new Error('actionMirror(...): Argument must be an array.');
  }

  for (let i = 0; i < arr.length; i++) {
    result[arr[i]] = isSymbol ? Symbol.for(arr[i]) : arr[i];
  }

  return result;
}

export function getProperty (obj, prop) {
  var parts = prop.split('.'),
  last = parts.pop(),
  l = parts.length,
  i = 1,
  current = parts[0];

  while((obj = obj[current]) && i < l) {
    current = parts[i];
    i++;
  }

  if(obj) {
    return obj[last];
  }
}

export function replaceDataInHTML (HTML, arrayOfItemsToReplace) {
  if (!HTML || !arrayOfItemsToReplace || !arrayOfItemsToReplace.length) {
    return;
  }

  if (arrayOfItemsToReplace.length === 0) {
    return HTML;
  }

  arrayOfItemsToReplace.map((replacer) => {
    const { findWhat, replaceWith } = replacer;

    if (!findWhat || !replaceWith) {
      return;
    }

    const reg = new RegExp(findWhat, 'g');

    HTML = HTML.replace(reg, replaceWith);
  });

  return HTML;
}

export function getAbsPosition (el) {
    var el2 = el;
    var curtop = 0;
    var curleft = 0;

    if (el === undefined || el === null) {
      return [0, 0]
    }

    if (document.getElementById || document.all) {
        do  {
            curleft += el.offsetLeft-el.scrollLeft;
            curtop += el.offsetTop-el.scrollTop;
            el = el.offsetParent;
            el2 = el2.parentNode;
            while (el2 != el) {
                curleft -= el2.scrollLeft;
                curtop -= el2.scrollTop;
                el2 = el2.parentNode;
            }
        } while (el.offsetParent);

    } else if (document.layers) {
        curtop += el.y;
        curleft += el.x;
    }
    return [curtop, curleft];
}

export function findUpAttr (el, attr) {
  attr = attr.split(' ');

  for (let i = 0; i < attr.length; i++) {
    if (el.getAttribute(el[i])) {
      return el;
    }
  }

  while (el.parentNode) {
    el = el.parentNode;

    for (let i = 0; i < attr.length; i++) {
      if (el.getAttribute(attr[i])) {
        return el;
      }
    }

    if (el.tagName === 'HTML') {
      break;
    }
  }

  return null;
}

export function findUpClassName (el, cx) {
  let matchFlag = false;

  if (cx[0] == '*') {
    matchFlag = true;
  }

  cx = cx.split(' ');

  while (el.parentNode) {
    el = el.parentNode;

    for (let i = 0; i < cx.length; i++) {
      if (matchFlag ? el.className.indexOf(cx[i]) !== -1 : el.classList.contains(cx[i])) {
        return el;
      }
    }

    if (el.tagName === 'HTML') {
      break;
    }
  }

  return null;
}
