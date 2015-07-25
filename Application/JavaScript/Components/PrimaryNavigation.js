import React, { Component, PropTypes } from 'react';
import { connect } from 'redux/react';
import { bindActionCreators } from 'redux';
import { getString } from '../Common/Localization';
import { openTab, openPreview } from '../Actions/ActionCreators';

@connect((state) => ({
  localization: state.localizationData
}))
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

    return ((navigationItemInformation.target.indexOf('tab') !== -1) ? openTab(target) : openPreview(target));
  }

  render () {
    const data = this.props;
    const dispatch = data.dispatch;
    const { id, icon, target } = data.navigationItemInformation;

    return (
      <li
        {...bindActionCreators({
          onClick: ::this.itemClick
        }, dispatch)}>
        <span className={icon}/>{getString('primarynavigation.' + id)}
      </li>
    );
  }
};

@connect(state => ({
  builderConfiguration: state.builderConfiguration
}))
export default class PrimaryNavigation extends Component {
	render () {
    const { primarynavigation } = this.props.builderConfiguration;

    return (
      <ul className='ab-primarynav'>
        {primarynavigation.map((navigationItem, i) => {
          return <PrimaryNavigationItem key={i} target={i} language={this.props.builderConfiguration.localization} navigationItemInformation={navigationItem} />
        })}
      </ul>
    );
  };
};