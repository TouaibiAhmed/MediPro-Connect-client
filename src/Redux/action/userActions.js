// redux/action/userActions.js
import { SET_USER_TYPE } from './actionTypes';


import { SET_SELECTED_DOCTOR_ID } from './actionTypes';

export const setUserType = (userType) => ({
  type: SET_USER_TYPE,
  payload: userType,
});






export const setSelectedDoctorId = (doctorId) => ({
  type: SET_SELECTED_DOCTOR_ID,
  payload: doctorId,
});
