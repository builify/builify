import React from 'react';
import classNames from 'classnames';
import _isObject from 'lodash/isobject';
import _has from 'lodash/has';
import _isNull from 'lodash/isnull';
import TTDOM from '../../../common/TTDOM';
import ModalWrapper from '../common/Wrapper';
import TabNavigation from './modal';
import BottomNavigation from '../common/bottom-navigation';
import { TRACK_MODAL_CURENT_IMAGE_INPUT_ID } from '../../../constants';
import { closeModal, uploadFile, selectImageFile } from '../../../actions';
import { connect } from 'react-redux';

class ImageEdit extends React.Component {
  static propTypes = {
    builderConfiguration: React.PropTypes.object.isRequired,
    builder: React.PropTypes.object.isRequired,
    assets: React.PropTypes.array.isRequired,
    onUploadImage: React.PropTypes.func.isRequired,
    onCloseModal: React.PropTypes.func.isRequired,
    selectImage: React.PropTypes.func.isRequired,
    editTarget: React.PropTypes.any.isRequired
  };

  closeDialog () {
    return this.refs['modalWrapper'].closeDialog();
  }

  selectImage (image) {
    const { editTarget } = this.props;
    let source = null;

    if (_isObject(image)) {
      if (_has(image, 'fileData')) {
        source = image.fileData;

        this.props.selectImage(image);
      } else if (_has(image, 'src')) {
        source = image.src;
      }
    }

    if (!_isNull(source)) {
      if (TTDOM.type.isElement(editTarget)) {
        if (editTarget.tagName === 'IMG') {
          editTarget.setAttribute('src', source);
        } else if (editTarget.tagName === 'DIV') {
          console.log(editTarget, source);
          const backgroundImage = editTarget.style.backgroundImage;

          if (backgroundImage) {
            editTarget.style.backgroundImage = `url(${source})`;
          }
        }
      }
    }

    return this.closeDialog();
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
          builderConfiguration={builderConfiguration}
          onClose={::this.closeDialog} />
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
    onCloseModal: function () {
      dispatch(closeModal());
    },

    onUploadImage: function (data) {
      dispatch(uploadFile(data));
    },

    selectImage: function (file) {
      dispatch(selectImageFile(file));
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(ImageEdit);
