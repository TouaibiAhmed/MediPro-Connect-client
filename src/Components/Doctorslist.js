import React, { useState, useEffect } from 'react';
import './Doctorslist.css';
import axios from 'axios';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpeciality, setSelectedSpeciality] = useState('');
  const [selectedTariff, setSelectedTariff] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [searchAddress, setSearchAddress] = useState('');





  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSpecialityChange = (e) => {
    setSelectedSpeciality(e.target.value);
  };

  const handleTariffChange = (e) => {
    setSelectedTariff(e.target.value);
  };

  const handleRatingChange = (e) => {
    setSelectedRating(e.target.value);
  };

  const handleAddressChange = (e) => {
    setSearchAddress(e.target.value);
  };



  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/medecins/listerMedecins');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );





  const searchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/medecins/rechercherMedecins', {
        params: {
          nom: searchTerm,
          adresseCabinet: searchAddress,
          specialite: selectedSpeciality,
          tarif: selectedTariff,
          rating: selectedRating
        }
      });
      setDoctors(response.data);
    } catch (error) {
      console.error('Error searching doctors:', error);
    }
  };















  return (
    <div className='doctors'>
      <div className='title'>
        <h2>Doctors</h2>
      </div>
      <div className="filter-container">
        <div className="search-box">
          <input type="text" placeholder="Search Doctor By Name" onChange={handleSearchChange} />
        </div>
        <div className="search-box">
          <input type="text" placeholder="Adresse" onChange={handleAddressChange} />
        </div>
        <div className="dropdown">
        <select value={selectedSpeciality} onChange={handleSpecialityChange}>
          <option value="">Speciality</option>
          <option value="General Practitioner">General Practitioner</option>
          <option value="Dental Care">Dental Care</option>
          <option value="Psychologist">Psychologist</option>
          <option value="Internal Medicine">Internal Medicine</option>
          <option value="Pediatrics">Pediatrics</option>
          <option value="Obstetrics and Gynecology">Obstetrics and Gynecology</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Osteopath">Osteopath</option>
          <option value="Radiology">Radiology</option>
          <option value="Dermatologist">Dermatologist</option>
          <option value="Pediatrics and Neurology">Pediatrics and Neurology</option>
        </select> 
        </div>
        <div className="dropdown">
        <select value={selectedTariff} onChange={handleTariffChange}>
          <option value="">Tariff</option>
          <option value="gt50">Less than 50 dt</option>
          <option value="50to100">Between 50 and 100 dt</option>
          <option value="lt100">Greater than 100 dt</option>
        </select>
        </div>
        <div className="dropdown">
           <select value={selectedRating} onChange={handleRatingChange}>
          <option value="">Rating</option>
          <option value="highRated">High Rated (4-5)</option>
          <option value="mediumRated">Medium Rated (3-4)</option>
          <option value="lowRated">Low Rated (below 3)</option>
        </select>
        </div>
        <button className="search-btn" onClick={searchDoctors}>Search</button>
      </div>
      <div className="doctor-grid">
        {filteredDoctors.map((doctor) => (
          <div className="card" key={doctor._id}>
            <div className="card-header">
              <img src={doctor.image} alt={`${doctor.nom} ${doctor.prenom}`} />
            </div>
            <div className="card-body">
              <h3>{`${doctor.nom} ${doctor.prenom}`}</h3>
              <p>{doctor.specialite}</p>
              {doctor.ratingMoyen !== "Pas de rating" ? (
                <div className="rating">
                  {'★'.repeat(doctor.ratingMoyen)}
                  {'☆'.repeat(5 - doctor.ratingMoyen)}
                </div>
              ) : (
                <p>No ratings yet</p>
              )}
              <button>BOOK APPOINTMENT</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;
