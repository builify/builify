import { getProperty } from '../Utilities/DataManipulation';

var languageData = require('../Data/Localization.json');
var languageSetting = 'en';

export function setLanguage (language) {
  languageSetting = language;
};

export function getLanguage () {
  return languageSetting;
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
    console.warn('Localization - "' + query + '" query not found!');
    return false;
  }
};

export function getLocalization (callback) {
  callback(languageData);
};