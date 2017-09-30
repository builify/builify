import localization from './localization';
import {
  isString as _isString,
  isUndefined as _isUndefined
} from 'lodash';

function getProperty (obj, prop) {
  var parts = prop.split('.');
  var last = parts.pop();
  var l = parts.length;
  var i = 1;
  var current = parts[0];

  while ((obj = obj[current]) && i < l) {
    current = parts[i];
    i++;
  }

  if (obj) {
    return obj[last];
  }
}

export default function (languagePreference) {
  return function (query) {
    const language = languagePreference || 'en';
    const orgQuery = query;

    query = `${language}.${query}`;
    
    const result = getProperty(localization, query);

    if (!_isUndefined(result) && _isString(result)) {
      return result;
    }

    return orgQuery;
  };
}
