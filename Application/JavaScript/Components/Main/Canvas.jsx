import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import CanvasFrame from './CanvasFrame';
import PreviewControls from './PreviewControls';
import CanvasSuggestionBox from './CanvasSuggestionBox';
import { CurrentLocations, PreviewModes } from '../../Constants';

class Canvas extends React.Component {
  render () {
    const { page, builder, preview } = this.props;
    const { blocksCount } = page;
    const { currentLocation } = builder;
    const { previewMode, landscapeView } = preview;
    const isPreviewModeActive = currentLocation === CurrentLocations.PREVIEW ? true : false;
    const displaySuggestionBox = blocksCount > 0 ? false : true;
    const prvClassname = isPreviewModeActive ? 'preview' : '';
    const isStartScreenLocation = currentLocation === CurrentLocations.STARTSCREEN ? true : false;
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

    const className = classNames('ab-canvas', isStartScreenLocation ? 'hide' : null, prvClassname, prvMode, lndcapeClassname);

    return (
      <div className={className}>
        <PreviewControls display={isPreviewModeActive}/>
        <CanvasSuggestionBox display={displaySuggestionBox} />
        <CanvasFrame />
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    builder: state.builder,
    page: state.page,
    preview: state.preview
  };
}

export default connect(mapStateToProps)(Canvas);
