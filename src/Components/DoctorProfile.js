import React, { useState, useEffect, useRef } from 'react';
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



import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';



import { Rating } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


import {IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions  } from '@material-ui/core';

import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';



const DoctorProfile = () => {

  const selectedDoctorId = useSelector(state => state.user.selectedDoctorId); // Get selected doctor's ID from Redux state

  const [reviews, setReviews] = useState([]);

  const dispatch = useDispatch(); // Redux dispatch function

const {idMedecin} = useParams();

  const [doctor, setDoctor] = useState(null);

const [patient, setPatient] = useState(null); 

  const [activeButton, setActiveButton] = useState(null);


  const [timings, setTimings] = useState([]);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [editable, setEditable] = useState(false); // State to track if the profile is editable

  const [showAddForm , setAddForm] = useState(false); // State to track if the profile is editable


  const [jour, setJour] = useState('');
  const [heureDebut, setHeureDebut] = useState('');
  const [heureFin, setHeureFin] = useState('');
  const [dureeRendezVous, setDureeRendezVous] = useState('');

  const [availableSlots, setAvailableSlots] = useState([]);


  const userId = sessionStorage.getItem('userId'); // Get the ID of the logged-in user

  const isUserDoctorProfileOwner = userId === idMedecin;


  const [notificationOpen, setNotificationOpen] = useState(false);

  const [rdvnotification, setrdvnotification] = useState(false);


  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');


  const [showBookingForm, setShowBookingForm] = useState(false);

  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
const [appointmentDescription, setappointmentDescription] = useState('');

const [selectedTimingIndex, setSelectedTimingIndex] = useState(null);
const [selectedSlotIndex, setSelectedSlotIndex] = useState(null);

const [selectedSlotId, setSelectedSlotId] = useState(null);

const [isDisabling, setIsDisabling] = useState(true); // State to determine if the slot is being disabled

const [disableConfirmation, setdisableConfirmation] = useState(false);


const [signature, setSignature] = useState('');

const [selectedImage, setSelectedImage] = useState(null);

const [selectedSlot, setSelectedSlot] = useState(null);

const fileInputRef = useRef(null);


const [filteredTimings, setFilteredTimings] = useState([]);


const handleDateChange = (date) => {
  setSelectedDate(date);
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
  const filtered = timings.filter(timing => timing.jour === dayOfWeek);
  const updatedFilteredTimings = filtered.map(timing => ({
    ...timing,
    filteredTimeSlots: timing.timeSlots || []
  }));
  setFilteredTimings(updatedFilteredTimings);
};







  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  useEffect(() => {
    console.log("disableConfirmation state updated:", disableConfirmation);
  }, [disableConfirmation]);
  
  useEffect(() => {
    console.log("isDisabling state updated:", isDisabling);
  }, [isDisabling]);
  
  
  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/medecins/consulterProfil/${idMedecin}`);
        setDoctor(response.data);
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      }
    };

  

    const fetchPatientData = async () =>{
      try{
        const response = await axios.get(`http://localhost:3000/api/patient/consulterprofil/${userId}`);
        setPatient(response.data);
      }catch (error){
        console.log('Error fetching patient data:', error)
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
        const timingsWithSlots = response.data.map(timing => ({
          ...timing,
          timeSlots: timing.timeSlots || []
        }));
    
        setTimings(timingsWithSlots);
        
        const dayOfWeek = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });
        const filtered = timingsWithSlots.filter(timing => timing.jour === dayOfWeek);
        const updatedFilteredTimings = filtered.map(timing => ({
          ...timing,
          filteredTimeSlots: timing.timeSlots || []
        }));
        setFilteredTimings(updatedFilteredTimings);
      } catch (error) {
        console.error('Error fetching timings:', error);
      }
    };
  
    
    
    
  
    
  
    if (selectedDoctorId) {
      fetchDoctorData();
      fetchPatientData();
      fetchReviews();

      fetchTimings();
    }
  
    localStorage.setItem('selectedDoctorId', selectedDoctorId);
  
    const storedDoctorId = localStorage.getItem('selectedDoctorId');
    if (storedDoctorId) {
      dispatch(setSelectedDoctorId(storedDoctorId));
    }
  
 

  
 
  }, [dispatch, selectedDoctorId, selectedDate]);
 
  
  useGeographic();

  useEffect(() => {

    const place = [9, 34]; 

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
      map.setTarget(null);
    };
  }, [activeButton]);
 

  
  if (!doctor) {
    return <div>No doctor data available.</div>;
  }


 const renderStars = (rating) => {
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(<span key={i}>&#9733;</span>);
  }
  return stars;
};


