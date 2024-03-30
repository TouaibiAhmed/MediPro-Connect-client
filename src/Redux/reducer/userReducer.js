// redux/reducer/userReducer.js
import { SET_USER_TYPE } from '../action/actionTypes';
import { SET_SELECTED_DOCTOR_ID } from '../action/actionTypes'; 

const initialState = {
  userType: 'patient',
  selectedDoctorId: null, 
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_TYPE:
      return {
        ...state,
        userType: action.payload,
      };
    case SET_SELECTED_DOCTOR_ID: 
      return {
        ...state,
        selectedDoctorId: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
