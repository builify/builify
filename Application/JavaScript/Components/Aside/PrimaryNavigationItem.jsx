import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getString } from '../../Common/Localization';
import { openTab, openPreview, openDownloadModal, openRestartModal } from '../../Actions';
import { CurrentLocations } from '../../Constants';
import cx from 'classnames';
import Icon from '../Shared/Icon';

class PrimaryNavigationItem extends Component {
  static propTypes = {
    language: PropTypes.string,
    navigationItemInformation: PropTypes.object
  }

  static defaultProps = {
    language: 'en',
    navigationItemInformation: {}
  }

  itemClick (e) {
    const { onOpenTab, onOpenPreview, target, builder, navigationItemInformation } = this.props;
    const { currentLocation } = builder;

    if (currentLocation == CurrentLocations.STARTSCREEN) {
      if (navigationItemInformation.id !== 'pages') {
        return false;
      }
    }

    return ((navigationItemInformation.target.indexOf('tab') !== -1) ?
            onOpenTab(target) :
            onOpenPreview(target));
  }

  render () {
    const { onGetHTML, onRestartClick, builder, navigationItemInformation } = this.props;
    const { id, icon, target } = navigationItemInformation;
    const { currentLocation, pages } = builder;
    let itemClassName = cx(currentLocation == CurrentLocations.STARTSCREEN ?
      (id !== 'pages' ? 'hide' : '') : '');

    if (id === 'gethtml') {
      if (pages.length !== 0) {
        return (
          <li
            onClick={onGetHTML}
            className='html'>
            <Icon icon='file-download' />
            <span>{'Get HTML'}</span>
          </li>
        );
      } else {
        return (
          <li
            className='html hide'>
            <Icon icon='file-download' />
            <span>{'Get HTML'}</span>
          </li>
        );
      }
    } else if (id=== 'restore') {
      const clickFunc = currentLocation !== CurrentLocations.STARTSCREEN ?
        onRestartClick : function () {};

      return (
        <li
          className={itemClassName}
          onClick={clickFunc}>
          <Icon icon='restore' />
          <span>{'Restart'}</span>
        </li>
      );
    } else {
      return (
        <li
          className={itemClassName}
          onClick={::this.itemClick}>
          <Icon icon={icon} />
          {getString('primarynavigation.' + id)}
        </li>
      );
    }
  }
}

function mapStateToProps (state) {
  return {
    builder: state.builder
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onOpenTab: target => {
      dispatch(openTab(target));
    },

    onOpenPreview: target => {
      dispatch(openPreview(target));
    },

    onGetHTML: () => {
      dispatch(openDownloadModal());
    },

    onRestartClick: () => {
      dispatch(openRestartModal());
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrimaryNavigationItem);
