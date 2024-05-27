import React, { useState, useEffect } from 'react';
import { Avatar, Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';

import axios from 'axios'; 

import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';


import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import UpdateIcon from '@mui/icons-material/Update';




const useStyles = makeStyles({
  tableContainer: {
    maxWidth: 1000,
    marginLeft: '340px',
    marginTop: 110,
    width: 1100,
    backgroundColor: '#ffffff', // Background color to match the example
  },
  tableHead: {
    backgroundColor: '#0E46A3', // Darker shade for header to match the example
    '& .MuiTableCell-head': {
      color: 'white',
      fontWeight: 'bold',
      fontSize: '0.9rem', // Smaller font size for the header
    },
  },
  avatarCell: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 16,
  },
  actionButtons: {
    display: 'flex',
    justifyContent: 'center',
    '& > *': {
      margin: 4,
    },
  },
  tableRow: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#f5f5f5', // Lighter gray for alternating rows
    },
  },
  tableCell: {
    border: '1px solid #e0e0e0', // Lighter borders as in the example
    padding: '8px 16px', // More padding for cell content
    fontSize: '0.8rem', // Smaller font size for table content
  },
});

const Appointments = ({ doctorId }) => {
  const [appointments, setAppointments] = useState([]); // State to store appointments
const [openSnackbar, setOpenSnackbar] = useState(false);

const [openSnackbarDec, setOpenSnackbarDec] = useState(false);

const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

const [selectedAppointment, setSelectedAppointment] = useState(null);

const [updateSnackbarOpen, setUpdateSnackbarOpen] = useState(false);
const [snackbarMessage, setSnackbarMessage] = useState('');
const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' or 'error'


const handleCloseSnackbar = () => {
  setOpenSnackbar(false);
};

const handleCloseSnackbarDec = () => {
  setOpenSnackbarDec(false);
};


  useEffect(() => {
    // Fetch appointments with status 'prévu' from the backend API
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/rendezVous/listAppointmentsPrevu/${doctorId}`); // Adjust the API endpoint as per your backend
        setAppointments(response.data); // Update state with fetched appointments
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
    fetchData();
  }, [doctorId]);


  const handleOpenUpdateDialog = (appointment) => {
    setSelectedAppointment(appointment);
    setOpenUpdateDialog(true);
  };

  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
    setSelectedAppointment(null);
  };


  const handleAccept = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/api/rendezVous/AcceptRDV/${id}`);
      setAppointments(prevAppointments => prevAppointments.map(appointment => {
        if (appointment._id === id) {
          return { ...appointment, statutRendezVous: 'accepté' };
        }
        return appointment;
      }));
      setSnackbarMessage('Appointment accepted successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      handleCloseUpdateDialog();
    } catch (error) {
      console.error('Error accepting appointment:', error);
      setSnackbarMessage('Failed to accept appointment.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };
  
  
  

  const handleDecline = async (id) => {
    try {
      // Send a PATCH request to update the status of the appointment to 'accepté'
      await axios.patch(`http://localhost:3000/api/rendezVous/DeclineRDV/${id}`);
      // If successful, update the local state to reflect the change
      setAppointments(prevAppointments => prevAppointments.map(appointment => {
        if (appointment._id === id) {
          return { ...appointment, statutRendezVous: 'annulé' };
        }
        return appointment;
      }));
          setOpenSnackbarDec(true); // Show success notification

    } catch (error) {
      console.error('Error accepting appointment:', error);
    }
  };


  const handleUpdateAppointment = async (appointmentId, updates) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/rendezVous/updateRDV/${appointmentId}`, updates);
      setAppointments(prevAppointments => prevAppointments.map(appointment => {
        if (appointment._id === appointmentId) {
          // Ensure that patient details are preserved
          return {
            ...appointment,
            ...response.data,
            patient: appointment.patient // Preserving the existing patient details
          };
        }
        return appointment;
      }));
      console.log("Updating with:", updates);
      handleCloseUpdateDialog();
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };
  




  const classes = useStyles();




  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };




  return (
    <>
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
  <MuiAlert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
    Appointment accepted successfully!
  </MuiAlert>
</Snackbar>


<Snackbar open={openSnackbarDec} autoHideDuration={6000} onClose={handleCloseSnackbarDec}>
  <MuiAlert onClose={handleCloseSnackbarDec} severity="success" sx={{ width: '100%' }}>
    Appointment declined successfully!
  </MuiAlert>
</Snackbar>



<Snackbar
      open={updateSnackbarOpen}
      autoHideDuration={6000}
      onClose={() => setUpdateSnackbarOpen(false)}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <MuiAlert elevation={6} variant="filled" onClose={() => setUpdateSnackbarOpen(false)} severity={snackbarSeverity}>
        {snackbarMessage}
      </MuiAlert>
    </Snackbar>

      <Table>
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell>Patient</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Hour</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment._id}>
            <TableCell className={classes.avatarCell}>
            <Avatar alt={`${appointment.patient[0].prenom} ${appointment.patient[0].nom}`} src={appointment.patient[0].image} />
                {`${appointment.patient[0].nom} ${appointment.patient[0].prenom}`}
              </TableCell>
              <TableCell>{calculateAge(appointment.patient[0].dateNaissance)}</TableCell>
              <TableCell>{new Date(appointment.date).toLocaleDateString()}</TableCell>
              <TableCell>{appointment.heureDebut}</TableCell>
              <TableCell>{appointment.statutRendezVous}</TableCell>
              <TableCell className={classes.actionButtons}>
                <IconButton onClick={() => handleAccept(appointment._id)}><CheckCircleIcon color="success" /></IconButton>
                <IconButton onClick={() => handleDecline(appointment._id)}><CancelIcon color="error" /></IconButton>
                <IconButton onClick={() => handleOpenUpdateDialog(appointment)}>
  <UpdateIcon color="primary" />
</IconButton>              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    {selectedAppointment && (



        <Dialog open={openUpdateDialog} onClose={handleCloseUpdateDialog}>
          <DialogTitle>Update Appointment</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Date"
              type="date"
              fullWidth
              variant="outlined"
              defaultValue={selectedAppointment.date.split('T')[0]}
              onChange={e => setSelectedAppointment({...selectedAppointment, date: e.target.value})}
            />
            <TextField
              margin="dense"
              label="Start Time"
              type="time"
              fullWidth
              variant="outlined"
              defaultValue={selectedAppointment.heureDebut}
              onChange={e => setSelectedAppointment({...selectedAppointment, heureDebut: e.target.value})}
            />
            <TextField
              margin="dense"
              label="End Time"
              type="time"
              fullWidth
              variant="outlined"
              defaultValue={selectedAppointment.heureFin}
              onChange={e => setSelectedAppointment({...selectedAppointment, heureFin: e.target.value})}
            />
            <TextField
              margin="dense"
              label="Description"
              type="text"
              fullWidth
              variant="outlined"
              defaultValue={selectedAppointment.descriptionRDV}
              onChange={e => setSelectedAppointment({...selectedAppointment, descriptionRDV: e.target.value})}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseUpdateDialog}>Cancel</Button>
            <Button onClick={() => handleUpdateAppointment(selectedAppointment._id, {
              date: selectedAppointment.date,
              heureDebut: selectedAppointment.heureDebut,
              heureFin: selectedAppointment.heureFin,
              descriptionRDV: selectedAppointment.descriptionRDV
            })}>Update</Button>
          </DialogActions>
        </Dialog>
)}
    </>

  );
};

export default Appointments;
