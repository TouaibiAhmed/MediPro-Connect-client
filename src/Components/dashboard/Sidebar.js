import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';


import { useParams } from 'react-router-dom';


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
    const [doctorData, setDoctorData] = useState(null);

const {id} = useParams();
console.log(id);
 // Handler function to update the selected button
 const handleButtonClick = (button) => {
    setSelected(button);
  };






  useEffect(() => {
    // Function to fetch doctor's profile data
    const fetchDoctorData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/medecins/consulterProfil/${id}`);
        setDoctorData(response.data);
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      }
    };

    fetchDoctorData(); // Call the function when component mounts
  }, [id]);











  return (
<Box bgcolor="#f0f0f0" height="100vh" p={2} item="true" xs={3} style={{ position: 'fixed', height: '100vh', width: '250px',   top: '80px' ,overflowY: 'auto' }}>
    {/* Doctor's profile */}
    {doctorData && (
    <Grid container direction="column" alignItems="center" >
      <Avatar src={doctorData.image} alt="Doctor" sx={avatarStyles} />
      <Typography variant="h6" gutterBottom>
      {doctorData.nom}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
      {doctorData.specialite}

      </Typography>
    </Grid>   
       )}  
    {/* Navigation buttons */}
    <List>
    <ListItemButton sx={{ mb: 1 }}  onClick={() => handleButtonClick('dashboard')} selected={selected === 'dashboard'}>
          <ListItemIcon>
            <Dashboard  style={iconStyles}/>

          </ListItemIcon>
          <Link to={`/dashboard/${id}/dash`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItemText primary="Dashboard" />
        </Link>
        </ListItemButton>
        <ListItemButton sx={{ mb: 1 }} onClick={() => handleButtonClick('calendar')} selected={selected === 'calendar'}>
          <ListItemIcon>
            <Event  style={iconStyles}/>
          </ListItemIcon>
          <Link to={`/dashboard/${id}/calendar`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItemText primary="Calendar" />
        </Link>
        </ListItemButton>
        <ListItemButton sx={{ mb: 1 }} onClick={() => handleButtonClick('appointments')} selected={selected === 'appointments'}>
          <ListItemIcon>
            <GiftOutlined  style={iconStyles}/>
          </ListItemIcon>
          <Link to={`/dashboard/${id}/appointments`} style={{ textDecoration: 'none', color: 'inherit' }}>

          <ListItemText primary="Appointments" />
          </Link>
        </ListItemButton>
        <ListItemButton sx={{ mb: 1 }} onClick={() => handleButtonClick('patientsHistory')} selected={selected === 'patientsHistory'}>
          <ListItemIcon>
            <MessageOutlined  style={iconStyles} />
          </ListItemIcon>
          <Link to={`/dashboard/${id}/patientsHistory`} style={{ textDecoration: 'none', color: 'inherit' }}>

          <ListItemText primary="Patients History" />
          </Link>
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