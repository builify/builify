import React from 'react';
import { connect } from 'redux/react';
import Logo from './Logo';

@connect(() => ({}))
export default class Aside {
  render () {
    return (
      <aside className='ab-aside'>
        <Logo />
      </aside>
    );
  }
};