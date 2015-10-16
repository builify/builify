import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class Icon extends Component {
  static propTypes = {
    name: PropTypes.string,
    title: PropTypes.string,
    onClick: PropTypes.func
  }

  static defaultProps = {
    name: '',
    title: '',
    onClick: (e) => {}
  }

  render () {
    const { name, title, onClick, children } = this.props;
    const filteredName = classNames((name.indexOf('pe-7s-') !== -1 ? name : ('pe-7s-' + name)), this.props.className ? this.props.className : '');

    return (
      <span 
        onClick={onClick}
        title={title}
        className={filteredName}>
        {children}
      </span>
    )
  }
}

export default Icon;