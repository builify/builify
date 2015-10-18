import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closeSidetab } from '../../Actions/ActionCreators';
import { getString } from '../../Common/Localization';
import classNames from 'classnames';
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
    const { dispatch, data, builderConfiguration, theme, localization, builder } = this.props;

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
          {this.childrenToRender.length !== 0 ?
            this.childrenToRender.map((item, i) => {
              return this.renderChildren(item, theme, localization, builderConfiguration, dispatch, builder, i);
            }) : false
          }
        </Scrollbar>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    builderConfiguration: state.builderConfiguration,
    builder: state.builder,
    localization: state.localization,
    theme: state.theme
  }
}

export default connect(
  mapStateToProps
)(SideTab);
