import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { runApplicationActions } from '../Actions';
import Base from './Base';
import ConfigureStore from '../Store/ConfigureStore';

export const store = ConfigureStore();
store.dispatch(runApplicationActions());

export class Application extends Component {
  render() {
    return (
      <Provider store={store}>
        <Base />
      </Provider>
    );
  }
}
