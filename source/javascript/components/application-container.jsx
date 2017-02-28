import React from 'react';
import { Provider } from 'react-redux';
import Base from './base';
import Events from '../events';
import configureStore from '../store/configure-store';
import { runApplicationActions } from '../actions';

export const store = configureStore();
store.dispatch(runApplicationActions());
export const events = new Events(store.dispatch);

export function ApplicationContainer () {
  return (
    <Provider store={store}>
      <Base />
    </Provider>
  );
}
