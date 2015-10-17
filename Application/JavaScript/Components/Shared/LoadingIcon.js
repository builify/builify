import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class LoadingIcon extends Component {
  static propTypes = {
    size: PropTypes.string
  }

  static defaultProps = {
    size: 'big'
  }

  render () {
    const loaderClassName = classNames('ab-loadingScreen__loader', this.props.size);

    return (
      <div className={loaderClassName}>
        <div />
       </div>
    )
  }
}

export default LoadingIcon;