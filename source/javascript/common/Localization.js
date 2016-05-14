import { getProperty } from './Common';

let languageSetting = 'en';

export function setLanguage (language) {
  languageSetting = language;
}

export function getLanguage () {
  return languageSetting;
}

export function getString (query) {
  return query;
}
