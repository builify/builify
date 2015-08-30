import React, { Component, PropTypes } from 'react';

class Icon extends Component {
  static propTypes = {
    name: PropTypes.string
  }

  static defaultProps = {
    name: ''
  }

  render () {
    const { name, children } = this.props;
    const filteredName = (name.indexOf('pe-7s-') !== -1 ? name : ('pe-7s-' + name));

    return (
      <span className={filteredName}>
        {children}
      </span>
    )
  }
}

export default Icon;