import React, { Component, PropTypes } from 'react';
import { closeSidetab } from '../../Actions/ActionCreators';
import { getString } from '../../Common/Localization';
import _ from 'lodash';
import proccessChildrenData from '../../Common/ProccessTabChildren';
import BackButton from '../Shared/BackButton.jsx';
import ProccessedChildrenRender from '../Shared/ProccessedChildrenRender.jsx';
import Scrollbar from '../Shared/Scrollbar.jsx';

class SideTab extends ProccessedChildrenRender {
  static propTypes = {
    data: PropTypes.object
  }

  static defaultProps = {
    data: {}
  }

  constructor (props) {
    super(props);

    this.childrenToRender = [];
  }

  closeSidetab () {
    return closeSidetab();
  }

  render () {
    const { data } = this.props;

    this.childrenToRender = proccessChildrenData(data);

    return (
      <div
        className='ab-sidetab'
        data-sidetabid={data.id}>
        <Scrollbar>
          <BackButton clickFunction={this.closeSidetab} />
          <h1>{getString(data.title)}
            <span>{getString(data.subtitle)}</span>
          </h1>
          {_.map(this.childrenToRender, item => {
            return this.renderChildren(item);
          })}
        </Scrollbar>
      </div>
    )
  }
}

export default SideTab;
