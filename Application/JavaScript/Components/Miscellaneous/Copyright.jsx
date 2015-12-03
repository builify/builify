import React, { Component } from 'react';

export default class Copyright extends Component {
  render () {
    const currentTime = new Date();
    const currentYear = currentTime.getFullYear();
    const companyName = 'Trip-Trax';

    return (
      <div className='ab-copyright'>
        <h3>Copyright {currentYear} - {companyName}</h3>
        <h3>All rights reserved</h3>
      </div>
    );
  }
}
