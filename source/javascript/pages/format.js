import TTDOM from '../common/TTDOM';

const junkElementsQuery = [
  '[data-abcpanel]',
  '[data-abcjunk]',
  '[data-abctoolbox]',
  '[data-tteditor]',
  '[data-ttbaseline]'
].join(',');

const attributesToRemove = 'contenteditable, data-abctype, data-abccorent, data-abcid, data-reactid';
const attributeJunkQuery = '[contenteditable], [data-abctype], [data-abccorent], [data-abcid], [data-reactid]';

function addDoctypeToHTML (html) {
  return (
    `
<!DOCTYPE html>
${html}
`
  );
}

function formatHTML (doc) {
  const bodyElement = doc.querySelector('body');
  const headElement = doc.querySelector('head');
  const junkElements = doc.querySelectorAll(junkElementsQuery);
  
  TTDOM.element.remove(junkElements);
  
  const attributeJunkElements = doc.querySelectorAll(attributeJunkQuery);
  
  TTDOM.element.attr.remove(attributeJunkElements, attributesToRemove);

  // Fix asset locations for production builds.
  const javascriptElement = document.createElement('script');
  javascriptElement.type = 'text/javascript';
  javascriptElement.src = 'assets/template/template.js';
  javascriptElement.setAttribute('media', 'all');
  bodyElement.appendChild(javascriptElement);
  
  const stylesheetElement = document.createElement('link');
  stylesheetElement.href = 'assets/template/template.css';
  stylesheetElement.rel = 'stylesheet';
  stylesheetElement.media = 'all';
  headElement.appendChild(stylesheetElement);
  
  return doc;
}

export default function (iFrameWindowObject) {
  const iFrameDocument = iFrameWindowObject.document;
  const iFrameDocumentElement = iFrameDocument.documentElement;
  const cloneDocElem = iFrameDocumentElement.cloneNode(true);
  const HTML = addDoctypeToHTML(formatHTML(cloneDocElem).innerHTML);
  
  return HTML;
}
