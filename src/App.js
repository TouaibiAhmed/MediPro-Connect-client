
//app.js
import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Components/Header.js';
import Footer from './Components/Footer.js';
import PatientProfile from './Components/PatientProfile.js';
import MedecinProfile from './Components/DoctorProfile';
import Dashboard from './Components/dashboard/Dashboard.js';
import SignIn from './Components/SignIn.js';
import Home from './Components/Home.js';
import About from './Components/About.js';
import Doctors from './Components/Doctorslist.js';
import SignUpPatient from './Components/Signuppatients.js';
import SignUpDoctor from './Components/Signupdoctors.js';
import Contact from './Components/Contact.js'
import Service from './Components/Services.js'

import DisplayDossierMedical from './Components/Patient-infos/DisplayDossierMedical.js'

import AddDossierMedical from './Components/Patient-infos/DossierMedical.js'


import DisplayOrdonnance from './Components/Patient-infos/DisplayOrdonnance.js'

import AddOrdonnance from './Components/Patient-infos/AddOrdonnance.js'


import AdminDashboard from './Components/AdminDashboard/AdminDashboard.js'



function App() {
  return (
    <Router>
    <div>
      
      <Header/>
      <Routes>
      <Route path="/" element={<Home />} /> 

      <Route path="/SignIn" element={<SignIn />} /> 
      <Route path="/signup/patient" element={<SignUpPatient />} /> 
      <Route path="/signup/doctor" element={<SignUpDoctor />} /> 

      <Route path="/about" element={<About />} /> 
      <Route path="/doctors" element={<Doctors />} /> 

      <Route path="/services" element={<Service />} /> 
      



      <Route path="/contact" element={<Contact />} /> 


      <Route exact path="/profile/patient/:patientId" element={<PatientProfile/>} />
<Route exact path="/profile/medecin/:idMedecin" element={<MedecinProfile/>} />


<Route exact path="/profile/medecin/:idMedecin" element={<MedecinProfile/>} />

<Route exact path="/display-dossier-medical/:id" element={<DisplayDossierMedical/>} />

<Route exact path="/AddDossierMedical/:patientId" element={<AddDossierMedical/>} />


<Route exact path="/ordonnance/:ordonnanceId" element={<DisplayOrdonnance/>} />

<Route exact path="/addOrdonnance/:patientId" element={<AddOrdonnance/>} />




{/* Nested Dashboard Route */}
<Route path="/dashboard/:id/*" element={<Dashboard />} />

<Route path="/admin/*" element={<AdminDashboard/>} />






      </Routes>
    </div>
  </Router>
);
}

export default App;
