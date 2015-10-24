import React, { Component } from 'react';

class Copyright extends Component {
  render () {
    const currentTime = new Date();
    const currentYear = currentTime.getFullYear();

    return (
      <div className='ab-copyright'>
        <h3>Copyright {currentYear} - Aphakeme</h3>
        <h3>All rights reserved</h3>
      </div>
    )
  }
}

export default Copyright;
