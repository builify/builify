import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getString } from '../../Common/Localization';
import { openTab, openPreview, openDownloadModal, openRestartModal } from '../../Actions/ActionCreators';
import { CurrentLocations } from '../../Constants/Defines';
import cx from 'classnames';
import SvgIcon from '../Shared/SvgIcon';

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
    const { currentLocation } = builder;
    let itemClassName = cx(currentLocation == CurrentLocations.STARTSCREEN ?
      (id !== 'pages' ? 'hide' : '') : '');

    if (id === 'gethtml') {
      return (
        <li
          onClick={onGetHTML}
          className='html'>
          <SvgIcon icon='file-download' />
          <span>{'Get HTML'}</span>
        </li>
      )
    } else if (id=== 'restore') {
      return (
        <li
          className={itemClassName}
          onClick={onRestartClick}>
          <SvgIcon icon='restore' />
          <span>{'Restart'}</span>
        </li>
      )
    } else {
      return (
        <li
          className={itemClassName}
          onClick={::this.itemClick}>
          <SvgIcon icon={icon} />
          {getString('primarynavigation.' + id)}
        </li>
      )
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
