import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CurrentLocationEnum } from '../Constants/Enums';
import classNames from 'classnames';
import Aside from './Aside/Aside';
import Main from './Main/Main';
import LoadingScreen from './Shared/LoadingScreen';

class Base extends Component {
  render() {
    const { currentLocation } = this.props.builder;
    const { defaultTheme } = this.props.builderConfiguration;
    const reactWrapClassname = classNames('react-wrap', 
      defaultTheme, 
      currentLocation === CurrentLocationEnum.PREVIEW ? 'preview' : '');
    const asideClassName = currentLocation === CurrentLocationEnum.PREVIEW ? 'hidden' : '';
    const isLoadingScreen = currentLocation === CurrentLocationEnum.LOADINGSCREEN ? true : false;
    
    return (
      <div className={reactWrapClassname}>
        {isLoadingScreen ? <LoadingScreen /> : null}
        <Aside cName={asideClassName} /> 
        <Main />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    builderConfiguration: state.builderConfiguration,
    builder: state.builder
  };
}

export default connect(
  mapStateToProps
)(Base);