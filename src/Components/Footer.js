import React from 'react';
import './Footer.css';

function Footer() {


    return (

<div className="footer">
  <div className="footer-content">
    <div className="footer-section">
      <h3>Contact</h3>
      <p>medipro@gmail.com</p>
      <p>+21693970190</p>
      <p>Mahdia</p>
    </div>
    <div className="footer-section">
      <h3>Navigate</h3>
      <p>Home</p>
      <p>About</p>
      <p>Doctors</p>
      <p>Contact</p>
    </div>
    <div className="footer-section">
      <h3>Follow Us</h3>
      {/* Icons would be inserted here */}
      <p><span className="icon instagram-icon"></span></p>
      <p><span className="icon facebook-icon"></span></p>
    </div>
  </div>
  <div className="footer-bottom">
    <p>Copyright Notice: "© 2024 MediPro Connect. All rights reserved"</p>
  </div>
</div>





    );






}
export default Footer;
