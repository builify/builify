import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

class LoadingIcon extends Component {
  static propTypes = {
    size: PropTypes.string
  }

  static defaultProps = {
    size: 'big'
  }

  shouldComponentUpdate (nextProps, nextState) {
    return false;
  }

  render () {
    const { size } = this.props;
    const loaderClassName = cx('ab-loadingScreen__loader', size);

    return (
      <div className={loaderClassName}>
        <div />
       </div>
    )
  }
}

export default LoadingIcon;
