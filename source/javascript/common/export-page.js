import _isObject from 'lodash/isobject';
import { saveAs } from 'file-saver';

function utoa (str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

function atou (str) {
  return decodeURIComponent(escape(window.atob(str)));
}

export function importPage (data) {
  return JSON.parse(atou(data));
}

export function exportPage (currentPage) {
  if (!_isObject(currentPage)) {
    return;
  }

  const encoded = utoa(JSON.stringify(currentPage));
  const data = new Blob([encoded], { type: 'text/plain;charset=utf-8' });

  saveAs(data, 'page.fbuilify');
}
