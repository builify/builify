import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CanvasSuggestionBox from '../Shared/CanvasSuggestionBox.jsx';
import Scrollbar from '../Shared/Scrollbar.jsx';
import CanvasFrame from '../Shared/CanvasFrame.jsx';

class Canvas extends Component {
  render () {
    const { theme } = this.props;
    const { _currentPage } = theme;
    const displaySuggestionBox = _currentPage.blocksCount > 0 ? false : true;

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
    theme: state.theme
  }
}

export default connect(
  mapStateToProps
)(Canvas);
