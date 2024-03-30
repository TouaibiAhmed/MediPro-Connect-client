// redux/reducer/rootReducer.js

import { combineReducers } from 'redux';
import userReducer from './userReducer';
import authReducer from './authReducer'; // Import the authReducer

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer, // Add the authReducer to combineReducers
});

export default rootReducer;
