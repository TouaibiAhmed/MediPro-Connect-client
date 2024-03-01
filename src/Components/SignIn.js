import React, { useState } from 'react';
import './SignIn.css'; // Make sure to create a CSS file with the same name
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';


const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



 // New state for managing toast notification
 const [showToast, setShowToast] = useState(false);
 const [toastMessage, setToastMessage] = useState('');




  const userType = useSelector(state => state.user.userType); // Assuming your rootReducer has a user reducer


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



        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token); // Store the token
        
        // Decode the token to find out the user type
        const decodedToken = jwtDecode(token);
console.log(`Login successful as a ${decodedToken.userType}`);
        
        // Optionally, update the app state or UI based on userType


        setShowToast(true);
        setToastMessage("Login successful! Welcome to our platform.");
        setTimeout(() => setShowToast(false), 5000); // Hide toast after 5 seconds  
        
    }
    } catch (error) {
        console.error('Login error:', error);
        // Handle and display error
    }
};


  return (
    <div className="signin-wrapper">
      {showToast && <div className="toast">{toastMessage}</div>}
      <div className="img-container">
        <img src="/images/login.png" alt="Sign In" />
      </div>
      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          <h2>Log In</h2>
          <div className="input-group">
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
          <div className="input-group">
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
