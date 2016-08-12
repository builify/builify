import React from 'react';
import _map from 'lodash/map';
import _has from 'lodash/has';
import classNames from '../../../common/classnames';
import Random from '../../../common/random';
import ContentTabs from './content-tabs';
import { connect } from 'react-redux';
import { defaultTabId, tabList } from './config';

class TabNavigation extends React.Component {
  state = {
    activeTab: defaultTabId
  };

  shouldComponentUpdate (nextProps, nextState) {
    if (nextState.activeTab !== this.state.activeTab) {
      return true;
    }

    return false;
  }

  renderTabNavigation () {
    const { activeTab } = this.state;
    const tabClick = (id) => {
      this.setState({
        activeTab: id
      });
    };

    if (!tabList) {
      return null;
    }

    return _map(tabList, (tab) => {
      const { id } = tab;
      const className = classNames('modal__tablabel', {
        'active': id === activeTab
      });
      let { label } = tab;

      return (
        <div key={Random.randomKey('tab')} className={className} onClick={() => { tabClick(id); }}>
          <span>{ label }</span>
        </div>
      );
    });
  }

  render () {
    const { activeTab } = this.state;
    const title = 'Map Editor';

    return (
      <div>
        <header className={classNames('modal__tabs')}>
          <h2>{ title }</h2>
          <nav>
            { this.renderTabNavigation() }
          </nav>
        </header>
        <ContentTabs
          activeTab={activeTab} />
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    builder: state.builder,
    assets: state.assets
  };
}

export default connect(mapStateToProps)(TabNavigation);
