import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../Actions/ActionCreators';
import { ModalTypes } from '../../Constants/Defines';
import Dialog from '../Shared/Dialog';

class DialogContainer extends Component {
  closeModal (e) {
    const { onCloseModal } = this.props;

    return onCloseModal();
  }

  render () {
    const { builder } = this.props;
    const { isModalOpen, modalType, modalTarget } = builder;

    if (isModalOpen && modalType !== null) {
      let dialogType = 'classic';

      if (modalType === ModalTypes.IMAGECHANGE) {
        dialogType = 'imageChange';
      } else if (modalType === ModalTypes.LINKCHANGE) {
        dialogType = 'linkChange';
      } else if (modalType === ModalTypes.ICONCHANGE) {
        dialogType = 'iconChange';
      } else if (modalType === ModalTypes.PREVIOUSPAGES) {
        dialogType = 'previousPages';
      }

      return (
        <Dialog
          onClose={::this.closeModal}
          ref='dialog'
          active={true}
          type={dialogType}
          editTarget={modalTarget} />
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
)(DialogContainer);
