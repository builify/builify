import {
  isString as _isString,
  isUndefined as _isUndefined
} from 'lodash';

function baseToString (value) {
  if (_isString(value)) {
    return value;
  }

  return value === null ? '' : (value + '');
}

export default {
  _idCounter: 0,

  randomString (stringLength) {
    const cryptoObject = window.crypto || window.msCrypto;
    const intLen = Math.floor((stringLength || 40) / 2);
    const intArr = new Uint8Array(intLen);

    if (!_isUndefined(cryptoObject)) {
      cryptoObject.getRandomValues(intArr);
    }

    return [].map.call(intArr, (n) => {
      return n.toString(16);
    }).join('');
  },

  randomKey (str) {
    const id = this._idCounter;

    this._idCounter += 1;

    return baseToString((str || null)) + id;
  }
};
