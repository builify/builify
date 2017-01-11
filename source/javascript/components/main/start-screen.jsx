import React from 'react';
import classNames from '../../common/classnames';
import Page from './newpage';
import Copyright from './copyright';
import { connect } from 'react-redux';
import { CurrentLocations } from '../../constants';

class ProjectStartScreen extends React.Component {
  static propTypes = {
    previousPagesInStorage: React.PropTypes.bool.isRequired,
    currentLocation: React.PropTypes.number.isRequired
  };

  shouldComponentUpdate (nextProps) {
    if (this.props.currentLocation !== nextProps.currentLocation) {
      return true;
    }

    return false;
  }

  render () {
    const { previousPagesInStorage, currentLocation } = this.props;
    const wrapperClassName = classNames('flex', 'full', 'center');

    if (currentLocation !== CurrentLocations.STARTSCREEN) {
      return null;
    }

    return (
      <div className={wrapperClassName}>
        <Page newPage />
        { previousPagesInStorage && <Page /> }
        <Copyright />
      </div>
    );
  }
}

function mapStateToProps (state) {
  const { builder } = state;
  const { doPreviousPagesExistInStorage: previousPagesInStorage, currentLocation } = builder;

  return {
    previousPagesInStorage: previousPagesInStorage,
    currentLocation: currentLocation
  };
}

export default connect(mapStateToProps)(ProjectStartScreen);
