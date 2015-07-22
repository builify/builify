import React from 'react';
import { connect } from 'redux/react';
import Logo from './Logo';
import PrimaryNavigation from './PrimaryNavigation';

@connect(() => ({}))
export default class Aside {
  render () {
    return (
      <aside className='ab-aside'>
        <div className='ab-aside__itemwrapper'>
          <div className='ab-aside__item'>
            <Logo text='ABuilder'/>
            <PrimaryNavigation />
          </div>
        </div>
      </aside>
    );
  }
};