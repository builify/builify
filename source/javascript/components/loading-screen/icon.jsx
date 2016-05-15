import React from 'react';
import classNames from '../../common/classnames';

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
    const loaderClassName = classNames('loadingScreen__loader', size);

    return (
      <div className={loaderClassName}>
        <div />
       </div>
    );
  }
}
