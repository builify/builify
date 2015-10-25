import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { randomKey } from '../../Common/Common';
import _ from 'lodash';
import PrimaryNavigationItem from './PrimaryNavigationItem.jsx';

class PrimaryNavigation extends Component {
	shouldComponentUpdate (nextProps, nextState) {
    return false;
  }

	render () {
		const { builderConfiguration } = this.props;
    const { primarynavigation, localization } = builderConfiguration;

    return (
      <ul className='ab-primarynav'>
        {_.map(primarynavigation, (navigationItem, i) => {
					const itemKey = randomKey('pni');

          return <PrimaryNavigationItem
                    key={itemKey}
                    target={i}
                    language={localization}
                    navigationItemInformation={navigationItem} />
        })}
      </ul>
    )
  }
}

function mapStateToProps (state) {
  return {
    builderConfiguration: state.builderConfiguration
  }
}

export default connect(
  mapStateToProps
)(PrimaryNavigation);
