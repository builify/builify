import React, { Component } from 'react';
import { connect } from 'redux/react';
import Logo from './Logo';
import PrimaryNavigation from './PrimaryNavigation';
import Tab from './Tab';

@connect(state => ({
  builderConfiguration: state.builderConfiguration
}))
export default class Aside extends Component {
  render () {
    const { tabs } = this.props.builderConfiguration;

    return (
      <aside className='ab-aside'>
        <div className='ab-aside__itemwrapper'>
          <div className='ab-aside__item'>
            <Logo text='ABuilder'/>
            <PrimaryNavigation />
          </div>
          <div className='ab-aside__item'>
            {tabs.map((tab, index) => {
              return <Tab data={tab} targetIndex={index} key={index}/>
            })}
          </div>
        </div>
      </aside>
    );
  }
};