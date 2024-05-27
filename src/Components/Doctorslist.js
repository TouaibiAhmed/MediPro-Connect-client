import React, { useState, useEffect } from 'react';
import styles from './Doctorslist.module.css'; // Import CSS module for Doctors component
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setSelectedDoctorId } from '../Redux/action/userActions'
import { Link, useLocation   } from 'react-router-dom'; // Import Link from React Router


import { useSelector   } from 'react-redux';

import { setSearchName, setSearchAddress } from '../Redux/action/searchActions';



const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpeciality, setSelectedSpeciality] = useState('');
  const [selectedTariff, setSelectedTariff] = useState('');
  const [selectedRating, setSelectedRating] = useState('');



  const [originalDoctors, setOriginalDoctors] = useState([]); // Store original list of doctors


  const [selectedAddress, setSelectedAddress] = useState('');


  const dispatch = useDispatch();
  const location = useLocation(); // Use useLocation hook to get current location


  const searchParams = new URLSearchParams(location.search); // Get query parameters
  
  const service = searchParams.get('speciality')|| '';

  console.log(service);

  const initialSearchName = searchParams.get('name') || ''; // Initial value from URL parameter
  const initialSearchAddress = searchParams.get('address') || ''
  

  const searchName = useSelector(state => state.searchName);
  const searchAddress = useSelector(state => state.searchAddress);

  

  const handleSpecialityChange = (e) => {
    setSelectedSpeciality(e.target.value);
  };

  const handleTariffChange = (e) => {
    setSelectedTariff(e.target.value);
  };

  const handleRatingChange = (e) => {
    setSelectedRating(e.target.value);
  };

  const handleSearchChange = (e) => {
    dispatch(setSearchName(e.target.value));
    setSearchTerm(e.target.value); // Update local state for searchTerm
  };

  const handleAddressChange = (e) => {
    setSelectedAddress(e.target.value); // Update local state for searchAddress
  };
  










  useEffect(() => {
    const service = searchParams.get('speciality') || ''; // Get speciality from URL parameter
    console.log(service)
    setSelectedSpeciality(service); // Set selected speciality based on URL parameter
    fetchDoctors(); // Fetch doctors based on the selected speciality
  }, [searchParams.get('speciality')]); // Trigger effect when the speciality URL parameter changes
  

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/medecins/listerMedecins');
      setDoctors(response.data);
      setOriginalDoctors(response.data); // Store the original list of doctors

    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };


  const searchDoctors = () => {
   
    let filteredDoctors = doctors.filter(doctor => {
      let nameMatch = doctor.nom.toLowerCase().includes(searchTerm.toLowerCase());
      console.log("Doctor address:", doctor.ratingMoyen);

      let addressMatch = !selectedAddress || (doctor.adresseCabinet && doctor.adresseCabinet.trim().toLowerCase() === selectedAddress.trim().toLowerCase()); 

      let specialityMatch = !selectedSpeciality || doctor.specialite === selectedSpeciality;
      let tariffMatch = !selectedTariff || checkTariff(doctor.tarif, selectedTariff);
      let ratingMatch = !selectedRating || checkRating(doctor.ratingMoyen, selectedRating);

      return nameMatch && addressMatch && specialityMatch && tariffMatch && ratingMatch;
    });
    setDoctors(filteredDoctors);
  };


  
  const checkTariff = (tarif, selectedTariff) => {
    if (selectedTariff === '>50') {
      return tarif > 50;
    } else if (selectedTariff === '50- 100') {
      return tarif >= 50 && tarif <= 100;
    } else if (selectedTariff === '<100') {
      return tarif < 100;
    }
    return false;
  };

  const checkRating = (rating, selectedRating) => {
    if (selectedRating === '>3') {
      return rating > 3;
    } else if (selectedRating === '3-5') {
      return rating >= 3 && rating <= 5;
    } else if (selectedRating === '5') {
      return rating === 5;
    }
    return false;
  };


  const resetFilters = () => {
    setDoctors(originalDoctors); // Reset doctors to the original list
    setSelectedSpeciality('');
    setSelectedTariff('');
    setSelectedRating('');
    setSelectedAddress('');
    setSearchTerm('');
  };




  const handleBookAppointment = (doctorId, e) => {
    dispatch(setSelectedDoctorId(doctorId)); // Dispatch action to set selected doctor's ID
    localStorage.setItem('selectedDoctorId', doctorId); // Store selected doctor's ID in local storage
    
  };



















  return (
    <div className={styles.doctors}>
    <div className={styles.title}>
      <h2 className={styles.doctorslist}>Doctors</h2>
    </div>
    <div className={styles.filterContainer}>
      <div className={styles.searchBox}>
        <input type="text"  value={searchTerm || initialSearchName} placeholder="Search Doctor By Name"   onChange={e => setSearchTerm(e.target.value)}


/>
      </div>
      <div className={styles.searchBox}>
        <input type="text" value={selectedAddress} placeholder="Adresse" onChange={e => setSelectedAddress(e.target.value)} />
      </div>
      <div className={styles.dropdown}>
        <select value={selectedSpeciality } onChange={handleSpecialityChange}>
          <option value="">Speciality</option>
          
          <option value="cardiology">Cardiology</option>
            <option value="neurology">Neurology</option>
            <option value="general practitioners">General Practitioner</option>
            <option value="dental care">Dental Care</option>
            <option value="psychologist">Psychologist</option>
            <option value="internal medicine">Internal Medicine</option>
            <option value="obstetrics and gynecology">Obstetrics and Gynecology</option>
            <option value="osteopath">Osteopath</option>
            <option value="radiology">Radiology</option>
            <option value="dermatologist">Dermatology</option>
            <option value="pediatrics">Pediatrics</option>
            <option value="gynecology">Gynecology</option>
            <option value="orthopedics">Orthopedics</option>
            <option value="endocrinology">Endocrinology</option>
            <option value="ophthalmology">Ophthalmology</option>
            <option value="otolaryngology (ENT)">Otolaryngology (ENT)</option>
            <option value="psychiatry">Psychiatry</option>
            <option value="rheumatology">Rheumatology</option>
            <option value="urology">Urology</option>
            <option value="anesthesiology">Anesthesiology</option>
            <option value="nutrition and dietetics">Nutrition and Dietetics</option>
            <option value="gastroenterology">Gastroenterology</option>

        </select>
      </div>
      <div className={styles.dropdown}>
        <select value={selectedTariff} onChange={handleTariffChange}>
        <option value="">Tarif</option>

          <option value=">50">0-50 dt</option>
          <option value="50- 100">50 - 100dt</option>     
          <option value="<100">Higher than 100 dt</option>
             </select>
      </div>
      <div className={styles.dropdown}>
        <select value={selectedRating} onChange={handleRatingChange}>
          <option value="">Rating</option>
          <option value=">3">Low</option>
          <option value="3-5">Meduim</option>     
          <option value="5">High</option>
        </select>
      </div>
      <button className={styles.searchBtn} onClick={searchDoctors}>
        Search
      </button>
      <button className={styles.searchBtn} onClick={resetFilters}>
          Reset
        </button>
    </div>
    {doctors.length === 0 ? (
      <center><p >No doctors found.</p></center>
    ) : (
    <div className={styles.doctorGrid}>
    {doctors.map((doctor, index) => (
  <div className={styles.doctorCard} key={index}>
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
              <button className='bookAppBtn' >BOOK APPOINTMENT</button>
            </Link>
           
          </div>
        </div>
      ))}
    </div>
     )}
  </div>
);
};

export default Doctors;
