import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Scrollbar from '../Shared/Scrollbar'; 
import IFrame from '../Shared/IFrame';

class CanvasSuggestionBox extends Component {
  static propTypes = {
    display: PropTypes.bool
  };

  static defaultProps = {
    display: true
  };

  render () {
    const { display } = this.props;

    if (display) {
      return (
        <div className='ab-suggestionBox'>
          <h1>Drop some content!</h1>
        </div>
      )
    } else {
      return null;
    }
  }
}

class Canvas extends Component {
  render () {
    const { builder } = this.props;
    const { canvasContentBlocks } = builder;
    const contentBlocksOnCanvas = canvasContentBlocks.length;
    const displaySuggestion = contentBlocksOnCanvas === 0 ? true : false;

    return (
      <div className='ab-canvas'>
        <CanvasSuggestionBox display={displaySuggestion}/>
        <IFrame />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    builder: state.builder
  }
}

export default connect(
  mapStateToProps
)(Canvas);