const handleUpdateProfile = () => {
  setEditable(true); // Set profile to editable mode
};

const handleProfileImageChange = async (e) => {
  const file = e.target.files[0];

  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'medipro');

    const response = await axios.post('https://api.cloudinary.com/v1_1/dqrzdmgyl/image/upload', formData);

    const imageURL = response.data.secure_url;

    setDoctor(prevDoctor => ({
      ...prevDoctor,
      image: imageURL
    }));
  } catch (error) {
    console.error('Error uploading profile image:', error);
    console.log('Response from Cloudinary:', error.response.data);
  }
};


const handleFormationChange = (e, index, field) => {
  const newFormation = [...doctor.formation];
  newFormation[index][field] = e.target.value;
  setDoctor({ ...doctor, formation: newFormation });
};

const handleEmptyFormationChange = (e, field) => {
  if (doctor.formation.length === 0) {
    setDoctor({
      ...doctor,
      formation: [{ [field]: e.target.value, nomInstitution: '', anneeObtention: '', diplome: '' }]
    });
  } else {
    const newFormation = [...doctor.formation];
    newFormation[0][field] = e.target.value;
    setDoctor({ ...doctor, formation: newFormation });
  }
};




const handleAddHoraire = () => {
  setAddForm(true); // Set profile to editable mode
};



const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(`http://localhost:3000/api/horaire/ajouterHoraire/${idMedecin}`, {
      jour,
      heureDebut,
      heureFin,
      dureeRendezVous
    });

    setTimings(prevTimings => [...prevTimings, response.data.horaire]);
    toast.success('Horaire ajouté avec succès');
    setAddForm(false);
  } catch (error) {
    console.error('Error adding horaire:', error);
    toast.error('Erreur lors de l\'ajout de l\'horaire');
  }
};



const handleTimeChange = (e, timingId, field) => {
  const newValue = e.target.value;

  // Update filteredTimings state
  setFilteredTimings(prevTimings =>
    prevTimings.map(timing =>
      timing._id === timingId ? { ...timing, [field]: newValue } : timing
    )
  );

  // Update timings state
  setTimings(prevTimings =>
    prevTimings.map(timing =>
      timing._id === timingId ? { ...timing, [field]: newValue } : timing
    )
  );
};







const handleDeleteReview = async (reviewId) => {
  try {
    await axios.delete(`http://localhost:3000/api/review/deleteReview/${reviewId}`);
    setReviews(reviews.filter(review => review._id !== reviewId));
    toast.success('Review deleted successfully');
  } catch (error) {
    console.error('Error deleting review:', error);
    toast.error('Error deleting review');
  }
};



// Function to handle signature treatment
const handleSignatureTreatment = async () => {
  try {
    // Step 1: Upload the signature image to remove.bg for background removal
    const formData = new FormData();
    formData.append('image_file', signature); // Assuming signature is the uploaded file
    formData.append('size', 'auto');

    const apiKey = 'mgLvmtF9pQtkhv7amfX7eBSN';

    // Manually construct headers
    const headers = {
      'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
      'X-Api-Key': apiKey,
    };

    const removeBgResponse = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
      headers,
      responseType: 'arraybuffer', // Ensure binary response
      encoding: null // Ensure no encoding applied
    });

    // Step 2: Check if the response status is successful
    if (removeBgResponse.status !== 200) {
      throw new Error(`Remove.bg API request failed with status code ${removeBgResponse.status}`);
    }

    // Step 3: Convert the processed image data to base64
    const base64ProcessedSignature = btoa(
      new Uint8Array(removeBgResponse.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ''
      )
    );

    // Step 4: Update the signature in the profile data
    return base64ProcessedSignature;

  } catch (error) {
    console.error('Error processing signature:', error);
    throw error;
  }
};


