import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import _ from 'lodash';
import Tab from './Tab';
import SideTab from './SideTab';
import PrimaryNavigation from './PrimaryNavigation';
import Logo from '../Shared/Logo';
import Copyright from '../Miscellaneous/Copyright';

class AsideItem extends Component {
  render () {
    const { children } = this.props;

    return (
      <div className='ab-aside__item'>
        {children}
      </div>
    )
  }
}

class Aside extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    return false;
  }

  render () {
    const { builderConfiguration, cName } = this.props;
    const { tabs, sidetabs } = builderConfiguration;
    const asideClassName = cx('ab-aside', cName);

    return (
      <aside className={asideClassName} >
        <div className='ab-aside__itemwrapper'>
          <AsideItem>
            <Logo text='ABuilder'/>
            <PrimaryNavigation />
            <Copyright />
          </AsideItem>
          <AsideItem>
            {_.map(tabs, (tab, index) => {
              return (
                <Tab
                  data={tab}
                  targetIndex={index}
                  key={index} />
                )
            })}
            {_.map(sidetabs, (sidetab, index) => {
              return (
                <SideTab
                  data={sidetab}
                  key={index} />
                )
            })}
          </AsideItem>
        </div>
      </aside>
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
)(Aside);
