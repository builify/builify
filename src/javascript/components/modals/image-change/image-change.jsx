import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import {
  has as _has,
  isObject as _isObject,
  isNull as _isNull,
  isEmpty as _isEmpty,
  isElement as _isElement
} from 'lodash';
import ModalWrapper from '../common/wrapper';
import TabNavigation from './modal';
import BottomNavigation from '../common/bottom-navigation';
import { TRACK_MODAL_CURENT_IMAGE_INPUT_ID, BLOCK_BACKGROUND_IMAGE_ELEMENT_CLASSNAME } from '../../../constants';
import { closeModal, uploadFile, selectImageFile } from '../../../actions';

class ImageEdit extends React.Component {
  static propTypes = {
    builderConfiguration: PropTypes.object.isRequired,
    builder: PropTypes.object.isRequired,
    assets: PropTypes.array.isRequired,
    onUploadImage: PropTypes.func.isRequired,
    onCloseModal: PropTypes.func.isRequired,
    selectImage: PropTypes.func.isRequired,
    editTarget: PropTypes.any.isRequired
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
      if (_isElement(editTarget)) {
        if (editTarget.tagName === 'IMG') {
          editTarget.setAttribute('src', source);
        } else {
          const backgroundImage = editTarget.style.backgroundImage;

          if (_isEmpty(backgroundImage)) {
            const imageHolder = editTarget.querySelector(BLOCK_BACKGROUND_IMAGE_ELEMENT_CLASSNAME);

            if (_isElement(imageHolder)) {
              imageHolder.style.backgroundImage = `url(${source})`;
            } else if (editTarget.classList.contains('portfolio--03__item__description')) {
              const parentElement = editTarget.parentElement;

              if (parentElement) {
                const parentElementChildren = parentElement.children;

                if (parentElementChildren.length > 0) {
                  for (let i = 0; i < parentElementChildren.length; i += 1) {
                    if (parentElementChildren[i].tagName.toLocaleLowerCase() === 'img') {
                      parentElementChildren[i].setAttribute('src', source);
                    }
                  }
                }
              }
            }
          } else {
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

    if (_isElement(editTarget)) {
      if (editTarget.tagName === 'IMG') {
        const currentValue = editTarget.getAttribute('src');

        if (currentValue !== value) {
          this.selectImage({
            src: value
          });
        }
      } else {
        const backgroundImage = editTarget.style.backgroundImage;

        if (_isEmpty(backgroundImage)) {
          // Check if contains .background-image-holder
          const imageHolder = editTarget.querySelector(BLOCK_BACKGROUND_IMAGE_ELEMENT_CLASSNAME);

          if (_isElement(imageHolder)) {
            const url = imageHolder.style.backgroundImage.match(/url\(["|']?([^"']*)["|']?\)/);

            if (url && url[1] && url[1] !== value) {
              this.selectImage({
                src: value
              });
            }
          } else if (editTarget.classList.contains('portfolio--03__item__description')) {
            const parentElement = editTarget.parentElement;

            if (parentElement) {
              const parentElementChildren = parentElement.children;

              if (parentElementChildren.length > 0) {
                for (let i = 0; i < parentElementChildren.length; i += 1) {
                  if (parentElementChildren[i].tagName.toLocaleLowerCase() === 'img') {
                    const currentValue = parentElementChildren[i].getAttribute('src');

                    if (currentValue !== value) {
                      this.selectImage({
                        src: value
                      });
                    }
                  }
                }
              }
            }
          }
        } else {
          const url = backgroundImage.match(/url\(["|']?([^"']*)["|']?\)/);

          if (url && url[1] && url[1] !== value) {
            this.selectImage({
              src: value
            });
          }
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
    onCloseModal: () => {
      dispatch(closeModal());
    },

    onUploadImage: (data) => {
      dispatch(uploadFile(data));
    },

    selectImage: (file) => {
      dispatch(selectImageFile(file));
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(ImageEdit);
