import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class DialogBody extends Component {
  static propTypes = {
    title: PropTypes.string,
    className: PropTypes.string
  };

  render () {
    const { children, title, className } = this.props;
    const bodyClassName = classNames('ab-dialog__body', className);

    return (
      <section role='body' className={bodyClassName}>
        { title ? <h6 className='ab-dialog__title'>{title}</h6> : null }
        { children }
      </section>
    );
  }
}

export default DialogBody;
