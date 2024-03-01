// redux/action/userActions.js
import { SET_USER_TYPE } from './actionTypes';

export const setUserType = (userType) => ({
  type: SET_USER_TYPE,
  payload: userType,
});
