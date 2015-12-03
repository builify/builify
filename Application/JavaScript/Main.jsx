import React from 'react';
import ReactDOM from 'react-dom';
import { Application } from './Components/Application';

const targetElementQuery = '#react-js';
const targetElement = document.querySelector(targetElementQuery);

if (typeof targetElement !== undefined) {
  ReactDOM.render(
    <Application />,
    targetElement
  );
} else {
  throw Error(`Could not find "${targetElementQuery}" element.`);
}
