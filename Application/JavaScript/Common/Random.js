import _ from 'lodash';

const exports = {
  randomString (stringLength) {
    const cryptoObject = window.crypto || window.msCrypto;
    const intLen = Math.floor((stringLength || 40) / 2);
    const intArr = new Uint8Array(intLen);

    cryptoObject.getRandomValues(intArr);

    const value = [].map.call(intArr, (n) => {
      return n.toString(16);
    }).join('');

    return value;
  },

  randomKey (str) {
    return _.uniqueId((str ? str : null));
  }
};

export default exports;
