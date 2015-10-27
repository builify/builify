import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { closeTab, openSidetab } from '../../Actions/ActionCreators';
import { randomKey } from '../../Common/Common';
import _ from 'lodash';
import proccessChildrenData from '../../Common/ProccessTabChildren';
import ProccessedChildrenRender from '../Shared/ProccessedChildrenRender.jsx';
import BackButton from '../Shared/BackButton.jsx';
import Scrollbar from '../Shared/Scrollbar.jsx';

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
    const scrollbarKey = randomKey('scrollbar');

    this.childrenToRender = proccessChildrenData(data);

    return (
      <div
        className='ab-tab'
        data-target={targetIndex}>
        <Scrollbar key={scrollbarKey}>
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
