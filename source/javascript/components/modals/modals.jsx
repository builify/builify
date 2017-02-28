import React from 'react';
import { connect } from 'react-redux';
import ImageEdit from './image-change';
import PreviousPages from './previous-pages';
import IconChange from './icon-change';
import Feedback from './feedback';
import CustomCSS from './custom-css';
import DownloadPages from './download-pages';
import DialogRestart from './dialog-restart';
import FormEdit from './form-edit';
import Help from './help';
import VideoEdit from './video-edit';
import { ModalTypes } from '../../constants';
import { validateDOMElement } from '../../common/react';

class Modals extends React.Component {
  static propTypes = {
    isModalOpen: React.PropTypes.bool.isRequired,
    modalType: React.PropTypes.number.isRequired,
    modalTarget: validateDOMElement
  };

  static defaultProps = {
    modalTarget: null
  };

  shouldComponentUpdate (nextProps) {
    if (this.props.isModalOpen !== nextProps.isModalOpen ||
        this.props.modalType !== nextProps.modalType) {
      return true;
    }

    return false;
  }

  render () {
    const { isModalOpen, modalType, modalTarget } = this.props;
    const type = modalType || ModalTypes.CLASSIC;

    if (!isModalOpen) {
      return null;
    }

    switch (type) {
      case ModalTypes.IMAGECHANGE:
        return <ImageEdit editTarget={modalTarget} />;

      case ModalTypes.RESTART:
        return <DialogRestart />;

      case ModalTypes.DOWNLOADPAGES:
        return <DownloadPages />;

      case ModalTypes.PREVIOUSPAGES:
        return <PreviousPages />;

      case ModalTypes.ICONCHANGE:
        return <IconChange editTarget={modalTarget} />;

      case ModalTypes.FEEDBACK:
        return <Feedback />;

      case ModalTypes.CUSTOMCSS:
        return <CustomCSS />;

      case ModalTypes.FORMEDIT:
        return <FormEdit editTarget={modalTarget} />;

      case ModalTypes.HELP:
        return <Help />;

      case ModalTypes.VIDEOEDIT:
        return <VideoEdit editTarget={modalTarget} />;

      default:
        return null;
    }
  }
}

function mapStateToProps (state) {
  const { modals } = state;
  const { isModalOpen, modalType, modalTarget } = modals;

  return {
    isModalOpen,
    modalType,
    modalTarget
  };
}

export default connect(mapStateToProps)(Modals);
