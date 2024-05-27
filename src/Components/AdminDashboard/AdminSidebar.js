import React, { useState } from 'react';
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
import { Dashboard, People, Group, Description, Settings } from '@mui/icons-material';

const Sidebar = () => {
  const [selected, setSelected] = useState('dashboard');

  const handleButtonClick = (button) => {
    setSelected(button);
  };

  return (
    <Box bgcolor="#f0f0f0" height="100vh" p={2} item="true" xs={3} style={{ position: 'fixed', height: '100vh', width: '250px', top: '80px', overflowY: 'auto' }}>
      {/* Doctor's profile */}
      <Grid container direction="column" alignItems="center">
        <Avatar alt="Doctor" sx={{ width: 100, height: 100, marginBottom: 5 }} />
        <Typography variant="h6" gutterBottom>
          Admin
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom></Typography>
      </Grid>
      {/* Navigation buttons */}
      <List>
        <ListItemButton sx={{ mb: 1 }} onClick={() => handleButtonClick('dashboard')} selected={selected === 'dashboard'}>
          <ListItemIcon><Dashboard /></ListItemIcon>
          <Link to={`/admin/admindash`} style={{ textDecoration: 'none', color: 'inherit' }}><ListItemText primary="Dashboard" /></Link>
        </ListItemButton>
        <ListItemButton sx={{ mb: 1 }} onClick={() => handleButtonClick('doctors')} selected={selected === 'doctors'}>
          <ListItemIcon><People /></ListItemIcon>
          <Link to={`/admin/doctorslist`} style={{ textDecoration: 'none', color: 'inherit' }}><ListItemText primary="Doctors" /></Link>
        </ListItemButton>
        <ListItemButton sx={{ mb: 1 }} onClick={() => handleButtonClick('patients')} selected={selected === 'patients'}>
          <ListItemIcon><Group /></ListItemIcon>
          <Link to={`/admin/patients`} style={{ textDecoration: 'none', color: 'inherit' }}><ListItemText primary="Patients" /></Link>
        </ListItemButton>
        <ListItemButton sx={{ mb: 1 }} onClick={() => handleButtonClick('requests')} selected={selected === 'requests'}>
          <ListItemIcon><Description /></ListItemIcon>
          <Link to={`/admin/requests`} style={{ textDecoration: 'none', color: 'inherit' }}><ListItemText primary="Doctor Requests" /></Link>
        </ListItemButton>
        <ListItemButton sx={{ mb: 1 }}>
          <ListItemIcon><Settings /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default Sidebar;
