var Storage = {};

Storage.keyList = {
  'previouspage': 'ab-prvpg'
};

Storage.set = function (key, value) {
  $.jStorage.set(key, value);
};

Storage.get = function (key) {
  return $.jStorage.get(key);
};

Storage.delete = function (key) {
  $.jStorage.deleteKey(key);
};

Storage.clear = function () {
  $.jStorage.flush();
};

Storage.size = function () {
  return $.jStorage.storageSize();
};

Storage.isAvailiable = function () {
  return $.jStorage.storageAvailable();
};

export default Storage;