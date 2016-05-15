import React from 'react';
import _map from 'lodash/map';
import Random from '../../../common/random';
import NavigationItem from './item';
import { connect } from 'react-redux';

class PrimaryNavigation extends React.Component {
  renderNavigationItems (navigation, currentLocation) {
    return _map(navigation, (item) => {
      const { id, title, icon, onClick } = item;

      return (
        <NavigationItem
          key={Random.randomKey('navigation-item')}
          id={id}
          title={title}
          icon={icon}
          onClick={onClick}
          currentLocation={currentLocation} />
      );
    });
  }

  render () {
    const { builder, builderConfiguration } = this.props;
    const { navigation } = builderConfiguration;
    const { currentLocation } = builder;

    return (
      <ul className='ab-primarynav'>
        { this.renderNavigationItems(navigation, currentLocation) }
      </ul>
    );
  }
}

function mapStateToProps (state) {
  return {
    builderConfiguration: state.builderConfiguration,
    builder: state.builder
  };
}

export default connect(mapStateToProps)(PrimaryNavigation);
