import React, { Component } from 'react';
import { connect } from 'redux/react';
import { getString } from '../Common/Localization';
import classNames from 'classnames';

@connect(state => ({
  builderConfiguration: state.builderConfiguration,
  builder: state.builder,
  localization: state.localizationData
}))
export default class LoadingScreen extends Component {
  render () {
    return (
      <div className='ab-loadingScreen'>
        <div className='ab-loadingScreen__bg blue-purple'/>
        <div className='ab-loadingScreen__bg green-blue' />
        <div className='ab-loadingScreen__content'>
          <div className='ab-loadingScreen__progress-text'>
            The Builder is loading...
          </div>
          <span className="loader">
            <span className="loader-inner" />
          </span> 
        </div>
      </div>
    );
  }
};