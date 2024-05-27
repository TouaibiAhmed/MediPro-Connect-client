//socketMiddleware.js
import io from 'socket.io-client';
import { CONNECT_SOCKET, DISCONNECT_SOCKET, NEW_APPOINTMENT_NOTIFICATION, APPOINTMENT_STATUS_CHANGED } from '../Redux/action/actionTypes';

const socketMiddleware = () => {
    let socket = null;

    const onEvent = (dispatch) => {
        socket.on('newAppointmentNotification', (data) => {
            dispatch({ type: NEW_APPOINTMENT_NOTIFICATION, payload: data });
        });

        socket.on('appointmentStatusChanged', (data) => {
            dispatch({ type: APPOINTMENT_STATUS_CHANGED, payload: data });
        });
    };

    return ({ dispatch }) => next => action => {
        switch (action.type) {
            case CONNECT_SOCKET:
                if (socket !== null) {
                    socket.disconnect();
                }
                socket = io('http://localhost:3000');
                onEvent(dispatch);
                break;
            case DISCONNECT_SOCKET:
                if (socket !== null) {
                    socket.disconnect();
                }
                socket = null;
                break;
            // Add more cases as needed for other socket events
            default:
                return next(action);
        }
    };
};

export default socketMiddleware;
