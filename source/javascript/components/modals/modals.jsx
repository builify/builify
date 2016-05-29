import React from 'react';
import ImageEdit from './image-change';
import PreviousPages from './previous-pages';
import IconChange from './icon-change';
import Countdown from './countdown';
import VideoEdit from './video-edit';
import DialogRestart from '../shared/dialog/DialogRestart';
import DialogDownloadPages from '../shared/dialog/DialogDownloadPages';
import DialogLinkChange from '../shared/dialog/DialogLinkChange';
import { connect } from 'react-redux';
import { closeModal } from '../../actions';
import { DialogTypes } from '../../constants';

class Modals extends React.Component {
  static propTypes = {
    builder: React.PropTypes.object.isRequired,
    closeModal: React.PropTypes.func.isRequired
  };

  closeModal () {
    return this.props.closeModal();
  }

  render () {
    const { builder } = this.props;
    const { isModalOpen: active, modalType, modalTarget: editTarget } = builder;
    const type = modalType || DialogTypes.CLASSIC;

    if (active === false) {
      return null;
    }

    switch (type) {
      case DialogTypes.IMAGECHANGE:

        return (
          <ImageEdit
            active={active}
            editTarget={editTarget}  />
        );

      case DialogTypes.RESTART:
        return (
          <DialogRestart
            active={active} />
        );

      case DialogTypes.DOWNLOADPAGES:
        return (
          <DialogDownloadPages
            active={active} />
        );

      case DialogTypes.LINKCHANGE:
        return (
          <DialogLinkChange
            active={active}
            editTarget={editTarget} />
        );

      case DialogTypes.PREVIOUSPAGES:
        return (
          <PreviousPages
            active={active} />
        );

      case DialogTypes.ICONCHANGE:
        return (
          <IconChange
            active={active}
            editTarget={editTarget} />
        );

      case DialogTypes.COUNTDOWN:
        return (
          <Countdown
            active={active}
            editTarget={editTarget} />
        );

      case DialogTypes.VIDEOEDIT:
        return (
          <VideoEdit
            active={active}
            editTarget={editTarget} />
        );
    }
  }
}

function mapStateToProps (state) {
  return {
    builder: state.builder
  };
}

function mapDispatchToProps (dispatch) {
  return {
    closeModal: () => {
      dispatch(closeModal());
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Modals);
