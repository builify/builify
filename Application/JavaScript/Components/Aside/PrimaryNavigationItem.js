import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getString } from '../../Common/Localization';
import { openTab, openPreview } from '../../Actions/ActionCreators';
import { CurrentLocationEnum } from '../../Constants/Enums';
import classNames from 'classnames';
import Icon from '../Shared/Icon';

class PrimaryNavigationItem extends Component {
  static propTypes = {
    language: PropTypes.string,
    navigationItemInformation: PropTypes.object
  };

  static defaultProps = {
    language: 'en',
    navigationItemInformation: {}
  };

  itemClick (e) {
    const { target, navigationItemInformation } = this.props;

    return ((navigationItemInformation.target.indexOf('tab') !== -1) ? 
            openTab(target) : 
            openPreview(target));
  }

  render () {
    const { dispatch, builder } = this.props;
    const { id, icon, target } = this.props.navigationItemInformation;
    const { currentLocation } = builder;
    let itemClassName = classNames(currentLocation == CurrentLocationEnum.STARTSCREEN ? 
      (id !== 'pages' ? 'hide' : '') : '');

    return (
      <li
        className={itemClassName}
        {...bindActionCreators({
          onClick: ::this.itemClick
        }, dispatch)}>
        <Icon name={icon} />
        {getString('primarynavigation.' + id)}
      </li>
    )
  }
};

function mapStateToProps (state) {
  return {
    builder: state.builder,
    localization: state.localizationData
  };
}

export default connect(
  mapStateToProps
)(PrimaryNavigationItem);
