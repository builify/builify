import React from 'react';
import classNames from '../../../common/classnames';

export default function Logo () {
  return (
    <div className={classNames('logo')}>
      <img height="35px" src='assets/static/logo.svg' />
    </div>
  );
}
