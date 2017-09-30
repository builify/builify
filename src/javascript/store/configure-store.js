import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import throttleMiddleware from '../middleware/throttle';
import allReducers from '../reducers';

export default function configureStore(initialState) {
    const middleware = [thunkMiddleware, throttleMiddleware];

    const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

    return createStoreWithMiddleware(allReducers, initialState);
}
