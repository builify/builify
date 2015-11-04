import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { PreviewModes } from '../../Constants/Defines';
import { setPreviewMode, closePreview, rotatePreviewView } from '../../Actions/ActionCreators';
import cx from 'classnames';
import BackButton from '../Shared/BackButton';
import SvgIcon from '../Shared/SvgIcon';

class ControlItem extends Component {
  render () {
    const { type, onSetPreviewMode, onRotatePreviewView, preview } = this.props;
    const { previewMode } = preview;
    const iconSize = 24;
    let icon, title = '';
    let previewModeType = null;
    let rotate = false;
    let active = false;

    if (type === 'desktop') {
      icon = type;
      title = 'Set Desktop View';
      previewModeType = PreviewModes.DESKTOP;

      if (previewMode === PreviewModes.DESKTOP) {
        active = true;
      }
    } else if (type === 'tablet') {
      icon = type;
      title = 'Set Tablet View';
      previewModeType = PreviewModes.TABLET;

      if (previewMode === PreviewModes.TABLET) {
        active = true;
      }
    } else if (type === 'phone') {
      icon = type;
      title = 'Set Phone View';
      previewModeType = PreviewModes.PHONE;

      if (previewMode === PreviewModes.PHONE) {
        active = true;
      }
    } else if (type === 'screen-rotation') {
      icon = type;
      title = 'Rotate View';
      rotate = true;
    }

    return (
      <li
        className={cx(active ? 'active' : '')}
        onClick={(e) => {
          e.preventDefault();

          if (rotate && previewModeType === null) {
            return onRotatePreviewView();
          } else {
            return onSetPreviewMode(previewModeType);
          }
        }}
        title={title}>
        <SvgIcon
          icon={icon}
          size={iconSize} />
      </li>
    )
  }
}

function mapStateToProps (state) {
  return {
    preview: state.preview
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onSetPreviewMode: mode => {
      dispatch(setPreviewMode(mode));
    },

    onRotatePreviewView: () => {
      dispatch(rotatePreviewView());
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlItem);
