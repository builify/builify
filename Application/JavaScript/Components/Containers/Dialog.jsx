import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../Actions';
import { DialogTypes } from '../../Constants';
import Dialog from '../Shared/Dialog';

class DialogContainer extends Component {
  closeModal (e) {
    const { onCloseModal } = this.props;

    return onCloseModal();
  }

  render () {
    const { builder } = this.props;
    const { isModalOpen, modalType, modalTarget } = builder;
    let dialogType = modalType || DialogTypes.CLASSIC;

    return (
      <Dialog
        onClose={::this.closeModal}
        ref='dialog'
        active={isModalOpen}
        type={dialogType}
        editTarget={modalTarget} />
    )
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
