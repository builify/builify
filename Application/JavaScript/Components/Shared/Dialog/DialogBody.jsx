import React, { Component, PropTypes } from 'react';

class DialogBody extends Component {
  static propTypes = {
    title: PropTypes.string
  };

  render () {
    const { children, title } = this.props;

    return (
      <section role='body' className='ab-dialog__body'>
        { title ? <h6 className='ab-dialog__title'>{title}</h6> : null }
        { children }
      </section>
    );
  }
}

export default DialogBody;
