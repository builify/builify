import React from 'react';
import classNames from '../../../common/classnames';

export default class Copyright extends React.Component {
  shouldComponentUpdate () {
    return false;
  }

  render () {
    const currentYear = new Date().getFullYear();
    const companyName = 'Trip-Trax';
    let companyYear = 2015;

    if (currentYear > companyYear) {
      companyYear = `${companyYear} - ${currentYear}`;
    }

    return (
      <div className={classNames('copyright')}>
        <h3>TT-Builder v.1.0.0</h3>
        <h3>Copyright {companyYear} - {companyName}</h3>
        <h3>All rights reserved</h3>
      </div>
    );
  }
}
