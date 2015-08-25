import React, { Component } from 'react';
import { connect } from 'react-redux';

class Canvas extends Component {
  render () {
    return (
      <div className='ab-canvas'>
        {'Canvas'}
      </div> 
    );
  }
};

function mapStateToProps (state) {
  return {
    builderConfiguration: state.builderConfiguration,
    builder: state.builder,
    localization: state.localizationData
  };
}

export default connect(mapStateToProps)(Canvas);