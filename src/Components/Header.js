

import React, {useState} from 'react';
import './Header.css';
function Header() {


    const [showNotifications, setShowNotifications] = useState(false);
    const [showAccountOptions, setShowAccountOptions] = useState(false);
    const [language, setLanguage] = useState('en'); // Default language is English
    const [showLanguageOptions, setShowLanguageOptions] = useState(false);




    const toggleNotifications = () => setShowNotifications(!showNotifications);
    const toggleAccountOptions = () => {
        setShowAccountOptions(prevShow => !prevShow);
      };  

      const toggleLanguageOptions = () => setShowLanguageOptions(prevShow => !prevShow);



      const changeLanguage = (lang) => {
        setLanguage(lang);
        setShowLanguageOptions(false);
        // Add your language change logic here
      };

    return (
        <div className="header-container">
        <div className="logo">
            <img src="/images/logo.png" alt="Medi Pro Connect Logo"/>
        </div>
        <nav className='header-elements'>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#doctors">Doctors</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
        <div className="header-right">
        <div className="header-icons">
        <div className="icon-container">

        <span className="language-icon" onClick={toggleLanguageOptions}>🌐</span>
            {showLanguageOptions && (
              <div className="dropdown-menu language-dropdown">
                <p onClick={() => changeLanguage('en')}>English</p>
                <p onClick={() => changeLanguage('ar')}>العربية</p>
                <p onClick={() => changeLanguage('fr')}>Français</p>
              </div>
            )}

          <span className="notification-icon" onClick={toggleNotifications}>🔔</span>
          {showNotifications && (
            <div className="dropdown-menu notifications-dropdown">
              {/* List your notifications here */}
              <p>Notification 1</p>
              <p>Notification 2</p>
              {/* ... */}
            </div>
          )}
        </div>
        <div className="sign-in">
        <button onClick={toggleAccountOptions}>Sign In</button>
        {showAccountOptions && (
          <div className="dropdown-menu account-dropdown">
            <p>Sign in as a Doctor</p>
            <p>Sign in as a Patient</p>
          </div>
        )}
      </div>
      </div>
        </div>
    </div>
    );
  }
  export default Header;