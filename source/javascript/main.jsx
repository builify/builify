import 'babel-polyfill';

import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import _isElement from 'lodash/iselement';
import { ApplicationContainer } from './components/application-container';

const targetElementQuery = '#react-js';
const targetElement = document.querySelector(targetElementQuery);

if (process.env.NODE_ENV === 'development') {
  const whyDidYouUpdate = require('why-did-you-update').whyDidYouUpdate;
  whyDidYouUpdate(React);
}

if (_isElement(targetElement)) {
  ReactDOM.render(<ApplicationContainer />, targetElement);
} else {
  throw Error(`Could not find "${targetElementQuery}" element.`);
}
