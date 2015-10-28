import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { CurrentLocationEnum } from '../../Constants/Defines';
import cx from 'classnames';
import CanvasSuggestionBox from '../Shared/CanvasSuggestionBox.jsx';
import Scrollbar from '../Shared/Scrollbar.jsx';
import CanvasFrame from './CanvasFrame.jsx';
import PreviewControls from './PreviewControls.jsx';

class Canvas extends Component {
  render () {
    const { page, builder } = this.props;
    const { blocksCount } = page;
    const { currentLocation } = builder;
    const isPreviewModeActive = currentLocation === CurrentLocationEnum.PREVIEW ? true : false;
    const displaySuggestionBox = blocksCount > 0 ? false : true;
    const classname = cx('ab-canvas', isPreviewModeActive ? 'preview' : '');

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
    page: state.page
  }
}

export default connect(
  mapStateToProps
)(Canvas);
