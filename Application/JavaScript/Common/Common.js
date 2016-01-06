import stripJSONComments from 'strip-json-comments';
import _ from 'lodash';
import builderConfiguration from '../Data/Builder/Builder';
import fontsList from '../Data/Builder/Fonts';
import templateManifest from '../Data/Template/Manifest';

export function getConfiguration (callback) {
  callback(JSON.parse(stripJSONComments(JSON.stringify(builderConfiguration))));
}

export function getFontsList (callback) {
  callback(JSON.parse(stripJSONComments(JSON.stringify(fontsList))));
}

export function getTemplateManifestFile (callback) {
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

export function findUpClassName (el, classNames) {
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
