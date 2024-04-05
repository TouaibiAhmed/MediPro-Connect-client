import React from 'react';
import './Contact.css';
import { Grid, Paper, TextField, Button, Typography } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function Contact() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div>
      <div className="contact-header">
        <h1 className='contact'>Contact Us</h1>
      </div>
      
      <Grid container spacing={2} justifyContent="center" style={{ marginTop: '50px', marginBottom: '60px', marginLeft: '10px'}}>
        {/* Left side: Contact Form */}
        <Grid item xs={12} sm={5} style={{height: '600px'}}>
          <Paper elevation={3} className="contact-form" style={{ padding: '20px', height: '100%', width: '90%' }}>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Message"
                variant="outlined"
                margin="normal"
                multiline
                rows={6} // Adjusted height of the message field
                required
              />
              <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                Submit
              </Button>
            </form>
          </Paper>
        </Grid>

        {/* Right side: Contact Card */}
        <Grid item xs={12} sm={5} style={{marginBottom: '60px', height: '600px'}}>
          <Paper elevation={3} className="contact-card" style={{ height: '100%', width: '90%', padding: '20px' }}>
          <img src="/images/Contact.png" alt="Contact" style={{ width: '420px', height: 'auto', }} /> {/* Adjusted image size */}
            <div>
              <Typography variant="h5" component="h2" style={{ marginBottom: '10px' }}>
                Contact Information
              </Typography>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <EmailIcon />
                <Typography variant="body1" style={{ marginLeft: '10px' }}>
                  example@example.com
                </Typography>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <PhoneIcon />
                <Typography variant="body1" style={{ marginLeft: '10px' }}>
                  123-456-7890
                </Typography>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <LocationOnIcon />
                <Typography variant="body1" style={{ marginLeft: '10px' }}>
                  123 Street, City, Country
                </Typography>
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Contact;
