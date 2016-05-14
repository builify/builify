import React from 'react';
import { Provider } from 'react-redux';
import { runApplicationActions } from '../actions';
import Base from './base';
import configureStore from '../store/configure-store';

export const store = configureStore();
store.dispatch(runApplicationActions());

export class ApplicationContainer extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Base />
      </Provider>
    );
  }
}
