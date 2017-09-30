import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from '../common/classnames';
import Aside from './aside';
import Main from './main';
import LoadingScreen from './loading-screen';
import ColorPicker from './shared/color-picker';
import Modals from './modals';
import NotificationContainer from './notifications';
import Upperbar from './upperbar';
import { IS_DEMO_VERSION, BUY_LINK } from '../constants';

function SaleButton () {
  return (
    <a href={BUY_LINK} target={'_blank'} rel={'noopener noreferrer'} className={classNames('salebutton')}>
      <span>Buy Now</span>
    </a>
  );
}

function Base ({
  defaultTheme
}) {
  const className = classNames(null, 'react-wrap', defaultTheme);

  return (
    <div className={className}>
      <Aside />
      <Upperbar />
      <Main />
      <LoadingScreen />
      <ColorPicker />
      <Modals />
      <NotificationContainer />

      { IS_DEMO_VERSION && <SaleButton /> }
    </div>
  );
}

Base.propTypes = {
  defaultTheme: PropTypes.string.isRequired
};

function mapStateToProps (state) {
  const { builderConfiguration } = state;
  const { defaultTheme } = builderConfiguration;

  return {
    defaultTheme: defaultTheme || 'light'
  };
}

export default connect(mapStateToProps)(Base);
