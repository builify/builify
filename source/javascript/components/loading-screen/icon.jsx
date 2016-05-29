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
    return <div className={classNames('loadingScreen__loader', this.props.size)}><div /></div>;
  }
}
