import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../Actions/ActionCreators';
import cx from 'classnames';

class ModalBackground extends Component {
  render () {
    const { children, ...props } = this.props;

    return (
      <div className='ab-modal__background'>
        {children}
      </div>
    )
  }
}

class ModalContainer extends Component {
  render () {
    const { children, display, modalType, ...props } = this.props;
    const modalClassName = cx('ab-modal', modalType, display ? 'show' : '');

    return (
      <div className={modalClassName}>
        <ModalBackground>
          {children}
        </ModalBackground>
      </div>
    )
  }
}

class Button extends Component {
  render () {
    const { name } = this.props;

    return (
      <div className='ab-button'>{name}</div>
    )
  }
}

class ModalDialog extends Component {
  closeDialog (e) {
    const { onClose } = this.props;

    return onClose();
  }

  renderChildren () {
    const { modalTarget } = this.props;

    if (modalTarget !== null) {
      const hrefValue = modalTarget.getAttribute('href');

      return (
        <div>
          <div className='ab-modal__link-heading'>
            <h2>Edit Link</h2>
          </div>
          <div className='ab-modal__link-body'>
            <div className='ab-modal__link-item'>
              <span className='title'>Edit link href:</span>
              <input type='text' className='input' value={hrefValue}/>
            </div>
            <div className='ab-modal__link-item'>
              <span>Open in:</span>
              <select>
                <option value='default'>Default</option>
                <option value='_blank'>New Tab</option>
                <option value='_self'>Own Tab</option>
              </select>
            </div>
          </div>
          <div className='ab-modal_link-actions'>
            <Button name='Cancel' />
            <Button name='Save' />
          </div>
        </div>
      )
    }
  }

  render () {
    /*<Icon
      className='ab-modal__close'
      title='Close modal'
      name='pe-7s-close-circle'
      onClick={::this.closeDialog} />*/
    return (
      <div className='ab-modal__dialog'>
        <div className='ab-modal__dialog-inner'>
          {this.renderChildren()}
        </div>
      </div>
    )
  }
}

class Modal extends Component {
  static propTypes = {
    display: PropTypes.bool
  }

  static defaultProps = {
    display: false
  }

  render () {
    const { ...props, builder, onCloseModal } = this.props;
    const { isModalOpen, modalTarget, modalType } = builder;

    if (isModalOpen) {
      return (
        <ModalContainer
          {...props}
          modalType={modalType}
          display={isModalOpen}>
          <ModalDialog
            {...props}
            modalTarget={modalTarget}
            onClose={onCloseModal} />
        </ModalContainer>
      )
    } else {
      return null;
    }
  }
}


function mapStateToProps (state) {
  return {
    builder: state.builder
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onCloseModal: () => {
      dispatch(closeModal());
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
