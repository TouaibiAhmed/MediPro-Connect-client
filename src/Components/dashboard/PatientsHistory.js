import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Avatar,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, MenuItem, Select, Dialog, DialogTitle, DialogContent, DialogActions, Button
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { DateTime } from 'luxon';
import { useNavigate } from 'react-router-dom';

const PatientTable = ({ doctorId }) => {
    const [initialPatients, setInitialPatients] = useState([]);
    const [displayedPatients, setDisplayedPatients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [newDescription, setNewDescription] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [currentAppointment, setCurrentAppointment] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        const fetchInitialPatients = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/rendezVous/listAppointments/${doctorId}`);
                setInitialPatients(response.data);
                setDisplayedPatients(response.data);
            } catch (error) {
                console.error('Error fetching initial patients', error);
            }
        };

        fetchInitialPatients();
    }, [doctorId]);

    const handleSearchByName = async () => {
        if (!searchTerm) {
            setDisplayedPatients(initialPatients);
            return;
        }

        try {
            const response = await axios.get(`http://localhost:3000/api/rendezVous/searchRDVbyPatName`, {
                params: { name: searchTerm }
            });
            setDisplayedPatients(response.data);
        } catch (error) {
            console.error('Error searching patients by name', error);
        }
    };

    const handleSearchByDate = async () => {
        if (!selectedDate) {
            setDisplayedPatients(initialPatients);
            return;
        }

        try {
            const dateStr = selectedDate.toISODate(); // Format date as YYYY-MM-DD using Luxon
            const response = await axios.get(`http://localhost:3000/api/rendezVous/searchRDV`, {
                params: { date: dateStr }
            });
            setDisplayedPatients(response.data);
        } catch (error) {
            console.error('Error searching appointments by date', error);
        }
    };

    const handleStatusChange = async (appointmentId, newStatus) => {
        try {
            const response = await axios.put(`http://localhost:3000/api/rendezVous/updateRDV/${appointmentId}`, { statutRendezVous: newStatus });
            const updatedPatients = displayedPatients.map(appt =>
                appt._id === appointmentId ? { ...appt, statutRendezVous: newStatus } : appt
            );
            setDisplayedPatients(updatedPatients);
        } catch (error) {
            console.error('Failed to update status', error);
        }
    };


    const openDialog = (appointment) => {
        setCurrentAppointment(appointment);
        setNewDescription(appointment.descriptionRDV || '');
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleDescriptionSave = async () => {
        const { _id } = currentAppointment;
        try {
            const response = await axios.put(`http://localhost:3000/api/rendezVous/updateRDV/${_id}`, { descriptionRDV: newDescription });
            const updatedPatients = displayedPatients.map(appt =>
                appt._id === _id ? { ...appt, descriptionRDV: newDescription } : appt
            );
            setDisplayedPatients(updatedPatients);
            handleDialogClose();
        } catch (error) {
            console.error('Failed to update description', error);
        }
    };



    // Update searches when searchTerm or selectedDate changes
    useEffect(() => {
        if (searchTerm) {
            handleSearchByName();
        } else if (selectedDate) {
            handleSearchByDate();
        } else {
            setDisplayedPatients(initialPatients); // Reset to initial appointments if no search filters
        }
    }, [searchTerm, selectedDate]);


    const handleRowClick = (patientId) => {
        navigate(`/profile/patient/${patientId}`); // Navigate to the patient profile
    };

    return (
        <div style={{ marginLeft: '300px', marginTop: '110px', width: '70%' }}>
            <Paper style={{ padding: '10px' }}>
                <TextField
                    label="Search Patient Name"
                    variant="outlined"
                    fullWidth
                    style={{ marginBottom: '20px' }}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <LocalizationProvider dateAdapter={AdapterLuxon}>
                    <DatePicker
                        label="Select Date"
                        value={selectedDate}
                        onChange={setSelectedDate}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Photo</TableCell>
                            <TableCell>Patient Name</TableCell>
                            <TableCell align="right">Latest Visit Issue</TableCell>
                            <TableCell align="right">Date Of Birth</TableCell>
                            <TableCell align="right">Rendezvous Date</TableCell>
                            <TableCell align="right">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
    {displayedPatients.map((appointment) => {
        if (!appointment.patient || appointment.patient.length === 0) {
            console.error('Patient data is missing for this appointment:', appointment);
            return null;  // Skip rendering this row, or render it differently based on your needs
        }
        
        return (
            <TableRow key={appointment._id} style={{ cursor: 'pointer' }}>
            <TableCell component="th" scope="row">
                    <Avatar alt={`${appointment.patient[0].prenom ?? 'N/A'} ${appointment.patient[0].nom ?? 'N/A'}`} 
                            src={appointment.patient[0].image || 'path_to_default_image'} />
                </TableCell>
                <TableCell onClick={() => handleRowClick(appointment.patient[0]._id)}>
{`${appointment.patient[0].prenom ?? 'N/A'} ${appointment.patient[0].nom ?? 'N/A'}`}</TableCell>
                
                
                <TableCell align="right" onClick={() => openDialog(appointment)}>
                                        {appointment.descriptionRDV || 'Click to Edit'}
                                    </TableCell>


                <TableCell align="right">{appointment.patient[0].dateNaissance ? new Date(appointment.patient[0].dateNaissance).toLocaleDateString() : 'N/A'}</TableCell>
                <TableCell align="right">{new Date(appointment.date).toLocaleDateString()}</TableCell>
                <TableCell align="right">
                                        <Select
                                            label="Status"
                                            value={appointment.statutRendezVous}
                                            onChange={(e) => handleStatusChange(appointment._id, e.target.value)}
                                            fullWidth
                                        >
                                            <MenuItem value="accepté">accepté</MenuItem>
                                            <MenuItem value="terminé">terminé</MenuItem>
                                        </Select>
                                    </TableCell>            </TableRow>
        );
    })}
</TableBody>

                </Table>
            </TableContainer>
        </Paper>

        <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Edit Description</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button onClick={handleDescriptionSave}>Save</Button>
                </DialogActions>
            </Dialog>

    </div>
);
};

export default PatientTable;