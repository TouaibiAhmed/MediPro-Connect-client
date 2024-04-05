// Dashboard.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dash from './index' ;
import DoctorCalendar from './DoctorCalendar';
import Sidebar from './Sidebar';
import Appointments from './Appointments';
const Dashboard = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <Routes>
      <Route path="/dashboard" element={<Dash/>} />
      <Route exact path="/dashboard/calendar" element={<DoctorCalendar/>} />
      <Route exact path="/dashboard/appointments" element={<Appointments/>} />

      </Routes>
    </div>
  );
};

export default Dashboard;
