import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import Logo from '../Shared/Logo.jsx';
import Tab from './Tab.jsx';
import SideTab from './SideTab.jsx';
import PrimaryNavigation from './PrimaryNavigation.jsx';

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
          <div className='ab-aside__item'>
            <Logo text='ABuilder'/>
            <PrimaryNavigation />
          </div>
          <div className='ab-aside__item'>
            {tabs.map((tab, index) => {
              return <Tab data={tab} targetIndex={index} key={index}/>
            })}
            {sidetabs.map((sidetab, index) => {
              return <SideTab data={sidetab} key={index} />
            })}
          </div>
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
