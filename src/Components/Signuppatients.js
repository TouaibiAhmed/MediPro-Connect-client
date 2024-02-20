import React, { useState } from 'react';
import './Signuppatients.css'; // Make sure the CSS file is named SignInForm.css

const SignUpPat = () => {
  const [formData, setFormData] = useState({
    name: '',
    prename: '',
    birthDate: '',
    postalCode: '',
    email: '',
    password: '',
    Adresse: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    // Handle the sign-in logic here
    console.log('Signing in with:', formData);
  };

  return (
    <div className="signin-container">
      <div className="signin-image">
        <img src="/images/signup2.png" alt="Doctors Illustration" />
      </div>
      <div className="signin-form-container">
        <form onSubmit={handleSignIn} className="signin-form">
          <h2>Sign In</h2>
          <p className="subtitle">Patients Registration</p>
          <div className="input-row">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="prename"
              placeholder="Prename"
              value={formData.prename}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-row">
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={formData.postalCode}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-row">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='adresse'>
          <input 
            type="text"
            name="Adresse"
            placeholder="Adresse"
            value={formData.Adresse}
            onChange={handleInputChange}
            required
          />
  </div>
          <button type="submit" className="signin-button">Sign In</button>
          <div className="signin-footer">
            <p>Already have an account? <a href="#log-in">Log In</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPat;
