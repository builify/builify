import 'babel-polyfill';

import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import isElement from 'lodash/iselement';
import { ApplicationContainer } from './components/application-container';

const targetElementQuery = '#react-js';
const targetElement = document.querySelector(targetElementQuery);

if (isElement(targetElement)) {
  ReactDOM.render(<ApplicationContainer />, targetElement);
} else {
  throw Error(`Could not find "${targetElementQuery}" element.`);
}
