import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from '../middleware/logger';
import throttleMiddleware from '../middleware/throttle';
import allReducers from '../reducers';
import { createStore, applyMiddleware } from 'redux';

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware,
  throttleMiddleware
)(createStore);

export default function configureStore (initialState) {
  return createStoreWithMiddleware(allReducers, initialState);
}
