import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import LoadingIcon from './LoadingIcon';

class LoadingScreen extends React.Component {
  render () {
    const { builder } = this.props;
    const { isLoadingScreenActive, loadingScreenType } = builder;

    if (loadingScreenType === 0) {
      const loadingScreenClassName = classNames(
        'ab-loadingScreen', isLoadingScreenActive ? 'show' : ''
      );

      return (
        <div
          id='ab-loadingScreen'
          className={loadingScreenClassName}>
          <LoadingIcon />
          <div className="ab-loadingScreen__loading">Loading builder</div>
          <div className="ab-loadingScreen__info">Please wait...</div>
        </div>
      );
    }
  }
}

function mapStateToProps (state) {
  return {
    builder: state.builder
  };
}

export default connect(mapStateToProps)(LoadingScreen);
