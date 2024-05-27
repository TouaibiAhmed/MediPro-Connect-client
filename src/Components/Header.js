            import React, { useState, useEffect } from 'react';
            import './Header.css';

            import { useDispatch } from 'react-redux';
            import { setUserType } from '../Redux/action/userActions'; // Adjust the import path as necessary

            import { AppBar, Toolbar, IconButton, Menu, MenuItem, Avatar, Button, Popover, Typography, Badge} from '@material-ui/core';
            import { Notifications as NotificationsIcon, Language as LanguageIcon } from '@material-ui/icons';import { Menu as MenuIcon } from '@material-ui/icons';

            import { useSelector } from 'react-redux'; // Import useSelector from react-redux


            import { useNavigate,Link } from "react-router-dom";


            import axios from 'axios';



            import Snackbar from '@mui/material/Snackbar';

            import MuiAlert from '@mui/material/Alert';
                





            function Header() {

                const [notificationOpen, setNotificationOpen] = useState(false);

                const [showAccountOptions, setShowAccountOptions] = useState(false);
                const [showSignUpOptions, setShowSignUpOptions] = useState(false);

                const [language, setLanguage] = useState('en'); // Default language is English
                const [showLanguageOptions, setShowLanguageOptions] = useState(false);

                const [profileImage, setProfileImage] = useState(null); // State to store the profile image URL


                const [anchorElLanguage, setAnchorElLanguage] = useState(null);
                const [anchorElNotifications, setAnchorElNotifications] = useState(null);

                const [notifications, setNotifications] = useState([]); // State to hold notifications

                const [unreadNotifications, setUnreadNotifications] = useState(notifications.length);


                // Get user authentication state from Redux store
            const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
            const userType = useSelector(state => state.user.userType); // Get user type from Redux store


                const dispatch = useDispatch();

                const selectUserType = (type) => {
                    dispatch(setUserType(type));
                };

                const userId = sessionStorage.getItem('userId');


                

                const toggleAccountOptions = (event) => {
                setShowAccountOptions(!showAccountOptions);
                setAnchorElLanguage(null); // Close language menu if open
                setAnchorElNotifications(null); // Close notifications menu if open
            };



            const toggleSignUpOptions = (event) => {
                setShowSignUpOptions(!showSignUpOptions);

                setShowAccountOptions(null);
                setAnchorElLanguage(null); // Close language menu if open
                setAnchorElNotifications(null); // Close notifications menu if open
            };




            const toggleLanguageOptions = (event) => {
                setAnchorElLanguage(event.currentTarget);
                setAnchorElNotifications(null); // Close notifications menu if open
            };




                const changeLanguage = (lang) => {
                    setLanguage(lang);
                    setShowLanguageOptions(false);
                    // Add your language change logic here
                };



                // Function to handle new notifications
            // Function to handle new notifications
            const toggleNotifications = (event) => {
                setAnchorElNotifications(currentAnchor => {
                    const newAnchor = currentAnchor ? null : event.currentTarget;
                    console.log("New anchorElNotifications:", newAnchor);
                    if (!currentAnchor) { // This condition checks if the popover is about to open
                        setUnreadNotifications(0);
                    }
                    return newAnchor;
                });
            };
            
                
                
                
                
                





            const openLanguageMenu = Boolean(anchorElLanguage);
            const openNotificationsMenu = Boolean(anchorElNotifications);

            const languageMenuId = openLanguageMenu ? 'language-menu' : undefined;
            const notificationsMenuId = openNotificationsMenu ? 'notifications-menu' : undefined;


            console.log("Open state:", openNotificationsMenu, "Anchor element:", anchorElNotifications);






            useEffect(() => {
                const fetchNotifications = async () => {
                    if (userId && userType) {  // Ensure userType is also considered
                        const model = userType === 'patient' ? 'Patient' : 'Medecin';  // Adjust if the userType values differ
                        try {
                            const response = await axios.get(`http://localhost:3000/api/notification/getNotifications/${userId}?model=${model}`);
                            console.log("Fetched notifications:", response.data);
                            setNotifications(response.data);

                            setUnreadNotifications(response.data.filter(notif => notif.status === 'unread').length);


                        } catch (error) {
                            console.error('Error fetching notifications:', error);
                        }
                    }
                };
                fetchNotifications();
            }, [userId, userType]);  // Include userType as a dependency
            

            useEffect(() => {
                console.log("anchorElNotifications changed to:", anchorElNotifications);
            }, [anchorElNotifications]);
            


                const [anchorEl, setAnchorEl] = useState(null);

                const handleMenuClick = (event) => {
                setAnchorEl(event.currentTarget);
                };
            
                const handleMenuClose = () => {
                setAnchorEl(null);
                };

                const navigate = useNavigate();




                const handleDashboardClick = () => {
                    const userId = sessionStorage.getItem('userId');
                    if (isAuthenticated) {
                    if (userType === 'medecin') {
                        navigate(`/dashboard/${userId}/dash`); 
                    }
                    }
                };
            





                const handleProfileClick = () => {
                const userId = sessionStorage.getItem('userId');
                if (isAuthenticated) {
                    if (userType === 'patient') {
                    navigate(`/profile/patient/${userId}`); // Redirect to patient profile page with user ID
                    } else if (userType === 'medecin') {
                    navigate(`/profile/medecin/${userId}`); // Redirect to medecin profile page with user ID
                    }
                }
                };


            console.log(userId);
                useEffect(() => {
                // Store authentication status in localStorage
                localStorage.setItem('isAuthenticated', isAuthenticated);
                localStorage.setItem('userType', userType);
                localStorage.setItem('userId', userId);
                }, [isAuthenticated, userType, userId]);
                







                useEffect(() => {
                    const fetchProfileImage = async () => {
                        try {
                            let apiUrl;
                            if (userType === 'patient') {
                                const idPatient = userId;
                                apiUrl = `http://localhost:3000/api/patient/consulterprofil/${idPatient}`;
                            } else if (userType === 'medecin') {
                                const id = userId;

                                apiUrl = `http://localhost:3000/api/medecins/consulterprofil/${id}`;
                            }
                
                            const response = await axios.get(apiUrl);
                            const data = response.data;
                            console.log('Response data:', data);
                
                            // Assuming the profile image URL is stored in the 'image' field of the response
                            if (data.image) {
                                setProfileImage(data.image);
                            }
                        } catch (error) {
                            console.error('Error fetching profile image:', error);
                        }
                    };
                
                    if (userId) {
                        fetchProfileImage();
                    }
                }, [userId, userType]);


                const handleLogout = async () => {
                    try {
                        // Call the logout endpoint on the server
                        await axios.post('http://localhost:3000/api/patient/logout');
                        sessionStorage.removeItem('userId');
                        navigate('/');
                        setNotificationOpen(true);


                    } catch (error) {
                        console.error("Error during logout:", error);
                        // Handle error
                    }
                };





                return (
                <div className="header-container">
                        <Snackbar
                open={notificationOpen}
                autoHideDuration={6000} // Adjust as per your requirement
                onClose={() => setNotificationOpen(false)}
            >
                <MuiAlert  severity="success">
                Logout successfully
                </MuiAlert >
            </Snackbar>
                <div className="logo">
                    <img src="/images/logo.png" alt="Medi Pro Connect Logo" />
                </div>
                <nav className='header-elements'>
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/about'>About</Link></li>
                        <li><Link to='/services'>Services</Link></li>
                        <li><Link to='/doctors'>Doctors</Link></li>
                        <li><Link to='/contact'>Contact</Link></li>
                    </ul>
                </nav>
                <div className="header-rightt">
                    <div className="header-iconss" >
                        <IconButton aria-label="language" onClick={toggleLanguageOptions}>
                            <LanguageIcon style={{color: "#0B60B0"}}/>
                        </IconButton>
                        <Popover
                            id={languageMenuId}
                            open={openLanguageMenu}
                            anchorEl={anchorElLanguage}
                            onClose={toggleLanguageOptions}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >
                            <div className="dropdown-menu language-dropdown">
                                <Typography onClick={() => changeLanguage('en')}>English</Typography>
                                <Typography onClick={() => changeLanguage('ar')}>العربية</Typography>
                                <Typography onClick={() => changeLanguage('fr')}>Français</Typography>
                            </div>
                        </Popover>





                        <IconButton id="notifications-icon" aria-label="notifications" onClick={toggleNotifications}  >
                        <Badge badgeContent={unreadNotifications > 0 ? unreadNotifications : null} color="secondary">
                    <NotificationsIcon style={{color: "#0B60B0"}} />
                </Badge>
            </IconButton>
            {anchorElNotifications && (

            <Popover
                id="notifications-menu"
                open={Boolean(anchorElNotifications)}
                anchorEl={anchorElNotifications}
                onClose={() => setAnchorElNotifications(null)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                style={{ zIndex: 2100 }} // Ensure this z-index is high enough

            >       
            <div className="notifications-dropdown">
        <div className="notifications-header">
            <Typography variant="subtitle1">Today</Typography>
            <Typography variant="subtitle1">Previous</Typography>
            <div>
                <Button size="small">Mark as read</Button>
                <Button size="small">Clear all</Button>
            </div>
        </div>
        {notifications.map((notification, index) => (
                <div key={notification._id || index} className={`notification-item ${notification.type}`}>
                <Avatar src={notification.sender.image} alt="User Avatar" className="avatar" />
                <div className="notification-content">
                <Typography variant="body2"><strong>{notification.sender.name}:</strong> {notification.message}</Typography>
                <Typography variant="caption">{new Date(notification.createdAt).toLocaleTimeString()}</Typography>
                </div>
            </div>
        ))}
        <div className="view-more">
            <Button size="small">View previous notifications</Button>
        </div>
    </div>
</Popover>
            )}

                        </div>
                    {userId ? (
                    <div style={{ display: 'flex', alignItems: 'center', marginRight:'55px' }}>
                    <AppBar position="static" elevation={0} style={{ backgroundColor: 'white', boxShadow: 'none' , zIndex: 1}}>
                        <Toolbar>
                            <IconButton edge="start"  color="black" aria-label="menu" onClick={handleMenuClick}>
                                <MenuIcon style={{color: "#0B60B0"}}/>
                            </IconButton>
                            <Menu style={{marginTop: '45px'}}
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                            >
                                <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                                {userType === 'medecin' && <MenuItem onClick={handleDashboardClick}>Dashboard</MenuItem>} 
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>

                                {/* Add more menu items as needed */}
                            </Menu>
                            <div style={{ flexGrow: 1 }} />
                        </Toolbar>
                    </AppBar>
                    <Avatar alt="User Avatar" src={profileImage} style={{ marginLeft: '-25px', position: 'relative', zIndex: 1}}  />
                </div>
                    
                    ) : (



            <div className='btns'>



                        
                        <div className="sign-up">
                            <button onClick={toggleSignUpOptions}>Sign Up</button>
                            {showSignUpOptions && (
                                <div className="dropdown-menuu account-dropdown">
                                    <Link to="/signup/doctor">
                                    <p onClick={() => selectUserType('medecin')}>Sign up as a Doctor</p>
                                    </Link>
                                    <Link to="/signup/patient">

                                    <p onClick={() => selectUserType('patient')}>Sign up as a Patient</p>
                                                            </Link>

                                </div>
                            )}
                        </div>

            <div className="sign-in">
                            <button onClick={toggleAccountOptions}>Sign In</button>
                            {showAccountOptions && (
                                <div className="dropdown-menu account-dropdown">
                                                            <Link to="/SignIn">

                                    <p onClick={() => selectUserType('medecin')}>Sign in as a Doctor</p>
                                    </Link>


                                    <Link to="/SignIn">

                                    <p onClick={() => selectUserType('patient')}>Sign in as a Patient</p>
                                    </Link>
                                </div>
                            )}
                        </div>
            </div>
                    )}




                </div>
            </div>
            );
            };

            export default Header;
