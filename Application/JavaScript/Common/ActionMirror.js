const exports = function (isSymbol, arr) {
  let result = {};

  if (!(arr instanceof Array)) {
    throw new Error('actionMirror(...): Argument must be an array.');
  }

  for (let i = 0; i < arr.length; i++) {
    result[arr[i]] = isSymbol ? Symbol.for(arr[i]) : arr[i];
  }

  return result;
}

export default exports;
