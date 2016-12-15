import _isObject from 'lodash/isobject';
import { saveAs } from 'file-saver';

function utoa (str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

export default function (currentPage) {
  if (!_isObject(currentPage)) {
    return;
  }

  const encoded = utoa(JSON.stringify(currentPage));
  const data = new Blob([encoded], {
    type: 'text/plain;charset=utf-8'
  });

  saveAs(data, 'page.fbuilify');
}
