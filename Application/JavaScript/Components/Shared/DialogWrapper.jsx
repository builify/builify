import React, { Component } from 'react';

class DialogWrapper extends Component {
  render () {
    const { children, className } = this.props;

    return (
      <div className={className}>
        <div role='overlay' className='ab-dialog__overlay' />
        <div role='content' className='ab-dialog__content'>
          { children }
        </div>
      </div>
    )
  }
}

export default DialogWrapper;
