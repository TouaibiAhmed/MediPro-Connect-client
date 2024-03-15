import React, { useState } from 'react';
import './Signuppatients.css'; // Make sure the CSS file is named SignInForm.css

const SignUpPat = () => {
  const [formData, setFormData] = useState({
    name: '',
    prename: '',
    birthDate: '',
    telephone: '',
    email: '',
    password: '',
    adresse: '',
    statutSocial: '', // Initialize statutSocial
    image: '', // Initialize image
    sexe: 'Homme' // Initialize sexe
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

// New state for managing toast notification
const [showToast, setShowToast] = useState(false);
const [toastMessage, setToastMessage] = useState('');




  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/patient/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nom: formData.name,
          prenom: formData.prename,
          dateNaissance: formData.birthDate,
          telephone: formData.telephone,
          email: formData.email,
          motDePasse: formData.password,
          adresse: formData.adresse,
          statutSocial: formData.statutSocial, // Include it in the new patient object
          image: formData.image, // Include it in the new patient object
          sexe: formData.sexe 
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message}`);
    }
    
  
      const data = await response.json();
      console.log('Success:', data);

// Show toast on success
setShowToast(true);
setToastMessage("Registration successful! Welcome to our platform.");
setTimeout(() => setShowToast(false), 5000); // Hide toast after 5 seconds  

      


    } catch (error) {
      console.error('There was an error:', error);
    }
  };
  

  return (
    <div className="signin-container">
            {showToast && <div className="toast">{toastMessage}</div>}

      <div className="signin-image">
        <img src="/images/signup2.png" alt="Doctors Illustration" />
      </div>
      <div className="signin-form-container">
        <form onSubmit={handleSignUp} className="signin-form">
          <h2>Sign Up</h2>
          <p className="subtitle">Patients Registration</p>
          <div className="input-row" >
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
              name="telephone"
              placeholder="Telephone"
              value={formData.telephone}
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
            name="adresse"  
            placeholder="Adresse"
            value={formData.adresse}
            onChange={handleInputChange}
            required
          />
          
  </div>
          <button type="submit" className="signin-button">Sign Up</button>
          <div className="signin-footer">
            <p>Already have an account? <a href="#log-in">Log In</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPat;
