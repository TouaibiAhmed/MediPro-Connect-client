import React from 'react';
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <div className='footerr'>
        <div className="logo-footer">
          <img src="/images/logo1.png" alt="" className='footer-logo'/>
        </div>
        <div className="footer-section contactt">
          <h3>Contact</h3>
          <ul>
            <li><img src="/images/mail.png" alt="Mail" /> MediPro-Connect@gmail.com</li>
            <li><img src="/images/phone.png" alt="Phone" /> 123-456-7890</li>
            <li><img src="/images/loc.png" alt="Location" /> Mahdia, Tunisia</li>
          </ul>
        </div>
        <div className="footer-section navigate">
          <h3>Navigate</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Doctors </a></li>
            <li><a href="#">Contact </a></li>
          </ul>
        </div>
        <div className="footer-section lang">
          <h3>Language</h3>
          <ul>
            <li><a href="#">English</a></li>
            <li><a href="#">Frensh </a></li>
          </ul>
        </div>
        <div className="footer-section follow-us">
          <h3>Follow Us</h3>
          <ul>
            <img src="/images/fb.png" className="iconfb" alt="Facebook" />
            <img src="/images/x.png" className="iconig" alt="Instagram" />
          </ul>
        </div>
      </div>
      <nav className='footer-nav'>
        <p> Copyright Notice:<b> MediPro Connect</b>© 2024 All rights reserved </p>
      </nav>
    </footer>
  );
}

export default Footer;
