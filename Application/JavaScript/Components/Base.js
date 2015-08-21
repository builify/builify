import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CurrentLocationEnum } from '../Constants/Enums';
import classNames from 'classnames';
import Aside from './Aside';
import Main from './Main';
import LoadingScreen from './LoadingScreen';

class Base extends Component {
  render() {
    const { currentLocation, isLoadingScreenActive } = this.props.builder;
    const reactWrapClassname = classNames('react-wrap', currentLocation === CurrentLocationEnum.PREVIEW ? 'preview' : '');
    const asideClassName = currentLocation === CurrentLocationEnum.PREVIEW ? 'hidden' : '';

    if (isLoadingScreenActive) {
      return (
        <div className={reactWrapClassname}>
          <LoadingScreen />
        </div>
      );
    } else { 
      return (
        <div className={reactWrapClassname}>
          <Aside cName={asideClassName} /> 
          <Main />
         </div>
      );
    }
  }
}

function mapStateToProps (state) {
  return {
    builder: state.builder
  };
}

export default connect(mapStateToProps)(Base);



