import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children, userId }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3000');
    if (userId) {
      newSocket.emit('registerUser', userId);
    }
    setSocket(newSocket);

    return () => newSocket.close();
  }, [userId]);

  useEffect(() => {
    if (socket) {
      socket.on('newAppointmentNotification', (data) => {
        // Handle notification
        alert(data.message); // Or use a more sophisticated notification mechanism
      });

      socket.on('appointmentStatusChanged', (data) => {
        // Handle status change
        alert(data.message);
      });
    }
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
