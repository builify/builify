import React from 'react';
import classNames from '../../../common/classnames';

export default class Logo extends React.Component {
  static propTypes = {
    text: React.PropTypes.string
  };

  static defaultProps = {
    text: 'TT-Builder'
  };

  shouldComponentUpdate () {
    return false;
  }

  render () {
    return (
      <div className={classNames('logo')}>
        <div className={classNames('logo__icon')}>
          <div className={classNames('logo__left')}></div>
          <div className={classNames('logo__right')}></div>
        </div>
        <div className={classNames('logo__text')}>{this.props.text}</div>
      </div>
    );
  }
}
