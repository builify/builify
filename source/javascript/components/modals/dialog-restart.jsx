import React from 'react';
import Dialog from './dialog';
import { closeModal, restartPage } from '../../actions';
import { connect } from 'react-redux';

function RestartDialog ({
  closeModal,
  restartPage
}) {
  let dialogElement = null;
  const actions = [
    { label: 'No', onClick: () => {
      dialogElement.closeDialog();
    }},
    { label: 'Yes', onClick: () => {
      dialogElement.closeDialog();
      restartPage();
    } }
  ];

  return (
    <Dialog ref={(node) => dialogElement = node } title='Restart' actions={actions} closeModal={closeModal}>
      <p>Do you want to go back to start screen and save current page?</p>
    </Dialog>
  );
}

RestartDialog.propTypes = {
  closeModal: React.PropTypes.func.isRequired,
  restartPage: React.PropTypes.func.isRequired
};

function mapDispatchToProps (dispatch) {
  return {
    closeModal: function () {
      dispatch(closeModal());
    },

    restartPage: function () {
      dispatch(restartPage());
    }
  };
}

export default connect(null, mapDispatchToProps)(RestartDialog);
