import React from 'react';
import { connect } from 'redux/react';
import Aside from './Aside';
import Main from './Main';

@connect(state => ({
    data: state.builderConfiguration
}))
export default class Base {
  render() {
    const { data } = this.props;

    return (
      <div className='react-wrap'>
        <Aside />
        <Main />
       </div>
    );
  }
}
