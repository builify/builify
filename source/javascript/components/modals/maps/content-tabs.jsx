import React from 'react';
import MapsTab from './tab-map';

export default class ContentTabs extends React.Component {
  static propTypes = {
    activeTab: React.PropTypes.number.isRequired
  };

  render () {
    const { activeTab } = this.props;

    if (activeTab === 1) {
      return <MapsTab />;
    }

    return null;
  }
}
