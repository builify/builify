const ABuilderConfiguration = require('../Data/ABuilder.json');
const ABuilder = {};

ABuilder.getConfigration = function (callback) {
  callback(ABuilderConfiguration);
};

ABuilder.setURLHash = function (string) {
  location.hash = string;
};

ABuilder.getURLHash = function () {
  return location.hash;
};

ABuilder.getBrowserSize = function () {
  return {
    width: window.innerWidth || document.body.clientWidth,
    height: window.innerHeight || document.body.clientHeight
  }
};

ABuilder.getElementWidth = function (element) {
  
}

export default ABuilder;