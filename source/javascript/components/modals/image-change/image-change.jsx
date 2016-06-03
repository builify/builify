import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import TTDOM from '../../../common/TTDOM';
import ModalWrapper from '../common/Wrapper';
import TabNavigation from './tab-navigation';
import BottomNavigation from '../common/bottom-navigation';
import { TRACK_MODAL_CURENT_IMAGE_INPUT_ID } from '../../../constants';
import { closeModal, uploadFile, selectImage } from '../../../actions';

class ImageEdit extends React.Component {
  static propTypes = {
    builderConfiguration: React.PropTypes.object.isRequired,
    builder: React.PropTypes.object.isRequired,
    assets: React.PropTypes.array.isRequired,
    onUploadImage: React.PropTypes.func.isRequired,
    onCloseModal: React.PropTypes.func.isRequired,
    onSelectImage: React.PropTypes.func.isRequired,
    editTarget: React.PropTypes.any.isRequired
  };

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
      builderConfiguration,
      builder,
      assets,
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
      <ModalWrapper onClose={onCloseModal} ref='modalWrapper' className={className}>
        <TabNavigation
          onSelectImage={::this.selectImage}
          editTarget={editTarget}
          onUploadImage={onUploadImage}
          builder={builder}
          assets={assets}
          builderConfiguration={builderConfiguration} />
        <BottomNavigation actions={actions} />
      </ModalWrapper>
    );
  }
}

function mapStateToProps (state) {
  return {
    builder: state.builder,
    assets: state.assets,
    builderConfiguration: state.builderConfiguration
  };
}

function mapDispatchToProps (dispatch) {
  return {
    onCloseModal: () => {
      dispatch(closeModal());
    },

    onUploadImage: (data) => {
      dispatch(uploadFile(data));
    },

    onSelectImage: (data) => {
      dispatch(selectImage(data));
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(ImageEdit);
