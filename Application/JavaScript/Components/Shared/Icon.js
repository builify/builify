import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class Icon extends Component {
  static propTypes = {
    name: PropTypes.string
  }

  static defaultProps = {
    name: ''
  }

  render () {
    const { name, children } = this.props;
    const filteredName = classNames((name.indexOf('pe-7s-') !== -1 ? name : ('pe-7s-' + name)), this.props.className ? this.props.className : '');

    return (
      <span 
        className={filteredName}>
        {children}
      </span>
    )
  }
}

export default Icon;