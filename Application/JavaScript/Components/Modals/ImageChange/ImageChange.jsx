import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import ModalWrapper from '../ModalWrapper';
import NavigationForTabs from './NavigationForTabs';
import BottomNavigation from './BottomNavigation';
import { closeModal, uploadImage, selectImage } from '../../../Actions';
import TTDOM from '../../../Common/TTDOM';

class ImageEdit extends React.Component {
  closeDialog () {
    return this.refs['modalWrapper'].closeDialog();
  }

  selectImage (data) {
    const { editTarget, onSelectImage } = this.props;
    const { src } = data;

    if (typeof editTarget !== undefined) {
      console.log(editTarget);
      if (editTarget.classList.contains('background-image-holder')) {
        editTarget.style.backgroundImage = `url(${src})`;
      } else if (editTarget.tagName === 'IMG') {
        editTarget.setAttribute('src', src);
      }
    }

    this.closeDialog();

    return onSelectImage(data);
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
          closeDialog={::this.closeDialog} />
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
