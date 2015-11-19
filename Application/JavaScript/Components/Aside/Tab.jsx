import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { closeTab, openSidetab } from '../../Actions';
import { randomKey } from '../../Common/Common';
import _ from 'lodash';
import proccessChildrenData from '../../Common/ProccessTabChildren';
import ProccessedChildrenRender from '../Shared/ProccessedChildrenRender';
import BackButton from '../Shared/BackButton';
import Scrollbar from '../Shared/Scrollbar';

class Tab extends ProccessedChildrenRender {
  static propTypes = {
    data: PropTypes.object,
    targetIndex: PropTypes.number
  }

  static defaultProps = {
    data: {},
    targetIndex: 0
  }

  constructor (props) {
    super(props);

    this.childrenToRender = [];
  }

  closeTab (e) {
    return closeTab();
  }

  render () {
    const { data, targetIndex } = this.props;
    this.childrenToRender = proccessChildrenData(data);

    return (
      <div
        className='ab-tab'
        data-target={targetIndex}>
        <Scrollbar aside={true}>
          <BackButton clickFunction={this.closeTab} />
          <h1>{data.title}</h1>
          {_.map(this.childrenToRender, item => {
            return this.renderChildren(item);
          })}
        </Scrollbar>
      </div>
    )
  }
}

export default Tab;
