import React from 'react';
import "./About.css";

const About = () => { 
  

return(

<div className='aboutUS' >

    <div className="about-us-header">
    <h1 className='aboutuss'>About Us</h1>
  </div>


  <div className="aboutUs-section">
     
      <div className="aboutUs-section-right">
        <h2 className='aboutush2'>Who Are We?</h2>
        <p className="about-description">
          
MediPro Connect is a dedicated team of healthcare and technology experts. Our platform streamlines medical information and appointment management for practitioners, allowing them to focus on delivering quality patient care.
        </p>
        <ul className="about-list">
        <li><img src="/images/coche.png" alt="Check" className="check-icon"/>Seamless integration with existing medical systems for smooth adoption.</li>
        <li><img src="/images/coche.png" alt="Check" className="check-icon"/>User-friendly interface simplifying scheduling, record-keeping, and communication.</li>
        <li><img src="/images/coche.png" alt="Check" className="check-icon"/>Robust security measures ensuring confidentiality and integrity of patient data.</li>
        </ul>
        <button className="about-button">Connect Now</button>
      </div>
      <div className="aboutUs-section-left">
        <img 
          src="/images/about1.png" 
          alt="About Us" 
          className="about-image" 
        />
      </div>
    </div>









  
  <div className="aboutUs-section">
      <div className="aboutUs-section-left">
        <img 
          src="/images/about2.gif" 
          alt="About Us" 
          className="about-image" 
        />
      </div>
      <div className="aboutUs-section-right">
        <h2 className='aboutush2'>For Patients</h2>
        <p className="about-description">
        Seeking medical advice or an appointment? Look no further than MediPro Connect.

</p>
<p className="about-description"> MediPro Connect is an innovative platform designed to provide quick access to nearby healthcare professionals 
and book appointments online, all at no cost to you. Experience convenience and peace of mind with our user-friendly service."


</p>
      </div>
    </div>







    <div className="aboutUs-section">
     
      <div className="aboutUs-section-right">
        <h2 className='aboutush2'>For Doctors</h2>
        <p className="about-description">
          
        MediPro Connect provides a comprehensive medical practice management service, streamlining your organization and saving you valuable time.
                </p>


        <p className="about-description">Share your real-time availability with patients
         according to your criteria while retaining control over your medical schedule.</p>
      </div>
      <div className="aboutUs-section-left">
        <img 
          src="/images/about3.gif" 
          alt="About Us" 
          className="about-image" 
        />
      </div>
    </div>









 


</div>
);
};
export default About;