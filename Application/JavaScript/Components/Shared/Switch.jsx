import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

class Switch extends Component {
  static propTypes = {
    isToggled: PropTypes.bool
  }

  static defaultProps = {
    isToggled: false
  }

  render () {
    let { isToggled } = this.props;
    let switchClassName = cx('ab-switch', isToggled ? 'toggled' : '');

    return (
      <div className={switchClassName} />
    )
  }
}

export default Switch;