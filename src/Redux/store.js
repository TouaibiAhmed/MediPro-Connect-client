//store.js
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducer/rootReducer';
import { thunk } from 'redux-thunk';
import socketMiddleware from './socketMiddleware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk, socketMiddleware())
    )
);
