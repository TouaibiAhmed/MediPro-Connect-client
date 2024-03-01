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
    specialte: ''
  });

  const [rneCode, setRneCode] = useState('');


 // New state for managing toast notification
 const [showToast, setShowToast] = useState(false);
 const [toastMessage, setToastMessage] = useState('');





  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/medecins/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nom: formData.name,
          prenom: formData.prename,
          dateDeNaissance: formData.birthDate,
          codePostal: formData.postalCode,
          email: formData.email,
          motDePasse: formData.password,
          Rne: rneCode, 
          specialite: formData.specialte,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Success:', data);



// Show toast on success
      setShowToast(true);
      setToastMessage("Registration successful! Welcome to our platform.");
      setTimeout(() => setShowToast(false), 5000); // Hide toast after 5 seconds  
      
    
    } 
      catch (error) {
      console.error('There was an error:', error);
    }
  };

  return (
    <div className="signin-container">
      {showToast && <div className="toast">{toastMessage}</div>}
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
    name='rneCode'
    value={rneCode}
    onChange={(e) => setRneCode(e.target.value)}
    required
  />
          <p className="input-hint">*The RNE code is used for the identity verification*</p>
          </div>
          <select
            name="specialte"
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
