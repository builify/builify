import { getProperty } from '../Utilities/DataManipulation';

var languageData = require('./Localization.json');
var languageSetting = 'en';

export function setLanguage (language) {
  languageSetting = language;
};

export function getString (query) {
  if (!query) {
    return;
  } else {
    query = languageSetting.toString() + '.' + query;
  }

  let result = getProperty(languageData, query);

  if (typeof result !== 'undefined') {
    return result;
  } else {
    throw Error('Localization - "' + query + '" query not found!');
  }
};