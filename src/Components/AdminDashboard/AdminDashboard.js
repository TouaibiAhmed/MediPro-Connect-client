// Dashboard.js
import React from 'react';
import { Route, Routes, useParams  } from 'react-router-dom';
import Dash from './app-view' ;
import Nav from './AdminSidebar';

import AdminDoctorsList from './user/view/user-view'

import AdminPatientsList from './user/view/patients-view'


import DoctorsRequests from './user/view/requests-view'

const AdminDashboard = () => {

    const [openNav, setOpenNav] = React.useState(true); // Set to true initially



  return (
    <div style={{ display: 'flex' }}>
      <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />
      <Routes>

      <Route path={`/admindash`}  element={<Dash />} />
  
      <Route path={`/doctorslist`}  element={<AdminDoctorsList />} />

      <Route path={`/patients`}  element={<AdminPatientsList />} />

      <Route path={`/requests`}  element={<DoctorsRequests />} />


      </Routes>
    </div>
  );
};

export default AdminDashboard;
