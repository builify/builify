const exports = {
  set (key, value) {
    $.jStorage.set(key, value);
  },

  get (key) {
    return $.jStorage.get(key);
  },

  delete (key) {
    $.jStorage.deleteKey(key);
  },

  clear () {
    $.jStorage.flush();
  },

  size () {
    return $.jStorage.storageSize();
  },

  isAvailiable () {
    return $.jStorage.storageAvailable();
  }
};

export default exports;
