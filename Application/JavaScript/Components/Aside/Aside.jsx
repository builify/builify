import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import _ from 'lodash';
import Tab from './Tab';
import SideTab from './SideTab';
import PrimaryNavigation from './PrimaryNavigation';
import Logo from '../Shared/Logo';
import Copyright from '../Miscellaneous/Copyright';

class AsideItem extends React.Component {
  render () {
    const { children } = this.props;

    return (
      <div className='ab-aside__item'>
        {children}
      </div>
    );
  }
}

class Aside extends React.Component {
  shouldComponentUpdate () {
    return false;
  }

  renderTabs () {
    const { builderConfiguration } = this.props;
    const { tabs } = builderConfiguration;

    return _.map(tabs, (tab, index) => {
      return (
        <Tab
          data={tab}
          targetIndex={index}
          key={index} />
        );
    });
  }

  renderSideTabs () {
    const { builderConfiguration } = this.props;
    const { sidetabs } = builderConfiguration;

    return _.map(sidetabs, (sidetab, index) => {
      return (
        <SideTab
          data={sidetab}
          key={index} />
        );
    });
  }

  render () {
    const { cName } = this.props;
    const asideClassName = classNames('ab-aside', cName);

    return (
      <aside className={asideClassName} >
        <div className='ab-aside__itemwrapper'>
          <AsideItem>
            <Logo text='ABuilder'/>
            <PrimaryNavigation />
            <Copyright />
          </AsideItem>
          <AsideItem>
            { this.renderTabs() }
            { this.renderSideTabs() }
          </AsideItem>
        </div>
      </aside>
    );
  }
}

function mapStateToProps (state) {
  return {
    builderConfiguration: state.builderConfiguration
  };
}

export default connect(mapStateToProps)(Aside);
