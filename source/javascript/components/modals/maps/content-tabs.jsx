import React from 'react';
import PropTypes from 'prop-types';
import MapsTab from './tab-map';

export default class ContentTabs extends React.Component {
  static propTypes = {
    activeTab: PropTypes.number.isRequired
  };

  render () {
    const { activeTab } = this.props;

    if (activeTab === 1) {
      return <MapsTab />;
    }

    return null;
  }
}
