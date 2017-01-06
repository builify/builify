import React from 'react';
import classNames from '../../../common/classnames';

export default class Copyright extends React.Component {
  shouldComponentUpdate () {
    return false;
  }

  render () {
    return (
      <div className={classNames('copyright')}>
        <h3>BUILify&#8482; v.1.0.0</h3>
        <h3>Copyright Trip-Trax 2015 - 2017</h3>
        <h3>All rights reserved</h3>
      </div>
    );
  }
}
