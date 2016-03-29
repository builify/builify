import React from 'react';
import { connect } from 'react-redux';
import { CurrentLocations } from '../Constants';
import classNames from 'classnames';
import Aside from './Aside/Aside';
import Main from './Main/Main';
import LoadingScreen from './Shared/LoadingScreen';
import ColorPicker from './Shared/ColorPicker';
import DialogContainer from './Containers/Dialog';
import NotificationContainer from './Notifications';

class Base extends React.Component {
  shouldComponentUpdate () {
    return false;
  }

  componentDidMount () {
    for (let i = 0; i < 5; i++) {
      window.setTimeout(() => {
        this.refs.notificationSystem.addNotification({
          message: 'Notification message',
          level: 'success',
          position: 'br'
        });
      }, 1000 * i);
    }

  }

  render () {
    const { builder, builderConfiguration } = this.props;
    const { currentLocation } = builder;
    const { defaultTheme } = builderConfiguration;
    const isPreviewModeActive = currentLocation === CurrentLocations.PREVIEW ? true : false;
    const reactWrapClassname = classNames(
      'react-wrap',
      defaultTheme,
      isPreviewModeActive ? 'preview' : ''
    );
    const asideClassName = isPreviewModeActive ? 'hidden' : '';

    return (
      <div className={reactWrapClassname}>
        <Aside cName={asideClassName} />
        <Main />

        <LoadingScreen />
        <ColorPicker />

        <DialogContainer />
        <NotificationContainer ref='notificationSystem' />
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    builderConfiguration: state.builderConfiguration,
    builder: state.builder
  };
}

export default connect(mapStateToProps)(Base);
