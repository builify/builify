import React, { Component, PropTypes } from 'react';
import { connect } from 'redux/react';
import { bindActionCreators } from 'redux';
import { closeSidetab } from '../Actions/ActionCreators';
import classNames from 'classnames';
import BackButton from './BackButton';

@connect(state => ({
  builderConfiguration: state.builderConfiguration,
  builder: state.builder,
  localization: state.localizationData
}))
export default class SideTab extends Component {
  static propTypes = {
    data: PropTypes.object
  };

  static defaultProps = {
    data: {}
  };

  closeSidetab () {
    return closeSidetab();
  }

  render () {
    const { data } = this.props;

    return (
      <div 
        className='ab-sidetab'
        data-sidetabid={data.id}>
        <div className='ab-sidetab__wrapper'>
          <BackButton clickFunction={this.closeSidetab} />
          <h1>{data.title}<span>{data.subtitle}</span></h1>
        </div>
      </div>
    );
  }
};