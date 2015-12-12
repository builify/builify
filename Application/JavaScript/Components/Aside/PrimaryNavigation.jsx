import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Random from '../../Common/Random';
import PrimaryNavigationItem from './PrimaryNavigationItem';

class PrimaryNavigation extends React.Component {
	shouldComponentUpdate (nextProps, nextState) {
    return false;
  }

	render () {
		const { builderConfiguration } = this.props;
    const { primarynavigation, localization } = builderConfiguration;

    return (
      <ul className='ab-primarynav'>
        { _.map(primarynavigation, (navigationItem, i) => {
          return (
						<PrimaryNavigationItem
              key={Random.randomKey('pni')}
              target={i}
              language={localization}
              navigationItemInformation={navigationItem} />
					)
        }) }
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
