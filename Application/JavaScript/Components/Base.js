import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CurrentLocationEnum } from '../Constants/Enums';
import { addNotification } from '../Actions/ActionCreators';
import classNames from 'classnames';
import ColorPicker from 'react-color';
import Aside from './Aside/Aside';
import Main from './Main/Main';
import LoadingScreen from './Shared/LoadingScreen';
import Notifications from './Notifications/Notifications';

class Base extends Component {
  render () {
    const { builder, builderConfiguration} = this.props;
    const { currentLocation } = builder;
    const { defaultTheme } = builderConfiguration;
    const reactWrapClassname = classNames('react-wrap', defaultTheme, currentLocation === CurrentLocationEnum.PREVIEW ? 'preview' : '');
    const asideClassName = currentLocation === CurrentLocationEnum.PREVIEW ? 'hidden' : '';

    return (
      <div className={reactWrapClassname}>
        <LoadingScreen />
        <Aside cName={asideClassName} /> 
        <Main />
        <Notifications />
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