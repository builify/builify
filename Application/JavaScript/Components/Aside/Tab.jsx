import React from 'react';
import { closeTab } from '../../Actions';
import _ from 'lodash';
import proccessChildrenData from '../../Common/ProccessTabChildren';
import ProccessedChildrenRender from '../Shared/ProccessedChildrenRender';
import BackButton from '../Shared/BackButton';
import Scrollbar from '../Shared/Scrollbar';

export default class Tab extends ProccessedChildrenRender {
  static propTypes = {
    data: React.PropTypes.object,
    targetIndex: React.PropTypes.number
  };

  static defaultProps = {
    data: {},
    targetIndex: 0
  };

  childrenToRender = [];

  componentWillMount () {
    const { data } = this.props;

    this.childrenToRender = proccessChildrenData(data);
  }

  closeTab () {
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
