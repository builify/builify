import React from 'react';
import Random from '../../../common/random';
import NavigationItem from './item';
import classNames from '../../../common/classnames';
import * as Actions from '../../../actions';
import { connect } from 'react-redux';
import { CurrentLocations, IS_DEMO_VERSION, IS_DEV_VERSION } from '../../../constants';
import {
  map as _map,
  size as _size,
  words as _words,
  partial as _partial
} from 'lodash';

console.log(Actions);

class PrimaryNavigation extends React.Component {
  static propTypes = {
    navigation: React.PropTypes.array.isRequired,
    pages: React.PropTypes.array.isRequired,
    currentLocation: React.PropTypes.number.isRequired,
    openFeedbackModal: React.PropTypes.func.isRequired,
    openTab: React.PropTypes.func.isRequired,
    openRestartModal: React.PropTypes.func.isRequired,
    openDownloadModal: React.PropTypes.func.isRequired,
    saveCurrentPage: React.PropTypes.func.isRequired,
    downloadSinglePage: React.PropTypes.func.isRequired,
    noPagesToDownload: React.PropTypes.func.isRequired,
    openHelpModal: React.PropTypes.func.isRequired
  };

  shouldComponentUpdate (nextProps) {
    if (this.props.currentLocation !== nextProps.currentLocation) {
      return true;
    }

    return false;
  }


  renderNavigationItems () {
    const { navigation, currentLocation, pages } = this.props;
    
    return _map(navigation, (item) => {
      const { id, title, icon, onClick } = item;
      const command = _words(onClick);
      const commandSize = _size(command);
      let clickFunction = null;

      if (commandSize === 2) {
        const cmd1 = command[0];
        const cmd2 = command[1];

        if (cmd1 === 'open') {
          clickFunction = _partial(this.props.openTab, cmd2);
        } else if (cmd1 === 'run') {
          if (cmd2 === 'restore') {
            clickFunction = this.props.openRestartModal;
          } else if (cmd2 === 'download') {
            if (pages.length > 1) {
              clickFunction = this.props.openDownloadModal;
            } else if (pages.length === 1) {
              clickFunction = this.props.downloadSinglePage;
            } else {
              clickFunction = this.props.noPagesToDownload;
            }
          } else if (cmd2 === 'save') {
            clickFunction = this.props.saveCurrentPage;
          }
        }
      }

      return (
        <NavigationItem
          key={Random.randomKey('navigation-item')}
          disabled={!!((currentLocation === CurrentLocations.STARTSCREEN && id !== 'download') && true)}
          title={title}
          icon={icon}
          onClick={clickFunction}
          currentLocation={currentLocation} />
      );
    });
  }

  renderFeedBackNavigationItem () {
    if (IS_DEV_VERSION || IS_DEMO_VERSION) {
      return (
        <NavigationItem
          className='feedback'
          title='feedback'
          icon='info-outline'
          onClick={this.props.openFeedbackModal} />
      );
    }

    return null;
  }

  renderInfoNavigationItem () {
    return (
      <NavigationItem
        className='help'
        title='help'
        icon='info-outline'
        onClick={this.props.openHelpModal} />
    );
  }

  render () {
    return (
      <ul className={classNames('primarynav')}>
        { this.renderNavigationItems() }
        { this.renderFeedBackNavigationItem() }
        { this.renderInfoNavigationItem() }
      </ul>
    );
  }
}

function mapStateToProps (state) {
  const { builder, builderConfiguration } = state;
  const { navigation } = builderConfiguration;
  const { currentLocation, pages } = builder;

  return {
    navigation,
    currentLocation,
    pages
  };
}

function mapDispatchToProps (dispatch) {
  return {
    openFeedbackModal: function () {
      dispatch(Actions.openFeedbackModal());
    },
    openTab: function (target) {
      dispatch(Actions.openTab(target));
    },

    openDownloadModal: function () {
      dispatch(Actions.openDownloadModal());
    },

    openRestartModal: function () {
      dispatch(Actions.openRestartModal());
    },

    downloadSinglePage: function () {
      dispatch(Actions.downloadSinglePage())
    },

    noPagesToDownload: function () {
      dispatch(Actions.noPagesToDownload());
    },

    saveCurrentPage: function () {
      dispatch(Actions.saveCurrentPage());
    },

    openHelpModal: function () {
      dispatch(Actions.openHelpModal());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryNavigation);