// Function to handle profile save
const handleSaveProfile = async () => {
  try {

    let updatedDoctor = { ...doctor };


    // If signature is selected, treat the signature
    if (signature) {
      const processedSignature = await handleSignatureTreatment();
      updatedDoctor.signature = processedSignature;
    }

    // Step 5: Send profile update request to the backend
    const response = await axios.put(`http://localhost:3000/api/medecins/updateProfil/${idMedecin}`, updatedDoctor);
    setDoctor(response.data);



// Step 2: Update horaires
const updateHorairesPromises = timings.map(async (timing) => {
  const updateResponse = await axios.put(`http://localhost:3000/api/horaire/updateHoraire/${timing._id}`, {
    jour: timing.jour,
    heureDebut: timing.heureDebut,
    heureFin: timing.heureFin,
    dureeRendezVous: timing.dureeRendezVous
  });
  return updateResponse.data.horaire;

});

const updatedTimings = await Promise.all(updateHorairesPromises);
setTimings(updatedTimings);

await Promise.all(updateHorairesPromises);





    setNotificationOpen(true);
  } catch (error) {
    toast.error('Error updating profile');
    console.error('Error updating profile:', error);
  }
  setEditable(false);
};












  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleReviewSubmit = async () => {
    const userType = sessionStorage.getItem('userType'); 
    const userId = sessionStorage.getItem('userId');
    console.log('User Type:', userType); 
    console.log('User ID:', userId); 
  
    try {
        const formattedComment = [
            {
                commentaire: comment, 
                date: new Date() 
            }
        ];
  
        console.log('Formatted Comment:', formattedComment);
  
        const reviewData = {
            patientId: userType === 'patient' ? userId : null,
            medecinId: idMedecin,
            rating,
            comment: formattedComment
        };
  
        console.log('Review Data:', reviewData);
  
        // Check if the patient has had an appointment with the doctor
        const appointmentResponse = await axios.get(`http://localhost:3000/api/rendezVous/checkAppointment/${userId}/${idMedecin}`);
        if (!appointmentResponse.data.hasAppointment) {
            toast.error('You cannot leave a review as you have not had an appointment with this doctor.');
            return;
        }
  
        const response = await axios.post('http://localhost:3000/api/review/addRating', reviewData);
  
        console.log('Review submitted successfully:', response.data);
        setNotificationOpen(true);
  
        // Update the reviews state to include the new review
        setReviews(prevReviews => [...prevReviews, response.data]);
      
    } catch (error) {
        if (error.response) {
            console.error('Error response:', error.response.data);
            console.error('Error status:', error.response.status);
            console.error('Error headers:', error.response.headers);
        } else if (error.request) {
            console.error('Error request:', error.request);
        } else {
            console.error('Error message:', error.message);
        }
        console.error('Error config:', error.config);
    }
};

  
  
  
  

 
  


  
  
  
  
  
  
  
 

  


    const handleSubmitBooking = async () => {
      try {
        const response = await axios.post('http://localhost:3000/api/rendezVous/ajouterRendezVous', {
          patientId: userId,
          medecinId: idMedecin,
          date: selectedDate.toISOString(),
          heureDebut: selectedTimeSlot.startTime,
          descriptionRDV: appointmentDescription
        });
        if (response.status === 400) {
          // Show an error message to the user
          alert("Booking failed: " + response.data.message);
      } else if  (response.status === 201) {
          setrdvnotification(true);
        } else {
          // Error handling
          console.error('Booking failed:', response.data.message);
          
        }
      } catch (error) {
        console.error("Booking failed:", error.response ? error.response.data.message : error.message);
  
      }
    
    };
    

    const handleConfirmation = async () => {
      if (selectedTimingIndex !== null && selectedSlotId !== null) {
          const timing = timings[selectedTimingIndex];
          const slot = timing ? timing.timeSlots.find(slot => slot._id === selectedSlotId && new Date(slot.specificDate).toDateString() === selectedDate.toDateString()) : undefined;
    
          if (!timing || !slot) {
              console.error("Selected timing or slot is undefined.");
              toast.error("Failed to disable slot: Invalid slot data.");
              return;
          }
    
          const response = await disableTimeSlot(timing._id, slot._id, selectedDate);
          if (!response || response.status !== 200) {
              toast.error("Failed to disable slot.");
          } else {
              toast.success("Slot disabled successfully.");
              // Update state accordingly to reflect the disabled slot in UI
              setTimings(prevTimings => prevTimings.map(t => {
                  if (t._id === timing._id) {
                      return {
                          ...t,
                          timeSlots: t.timeSlots.map(s => s._id === slot._id ? { ...s, isAvailable: false } : s)
                      };
                  }
                  return t;
              }));
              setdisableConfirmation(false);
              setSelectedTimingIndex(null);
              setSelectedSlotIndex(null);
              setSelectedSlotId(null); // Clear selected slot ID
          }
      }
    };
    
  
    
  
  
  

  
  
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };


  const handleDoctorOfficeImageUpload = async (e) => {
    // Check if files are present
    if (!e.target.files || e.target.files.length === 0) {
      console.error('No files selected.');
      return;
    }
  
    // Get the first file from the list
    const file = e.target.files[0];
  
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'medipro'); // Use the appropriate upload preset
  
      const response = await axios.post('https://api.cloudinary.com/v1_1/dqrzdmgyl/image/upload', formData);
  
      const imageURL = response.data.secure_url;
  
      // Update the list of doctor office images with the new image URL
      setDoctor(prevDoctor => ({
        ...prevDoctor,
        listeImagesCabinet: [...prevDoctor.listeImagesCabinet, imageURL]
      }));
    } catch (error) {
      console.error('Error uploading doctor office image:', error);
    }
  };



  const handleClose = () => {
    setSelectedImage(null);
  };


