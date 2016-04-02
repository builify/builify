import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import TTDOM from '../../../Common/TTDOM';
import ModalWrapper from '../Common/Wrapper';
import NavigationForTabs from './NavigationForTabs';
import BottomNavigation from '../Common/BottomNavigation';
import { TRACK_MODAL_CURENT_IMAGE_INPUT_ID } from '../../../Constants';
import { closeModal, uploadImage, selectImage } from '../../../Actions';

class ImageEdit extends React.Component {
  closeDialog () {
    return this.refs['modalWrapper'].closeDialog();
  }

  selectImage (data) {
    const { editTarget, onSelectImage } = this.props;
    const { src } = data;

    if (TTDOM.type.isElement(editTarget)) {
      if (editTarget.tagName === 'IMG') {
        editTarget.setAttribute('src', src);
      } else if (editTarget.tagName === 'DIV') {
        const backgroundImage = editTarget.style.backgroundImage;

        if (backgroundImage) {
          editTarget.style.backgroundImage = `url(${src})`;
        }
      }
    }

    this.closeDialog();

    return onSelectImage(data);
  }

  saveImage () {
    const { editTarget } = this.props;
    const imageChangeElement = document.querySelector(`#${TRACK_MODAL_CURENT_IMAGE_INPUT_ID}`);
    const value = imageChangeElement.value;

    if (TTDOM.type.isElement(editTarget)) {
      if (editTarget.tagName === 'IMG') {
        const currentValue = editTarget.getAttribute('src');

        if (currentValue !== value) {
          this.selectImage({
            src: value
          });
        }
      } else if (editTarget.tagName === 'DIV') {
        const backgroundImage = editTarget.style.backgroundImage;
        const url = backgroundImage ? backgroundImage.match(/url\(["|']?([^"']*)["|']?\)/)[1] : null;

        if (url && url !== value) {
          this.selectImage({
            src: value
          });
        }
      }
    }
  }

  render () {
    const {
      active,
      builderConfiguration,
      builder,
      editTarget,
      onUploadImage,
      onCloseModal
    } = this.props;
    const className = classNames('ab-modal');
    const actions = [
      { label: 'Cancel', onClick: ::this.closeDialog },
      { label: 'Save', onClick: ::this.saveImage }
    ];

    return (
      <ModalWrapper
        onClose={onCloseModal}
        active={active}
        ref='modalWrapper'
        className={className}>
        <NavigationForTabs
          onSelectImage={::this.selectImage}
          editTarget={editTarget}
          onUploadImage={onUploadImage}
          builder={builder}
          builderConfiguration={builderConfiguration} />
        <BottomNavigation
          actions={actions} />
      </ModalWrapper>
    );
  }
}

function mapStateToProps (state) {
  return {
    builder: state.builder,
    builderConfiguration: state.builderConfiguration
  };
}

function mapDispatchToProps (dispatch) {
  return {
    onCloseModal: () => {
      dispatch(closeModal());
    },

    onUploadImage: (data) => {
      dispatch(uploadImage(data));
    },

    onSelectImage: (data) => {
      dispatch(selectImage(data));
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(ImageEdit);
