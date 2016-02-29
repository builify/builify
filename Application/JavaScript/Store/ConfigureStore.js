import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from '../Middleware/Logger';
import allReducers from '../Reducers/Index';

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
)(createStore);

export default function configureStore (initialState) {
  return createStoreWithMiddleware(allReducers, initialState);
}
