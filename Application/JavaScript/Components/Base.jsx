import React from 'react';
import { connect } from 'react-redux';
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

  render () {
    const { builderConfiguration } = this.props;
    const { defaultTheme } = builderConfiguration;
    const className = classNames( 'react-wrap', defaultTheme);

    return (
      <div className={className}>
        <Aside/>
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
    builderConfiguration: state.builderConfiguration
  };
}

export default connect(mapStateToProps)(Base);
