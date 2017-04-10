import React from 'react';
import PropTypes from 'prop-types';
import {
  delay as _delay,
  isNull as _isNull
} from 'lodash';
import classNames from '../../../common/classnames';

export default class ModalWrapper extends React.Component {
  static propTypes = {
    onClose: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.string
  };

  static defaultProps = {
    onClose: () => {}
  };

  _node = null;

  componentDidMount () {
    _delay(() => {
      if (this._node) {
        this._node.classList.add('active');
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
    if (!_isNull(this._node)) {
      this._node.classList.remove('active');
    }

    _delay(() => {
      return this.props.onClose();
    }, 300);
  }

  render () {
    const { className } = this.props;

    return (
      <div ref={(node) => this._node = node} className={className && className}>
        <div className={classNames('modal__overlay')} data-modaloverlay />
        <div className={classNames('modal__content')}>
          { this.props.children }
        </div>
      </div>
    );
  }
}
