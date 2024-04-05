import React, { useState, useEffect } from 'react';
import './DoctorProfile.css';
import { Phone, Mail, MapPin } from 'react-feather'; // Import icons from react-feather
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'; // Import useSelector hook from react-redux

import { setSelectedDoctorId } from '../Redux/action/userActions'; // Import setSelectedDoctorId action

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { useGeographic } from 'ol/proj';



import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useParams } from 'react-router-dom';


















const DoctorProfile = () => {

  const selectedDoctorId = useSelector(state => state.user.selectedDoctorId); // Get selected doctor's ID from Redux state

  const [reviews, setReviews] = useState([]);

  const dispatch = useDispatch(); // Redux dispatch function

const {idMedecin} = useParams();

  const [doctor, setDoctor] = useState(null);

  const [activeButton, setActiveButton] = useState(null);


  const [timings, setTimings] = useState([]);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  const handleButtonClick = (button) => {
    setActiveButton(button);
  };
  const handleSlotSelection = (selectedSlot) => {
    // Here you can perform any action you want with the selected slot
    console.log('Selected Slot:', selectedSlot);
  };


  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/medecins/consulterProfil/${idMedecin}`);
        setDoctor(response.data);
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      }
    };
  
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/review/doctorReviews/${idMedecin}`);
        setReviews(response.data.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
      
    };

    const fetchTimings = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/horaire/consulterHorairesParMedecinId/${idMedecin}`);
        setTimings(response.data);
      } catch (error) {
        console.error('Error fetching timings:', error);
      }
    };
  
    if (selectedDoctorId) {
      fetchDoctorData();
      fetchReviews();
      fetchTimings();
    }
  
    localStorage.setItem('selectedDoctorId', selectedDoctorId);
  
    const storedDoctorId = localStorage.getItem('selectedDoctorId');
    if (storedDoctorId) {
      dispatch(setSelectedDoctorId(storedDoctorId));
    }
  
 

  
 
  }, [dispatch, selectedDoctorId]);
 
  
  useGeographic();

  useEffect(() => {

    const place = [9, 34]; // Longitude and latitude of Tunisia

    const map = new Map({
      target: 'map',
      view: new View({
        center: place,
        zoom: 6,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
    });

    return () => {
      // Clean up map on component unmount
      map.setTarget(null);
    };
  }, [activeButton]);
 

  
  if (!doctor) {
    return <div>No doctor data available.</div>;
  }







  



 // Function to render stars based on rating
 const renderStars = (rating) => {
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(<span key={i}>&#9733;</span>);
  }
  return stars;
};







  return (
    <div>
      <div className="title">
        <h2 className='titre'>Doctor Details</h2>
      </div>
      <div className="profile-card">
      <div className="cover-image">
    <img src="/images/bac1.jpg" alt="Cover" />
  </div>
  <div className="doctor-details">
    <div className="profile-info">
      <div className="profile-image-container">
        <img src={doctor.image} alt={doctor.name} className="profile-image" />
      </div>
      <div className="doctor-info">
        <h2>{doctor.nom} {doctor.prenom}</h2>
        {/* Render stars for rate */}
        <p>{doctor.age} years</p>
        <p className='speciality'> {doctor.specialite}</p>
      </div>
    </div>
  </div>
      </div>
      <div className="about">
        <div className="contact-info">
          <div>
            <h3>About</h3>
          </div>
          <div>
            <Phone /> {doctor.numeroProfessionnel}
          </div>
          <div>
            <Mail /> {doctor.email}
          </div>
          <div>
            <MapPin /> {doctor.adresseCabinet}
          </div>
        </div>

      </div>


      <div className="container">
        <div className="button-container">
          <button onClick={() => handleButtonClick('Overview')}>Overview</button>
          <button onClick={() => handleButtonClick('Experience')}>Experience</button>
          <button onClick={() => handleButtonClick('Reviews')}>Reviews</button>
          <button onClick={() => handleButtonClick('Location')}>Location</button>
          <button onClick={() => handleButtonClick('TimeTable')}>Time Table</button>
        </div>
        <div className="content-container">
          {activeButton === 'Overview' && 
          <div className='overview'>
            <p className='name'>Dr.{doctor.nom} {doctor.prenom}</p>
            <p className='spec'> {doctor.specialite}</p>
<p className='tarif'>Tarif: {doctor.tarif} dt</p>


            <p className='desc'>{doctor.description} </p>
            </div>}




          {activeButton === 'Experience' && 
          
          <div className='experience'>
    <div className='experience-info'>
      <p className='title-exp'>Experience</p>
      <p className='experience-years'>{doctor.experience} years</p>
    </div>
    <div className='formation'>
      <p className='title-exp'>Formation</p>
      <table>
        <thead>
          <tr>
            <th>Institution</th>
            <th>Year</th>
            <th>Degree</th>
          </tr>
        </thead>
        <tbody>
          
          {doctor.formation.map((formationItem, index) => (
            <tr key={index}>
              <td>{formationItem.nomInstitution}</td>
              <td>{formationItem.anneeObtention}</td>
              <td>{formationItem.diplome}</td>
            </tr>
          ))}
        </tbody>


      </table>
    </div>
  </div>
          
          
          
          
          
          
          
          }
            {activeButton === 'Reviews' && 
            
              <div className="reviews-container">
                {/* Map through reviews array */}
                {reviews.map((review, index) => (
                  <div key={index} className="review">
                    <div className="review-content">
                      <div className="patient-info">
                        <div className="patient-img">
                          <img src={review.patient.image} alt={review.patient.nom} />
                        </div>
                        <p className="patient-name">{review.patient.nom}</p>
                      </div>
                      <div className="review-details">
                      <div className="rating">
    {renderStars(review.rating)}
  </div>
  <div className="comment">
    <p>"{review.comment[0].commentaire}"</p>
  </div>
</div>
                  </div>
                  </div>
                ))}
              </div>
              

          }

{activeButton === 'Location' && 
      <div className="loc" id="map" style={{ height: '500px', width: '100%' }}></div>
    }

{activeButton === 'TimeTable' && (
  <div className="timetable">
    <div className="calendar-container">
      <div className="calendar">
        <h3>Select Date</h3>
        <Calendar value={selectedDate} onChange={handleDateChange} />
      </div>
      <div className="timings">
        <h3>Timings for {selectedDate.toDateString()}</h3>
        <div className="appointment-slots">
          {/* Find the doctor's schedule for the selected day */}
          {timings
            .filter(timing => {
              const selectedDayIndex = selectedDate.getDay(); // Get the day index (0-6) of the selected date
              const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
              return timing.jour === daysOfWeek[selectedDayIndex];
            })
            .map((timing, index) => {
              const startTime = new Date(selectedDate);
              startTime.setHours(parseInt(timing.heureDebut.split(':')[0]));
              startTime.setMinutes(parseInt(timing.heureDebut.split(':')[1]));
              const endTime = new Date(selectedDate);
              endTime.setHours(parseInt(timing.heureFin.split(':')[0]));
              endTime.setMinutes(parseInt(timing.heureFin.split(':')[1]));
              const duration = parseInt(timing.dureeRendezVous.split(' ')[0]);
              const slots = [];
              let currentTime = new Date(startTime);
              while (currentTime < endTime) {
                slots.push(new Date(currentTime));
                currentTime.setMinutes(currentTime.getMinutes() + duration);
              }
              return (
                <div key={index} className="slot-container">
                  <p>Start Time: {timing.heureDebut}</p>
                  <p>End Time: {timing.heureFin}</p>
                  <div className="slot-buttons">
                    {slots.map((slot, slotIndex) => (
                      <button key={slotIndex} onClick={() => handleSlotSelection(slot)}>
                        {slot.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  </div>
)}


      </div>
</div>
      <div className="image-list">
        <h3>Doctor's Office Images</h3>
        {doctor.listeImagesCabinet.map((image, index) => (
          <div className="image" key={index}>
            <img src={image} alt={`Office ${index + 1}`} />
          </div>
        ))}
      </div>



    </div>
  );
};

export default DoctorProfile;