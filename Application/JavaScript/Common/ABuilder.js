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
ABuilder.PREVIEW = Symbol('PREVIEW');
ABuilder.setURL = function (type, value) {
  switch (type) {
    case ABuilder.TEMPLATE:
      ABuilder.setURLHash('template-' + value.toString());
      break;

    case ABuilder.PAGE:
      let currentUrl = ABuilder.getURLHash();
      let newUrl = currentUrl;
      let pageInUrl = currentUrl.indexOf('page-7');

      if (pageInUrl === -1) {
        let lastCharacterOfUrl = currentUrl.slice(-1);

        if (lastCharacterOfUrl == '/') {
          newUrl = currentUrl + value.toString();
        } else {
          newUrl = currentUrl + '/' + value.toString();
        }
      } else {
        console.log(pageInUrl);
      }

      ABuilder.setURLHash(newUrl);

      break;

  }
};

ABuilder.on = function (eventName, eventFunction, isBubble) {
  if (typeof isBubble === 'undefined') {
    isBubble = false;
  }

  window['addEventListener'](eventName, eventFunction, isBubble);
};

export default ABuilder;