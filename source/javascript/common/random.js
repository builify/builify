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

    const value = [].map.call(intArr, (n) => {
      return n.toString(16);
    }).join('');

    return value;
  },

  randomKey (str) {
    var id = this._idCounter++;

    return baseToString((str ? str : null)) + id;
  }
};
