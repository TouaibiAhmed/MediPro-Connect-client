import React from 'react';
import { Avatar, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';






const useStyles = makeStyles({
    tableContainer: {
      maxWidth: 800,

      marginTop: 120,
      padding: '20px',
      marginLeft: '25%',
      width: '950px',
    },
    tableHead: {
      backgroundColor: '#40A2D8',
      borderRadius: 50 ,
    },
    avatarCell: {
      display: 'flex',
      alignItems: 'center',
    },
    actionButtons: {
      '& > *': {
        margin: 4,
      },
    },
  });












const Appointments = () => {
  // Dummy data for appointments
  const appointments = [
    { id: 1, name: 'John', prename: 'Doe', age: 30, date: '2024-04-10', time: '09:00', status: 'pending' },
    { id: 2, name: 'Alice', prename: 'Smith', age: 25, date: '2024-04-11', time: '10:00', status: 'pending' },
    // Add more appointment data here
  ];

  const handleAccept = (id) => {
    // Handle accept logic
  };

  const handleDecline = (id) => {
    // Handle decline logic
  };



  const classes = useStyles();





  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
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
            <TableRow key={appointment.id}>
              <TableCell className={classes.avatarCell}>
                <Avatar>{`${appointment.name[0]}${appointment.prename[0]}`}</Avatar>
                {`${appointment.name} ${appointment.prename}`}
              </TableCell>
              <TableCell>{appointment.age}</TableCell>
              <TableCell>{appointment.date}</TableCell>
              <TableCell>{appointment.time}</TableCell>
              <TableCell>{appointment.status}</TableCell>
              <TableCell className={classes.actionButtons}>
                <Button onClick={() => handleAccept(appointment.id)}>Accept</Button>
                <Button onClick={() => handleDecline(appointment.id)}>Decline</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Appointments;
