import React from 'react';
import classNames from '../../../common/classnames';

export default class Logo extends React.Component {
  shouldComponentUpdate () {
    return false;
  }

  render () {
    return (
      <div className={classNames('logo')}>
        <img src='assets/static/logo.png' />
      </div>
    );
  }
}
