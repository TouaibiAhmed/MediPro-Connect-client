
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

      <Route path="/contact" element={<Contact />} /> 


      <Route exact path="/profile/patient/:idPatient" element={<PatientProfile/>} />
<Route exact path="/profile/medecin/:idMedecin" element={<MedecinProfile/>} />




      </Routes>
      <Footer/>
    </div>
  </Router>
);
}

export default App;
