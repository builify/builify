import React, { Component } from 'react';
import { connect } from 'react-redux';

class Canvas extends Component {
  render () {
    return (
      <div className='ab-canvas'>
        {'Canvas'}
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