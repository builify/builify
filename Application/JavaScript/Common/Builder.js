import stripJSONComments from 'strip-json-comments';

const BuilderConfiguration = require('../Data/Builder.json');
const Builder = {};

Builder.getConfigration = (callback) => {
  callback(JSON.parse(stripJSONComments(JSON.stringify(BuilderConfiguration)))); 
}

Builder.setURLHash = (string) => {
  location.hash = string;
}

Builder.getURLHash = () => {
  return location.hash;
}

Builder.TEMPLATE = Symbol('TEMPLATE');
Builder.PAGE = Symbol('PAGE');
Builder.PREVIEW = Symbol('PREVIEW');
Builder.setURL = (type, value) => {
  switch (type) {
    case Builder.TEMPLATE:
      Builder.setURLHash('template-' + value.toString());
      break;

    case Builder.PAGE:
      let currentUrl = Builder.getURLHash();
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

      Builder.setURLHash(newUrl);

      break;
  }
}

Builder.on = (eventName, eventFunction, isBubble) => {
  if (typeof isBubble === 'undefined') {
    isBubble = false;
  }

  if (addEventListener in window) {
    window['addEventListener'](eventName, eventFunction, isBubble);
  }
}

Builder.getBrowserSize = () => {
  return {
    width: window.innerWidth || document.body.clientWidth,
    height: window.innerHeight || document.body.clientHeight
  }
}

Builder.getOffset = (element) => {
  element = element.getBoundingClientRect();

  return {
    left: element.left + window.scrollX,
    top: element.top + window.scrollY
  }
}

export default Builder;