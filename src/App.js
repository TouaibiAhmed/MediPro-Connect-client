import './App.css';
import Header from './Components/Header.js';
import Footer from './Components/Footer.js';
import PatientProfile from './Components/PatientProfile.js';
import DisplayDossierMedical from './Components/Patient-infos/DisplayDossierMedical.js';
import DossierMedical from './Components/Patient-infos/DossierMedical.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (                                 /*patient profile route: <Route path="/patient-profile/:id" component={PatientProfile} />*/
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" exact element={<PatientProfile/>} />
          <Route path="/display-dossier-medical/:id" element={<DisplayDossierMedical/>} />
          <Route path="/dossier-medical/:id" element={<DossierMedical/>} />


        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
