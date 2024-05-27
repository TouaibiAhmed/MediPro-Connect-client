// Dashboard.js
import React from 'react';
import { Route, Routes, useParams  } from 'react-router-dom';
import Dash from './index' ;
import DoctorCalendar from './DoctorCalendar';
import Sidebar from './Sidebar';
import Appointments from './Appointments';
import PatientHistory from './PatientsHistory'
const Dashboard = () => {


  const { id } = useParams();


  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <Routes>
      <Route path={`/dash`}  element={<Dash />} />
        <Route path={`/calendar`} element={<DoctorCalendar doctorId={id}/>} />
        <Route path={`/appointments`} element={<Appointments doctorId={id}/>} />
        <Route path={`/patientsHistory`} element={<PatientHistory doctorId={id}/>} />
      </Routes>
    </div>
  );
};

export default Dashboard;
