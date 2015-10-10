import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CanvasSuggestionBox from '../Shared/CanvasSuggestionBox';
import Scrollbar from '../Shared/Scrollbar';
import IFrame from '../Shared/IFrame';

class Canvas extends Component {
  render () {
    const { theme } = this.props;
    const { _currentPage } = theme;
    const displaySuggestionBox = _currentPage.blocksCount > 0 ? false : true;

    return (
      <div className='ab-canvas'>
        <CanvasSuggestionBox display={displaySuggestionBox} />
        <IFrame />
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