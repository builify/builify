import React, { Component } from 'react';
import { createRedux } from 'redux';
import { Provider } from 'redux/react';
import * as stores from '../Stores/Index';
import * as ActionCreators from '../Actions/Index';
import Base from '../Components/Base';

console.log(ActionCreators);
const redux = createRedux(stores);
redux.dispatch(ActionCreators.builderConfigrationActions.getABuilderConfiguration());
redux.dispatch(ActionCreators.localizationActions.getLocalizationFile());

export default class Application extends Component {
  render() {
    return (
      <Provider redux={redux}>
        {() => <Base />}
      </Provider>
    );
  }
}