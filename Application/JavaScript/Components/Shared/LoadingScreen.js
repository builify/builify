import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoadingIcon from './LoadingIcon';

class LoadingScreen extends Component {
  render () {
    return (
      <div className='ab-loadingScreen'>
        <LoadingIcon />
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

export default connect(mapStateToProps)(LoadingScreen);