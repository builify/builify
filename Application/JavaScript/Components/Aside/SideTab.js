import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closeSidetab } from '../../Actions/ActionCreators';
import classNames from 'classnames';
import proccessChildrenData from '../../Common/ProccessTabChildren';
import BackButton from '../Shared/BackButton';
import NumberPicker from '../Shared/NumberPicker';
import ProccessedChildrenRender from '../Shared/ProccessedChildrenRender';

class SideTab extends ProccessedChildrenRender {
  static propTypes = {
    data: PropTypes.object
  };

  static defaultProps = {
    data: {}
  };

  constructor (props) {
    super(props);

    this.childrenToRender = [];
  }

  shouldComponentUpdate (nextProps, nextState) {
    return false;
  }

  closeSidetab () {
    return closeSidetab();
  }

  render () {
    const { data, builderConfiguration, theme, localization } = this.props;

    this.childrenToRender = proccessChildrenData(data);

    return (
      <div 
        className='ab-sidetab'
        data-sidetabid={data.id}>
        <div className='ab-sidetab__wrapper'>
          <BackButton clickFunction={this.closeSidetab} />
          <h1>{data.title}<span>{data.subtitle}</span></h1>
          {this.childrenToRender.length !== 0 ?
            this.childrenToRender.map((item, i) => {
              return this.renderChildren(item, theme, localization, builderConfiguration, i);
            }) : false
          }
        </div>
      </div>
    );
  }
};

function mapStateToProps (state) {
  return {
    builderConfiguration: state.builderConfiguration,
    localization: state.localization,
    theme: state.theme
  };
}

export default connect(
  mapStateToProps
)(SideTab);