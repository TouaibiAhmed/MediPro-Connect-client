import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import {
  Avatar,
  Box,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';
import { Dashboard, Event, EventNote, Description, Settings } from '@mui/icons-material';

import { GiftOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';


const avatarStyles = {
    width: 100,
    height: 100,
    marginBottom: 5,
  };

  const iconStyles = { color: '#0B60B0' };

  const defaultSelected = 'dashboard';



const Sidebar = () => {


    const [selected, setSelected] = useState(defaultSelected);

 // Handler function to update the selected button
 const handleButtonClick = (button) => {
    setSelected(button);
  };


  return (
    <Box bgcolor="#f0f0f0" height="100vh" p={2} item xs={3} style={{ position: 'fixed', height: '100vh', width: '250px',   top: '80px' ,overflowY: 'auto' }}>
    {/* Doctor's profile */}
    <Grid container direction="column" alignItems="center" >
      <Avatar src="/path/to/doctor-image.jpg" alt="Doctor" sx={avatarStyles} />
      <Typography variant="h6" gutterBottom>
        Dr. John Doe
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Neurosurgeon
      </Typography>
    </Grid>     
    {/* Navigation buttons */}
    <List>
    <ListItemButton sx={{ mb: 1 }}  onClick={() => handleButtonClick('dashboard')} selected={selected === 'dashboard'}>
          <ListItemIcon>
            <Dashboard  style={iconStyles}/>

          </ListItemIcon>
          <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItemText primary="Dashboard" />
        </Link>
        </ListItemButton>
        <ListItemButton sx={{ mb: 1 }} onClick={() => handleButtonClick('calendar')} selected={selected === 'calendar'}>
          <ListItemIcon>
            <Event  style={iconStyles}/>
          </ListItemIcon>
          <Link to="/dashboard/calendar" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItemText primary="Calendar" />
        </Link>
        </ListItemButton>
        <ListItemButton sx={{ mb: 1 }} onClick={() => handleButtonClick('appointments')} selected={selected === 'appointments'}>
          <ListItemIcon>
            <GiftOutlined  style={iconStyles}/>
          </ListItemIcon>
          <Link to="/dashboard/appointments" style={{ textDecoration: 'none', color: 'inherit' }}>

          <ListItemText primary="Appointments" />
          </Link>
        </ListItemButton>
        <ListItemButton sx={{ mb: 1 }}>
          <ListItemIcon>
            <MessageOutlined  style={iconStyles} />
          </ListItemIcon>
          <ListItemText primary="Patients History" />
        </ListItemButton>
        <ListItemButton sx={{ mb: 1 }}>
          <ListItemIcon>
            <Description  style={iconStyles}/>
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItemButton>
        <ListItemButton sx={{ mb: 1 }}>
          <ListItemIcon>
            <SettingOutlined style={iconStyles} />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>
      </List>
  </Box>
);
};



export default Sidebar;