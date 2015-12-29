import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import _ from 'lodash';
import Icon from '../Shared/Icon';
import { getString } from '../../Common/Localization';
import * as Actions from '../../Actions';
import { CurrentLocations } from '../../Constants';

class PrimaryNavigationItem extends React.Component {
  static propTypes = {
    language: React.PropTypes.string,
    navigationItemInformation: React.PropTypes.object
  };

  static defaultProps = {
    language: 'en',
    navigationItemInformation: {}
  };

  itemClick () {
    const { onOpenTab, onOpenPreview, target, builder, navigationItemInformation } = this.props;
    const { currentLocation } = builder;

    if (currentLocation === CurrentLocations.STARTSCREEN) {
      return false;
    }

    if (_.has(navigationItemInformation, 'target')) {
      return ((navigationItemInformation.target.indexOf('tab') !== -1) ?
              onOpenTab(target) :
              onOpenPreview(target));
    } else {
      throw Error(`No target defined for ${navigationItemInformation.id}.`);
    }
  }

  render () {
    const {
      onSaveClick,
      onGetHTML,
      onRestartClick,
      builder,
      navigationItemInformation
    } = this.props;
    const { id, icon } = navigationItemInformation;
    const { currentLocation, pages } = builder;
    const itemClassName = classNames(
      currentLocation === CurrentLocations.STARTSCREEN ? 'hide' : ''
    );

    if (id === 'gethtml' || id === 'save' || id === 'restore') {
      if (id === 'gethtml') {
        const moreThanOnePage = !!(pages && pages.length !== 0);
        const className = classNames('html', !moreThanOnePage ? 'hide' : null);
        const emptyFunction = () => {};

        return (
          <li
            onClick={moreThanOnePage ? onGetHTML : emptyFunction}
            className={className}>
            <Icon icon={icon} />
            <span>{getString('primarynavigation.' + id)}</span>
          </li>
        );
      } else if (id === 'restore') {
        const clickFunc = currentLocation !== CurrentLocations.STARTSCREEN ?
          onRestartClick : function () {};

        return (
          <li
            className={itemClassName}
            onClick={clickFunc}>
            <Icon icon={icon} />
            <span>{getString('primarynavigation.' + id)}</span>
          </li>
        );
      } else if (id === 'save') {
        const clickFunc = currentLocation !== CurrentLocations.STARTSCREEN ?
          onSaveClick : function () {};
        const className = classNames(itemClassName);

        return (
          <li
            className={className}
            onClick={clickFunc}>
            <Icon icon={icon} />
            <span>{getString('primarynavigation.' + id)}</span>
          </li>
        );
      }
    }

    return (
      <li
        className={itemClassName}
        onClick={::this.itemClick}>
        <Icon icon={icon} />
        <span>{getString('primarynavigation.' + id)}</span>
      </li>
    );
  }
}

function mapStateToProps (state) {
  return {
    builder: state.builder
  };
}

function mapDispatchToProps (dispatch) {
  return {
    onOpenTab: target => {
      dispatch(Actions.openTab(target));
    },

    onOpenPreview: target => {
      dispatch(Actions.openPreview(target));
    },

    onGetHTML: () => {
      dispatch(Actions.openDownloadModal());
    },

    onRestartClick: () => {
      dispatch(Actions.openRestartModal());
    },

    onSaveClick: () => {
      dispatch(Actions.saveCurrentPage());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryNavigationItem);
