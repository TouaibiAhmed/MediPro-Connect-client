import React, { useState } from 'react';
import './DoctorProfile.css';
import { Phone, Mail, MapPin } from 'react-feather'; // Import icons from react-feather

const doctor = {
  name: "Dr. John Doe",
  rate: 4, // Assuming the rate is out of 5 stars
  specialty: "Cardiologist",
  phone: "+1234567890",
  email: "john.doe@example.com",
  address: "123 Main Street, City, Country",
  image: "/images/doctor1.png" // Replace "doctor.jpg" with the path to your doctor's image
};

const DoctorProfile = () => {





  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (button) => {
    setActiveButton(button);
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
        <h2>{doctor.name}</h2>
        {/* Render stars for rate */}
        
        <p> {doctor.specialty}</p>
        <div className="rating">
          {'★'.repeat(doctor.rate)}
          {'☆'.repeat(5 - doctor.rate)}
        </div>
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
            <Phone /> {doctor.phone}
          </div>
          <div>
            <Mail /> {doctor.email}
          </div>
          <div>
            <MapPin /> {doctor.address}
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
          {activeButton === 'Overview' && <div>Overview Content</div>}
          {activeButton === 'Experience' && <div>Experience Content</div>}
          {activeButton === 'Reviews' && <div>Reviews Content</div>}
          {activeButton === 'Location' && <div>Location Content</div>}
          {activeButton === 'TimeTable' && <div>Time Table Content</div>}
        </div>
      </div>

      <div className="image-list">
        <h3>Doctor's Office Images</h3>
        <div className="image">
          <img src="/images/bac1.jpg" alt="Office" />
        </div>
        <div className="image">
          <img src="/images/bac2.jpg" alt="Office" />
        </div>
        {/* Add more images as needed */}
      </div>



    </div>
  );
};

export default DoctorProfile;
