import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PreviewControls from './preview-controls';
import SuggestionBox from './suggestion-box';
import Frame from './frame';
import { CurrentLocations, PreviewModes } from '../../constants';

class Canvas extends React.Component {
  render () {
    const { page, builder, preview } = this.props;
    const { blocksCount } = page;
    const { currentLocation } = builder;
    const { previewMode, landscapeView } = preview;
    const previewModeActive = currentLocation === CurrentLocations.PREVIEW;
    const suggestionActive = blocksCount === 0;

    const className = classNames('ab-canvas', {
      'hide': currentLocation === CurrentLocations.STARTSCREEN,

      'landscape': landscapeView,
      'desktop': previewMode === PreviewModes.DESKTOP,
      'tablet': previewMode === PreviewModes.TABLET,
      'phone': previewMode === PreviewModes.PHONE
    });

    return (
      <div className={className}>
        <Frame />
        <SuggestionBox display={suggestionActive} />
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
