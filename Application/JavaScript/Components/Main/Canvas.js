import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scrollbar from '../Shared/Scrollbar'; 

class CanvasSuggestionBox extends Component {
  render () {
    return (
      <h1>Drop something</h1>
    )
  }
}

class Canvas extends Component {
  renderCanvasContent () {
    const { builder } = this.props;
    const { canvasContentBlocks } = builder;
    const contentBlocksOnCanvas = canvasContentBlocks.length;

    if (contentBlocksOnCanvas === 0) {
      return <CanvasSuggestionBox />
    } else {
      let blockWrapper = document.createElement('div');
      blockWrapper.innerHTML = canvasContentBlocks[0].HTML;

      this.refs.canvas.appendChild(blockWrapper);
    }
  }

  render () {
    return (
      <div className='ab-canvas'>
        <div ref='canvas' className='ab-canvas__wrapper'>
          {this.renderCanvasContent()}
        </div>
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