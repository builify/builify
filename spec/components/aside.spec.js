import React from 'react';
import jasmineEnzyme from 'jasmine-enzyme';
import { mount } from 'enzyme';
import { jsdom } from 'jsdom';

global.document = jsdom('');
global.window = document.defaultView;
global.navigator = { userAgent: 'node.js' };
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});

describe('test', () => {
  beforeEach(() => {
    jasmineEnzyme();
  });

  it('adds toHaveRef', () => {
    class Fixture extends React.Component {
      componentDidMount() {} // needed for lint
      render() {
        return React.createElement(
          'div', { ref: 'ref' }
        );
      }
    }
    const wrapper = mount(React.createElement(Fixture));

    expect(wrapper).toHaveRef('ref');
  });
});