// Function to handle adding images to the list
const handleAddImage = async (e) => {
  const file = e.target.files[0];

  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'medipro'); // Use the appropriate upload preset

    const response = await axios.post('https://api.cloudinary.com/v1_1/dqrzdmgyl/image/upload', formData);

    const imageURL = response.data.secure_url;

    // Update the list of doctor office images with the new image URL
    const updatedDoctor = {
      ...doctor,
      listeImagesCabinet: [...doctor.listeImagesCabinet, imageURL]
    };
    setDoctor(updatedDoctor);


    // Update the doctor profile in the backend
    await axios.put(`http://localhost:3000/api/medecins/updateProfil/${idMedecin}`, updatedDoctor);

    // Update the doctor state
  } catch (error) {
    console.error('Error uploading doctor office image:', error);
  }
};

// Function to handle deleting an image from the list
const handleDeleteImage = async (index) => {
  const updatedDoctor = {
    ...doctor,
    listeImagesCabinet: doctor.listeImagesCabinet.filter((_, i) => i !== index)
  };

  try {
    // Update the doctor profile in the backend
    setDoctor(updatedDoctor);

    await axios.put(`http://localhost:3000/api/medecins/updateProfil/${idMedecin}`, updatedDoctor);

    // Update the doctor state
  } catch (error) {
    console.error('Error deleting doctor office image:', error);
  }
};


const handleUploadButtonClick = () => {
  // Click the file input when the button is clicked
  if (fileInputRef.current) {
    fileInputRef.current.click();
  }
};


const disableTimeSlot = async (horaireId, slotId, specificDate) => {
  try {
    const formattedDate = new Date(specificDate).toISOString(); // Ensure ISO format
    const response = await axios.put(`http://localhost:3000/api/horaire/disable/${horaireId}/slot/${slotId}/${formattedDate}`);
    if (response.status === 200) {
      toast.success("Slot disabled successfully.");
      setTimings(prevTimings =>
        prevTimings.map(timing =>
          timing._id === horaireId ? {
            ...timing,
            timeSlots: timing.timeSlots.map(slot =>
              slot._id === slotId ? {
                ...slot,
                isAvailable: false,
                disabledDates: [...slot.disabledDates, formattedDate]
              } : slot
            )
          } : timing
        )
      );
    }
  } catch (error) {
    console.error("Error disabling time slot:", error);
    toast.error("Error disabling time slot.");
  }
};


const isDateDisabled = (slot, date) => {
  // Normalize the date to handle timezone differences
  const normalizeDate = (date) => {
    const localDate = new Date(date);
    localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
    return localDate.toISOString().split('T')[0];
  };

  const dateToCheck = normalizeDate(date);
  console.log(`Normalized selected date: ${dateToCheck}`);

  const isDisabled = slot.disabledDates && slot.disabledDates.some(disabledDate => {
    const disabledDateString = normalizeDate(disabledDate);
    console.log(`Normalized disabled date: ${disabledDateString}`);
    return disabledDateString === dateToCheck;
  });

  console.log(`Checking if date ${dateToCheck} is disabled: ${isDisabled}`);
  return isDisabled;
};










const handleSlotSelection = (timingIndex, slotIndex) => {
  console.log(`Slot selection - Timing Index: ${timingIndex}, Slot Index: ${slotIndex}`);

  const timing = filteredTimings[timingIndex];
  const filteredTimeSlots = timing.filteredTimeSlots || timing.timeSlots;

  if (!filteredTimeSlots) {
    console.error("Filtered time slots are undefined.");
    return;
  }

  const selectedSlot = filteredTimeSlots[slotIndex];
  if (!selectedSlot) {
    console.error("Selected slot is undefined.");
    return;
  }

  setSelectedTimingIndex(timingIndex);
  setSelectedSlotIndex(slotIndex);
  setSelectedTimeSlot(selectedSlot);
  setSelectedSlotId(selectedSlot._id);

  const isDisabled = isDateDisabled(selectedSlot, selectedDate);
  console.log(`Slot selected: ${selectedSlot.startTime}, isDisabled: ${isDisabled}`);

  if (userId === idMedecin) {
    setIsDisabling(!isDisabled); // Set the disabling state opposite of the current state
    setdisableConfirmation(true);
    console.log("Disable confirmation dialog should be open");
  } else if (!isDisabled) {
    setShowBookingForm(true);
    console.log("Booking form should be open");
  }
};









