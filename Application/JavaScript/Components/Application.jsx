import React from 'react';
import { Provider } from 'react-redux';
import { runApplicationActions } from '../Actions';
import Base from './Base';
import configureStore from '../Store/ConfigureStore';

export const store = configureStore();
store.dispatch(runApplicationActions());

export class Application extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Base />
      </Provider>
    );
  }
}
