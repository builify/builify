import React from 'react';
import classNames from 'classnames';
import Aside from './aside';
import Main from './main';
import LoadingScreen from './loading-screen';
import ColorPicker from './shared/color-picker';
import Modals from './modals';
import NotificationContainer from './notifications';
import Upperbar from './upperbar';
import { connect } from 'react-redux';

class Base extends React.Component {
  static propTypes = {
    defaultTheme: React.PropTypes.string.isRequired
  };

  shouldComponentUpdate () {
    return false;
  }

  render () {
    const className = classNames('react-wrap', this.props.defaultTheme);

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
  const { builderConfiguration } = state;
  const { defaultTheme } = builderConfiguration;

  return {
    defaultTheme: defaultTheme
  };
}

export default connect(mapStateToProps)(Base);
