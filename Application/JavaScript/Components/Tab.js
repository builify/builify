import React, { Component } from 'react';
import { connect } from 'redux/react';
import { bindActionCreators } from 'redux';
import { closeTab } from '../Actions/ActionCreators';

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
          <div 
            className='ab-tab__close'
            {...bindActionCreators({
              onClick: ::this.closeTab
            }, dispatch)}>
            <span>Go Back</span>
          </div>
          <h1>{data.title}</h1>
          {this.renderBlocks()}
        </div>
      </div>
    );
  }
};