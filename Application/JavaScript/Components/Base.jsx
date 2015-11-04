import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CurrentLocations } from '../Constants/Defines';
import { addNotification } from '../Actions/ActionCreators';
import cx from 'classnames';
import Aside from './Aside/Aside';
import Main from './Main/Main';
import NotificationContainer from './Notifications/Container';
import Dialog from './Shared/Dialog';
import LoadingScreen from './Shared/LoadingScreen';
import ColorPicker from './Shared/ColorPicker';

class Base extends Component {
  componentDidMount () {
  /*window.setTimeout(() => {
      this.refs.dialog.show();
    }, 500);*/
  }

  closeDialog () {
    this.refs.dialog.hide();
  }

  render () {
    const { builder, builderConfiguration} = this.props;
    const { currentLocation } = builder;
    const { defaultTheme } = builderConfiguration;
    const reactWrapClassname = cx('react-wrap', defaultTheme, currentLocation === CurrentLocations.PREVIEW ? 'preview' : '');
    const asideClassName = currentLocation === CurrentLocations.PREVIEW ? 'hidden' : '';
    let actions = [
      { label: "Cancel", onClick: ::this.closeDialog },
      { label: "Save", onClick: ::this.closeDialog }
    ];

    return (
      <div
        className={reactWrapClassname}>
        <LoadingScreen />
        <Aside cName={asideClassName} />
        <Main />
        <ColorPicker />
        <NotificationContainer />

      </div>
    )
  }
}
/*<Dialog ref='dialog' title='My awesome dialog' type='backgroundImage' actions={actions}>
  <p>Here you can add arbitrary content. Components like Pickers are using dialogs now.</p>
</Dialog>*/
function mapStateToProps (state) {
  return {
    builderConfiguration: state.builderConfiguration,
    builder: state.builder
  }
}

export default connect(
  mapStateToProps
)(Base);
