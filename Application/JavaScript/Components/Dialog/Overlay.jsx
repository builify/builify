import React, { Component } from 'react';

class Overlay extends Component {
  render () {
    const { children, ...props } = this.props;

    return (
      <div className='ab-modal__background'>
        {children}
      </div>
    )
  }
}

export default Overlay;
