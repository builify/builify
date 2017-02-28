import 'babel-polyfill';

import React from 'react'; // eslint-disable-line no-unused-vars
import { render } from 'react-dom';
import { isElement as _isElement } from 'lodash';
import welcomeMessage from './welcome-message';
import { ApplicationContainer } from './components/application-container';

function main () {
  const targetElementQuery = '#react-js';
  const targetElement = document.querySelector(targetElementQuery);

  //enableDeveloperTools();

  if (_isElement(targetElement)) {
    welcomeMessage();
    render(<ApplicationContainer />, targetElement);
  } else {
    throw Error(`Could not find "${targetElementQuery}" element.`);
  }
}

function enableDeveloperTools () {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { whyDidYouUpdate } = require('why-did-you-update');
  whyDidYouUpdate(React);
}

main();
