import React from 'react';
import ReactDOM from 'react-dom';
import _delay from 'lodash/delay';
import _isNull from 'lodash/isnull';
import classNames from '../../../common/classnames';

export default class ModalWrapper extends React.Component {
  static propTypes = {
    onClose: React.PropTypes.func,
    children: React.PropTypes.node,
    className: React.PropTypes.string
  };

  static defaultProps = {
    onClose: function () {}
  };

  dialogElement = null;

  shouldComponentUpdate () {
    return false;
  }

  componentDidMount () {
    const dialogRef = this.refs['modalWrapper'];
    const dialogElement = ReactDOM.findDOMNode(dialogRef);

    this.dialogElement = dialogElement;

    _delay(() => {
      if (dialogElement) {
        dialogElement.classList.add('active');
      }
    }, 33);

    window.addEventListener('mousedown', ::this.onDocumentClick, false);
  }

  componentWillUnmount () {
    window.removeEventListener('mousedown', this.onDocumentClick);
  }

  onDocumentClick (e) {
    if (e.target.getAttribute('data-modaloverlay')) {
      this.closeDialog();
    }
  }

  closeDialog () {
    const { onClose } = this.props;
    let dialogElement = null;

    if (!_isNull(this.dialogElement)) {
      dialogElement = this.dialogElement;
    } else {
      const dialogRef = this.refs['dialog'];
      dialogElement = ReactDOM.findDOMNode(dialogRef);
    }

    if (dialogElement) {
      dialogElement.classList.remove('active');
    }

    _delay(() => {
      return onClose();
    }, 300);
  }

  render () {
    const { className } = this.props;

    return (
      <div ref='modalWrapper' className={className && className}>
        <div role='overlay' className={classNames('modal__overlay')} data-modaloverlay />
        <div role='content' className={classNames('modal__content')}>
          { this.props.children }
        </div>
      </div>
    );
  }
}
