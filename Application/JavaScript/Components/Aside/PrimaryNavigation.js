import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getString } from '../../Common/Localization';
import { openTab, openPreview } from '../../Actions/ActionCreators';
import { CurrentLocationEnum } from '../../Constants/Enums';
import classNames from 'classnames';
import PrimaryNavigationItem from './PrimaryNavigationItem';

class PrimaryNavigation extends Component {
	render () {
    const { primarynavigation } = this.props.builderConfiguration;

    return (
      <ul className='ab-primarynav'>
        {primarynavigation.map((navigationItem, i) => {
          return <PrimaryNavigationItem 
                    key={i} 
                    target={i} 
                    language={this.props.builderConfiguration.localization} 
                    navigationItemInformation={navigationItem} />
        })}
      </ul>
    );
  };
};

function mapStateToProps (state) {
  return {
    builderConfiguration: state.builderConfiguration
  };
}

export default connect(mapStateToProps)(PrimaryNavigation);