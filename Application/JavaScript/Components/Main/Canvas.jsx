import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { CurrentLocations, PreviewModes } from '../../Constants/Defines';
import cx from 'classnames';
import CanvasSuggestionBox from '../Shared/CanvasSuggestionBox';
import Scrollbar from '../Shared/Scrollbar';
import CanvasFrame from './CanvasFrame';
import PreviewControls from './PreviewControls';

class Canvas extends Component {
  render () {
    const { page, builder, preview } = this.props;
    const { blocksCount } = page;
    const { currentLocation } = builder;
    const { previewMode, landscapeView } = preview;
    const isPreviewModeActive = currentLocation === CurrentLocations.PREVIEW ? true : false;
    const displaySuggestionBox = blocksCount > 0 ? false : true;
    const prvClassname = isPreviewModeActive ? 'preview' : '';
    let prvMode = '';
    let lndcapeClassname = '';

    if (previewMode === PreviewModes.DESKTOP) {
      prvMode = 'desktop';
    } else if (previewMode === PreviewModes.TABLET) {
      prvMode = 'tablet';
    } else if (previewMode === PreviewModes.PHONE) {
      prvMode = 'phone';
    }

    if (landscapeView) {
      lndcapeClassname = 'landscape';
    }

    const classname = cx('ab-canvas', prvClassname, prvMode, lndcapeClassname);

    return (
      <div className={classname}>
        <PreviewControls display={isPreviewModeActive}/>
        <CanvasSuggestionBox display={displaySuggestionBox} />
        <CanvasFrame />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    builder: state.builder,
    page: state.page,
    preview: state.preview
  }
}

export default connect(
  mapStateToProps
)(Canvas);
