import React, { Component } from 'react';
import { createRedux } from 'redux';
import { Provider } from 'redux/react';
import * as stores from '../Stores/Index';
import * as ActionCreators from '../Actions/ActionCreators';
import Base from '../Components/Base';

const redux = createRedux(stores);
redux.dispatch(ActionCreators.getABuilderConfiguration());
redux.dispatch(ActionCreators.getLocalizationFile());

export default class Application extends Component {
  render() {
    return (
      <Provider redux={redux}>
        {() => <Base />}
      </Provider>
    );
  }
}