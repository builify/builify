import React from 'react';
import ImageEdit from './image-change';
import PreviousPages from './previous-pages';
import IconChange from './icon-change';
import Countdown from './countdown';
import VideoEdit from './video-edit';
import Feedback from './feedback';
import Maps from './maps';
import CustomCSS from './custom-css';
import DownloadPages from './download-pages';
import DialogRestart from './dialog-restart';
import { connect } from 'react-redux';
import { DialogTypes } from '../../constants';

class Modals extends React.Component {
  static propTypes = {
    isModalOpen: React.PropTypes.bool.isRequired,
    modalType: React.PropTypes.number.isRequired,
    modalTarget: React.PropTypes.object
  };

  shouldComponentUpdate (nextProps) {
    if (this.props.isModalOpen !== nextProps.isModalOpen) {
      return true;
    }

    return false;
  }

  render () {
    const { isModalOpen, modalType, modalTarget } = this.props;
    const type = modalType || DialogTypes.CLASSIC;

    if (!isModalOpen) {
      return null;
    }

    switch (type) {
      case DialogTypes.IMAGECHANGE:
        return <ImageEdit editTarget={modalTarget}  />;

      case DialogTypes.RESTART:
        return <DialogRestart />;

      case DialogTypes.DOWNLOADPAGES:
        return <DownloadPages />;

      case DialogTypes.PREVIOUSPAGES:
        return <PreviousPages />;

      case DialogTypes.ICONCHANGE:
        return <IconChange editTarget={modalTarget} />;

      case DialogTypes.COUNTDOWN:
        return <Countdown editTarget={modalTarget} />;

      case DialogTypes.VIDEOEDIT:
        return <VideoEdit editTarget={modalTarget} />;

      case DialogTypes.FEEDBACK:
        return <Feedback />;

      case DialogTypes.MAPS:
        return <Maps editTarget={modalTarget} />;

      case DialogTypes.CUSTOMCSS:
        return <CustomCSS />;

      default:
        return null;
    }
  }
}

function mapStateToProps (state) {
  const { modals } = state;
  const { isModalOpen, modalType, modalTarget } = modals;

  return {
    isModalOpen: isModalOpen,
    modalType: modalType,
    modalTarget: modalTarget
  };
}

export default connect(mapStateToProps)(Modals);
