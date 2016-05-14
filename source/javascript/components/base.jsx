import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Aside from './aside';
import Main from './main';
import LoadingScreen from './loading-screen';
import ColorPicker from './shared/ColorPicker';
import Modals from './modals';
import NotificationContainer from './notifications';

class Base extends React.Component {
  shouldComponentUpdate () {
    return false;
  }

  render () {
    const { builderConfiguration } = this.props;
    const { defaultTheme } = builderConfiguration;
    const className = classNames('react-wrap', defaultTheme);

    return (
      <div className={className}>
        <Aside />
        <Main />
        <LoadingScreen />
        <ColorPicker />
        <Modals />
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
