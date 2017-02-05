import React from 'react';
import Base from './base';
import Events from '../events';
import configureStore from '../store/configure-store';
import { Provider } from 'react-redux';
import { runApplicationActions } from '../actions';

export const store = configureStore();
store.dispatch(runApplicationActions());
export const events = new Events(store.dispatch);

export class ApplicationContainer extends React.Component {
  shouldComponentUpdate () {
    return false;
  }

  render() {
    return (
      <Provider store={store}>
        <Base />
      </Provider>
    );
  }
}
