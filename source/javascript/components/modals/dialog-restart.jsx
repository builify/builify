import React from 'react';
import Dialog from './dialog';
import { closeModal, restartPage } from '../../actions';
import { connect } from 'react-redux';

class DialogRestart extends React.Component {
  static propTypes = {
    closeModal: React.PropTypes.func.isRequired,
    restartPage: React.PropTypes.func.isRequired
  };

  closeDialog () {
    return this.refs.dialog.closeDialog();
  }

  restartPage () {
    this.refs.dialog.closeDialog();
    return this.props.restartPage();
  }

  render () {
    const actions = [
      { label: 'No', onClick: ::this.closeDialog },
      { label: 'Yes', onClick: ::this.restartPage }
    ];

    return (
      <Dialog ref='dialog' title='Restart' actions={actions} closeModal={this.props.closeModal}>
        <p>Do you want to go back to start screen and save current page?</p>
      </Dialog>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    closeModal: () => {
      dispatch(closeModal());
    },

    restartPage: () => {
      dispatch(restartPage());
    }
  };
}

export default connect(null, mapDispatchToProps)(DialogRestart);
