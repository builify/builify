const exports = {
  randomString (stringLength) {
    const cryptoObject = window.crypto || window.msCrypto;
    const arr = new Uint8Array((stringLength || 40) / 2);

    cryptoObject.getRandomValues(arr);

    return [].map.call(arr, (n) => {
      return n.toString(16);
    }).join('');
  }
};

export default exports;
