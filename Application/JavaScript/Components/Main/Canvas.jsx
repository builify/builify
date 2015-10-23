import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CanvasSuggestionBox from '../Shared/CanvasSuggestionBox.jsx';
import Scrollbar from '../Shared/Scrollbar.jsx';
import CanvasFrame from '../Shared/CanvasFrame.jsx';
import PreviewControls from './PreviewControls.jsx';

class Canvas extends Component {
  render () {
    const { page } = this.props;
    const { blocksCount } = page;
    const displaySuggestionBox = blocksCount > 0 ? false : true;

    return (
      <div className='ab-canvas'>
        <CanvasSuggestionBox display={displaySuggestionBox} />
        <CanvasFrame />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    page: state.page
  }
}

export default connect(
  mapStateToProps
)(Canvas);
