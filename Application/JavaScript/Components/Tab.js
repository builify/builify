import React, { Component } from 'react';
import { connect } from 'redux/react';
import { bindActionCreators } from 'redux';
import { closeTab } from '../Actions/ActionCreators';

@connect(state => ({}))
export default class Tab extends Component {
  closeTab (e) {
    return closeTab();
  }

  render () {
    const { data, targetIndex, dispatch } = this.props;

    return (
      <div className='ab-tab' data-target={targetIndex} ref={'tab-' + targetIndex}>
      	<span
          {...bindActionCreators({
            onClick: ::this.closeTab
          }, dispatch)}>
          {'Close'}
        </span>
        <h1>{data.title}</h1>
      </div>
    );
  }
};