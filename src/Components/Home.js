import React, { useState, useEffect } from 'react';
import './Home.css'; // Make sure to create an App.css file for the CSS

function Home() { 



  const departments = [
    { name: 'General Practitioner', icon: '/images/generalist.png' },
    { name: 'Dental Care', icon: '/images/dental.png' },
    { name: 'Psychologist', icon: '/images/psy.png' },
    { name: 'Internal Medicine', icon: '/images/internal.png' },
    { name: 'Pediatrics', icon: '/images/pediatrics.png' },
    { name: 'Obstetrics and Gynecology', icon: '/images/maternity.png' },
    { name: 'Cardiology', icon: '/images/cardiology.png' },
    { name: 'Osteopath', icon: '/images/orthopedics.png' },
    { name: 'Radiology', icon: '/images/x-ray.png' },
    { name: 'Dermatologist', icon: '/images/dermatology.png' }


    // ...add more departments as needed
  ];

  
  const headerBackgrounds = [
    '/images/bac1.jpg',
    '/images/bac2.jpg',
    '/images/bac3.jpg',
    '/images/bac4.jpg',
    '/images/bac5.jpg',
    '/images/bac6.jpg',
    '/images/bac7.jpg',
    '/images/bac8.jpg',
    '/images/bac9.jpg',
    '/images/bac10.jpg',
    '/images/bac11.jpg',
    '/images/bac12.jpg',
    '/images/bac13.jpg',
    '/images/bac14.jpg',
    '/images/bac15.jpg',
    '/images/bac16.jpg',
    '/images/bac17.jpg',
    '/images/bac18.jpg'





  ];


  const [backgroundImage, setBackgroundImage] = useState(headerBackgrounds[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % headerBackgrounds.length;
        setBackgroundImage(headerBackgrounds[nextIndex]);
        return nextIndex;
      });
    }, 5000); // Change image every 5000 milliseconds (5 seconds)
    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, []);





  return (
    <div className="home-container">
      <header className="header" style={{ backgroundImage: `url(${backgroundImage})` }}>
  <div className="header-content">
    <div className="title-container">
      <h1>Simplifying Appointment Bookings</h1>
      <p>Simplify your healthcare – easy scheduling, automated reminder</p>
      <p>and real-time updates. Your appointments, effortlessly managed.</p>
    </div>
    <div className="search-container">
    <div className="search-field">
  <img src="/images/gps.png" alt="Location Icon" className="search-field-icon" />
  <input type="text" placeholder="Location:" className="search-input" />
</div>
<div className="search-field">
  <img src="/images/doc.png" alt="Doctor Icon" className="search-field-icon" />
  <input type="text" placeholder="Doctor Name:" className="search-input" />
</div>

      <button className="search-btn">Search</button>
    </div>
  </div>
  <div className="header-image">
    <img src="/path-to-your-background-image.jpg" className='header-background-img'/> 
  </div>
</header>


<section className="how-it-works-section">
  <h2 className="how-it-works-title">How It Works!</h2>
  <p className="how-it-works-description">
    Discover, book, and experience personalized healthcare effortlessly with our user-friendly Doctor Appointment Website.
  </p>
  <div className="how-it-works-steps">
    <div className="step">
      <div className="icon-wrapper">
      <span className="step-number">1</span> 

      <img src='/images/icons-doctor.png'/>
      </div>
      <h3>Find A Doctor</h3>
      <p>Discover skilled doctors based on specialization and location.</p>
    </div>
    <div className="step">
      <div className="icon-wrapper">
      <span className="step-number">2</span> 

      <img src='/images/icons-appointment.png' className='step-icon'/>

      </div>
      <h3>Book Appointment</h3>
      <p>Effortlessly book appointments at your convenience.</p>
    </div>
    <div className="step">
      <div className="icon-wrapper">
      <span className="step-number">3</span> 

      <img src='/images/icons-bag.png'/>
      </div>
      <h3>Get Services</h3>
      <p>Receive personalized healthcare services tailored to your needs.</p>
    </div>
  </div>
</section>


<section className="departments-section">
  
<h2 className="departments-title">Our Departments</h2>
  <div className="departments-container">
    {departments.map((department, index) => (
      <div key={index} className="department-card">
        <img src={department.icon} alt={`${department.name} Icon`} className="icon" />
        <h3 className="department-title">{department.name}</h3>
      </div>
    ))}
  </div>
  <h3 className='more'> See More..→</h3>
</section>



<section className="about-us-section">
  <div className="about-us-container">
    <div className="about-us-image">
      <img src="/images/about-us.png" alt="About Us" className='about-img' />
    </div>
    <div className="about-us-content">
      <h2 className="about-us-title">About Us</h2>
      <p className="about-us-paragraph">
      We are passionate about revolutionizing healthcare management. Our dedicated team believes in simplifying
      the patient experience through innovative solutions. With a focus on user-friendly design and cutting-edge technology, 
      we aim to empower both healthcare providers and patients. Discover a new era of seamless and secure healthcare with us.
      </p>
      <button className="about-us-button">Learn More</button>
    </div>
  </div>
</section>


    
    
    
      </div>






  
  );
}

export default Home;
