import './App.css';
import Header from './Components/Header.js';
import SignIn from './Components/SignIn.js';
import SignUp from './Components/Signupdoctors.js';
import SignUpPat from './Components/Signuppatients.js';
import DoctorDashboard from './Components/DoctorDashboard.js';
import SearchBar from './Components/Doctorslist.js';
import Appointments from './Components/Appointments.js'
import PatientHistory from './Components/PatientsHistory.js';
function App() {
  return (
    <div className="App">
      <Header/>
      
     <DoctorDashboard/>

    </div>
  );
}

export default App;
