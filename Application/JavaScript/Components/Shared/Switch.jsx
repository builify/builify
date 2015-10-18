import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class Switch extends Component {
  static propTypes = {
    isToggled: PropTypes.bool
  }

  static defaultProps = {
    isToggled: false
  }

  render () {
    let { isToggled } = this.props;
    let switchClassName = classNames('ab-switch', isToggled ? 'toggled' : '');

    return (
      <div className={switchClassName} />
    )
  }
}

export default Switch;