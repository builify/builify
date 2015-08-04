import React, { Component } from 'react';
import { connect } from 'redux/react';

@connect(state => ({
  builder: state.builder
}))
export default class Canvas extends Component {
  render () {
    return (
      <div className='ab-canvas'>
        <iframe src="http://ironsummitmedia.github.io/startbootstrap-agency/" />
      </div>
    );
  }
};