import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { closeTab, openSidetab } from '../../Actions';
import { randomKey } from '../../Common/Common';
import _ from 'lodash';
import proccessChildrenData from '../../Common/ProccessTabChildren';
import ProccessedChildrenRender from '../Shared/ProccessedChildrenRender';
import BackButton from '../Shared/BackButton';
import Scrollbar from '../Shared/Scrollbar';

export default class Tab extends ProccessedChildrenRender {
  static propTypes = {
    data: PropTypes.object,
    targetIndex: PropTypes.number
  }

  static defaultProps = {
    data: {},
    targetIndex: 0
  }

  childrenToRender = [];

  componentWillMount () {
    const { data } = this.props;

    this.childrenToRender = proccessChildrenData(data);
  }

  closeTab (e) {
    return closeTab();
  }

  children () {
    return _.map(this.childrenToRender, item => {
      return this.renderChildren(item);
    });
  }

  render () {
    const { data, targetIndex } = this.props;

    return (
      <div
        className='ab-tab'
        data-target={targetIndex}>
        <Scrollbar
          aside
          innerPadding>
          <BackButton clickFunction={this.closeTab} />
          <h1>{data.title}</h1>
          { this.children() }
        </Scrollbar>
      </div>
    );
  }
}
