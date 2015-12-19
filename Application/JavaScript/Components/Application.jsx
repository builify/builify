import React from 'react';
import { Provider } from 'react-redux';
import { runApplicationActions } from '../Actions';
import Base from './Base';
import ConfigureStore from '../Store/ConfigureStore';
import TPStylesheet from '../TPStylesheet';

const Stylesheet = new TPStylesheet();

export const store = ConfigureStore();
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
