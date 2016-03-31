import React from 'react';
import { closeSidetab } from '../../Actions';
import { getString } from '../../Common/Localization';
import _ from 'lodash';
import proccessChildrenData from '../../Common/ProccessTabChildren';
import BackButton from '../Shared/BackButton';
import ProccessedChildrenRender from '../Shared/ProccessedChildrenRender';
import Scrollbar from '../Shared/Scrollbar';

export default class SideTab extends ProccessedChildrenRender {
  static propTypes = {
    data: React.PropTypes.object.isRequired
  };

  childrenToRender = [];

  componentWillMount () {
    const { data } = this.props;

    this.childrenToRender = proccessChildrenData(data);
  }

  closeSidetab () {
    return closeSidetab();
  }

  children () {
    return _.map(this.childrenToRender, item => {
      return this.renderChildren(item);
    });
  }

  render () {
    const { data } = this.props;

    return (
      <div
        className='ab-sidetab'
        data-sidetabid={data.id}>
        <Scrollbar
          aside
          innerPadding>
          <BackButton clickFunction={this.closeSidetab} />
          <h1 className='ab-sidetab__title'>
            <span>{getString(data.title)}</span>
            <span>{getString(data.subtitle)}</span>
          </h1>
          { this.children() }
        </Scrollbar>
      </div>
    );
  }
}
