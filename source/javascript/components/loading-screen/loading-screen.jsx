import React from 'react';
import localization from '../../common/localization';
import classNames from '../../common/classnames';
import ProgressBar from '../shared/progress-bar';
import { connect } from 'react-redux';

function LoadingScreen ({
  isLoadingScreenActive,
  loadingScreenType
}) {
  if (loadingScreenType === 0) {
    const loadingScreenClassName = classNames('loading-screen', {
      'show': isLoadingScreenActive
    });

    return (
      <div id={classNames('loading-screen')} className={loadingScreenClassName}>
        <ProgressBar type='circular' mode='indeterminate' multicolor />
        <div className={classNames('loading-screen__loading')}>{localization('loading builder')}</div>
        <div className={classNames('loading-screen__info')}>{localization('please wait')}</div>
      </div>
    );
  }
}

LoadingScreen.propTypes = {
  isLoadingScreenActive: React.PropTypes.bool.isRequired,
  loadingScreenType: React.PropTypes.number.isRequired
};

function mapStateToProps (state) {
  const { builder } = state;
  const { isLoadingScreenActive, loadingScreenType } = builder;

  return {
    isLoadingScreenActive: isLoadingScreenActive,
    loadingScreenType: loadingScreenType
  };
}

export default connect(mapStateToProps)(LoadingScreen);
