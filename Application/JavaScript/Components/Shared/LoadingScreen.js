import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoadingIcon from './LoadingIcon';
import className from 'classnames';

class LoadingScreen extends Component {
  render () {
    const { builder } = this.props;
    const { isLoadingScreenActive } = builder;
    const loadingScreenClassName = className('ab-loadingScreen', isLoadingScreenActive ? 'show' : '');

    return (
      <div className={loadingScreenClassName}>
        <div className='ab-loadingScreen__loader'>
          <div />
        </div>
        <div className="ab-loadingScreen__loading">Loading builder</div>
        <div className="ab-loadingScreen__info">Please wait...</div>
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
)(LoadingScreen);