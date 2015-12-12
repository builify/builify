import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default class ModalWrapper extends React.Component {
  static defaultProps = {
    onClose: function () {}
  };

  dialogElement = null;

  componentDidMount () {
    const { active } = this.props;
    const dialogRef = this.refs['modalWrapper'];
    const dialogElement = ReactDOM.findDOMNode(dialogRef);

    this.dialogElement = dialogElement;

    if (active) {
      _.delay(() => {
        if (dialogElement) {
          dialogElement.classList.add('active');
        }
      }, 16);
    }
  }

  closeDialog () {
    const { onClose } = this.props;
    let dialogElement = null;

    if (this.dialogElement !== null) {
      dialogElement = this.dialogElement;
    } else {
      const dialogRef = this.refs['dialog'];
      dialogElement = ReactDOM.findDOMNode(dialogRef);
    }

    if (dialogElement) {
      dialogElement.classList.remove('active');
    }

    _.delay(() => {
      return onClose();
    }, 300);
  }

  render () {
    const { children, className } = this.props;

    return (
      <div
        ref='modalWrapper'
        className={className ? className : null}>
        <div role='overlay' className='ab-modal__overlay' />
        <div role='content' className='ab-modal__content'>
          { children }
        </div>
      </div>
    );
  }
}
