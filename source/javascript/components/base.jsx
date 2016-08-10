import React from 'react';
import classNames from '../common/classnames';
import Aside from './aside';
import Main from './main';
import LoadingScreen from './loading-screen';
import ColorPicker from './shared/color-picker';
import Modals from './modals';
import NotificationContainer from './notifications';
import Upperbar from './upperbar';
import FeedBack from './feedback';
import { connect } from 'react-redux';
import { IS_DEMO_VERSION, BUY_LINK } from '../constants';

class Base extends React.Component {
  static propTypes = {
    defaultTheme: React.PropTypes.string.isRequired
  };

  shouldComponentUpdate () {
    return false;
  }

  render () {
    const className = classNames(null, 'react-wrap', this.props.defaultTheme);
    const SaleButton = () => {
      return (
        <a href={BUY_LINK} target='_blank' className={classNames('salebutton')}>
          <span>Buy Now</span>
        </a>
      );
    };

    return (
      <div className={className}>
        <Aside />
        <Upperbar />
        <Main />
        <LoadingScreen />
        <ColorPicker />
        <Modals />
        <NotificationContainer />
        <FeedBack />
        { IS_DEMO_VERSION && <SaleButton /> }
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
