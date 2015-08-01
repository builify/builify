import React, { Component } from 'react';
import { connect } from 'redux/react';
import { bindActionCreators } from 'redux';
import { closeTab } from '../Actions/ActionCreators';
import BackButton from './BackButton';

@connect(state => ({}))
export default class Tab extends Component {
  closeTab (e) {
    return closeTab();
  }

  renderBlocks () {
    return (
      <h2>Body Color Scheme</h2>
    );
  }

  render () {
    const { data, targetIndex, dispatch } = this.props;

    return (
      <div 
        className='ab-tab' 
        data-target={targetIndex} 
        ref={'tab-' + targetIndex}>
        <div className='ab-tab__wrapper'>
          <BackButton clickFunction={this.closeTab} />
          <h1>{data.title}</h1>
          {this.renderBlocks()}
        </div>
      </div>
    );
  }
};