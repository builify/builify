import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dialog from './dialog';
import * as Actions from '../../actions';

function RestartDialog ({
  closeModal,
  restartPage
}) {
  let dialogElement = null;
  const actions = [{
    label: 'No',
    onClick: () => {
      dialogElement.closeDialog();
    }
  }, {
    label: 'Yes',
    onClick: () => {
      dialogElement.closeDialog();
      restartPage();
    }
  }];

  return (
    <Dialog ref={(node) => { dialogElement = node; }} title="Restart" actions={actions} closeModal={closeModal}>
      <p>Do you want to go back to start screen and save current page?</p>
    </Dialog>
  );
}

RestartDialog.propTypes = {
  closeModal: PropTypes.func.isRequired,
  restartPage: PropTypes.func.isRequired
};

function mapDispatchToProps (dispatch) {
  return {
    closeModal: () => {
      dispatch(Actions.closeModal());
    },

    restartPage: () => {
      dispatch(Actions.restartPage());
    }
  };
}

export default connect(null, mapDispatchToProps)(RestartDialog);
