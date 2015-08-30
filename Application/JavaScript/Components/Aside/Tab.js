import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closeTab, openSidetab } from '../../Actions/ActionCreators';
import classNames from 'classnames';
import proccessChildrenData from '../../Common/ProccessTabChildren';
import ProccessedChildrenRender from '../Shared/ProccessedChildrenRender';
import BackButton from '../Shared/BackButton';

class Tab extends ProccessedChildrenRender {
  static propTypes = {
    data: PropTypes.object,
    targetIndex: PropTypes.number
  };

  static defaultProps = {
    data: {},
    targetIndex: 0
  };

  constructor (props) {
    super(props);

    this.childrenToRender = [];
  } 

  shouldComponentUpdate () {
    return false;
  }

  closeTab (e) {
    return closeTab();
  }

  render () {
    const { dispatch, data, builderConfiguration, theme, localization, targetIndex } = this.props;
    
    this.childrenToRender = proccessChildrenData(data);

    return (
      <div 
        className='ab-tab' 
        data-target={targetIndex}>
        <div className='ab-tab__wrapper'>
          <BackButton clickFunction={this.closeTab} />
          <h1>{data.title}</h1>
          {this.childrenToRender.length !== 0 ?
            this.childrenToRender.map((item, i) => {
              return this.renderChildren(item, theme, localization, builderConfiguration, dispatch, i);
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
    builder: state.builder,
    localization: state.localizationData
  };
}

export default connect(
  mapStateToProps
)(Tab);