import { connect } from 'react-redux';
import React from 'react';
import _ from 'lodash';
import Random from '../../../Common/Random';
import NavigationItem from './NavigationItem';

class PrimaryNavigation extends React.Component {
  renderNavigationItems (navigation) {
    return _.map(navigation, (item) => {
      const { id, title, icon, onClick } = item;

      return (
        <NavigationItem
          key={Random.randomKey('nvi')}
          id={id}
          title={title}
          icon={icon}
          onClick={onClick} />
      );
    });
  }

  render () {
    const { builderConfiguration } = this.props;
    const { navigation } = builderConfiguration;

    return (
      <ul className='ab-primarynav'>
        { this.renderNavigationItems(navigation) }
      </ul>
    );
  }
}

function mapStateToProps (state) {
  return {
    builderConfiguration: state.builderConfiguration
  };
}

export default connect(mapStateToProps)(PrimaryNavigation);
