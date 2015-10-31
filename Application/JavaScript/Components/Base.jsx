import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CurrentLocations } from '../Constants/Defines';
import { addNotification } from '../Actions/ActionCreators';
import cx from 'classnames';
import Aside from './Aside/Aside.jsx';
import Main from './Main/Main.jsx';
import NotificationContainer from './Notifications/Container.jsx';
import DialogContainer from './Dialog/Container.jsx';
import LoadingScreen from './Shared/LoadingScreen.jsx';
import ColorPicker from './Shared/ColorPicker.jsx';

class Base extends Component {
  render () {
    const { builder, builderConfiguration} = this.props;
    const { currentLocation } = builder;
    const { defaultTheme } = builderConfiguration;
    const reactWrapClassname = cx('react-wrap', defaultTheme, currentLocation === CurrentLocations.PREVIEW ? 'preview' : '');
    const asideClassName = currentLocation === CurrentLocations.PREVIEW ? 'hidden' : '';

    return (
      <div
        className={reactWrapClassname}>
        <LoadingScreen />
        <Aside cName={asideClassName} />
        <Main />
        <ColorPicker />
        <NotificationContainer />
        <DialogContainer />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    builderConfiguration: state.builderConfiguration,
    builder: state.builder
  }
}

export default connect(
  mapStateToProps
)(Base);
