import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { getABuilderConfiguration } from '../Actions/ActionCreators';
import Base from '../Components/Base';
import configureStore from '../Store/ConfigureStore';

const store = configureStore();
store.dispatch(getABuilderConfiguration());

export default class Application extends Component {
  render() {
  	return (
      <Provider store={store}>
        {() => <Base />}
      </Provider>
    );
  } 
};