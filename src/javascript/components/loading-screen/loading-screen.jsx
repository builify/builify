import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import localization from '../../common/localization';
import classNames from '../../common/classnames';
import ProgressBar from '../shared/progress-bar';

function LoadingScreen ({
  isLoadingScreenActive,
  loadingScreenType
}) {
  if (loadingScreenType === 0) {
    const loadingScreenClassName = classNames('loading-screen', {
      show: isLoadingScreenActive
    });

    return (
      <div id={classNames('loading-screen')} className={loadingScreenClassName}>
        <ProgressBar type={'circular'} mode={'indeterminate'} multicolor />
        <div className={classNames('loading-screen__loading')}>{localization('loading builder')}</div>
        <div className={classNames('loading-screen__info')}>{localization('please wait')}</div>
      </div>
    );
  }
}

LoadingScreen.propTypes = {
  isLoadingScreenActive: PropTypes.bool.isRequired,
  loadingScreenType: PropTypes.number.isRequired
};

function mapStateToProps (state) {
  const { builder } = state;
  const { isLoadingScreenActive, loadingScreenType } = builder;

  return {
    isLoadingScreenActive,
    loadingScreenType
  };
}

export default connect(mapStateToProps)(LoadingScreen);
