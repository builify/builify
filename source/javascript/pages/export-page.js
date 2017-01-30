import { saveAs } from 'file-saver';
import { TEMPLATE_FILE_EXTENSION } from '../constants';
import {
  isObject as _isObject
} from 'lodash';

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
  const fileName = `arkio-page.${TEMPLATE_FILE_EXTENSION}`;

  saveAs(data, fileName);
}
