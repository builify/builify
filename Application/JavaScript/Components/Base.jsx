import React from 'react';
import { connect } from 'react-redux';
import { CurrentLocations } from '../Constants';
import { addNotification } from '../Actions';
import ClassNames from 'classnames';
import Aside from './Aside/Aside';
import Main from './Main/Main';
import LoadingScreen from './Shared/LoadingScreen';
import ColorPicker from './Shared/ColorPicker';
import DialogContainer from './Containers/Dialog';
import NotificationContainer from './Containers/Notifications';

class Base extends React.Component {
  render () {
    const { builder, builderConfiguration} = this.props;
    const { currentLocation } = builder;
    const { defaultTheme } = builderConfiguration;
    const isPreviewModeActive = currentLocation === CurrentLocations.PREVIEW ? true : false;
    const reactWrapClassname = ClassNames('react-wrap', defaultTheme, isPreviewModeActive ? 'preview' : '');
    const asideClassName = isPreviewModeActive ? 'hidden' : '';

    return (
      <div className={reactWrapClassname}>
        <Aside cName={asideClassName} />
        <Main />

        <LoadingScreen />
        <ColorPicker />

        <DialogContainer />
        <NotificationContainer />
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    builderConfiguration: state.builderConfiguration,
    builder: state.builder
  }
}

export default connect(mapStateToProps)(Base);
