import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { runApplicationActions } from '../Actions/ActionCreators';
import Base from './Base';
import configureStore from '../Store/ConfigureStore';

const store = configureStore();
store.dispatch(runApplicationActions());

export default class Application extends Component {
  render() {
  	return (
      <Provider store={store}>
        {() => <Base />}
      </Provider>
    );
  } 
};