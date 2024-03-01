import React, { useState } from 'react';
import './Header.css';

import { useDispatch } from 'react-redux';
import { setUserType } from '../Redux/action/userActions'; // Adjust the import path as necessary

function Header() {
    const [showNotifications, setShowNotifications] = useState(false);
    const [notificationCount, setNotificationCount] = useState(0); // State to keep track of notification count
    const [showAccountOptions, setShowAccountOptions] = useState(false);
    const [language, setLanguage] = useState('en'); // Default language is English
    const [showLanguageOptions, setShowLanguageOptions] = useState(false);


    const dispatch = useDispatch();

    const selectUserType = (type) => {
        dispatch(setUserType(type));
    };


    const toggleNotifications = () => setShowNotifications(!showNotifications);
    const toggleAccountOptions = () => setShowAccountOptions(prevShow => !prevShow);
    const toggleLanguageOptions = () => setShowLanguageOptions(prevShow => !prevShow);

    const changeLanguage = (lang) => {
        setLanguage(lang);
        setShowLanguageOptions(false);
        // Add your language change logic here
    };

    // Function to handle new notifications
    const handleNewNotification = () => {
        setNotificationCount(prevCount => prevCount + 1); // Increment notification count
        // Handle other notification logic as needed
    };

    return (
        <div className="header-container">
            <div className="logo">
                <img src="/images/logo.png" alt="Medi Pro Connect Logo" />
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

                        {/* Notification icon with badge */}
                        <span className="notification-icon" onClick={toggleNotifications}>
                            🔔 {notificationCount > 0 && <span className="badge">{notificationCount}</span>}
                        </span>
                        {showNotifications && (
                            <div className="dropdown-menu notifications-dropdown">
                                {/* List your notifications here */}
                                <p>Notification 1</p>
                                <p>Notification 2</p>
                                {/* ... */}
                            </div>
                        )}
                    </div>
                    
            {/* Other header content */}
            <div className="sign-in">
                <button onClick={toggleAccountOptions}>Sign In</button>
                {showAccountOptions && (
                    <div className="dropdown-menu account-dropdown">
                        <p onClick={() => selectUserType('medecin')}>Sign in as a Doctor</p>
                        <p onClick={() => selectUserType('patient')}>Sign in as a Patient</p>
                    </div>
                )}
            </div>
        </div>
                </div>
            </div>
        
    );
}

export default Header;
