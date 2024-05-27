// redux/reducer/notificationsReducer.js
import { NEW_APPOINTMENT_NOTIFICATION, APPOINTMENT_STATUS_CHANGED } from '../action/actionTypes';

const initialState = {
  notifications: []
};

const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_APPOINTMENT_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      };
    case APPOINTMENT_STATUS_CHANGED:
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload.id ? { ...notification, ...action.payload } : notification
        )
      };
    default:
      return state;
  }
};

export default notificationsReducer;
