import React from 'react';
import classNames from 'classnames';

export default class LoadingIcon extends React.Component {
  static propTypes = {
    size: React.PropTypes.string
  };

  static defaultProps = {
    size: 'big'
  };

  shouldComponentUpdate () {
    return false;
  }

  render () {
    const { size } = this.props;
    const loaderClassName = classNames('ab-loadingScreen__loader', size);

    return (
      <div className={loaderClassName}>
        <div />
       </div>
    );
  }
}
