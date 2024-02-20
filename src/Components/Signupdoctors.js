import React, { useState } from 'react';
import './Signupdoctors.css'; // Make sure the CSS file is named SignInForm.css

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    prename: '',
    birthDate: '',
    postalCode: '',
    email: '',
    password: '',
    rneCode: '',
    specialty: ''
  });

  const [rneCode, setRneCode] = useState('');


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
        <img src="/images/signup1.png" alt="Doctors Illustration" />
      </div>
      <div className="signin-form-container">
        <form onSubmit={handleSignIn} className="signin-form">
          <h2>Sign In</h2>
          <p className="subtitle">Doctors Registration</p>
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
          <div className="rne-input-group">
  <input
    type="text"
    placeholder="RNE code"
    value={rneCode}
    onChange={(e) => setRneCode(e.target.value)}
    required
  />
          <p className="input-hint">*The RNE code is used for the identity verification*</p>
          </div>
          <select
            name="specialty"
            value={formData.specialty}
            onChange={handleInputChange}
            required
            className='speciality'
          >
            <option value="">Speciality</option>
            <option value="cardiology">Cardiology</option>
            <option value="neurology">Neurology</option>
            <option value="pediatrics">Pediatrics</option>
            {/* Add other specialties as needed */}
          </select>
          <button type="submit" className="signin-button">Validate my request</button>
          <div className="signin-footer">
            <p>Already have an account? <a href="#log-in">Log In</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
