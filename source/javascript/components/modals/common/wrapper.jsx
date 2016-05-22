import React from 'react';
import ReactDOM from 'react-dom';
import _delay from 'lodash/delay';
import _isNull from 'lodash/isnull';
import classNames from '../../../common/classnames';

export default class ModalWrapper extends React.Component {
  static propTypes = {
    active: React.PropTypes.bool.isRequired,
    onClose: React.PropTypes.func,
    children: React.PropTypes.node,
    className: React.PropTypes.string
  };

  static defaultProps = {
    onClose: function () {}
  };

  dialogElement = null;

  componentDidMount () {
    const { active } = this.props;
    const dialogRef = this.refs['modalWrapper'];
    const dialogElement = ReactDOM.findDOMNode(dialogRef);

    this.dialogElement = dialogElement;

    if (active === true) {
      _delay(() => {
        if (dialogElement) {
          dialogElement.classList.add('active');
        }
      }, 1);
    }

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
    const { children, className } = this.props;

    return (
      <div ref='modalWrapper' className={className && className}>
        <div role='overlay' className={classNames('modal__overlay')} data-modaloverlay />
        <div role='content' className={classNames('modal__content')}>
          { children }
        </div>
      </div>
    );
  }
}
