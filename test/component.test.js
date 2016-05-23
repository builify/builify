import React, { PropTypes } from 'react';
import expect from 'unexpected';
import { mount, shallow } from 'enzyme';

const propTypes = {};

const defaultProps = {};

class Foo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='foo' />
    );
  }
}

Foo.propTypes = propTypes;
Foo.defaultProps = defaultProps;

describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(shallow(<Foo />).contains(<div className='foo' />), 'to be true');
  });

  it("contains spec with an expectation", function() {
    expect(shallow(<Foo />).is('.foo'), 'to be true');
  });

  it("contains spec with an expectation", function() {
    expect(mount(<Foo />).find('.foo').length, 'to be', 1);
  });
});
