import React, { useState } from 'react';
import './SignIn.css'; // Make sure to create a CSS file with the same name

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    // Handle the login logic here
    console.log('Logging in with:', email, password);
  };

  return (
    <div className="signin-wrapper">
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
