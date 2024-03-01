import React from 'react';
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









  return (
    <div className="home-container">
      <header className="header">
      <div className="header-content">
        <h1>Effortless Healthcare Planning:
            </h1> <h1>Simplifying Appointment Bookings</h1>
        <p>Simplify your healthcare – easy scheduling, automated reminders</p>
        <p>and real-time updates. Your appointments, effortlessly managed.</p>
        <div className='book-an-appointment'>
          <button className="btn-appointment">Book An Appointment</button>
          </div>
        
        </div>  
        <div className="header-image">
         <img src="/images/joni.png" className='doctor-img'/>     
    </div>
      </header>
      
      <div className="search-bar-container">
  <input type="text" className="search-input" placeholder="Search doctors, adress, speciality" />
  <button className="search-btn">Search</button>
</div>

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