const renderSlotButtons = (timing, timingIndex) => (
  <div className="slot-buttons">
    {timing.timeSlots.map((slot, slotIndex) => {
      const isDisabled = isDateDisabled(slot, selectedDate);
      return (
        <button
          key={slotIndex}
          onClick={() => handleSlotSelection(timingIndex, slotIndex)}
          className={`slot-button ${isDisabled ? 'unavailable-slot' : ''}`}
        >
          {slot.startTime}
        </button>
      );
    })}
  </div>
);












const renderTimings = () => (
  filteredTimings.map((timing, timingIndex) => (
    <div key={timing._id} className="slot-container">
      <div>
        {editable ? (
          <input 
            type="text" 
            value={timing.heureDebut} 
            onChange={(e) => handleTimeChange(e, timing._id, 'heureDebut')} 
          />
        ) : (
          <p>Heure Debut: {timing.heureDebut}</p>
        )}
      </div>
      <div>
        {editable ? (
          <input 
            type="text" 
            value={timing.heureFin} 
            onChange={(e) => handleTimeChange(e, timing._id, 'heureFin')} 
          />
        ) : (
          <p>Heure Fin: {timing.heureFin}</p>
        )}
      </div>
      <div>
        {editable ? (
          <input 
            type="text" 
            value={timing.dureeRendezVous} 
            onChange={(e) => handleTimeChange(e, timing._id, 'dureeRendezVous')} 
          />
        ) : (
          <p>Duration of the Appointment: {timing.dureeRendezVous}</p>
        )}
      </div>
      {renderSlotButtons(timing, timingIndex)}
    </div>
  ))
);








const handleToggleSlotAvailability = async () => {
  if (selectedTimingIndex !== null && selectedSlotId !== null) {
    const timing = filteredTimings[selectedTimingIndex];
    const slot = timing ? timing.filteredTimeSlots[selectedSlotIndex] : undefined;

    if (!timing || !slot) {
      console.error("Selected timing or slot is undefined.");
      toast.error("Invalid slot data.");
      return;
    }

    try {
      const specificDate = new Date(selectedDate).toISOString(); // Ensure ISO format
      const url = `http://localhost:3000/api/horaire/toggleAvailability/${timing._id}/slot/${slot._id}/${specificDate}`;
      console.log("API URL:", url);

      const response = await axios.put(url);
      if (response.status === 200) {
        const toggledSlot = response.data.horaire.timeSlots.find(s => s._id === slot._id);
        toast.success(`Slot ${toggledSlot.isAvailable ? 'enabled' : 'disabled'} successfully.`);
        setTimings(prevTimings =>
          prevTimings.map(t =>
            t._id === timing._id ? {
              ...t,
              timeSlots: t.timeSlots.map(s =>
                s._id === slot._id ? { ...s, isAvailable: toggledSlot.isAvailable, disabledDates: toggledSlot.isAvailable ? [] : [...s.disabledDates, specificDate] } : s
              )
            } : t
          )
        );
        setdisableConfirmation(false);
      } else {
        throw new Error('Failed to toggle slot availability');
      }
    } catch (error) {
      console.error("Error toggling slot availability:", error.message);
      toast.error(`Error toggling slot availability: ${error.message}`);
    }
  }
};























const handleDeleteHoraire = async (horaireId) => {
  try {
    const response = await axios.delete(`http://localhost:3000/api/horaire/supprimerHoraire/${horaireId}`);
    if (response.status === 200) {
      toast.success('Horaire supprimé avec succès');
      // Update the timings state to remove the deleted horaire
      setTimings(prevTimings => prevTimings.filter(timing => timing._id !== horaireId));
    } else {
      toast.error('Erreur lors de la suppression de l\'horaire');
    }
  } catch (error) {
    console.error('Error deleting horaire:', error);
    toast.error('Erreur lors de la suppression de l\'horaire');
  }
};


const formatDateToLocalISO = (date) => {
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return localDate.toISOString().split('T')[0];
};



