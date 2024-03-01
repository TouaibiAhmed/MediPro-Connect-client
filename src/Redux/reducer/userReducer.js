// redux/reducer/userReducer.js
import { SET_USER_TYPE } from '../action/actionTypes';

const initialState = {
  userType: 'patient', // Default user type
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_TYPE:
      return {
        ...state,
        userType: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
