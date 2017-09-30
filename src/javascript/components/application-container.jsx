import React from 'react';
import { Provider } from 'react-redux';
import Base from './base';
import Events from '../events';
import configureStore from '../store/configure-store';
import { runApplicationActions } from '../actions';

// Set up store
export const store = configureStore();

// Initialize application logic
store.dispatch(runApplicationActions());

// Initialize events
export const events = new Events(store.dispatch);

export function ApplicationContainer () {
    return (
        <Provider store={store}>
            <Base />
        </Provider>
    );
}
