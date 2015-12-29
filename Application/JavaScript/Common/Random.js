export default {
  _idCounter: 0,

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
    var id = this._idCounter++;

    function baseToString (value) {
      if (typeof value === 'string') {
        return value;
      }

      return value === null ? '' : (value + '');
    }

    return baseToString((str ? str : null)) + id;
  }
};
