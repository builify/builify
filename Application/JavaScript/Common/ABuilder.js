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

ABuilder.TEMPLATE = Symbol('TEMPLATE');
ABuilder.PAGE = Symbol('PAGE');
ABuilder.setURL = function (type, value) {
  switch (type) {
    case ABuilder.TEMPLATE:
      ABuilder.setURLHash('#template-' + value.toString());
      break;

    case ABuilder.PAGE:
      let currentUrl = ABuilder.getURLHash();

      if (currentUrl.indexOf('/page-') !== -1) {
        currentUrl = currentUrl.split('/');
        currentUrl[1].replace(currentUrl[1].substr('page-'.length, 2), value);

        ABuilder.setURLHash(currentUrl.join('/'));
      } else {
        ABuilder.setURLHash(currentUrl + '/page-' + value);
      }

      break;

    default:
      break;
  }
};

ABuilder.getBrowserSize = function () {
  return {
    width: window.innerWidth || document.body.clientWidth,
    height: window.innerHeight || document.body.clientHeight
  }
};

export default ABuilder;