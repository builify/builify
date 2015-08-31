import stripJSONComments from 'strip-json-comments';

const ABuilderConfiguration = require('../Data/ABuilder.json');
const ABuilder = {};

ABuilder.getConfigration = (callback) => {
  callback(JSON.parse(stripJSONComments(JSON.stringify(ABuilderConfiguration)))); 
}

ABuilder.setURLHash = (string) => {
  location.hash = string;
}

ABuilder.getURLHash = () => {
  return location.hash;
}

ABuilder.TEMPLATE = Symbol('TEMPLATE');
ABuilder.PAGE = Symbol('PAGE');
ABuilder.PREVIEW = Symbol('PREVIEW');
ABuilder.setURL = (type, value) => {
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
}

ABuilder.on = (eventName, eventFunction, isBubble) => {
  if (typeof isBubble === 'undefined') {
    isBubble = false;
  }

  if (addEventListener in window) {
    window['addEventListener'](eventName, eventFunction, isBubble);
  }
}

ABuilder.getBrowserSize = () => {
  return {
    width: window.innerWidth || document.body.clientWidth,
    height: window.innerHeight || document.body.clientHeight
  }
}

ABuilder.getOffset = (element) => {
  element = element.getBoundingClientRect();

  return {
    left: element.left + window.scrollX,
    top: element.top + window.scrollY
  }
}

export default ABuilder;