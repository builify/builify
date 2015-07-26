import React, { Component } from 'react';
import { connect } from 'redux/react';

@connect(state => ({
  builder: state.builder
}))
export default class Canvas extends Component {
  render () {
    return (
      <h1>Canvas</h1>
    );
  }
};