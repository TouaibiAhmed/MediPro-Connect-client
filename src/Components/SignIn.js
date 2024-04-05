import React, { useState } from 'react';
import './SignIn.css'; // Make sure to create a CSS file with the same name
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../Redux/action/authActions';
import { useNavigate } from "react-router-dom";
import { Alert } from '@mui/material';
import axios from 'axios';


const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');


  const [errorMessage, setErrorMessage] = useState('');


  const dispatch = useDispatch(); // Get the dispatch function from Redux


 // New state for managing toast notification
 const [showToast, setShowToast] = useState(false);
 const [toastMessage, setToastMessage] = useState('');

 const navigate = useNavigate();



  const userType = useSelector(state => state.user.userType); // Assuming your rootReducer has a user reducer




  const getMedecinStatusByEmail = async (email) => {
    try {
      const response = await axios.post('http://localhost:3000/api/medecins/medecinStatus', { email });
      return response.data.status;
    } catch (error) {
      console.error('Error fetching medecin status:', error);
      throw error;
    }
  };










  const handleLogin = async (event) => {


    event.preventDefault();
  
    const endpoint = userType === 'patient' 
      ? "http://localhost:3000/api/patient/login" // Adjust this endpoint as needed
      : "http://localhost:3000/api/medecins/login"; // Adjust this endpoint as needed
  
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, motDePasse: password }),
      });


      if (userType === 'medecin') {
        const status = await getMedecinStatusByEmail(email); 
        console.log(status);
        if (status === "en attente") {
          setShowToast(true);
      setToastMessage("Your Request For Joining In To MediPro Connect Team Is Not Approved Yet, Thank You For Your Patience It Will Be Validated Soon.");

          return;
        }
      }



  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const { token, userId } = await response.json();
      const decodedToken = jwtDecode(token);
        // Store token in localStorage
        localStorage.setItem('token', token);
        sessionStorage.setItem('userId', userId); 

      console.log(`Login successful as a ${decodedToken.userType}`);
      

      



   



      // Store user ID and user type in Redux store
      dispatch(loginSuccess(decodedToken.idMedecin || decodedToken.idPatient, decodedToken.userType));
  
      setShowToast(true);
      setToastMessage("Login successful! Welcome to  MediPro Connect platform!");
      setTimeout(() => setShowToast(false), 5000); // Hide toast after 5 seconds  

      navigate("/Homepage");


    } catch (error) {
      console.error('Login error:', error);
      // Handle and display error
    }
  };

  return (
    <div className="signin-wrapper">
      {showToast && (
        <Alert
          severity="info"
          onClose={() => setShowToast(false)}
          sx={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', zIndex: 9999, fontSize: '1.0rem', padding: '25px' }}
        >
          {toastMessage}
        </Alert>
      )}
      <div className="img-containerr">
        <img src="/images/login.png" alt="Sign In" />
      </div>
      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          <h2>Log In</h2>
          <div className="input-groupp">
            <label htmlFor="email"></label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder='Email'
            />
          </div>
          <div className="input-groupp">
            <label htmlFor="password"></label>
            <input
              type="password"
              name=''
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder='Password'
            />
          </div>
          <div className="checkbox-group">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
            <a href="#forgot-password" className='forgot_pswrd'>Forgot Password</a>

          </div>
          <button type="submit" className="login-button">Log In</button>
          <div className="login-footer">
            <p>Don't have an account? <a href="#sign-up">Sign In</a></p>
            <p className='social'> - Or Login with - </p>
            <div className='social-icons'>
            <img src="/images/fb-icon.png" alt="fb-icon" />
            <img src="/images/x-icon.png" alt="x-icon" />
            <img src="/images/google-icon.png" alt="google-icon" />

            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
