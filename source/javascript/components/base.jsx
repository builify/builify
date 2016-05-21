import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Aside from './aside';
import Main from './main';
import LoadingScreen from './loading-screen';
import ColorPicker from './shared/color-picker';
import Modals from './modals';
import NotificationContainer from './notifications';
import Upperbar from './upperbar';

class Base extends React.Component {
  static propTypes = {
    builderConfiguration: React.PropTypes.object.isRequired
  };

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
        <Upperbar />
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
