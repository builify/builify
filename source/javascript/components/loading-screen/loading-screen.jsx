import React from 'react';
import localization from '../../common/localization';
import classNames from '../../common/classnames';
import ProgressBar from '../shared/progress-bar';
import { connect } from 'react-redux';

class LoadingScreen extends React.Component {
  static propTypes = {
    isLoadingScreenActive: React.PropTypes.bool.isRequired,
    loadingScreenType: React.PropTypes.number.isRequired
  };

  shouldComponentUpdate (nextProps) {
    if (this.props.isLoadingScreenActive !== nextProps.isLoadingScreenActive ||
        this.props.loadingScreenType !== nextProps.loadingScreenType) {
      return true;
    }

    return false;
  }

  render () {
    const { isLoadingScreenActive, loadingScreenType } = this.props;

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
}

function mapStateToProps (state) {
  const { builder } = state;
  const { isLoadingScreenActive, loadingScreenType } = builder;

  return {
    isLoadingScreenActive: isLoadingScreenActive,
    loadingScreenType: loadingScreenType
  };
}

export default connect(mapStateToProps)(LoadingScreen);
