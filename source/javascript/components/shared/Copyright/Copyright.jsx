import React from 'react';

export default class extends React.Component {
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
      <div className='ab-copyright'>
        <h3>Copyright {companyYear} - {companyName}</h3>
        <h3>All rights reserved</h3>
      </div>
    );
  }
}
