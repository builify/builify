import React, { Component } from 'react';
import { connect } from 'redux/react';

@connect(state => ({
  builder: state.builder,
}))
export default class LoadingScreen extends Component {
  render () {
    return (
      <h1>Loading</h1>
    );
  }
};