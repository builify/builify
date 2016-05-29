import React from 'react';
import ImageEdit from './image-change';
import PreviousPages from './previous-pages';
import IconChange from './icon-change';
import Countdown from './countdown';
import VideoEdit from './video-edit';
import DownloadPages from './download-pages';
import DialogRestart from '../shared/dialog/DialogRestart';
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
        return <ImageEdit editTarget={editTarget}  />;

      case DialogTypes.RESTART:
        return <DialogRestart active={true} />;

      case DialogTypes.DOWNLOADPAGES:
        return <DownloadPages />;

      case DialogTypes.LINKCHANGE:
        return <DialogLinkChange active={true} editTarget={editTarget} />;

      case DialogTypes.PREVIOUSPAGES:
        return <PreviousPages />;

      case DialogTypes.ICONCHANGE:
        return <IconChange editTarget={editTarget} />;

      case DialogTypes.COUNTDOWN:
        return <Countdown editTarget={editTarget} />;

      case DialogTypes.VIDEOEDIT:
        return <VideoEdit editTarget={editTarget} />;
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