const isSameDate = (date1, date2) => {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
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
            <Snackbar
              open={notificationOpen}
              autoHideDuration={6000} // Adjust as per your requirement
              onClose={() => setNotificationOpen(false)}
            >
              <MuiAlert severity="success">
                Profile updated successfully
              </MuiAlert>
            </Snackbar>
            {editable ? (
              <input type="file" accept="image/*" onChange={handleProfileImageChange} />
            ) : (
              <img src={doctor.image} alt={doctor.name} className="profile-image" />
            )}
          </div>
          <div className="doctor-info">
            {/* Render input fields instead of plain text when in editing mode */}
            {editable ? (
              <>
                <div>
                  <label htmlFor="nom">Nom:</label>
                  <input id="nom" type="text" value={doctor.nom} onChange={(e) => setDoctor({ ...doctor, nom: e.target.value })} />
                </div>
                <div>
                  <label htmlFor="prenom">Prenom:</label>
                  <input id="prenom" type="text" value={doctor.prenom} onChange={(e) => setDoctor({ ...doctor, prenom: e.target.value })} />
                </div>
                <div>
                  <label htmlFor="age">Age:</label>
                  <input id="age" type="text" value={doctor.age} onChange={(e) => setDoctor({ ...doctor, age: e.target.value })} />
                </div>
                <div>
                  <label htmlFor="specialite">Specialite:</label>
                  <input id='specialite' type="text" value={doctor.specialite} onChange={(e) => setDoctor({ ...doctor, specialite: e.target.value })} />
                </div>
                <button className='saveBtn' onClick={handleSaveProfile}>Save</button>
              </>
            ) : (
              <>
                <h2>{doctor.nom} {doctor.prenom}</h2>
                <p>{doctor.age} years</p>
                <p className='speciality'> {doctor.specialite}</p>
              </>
            )}
            {userId === idMedecin && !editable && <button className='updateBtn' onClick={handleUpdateProfile}>Update Profile</button>}
          </div>
        </div>
      </div>
    </div>
    <div className="about">
      {editable ? (
        <div className="contact-info">
          <div>
            <h3>About</h3>
          </div>
          <div>
            <Phone /> <input type="text" value={doctor.numeroProfessionnel} onChange={(e) => setDoctor({ ...doctor, numeroProfessionnel: e.target.value })} />
          </div>
          <div>
            <Mail /> <input type="text" value={doctor.email} onChange={(e) => setDoctor({ ...doctor, email: e.target.value })} />
          </div>
          <div>
            <MapPin /> <input type="text" value={doctor.adresseCabinet} onChange={(e) => setDoctor({ ...doctor, adresseCabinet: e.target.value })} />
          </div>
        </div>
      ) : (
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
      )}
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
        {activeButton === 'Overview' && (
          <div className='overview'>
            {editable ? (
              <>
                <div>
                  <label htmlFor="nom">Nom:</label>
                  <input id="nom" type="text" value={doctor.nom} onChange={(e) => setDoctor({ ...doctor, nom: e.target.value })} />
                </div>
                <div>
                  <label htmlFor="prenom">Prenom:</label>
                  <input id="prenom" type="text" value={doctor.prenom} onChange={(e) => setDoctor({ ...doctor, prenom: e.target.value })} />
                </div>
                <div>
                  <label htmlFor="specialite">Specialite:</label>
                  <input id="specialite" type="text" value={doctor.specialite} onChange={(e) => setDoctor({ ...doctor, specialite: e.target.value })} />
                </div>
                <div>
                  <label htmlFor="tarif">Tarif:</label>
                  <input id="tarif" type="text" value={doctor.tarif} onChange={(e) => setDoctor({ ...doctor, tarif: e.target.value })} />
                </div>
                <div>
                  <label htmlFor="description">Description:</label>
                  <textarea id="description" value={doctor.description} onChange={(e) => setDoctor({ ...doctor, description: e.target.value })}></textarea>
                </div>
                <label htmlFor="signature">Signature:</label>
                <input 
                  id="signature" 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => setSignature(e.target.files[0])} 
                />
              </>
            ) : (
              <>
                <p className='name'>Dr.{doctor.nom} {doctor.prenom}</p>
                <p className='spec'> {doctor.specialite}</p>
                <p className='tarif'>Tarif: {doctor.tarif} dt</p>
                <p className='desc'>{doctor.description}</p>
              </>
            )}
          </div>
        )}
        {activeButton === 'Experience' && 
          <div className='experience'>
            <div className='experience-info'>
              {editable ? (
                <>
                  <div>
                    <label htmlFor="experience">Experience:</label>
                    <input id="experience" type="text" value={doctor.experience} onChange={(e) => setDoctor({ ...doctor, experience: e.target.value })} />
                  </div>
                </>
              ) : (
                <>
                  <p className='title-exp'>Experience</p>
                  <p className='experience-years'>{doctor.experience} years</p>
                </>
              )}
            </div>
            <div className='formation'>
              {editable ? (
                <>
                  <p className='title-exp'>Formation</p>
                  <table className='doctorprofile-table'>
                    <thead>
                      <tr>
                        <th>Institution</th>
                        <th>Year</th>
                        <th>Degree</th>
                      </tr>
                    </thead>
                    <tbody>
                      {doctor.formation.length === 0 ? (
                        <tr>
                          <td><input type="text" value="" onChange={(e) => handleEmptyFormationChange(e, 'nomInstitution')} /></td>
                          <td><input type="text" value="" onChange={(e) => handleEmptyFormationChange(e, 'anneeObtention')} /></td>
                          <td><input type="text" value="" onChange={(e) => handleEmptyFormationChange(e, 'diplome')} /></td>
                        </tr>
                      ) : (
                        doctor.formation.map((formationItem, index) => (
                          <tr key={index}>
                            <td><input type="text" value={formationItem.nomInstitution} onChange={(e) => handleFormationChange(e, index, 'nomInstitution')} /></td>
                            <td><input type="text" value={formationItem.anneeObtention} onChange={(e) => handleFormationChange(e, index, 'anneeObtention')} /></td>
                            <td><input type="text" value={formationItem.diplome} onChange={(e) => handleFormationChange(e, index, 'diplome')} /></td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </>
              ) : (
                <>
                  <p className='title-exp'>Formation</p>
                  <table className='doctorprofile-table'>
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
                </>
              )}
            </div>
          </div>
        }
        {activeButton === 'Reviews' && 
          <div className="reviews-container">
            {reviews.map((review, index) => (
              <div key={index} className="review">
                {editable && (
                  <div className="delete-icon" onClick={() => handleDeleteReview(review._id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-trash"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <line x1="4" y1="7" x2="20" y2="7" />
                      <line x1="10" y1="11" x2="10" y2="17" />
                      <line x1="14" y1="11" x2="14" y2="17" />
                      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                    </svg>
                  </div>
                )}
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
                      <p className='review-date'>{new Date(review.comment[0].date).toLocaleDateString("en-GB")}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {userId !== idMedecin && (
              <div className="add-review-form">

<ToastContainer />


                <Snackbar
                  open={notificationOpen}
                  autoHideDuration={6000} // Adjust as per your requirement
                  onClose={() => setNotificationOpen(false)}
                >
                  <MuiAlert severity="success">
                    Review added successfully
                  </MuiAlert>
                </Snackbar>
                <h2>Add Your Review</h2>
                <div className="rating">
                  <Rating
                    name="rating"
                    value={rating}
                    onChange={handleRatingChange}
                  />
                </div>
                <div className="comment">
                  <TextField
                    label="Comment"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={comment}
                    onChange={handleCommentChange}
                    fullWidth
                  />
                </div>
                <Button variant="contained" onClick={handleReviewSubmit}>Submit</Button>
              </div>
            )}
          </div>
        }
                   {activeButton === 'TimeTable' && (
          <>
            <div className="timetable">
              {userId === idMedecin && (
                <div>
                  <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                  />
                  <button className='addHoraire' onClick={handleAddHoraire}>Ajouter Horaire</button>
                  {showAddForm && (
                    <div className="add-form">
                      <h3>Ajouter un horaire</h3>
                      <form onSubmit={handleSubmit}>
                        <div>
                          <label>Jour:</label>
                          <input type="text" value={jour} onChange={(e) => setJour(e.target.value)} />
                        </div>
                        <div>
                          <label>Heure de début:</label>
                          <input type="text" value={heureDebut} onChange={(e) => setHeureDebut(e.target.value)} />
                        </div>
                        <div>
                          <label>Heure de fin:</label>
                          <input type="text" value={heureFin} onChange={(e) => setHeureFin(e.target.value)} />
                        </div>
                        <div>
                          <label>Durée du rendez-vous:</label>
                          <input type="text" value={dureeRendezVous} onChange={(e) => setDureeRendezVous(e.target.value)} />
                        </div>
                        <button type="submit">Ajouter</button>
                      </form>
                    </div>
                  )}
                  {editable && (
                    <div className="horaire-list">
                      <h3>Liste des Horaires</h3>
                      <ul>
                        {timings.map((timing, index) => (
                          <li key={index}>
                            <span>{timing.jour} : {timing.heureDebut} - {timing.heureFin}</span>
                            <IconButton onClick={() => handleDeleteHoraire(timing._id)}>
                              <DeleteIcon />
                            </IconButton>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="calendar-container">
              <div className="calendar">
                <h3>Select Date</h3>
                <Calendar value={selectedDate} onChange={handleDateChange} />
              </div>
              <div className="timings">
<h3>Timings for {selectedDate.toDateString()}</h3>
{filteredTimings.length > 0 ? (
 <div className="appointment-slots">
   {filteredTimings.map((timing, timingIndex) => (
     <div key={timing._id} className="slot-container">
       <div>
         {editable ? (
           <input type="text" value={timing.heureDebut} onChange={(e) => handleTimeChange(e, timing._id, 'heureDebut')} />
         ) : (
           <p>Heure Debut: {timing.heureDebut}</p>
         )}
       </div>
       <div>
         {editable ? (
           <input type="text" value={timing.heureFin} onChange={(e) => handleTimeChange(e, timing._id, 'heureFin')} />
         ) : (
           <p>Heure Fin: {timing.heureFin}</p>
         )}
       </div>
       <div>
         {editable ? (
           <input type="text" value={timing.dureeRendezVous} onChange={(e) => handleTimeChange(e, timing._id, 'dureeRendezVous')} />
         ) : (
           <p>Duration of the Appointment: {timing.dureeRendezVous}</p>
         )}
       </div>
 <div className="slot-buttons">
  {timing.timeSlots.map((slot, slotIndex) => {
    const isDisabled = isDateDisabled(slot, selectedDate);
    return (
      <button
        key={slotIndex}
        onClick={() => handleSlotSelection(timingIndex, slotIndex)}
        
        className={isDisabled ? 'unavailable-slot' : ''}
      >
        {slot.startTime}
      </button>
    );
  })}
</div>

     </div>
   ))}
 </div>
) : (
 <p>{doctor.nom} is not available on {selectedDate.toDateString()}</p>
)}
</div>
            </div>
            <Dialog open={showBookingForm} onClose={() => setShowBookingForm(false)}>
              <DialogTitle style={{ textAlign: 'center' }}>Book Appointment</DialogTitle>
              <DialogContent style={{ width: '500px'}}>
                <p>Selected Time: {selectedTimeSlot ? selectedTimeSlot.startTime : ''}</p>
                <p>Date: {selectedDate.toLocaleDateString()}</p>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setShowBookingForm(false)} color="secondary">
                  Cancel
                </Button>
                <Button onClick={handleSubmitBooking} color="primary">
                  Book Appointment
                </Button>
              </DialogActions>
              <Snackbar
                open={rdvnotification}
                autoHideDuration={6000}
                onClose={() => setrdvnotification(false)}
              >
                <MuiAlert severity="success">
                  Appointment request is sent successfully
                </MuiAlert>
              </Snackbar>
            </Dialog>
            <Dialog
  open={disableConfirmation}
  onClose={() => setdisableConfirmation(false)}
  aria-labelledby="alert-dialog-title"
  aria-describedby="alert-dialog-description"
>
  <DialogTitle id="alert-dialog-title">{isDisabling ? "Disable Slot" : "Enable Slot"}</DialogTitle>
  <DialogContent>
    <DialogContentText id="alert-dialog-description">
      Are you sure you want to {isDisabling ? "disable" : "enable"} this time slot?
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setdisableConfirmation(false)} color="primary">
      Cancel
    </Button>
    <Button onClick={handleToggleSlotAvailability} color="primary" autoFocus>
      {isDisabling ? "Disable" : "Enable"}
    </Button>
  </DialogActions>
</Dialog>





          </>
)}
</div> 




    </div>
    <div className="image-list">
      <h3>Doctor's Office Images</h3>
      {editable && (
        <div className="add-icon">
          <input
            type="file"
            accept="image/*"
            onChange={handleAddImage}
            style={{ display: 'none' }}
            ref={fileInputRef}
          />
          <IconButton onClick={handleUploadButtonClick}>
            <AddIcon />
          </IconButton>
        </div>
      )}
      <div className="image-grid">
        {doctor.listeImagesCabinet.map((image, index) => (
          <div className="image" key={index}>
            {editable && (
              <div className="delete-icon" onClick={() => handleDeleteImage(index)}>
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </div>
            )}
            <img src={image} alt={`Office ${index + 1}`} onClick={() => handleImageClick(image)} />
          </div>
        ))}
      </div>
      <Dialog open={!!selectedImage} onClose={handleClose}>
        <DialogContent>
          <img src={selectedImage} alt="Selected Office" style={{ maxWidth: '100%', height: 'auto' }} />
        </DialogContent>
      </Dialog>
    </div>
  </div>
);

};

export default DoctorProfile;