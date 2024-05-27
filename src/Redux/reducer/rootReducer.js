// redux/reducer/rootReducer.js

import { combineReducers } from 'redux';
import userReducer from './userReducer';
import authReducer from './authReducer'; // Import the authReducer

import notificationsReducer from './notificationsReducer';


const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer, // Add the authReducer to combineReducers

  notifications: notificationsReducer // Add the notifications reducer here

});

export default rootReducer;
