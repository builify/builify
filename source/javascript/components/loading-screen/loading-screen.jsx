import React from 'react';
import classNames from '../../common/classnames';
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
      const loadingScreenClassName = classNames('loadingScreen', {
        'show': isLoadingScreenActive
      });

      return (
        <div id={classNames('loadingScreen')} className={loadingScreenClassName}>
          <div className={classNames('loadingScreen__loader', 'big')}><div /></div>
          <div className={classNames('loadingScreen__loading')}>Loading builder</div>
          <div className={classNames('loadingScreen__info')}>Please wait...</div>
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
