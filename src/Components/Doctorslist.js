import React, { useState, useEffect } from 'react';
import styles from './Doctorslist.module.css'; // Import CSS module for Doctors component
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setSelectedDoctorId } from '../Redux/action/userActions'
import { Link  } from 'react-router-dom'; // Import Link from React Router


import { useSelector   } from 'react-redux';

import { setSearchName, setSearchAddress } from '../Redux/action/searchActions';



const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpeciality, setSelectedSpeciality] = useState('');
  const [selectedTariff, setSelectedTariff] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [searchAddress, setSearchAddress] = useState('');


  const dispatch = useDispatch();

  

  



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


  const handleBookAppointment = (doctorId, e) => {
    dispatch(setSelectedDoctorId(doctorId)); // Dispatch action to set selected doctor's ID
    localStorage.setItem('selectedDoctorId', doctorId); // Store selected doctor's ID in local storage
    
  };




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







  const searchName = useSelector(state => state.searchName);
  const SearchAddress = useSelector(state => state.searchAddress);







  return (
    <div className={styles.doctors}>
    <div className={styles.title}>
      <h2 className={styles.doctorslist}>Doctors</h2>
    </div>
    <div className={styles.filterContainer}>
      <div className={styles.searchBox}>
        <input type="text"  value={searchName} placeholder="Search Doctor By Name" onChange={handleSearchChange} />
      </div>
      <div className={styles.searchBox}>
        <input type="text" value={SearchAddress} placeholder="Adresse" onChange={handleAddressChange} />
      </div>
      <div className={styles.dropdown}>
        <select value={selectedSpeciality} onChange={handleSpecialityChange}>
          <option value="">Speciality</option>
          {/* Options for specialities */}
        </select>
      </div>
      <div className={styles.dropdown}>
        <select value={selectedTariff} onChange={handleTariffChange}>
          <option value="">Tariff</option>
          {/* Options for tariffs */}
        </select>
      </div>
      <div className={styles.dropdown}>
        <select value={selectedRating} onChange={handleRatingChange}>
          <option value="">Rating</option>
          {/* Options for ratings */}
        </select>
      </div>
      <button className={styles.searchBtn} onClick={searchDoctors}>
        Search
      </button>
    </div>
    <div className={styles.doctorGrid}>
      {filteredDoctors.map((doctor) => (
        <div className={styles.doctorCard} key={doctor._id}>
          <div className={styles.doctorCardHeader}>
            <img src={doctor.image} alt={`${doctor.nom} ${doctor.prenom}`} />
          </div>
          <div className={styles.doctorCardBody}>
            <h3>{`${doctor.nom} ${doctor.prenom}`}</h3>
            <p>{doctor.specialite}</p>
            {doctor.ratingMoyen !== 'Pas de rating' ? (
              <div className={styles.rating}>
                {'★'.repeat(doctor.ratingMoyen)}
                {'☆'.repeat(5 - doctor.ratingMoyen)}
              </div>
            ) : (
              <p>No ratings yet</p>
            )}
            <Link to={`/profile/medecin/${doctor._id}`} onClick={(e) => handleBookAppointment(doctor._id, e)}>
              <button>BOOK APPOINTMENT</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
);
};

export default Doctors;
