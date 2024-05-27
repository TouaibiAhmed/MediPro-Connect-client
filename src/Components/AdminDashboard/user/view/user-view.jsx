import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card, Stack, Table, Button, Container, TableBody, Typography, TableContainer,
  TablePagination, Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem
} from '@mui/material';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row'; // This should be adjusted to DoctorTableRow if renamed
import UserTableHead from '../user-table-head'; // Adjust this component to DoctorTableHead if renamed
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar'; // Consider renaming to DoctorTableToolbar if needed

export default function DoctorPage() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('nom'); // Default sort by 'nom'
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [doctors, setDoctors] = useState([]);
  const [open, setOpen] = useState(false); // State to handle the open/close of the form dialog
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    dateDeNaissance: '',
    codePostal: '',
    email: '',
    motDePasse: '',
    Rne: '',
    specialite: '',
    image: '',
    numeroProfessionnel: '',
    adresseCabinet: '',
    telephoneCabinet: '',
    experience: '',
    age: '',
    description: '',
    formation: '',
    signature: ''
  });
  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/medecins/allDoctors');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);




  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/medecins/register', formData);
      setDoctors((prevDoctors) => [...prevDoctors, response.data]);
      handleClose();
    } catch (error) {
      console.error('Error registering doctor:', error);
    }
  };






  const handleSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(doctors.map((doctor) => doctor._id));
    } else {
      setSelected([]);
    }
  };


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleUpdate = () => {
    // Fetch doctors again to reflect the updated status
    fetchDoctors();
  };

  const filteredDoctors = doctors.filter(doctor => {
    const fullName = `${doctor.nom} ${doctor.prenom}`.toLowerCase();
    return fullName.includes(filterName.toLowerCase());
  });

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredDoctors.length - page * rowsPerPage);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  return (
    <Box sx={{ marginLeft: 35, marginTop: 14, width: 1200 }}>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">Doctors</Typography>
          <Button variant="contained" color="primary" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleClickOpen}>
            New Doctor
          </Button>
        </Stack>

        <Card>
          <UserTableToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 800 }}>
                <UserTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={doctors.length}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: 'Name', label: 'Name', disableSorting: true },
                    { id: 'Speciality', label: 'Speciality' },
                    { id: 'Rne', label: 'Rne' },
                    { id: 'Verified', label: 'Verified' },
                    { id: 'Status', label: 'Status', alignRight: true },
                  ]}
                />
                <TableBody>
                  {filteredDoctors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((doctor) => (
                    <UserTableRow
                      key={doctor._id}
                      doctor={doctor}
                      selected={selected.includes(doctor._id)}
                      onClick={(event) => handleClick(event, doctor._id)}
                      onUpdate={handleUpdate} // Pass the handleUpdate function as a prop
                    />
                  ))}
                  <TableEmptyRows emptyRows={emptyRows} />
                  {!filteredDoctors.length && <TableNoData query={filterName} />}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            component="div"
            count={filteredDoctors.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>


      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Doctor</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="nom"
            label="Nom"
            type="text"
            fullWidth
            value={formData.nom}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="prenom"
            label="Prenom"
            type="text"
            fullWidth
            value={formData.prenom}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="dateDeNaissance"
            label="Date de Naissance"
            type="date"
            fullWidth
            value={formData.dateDeNaissance}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            name="codePostal"
            label="Code Postal"
            type="text"
            fullWidth
            value={formData.codePostal}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="motDePasse"
            label="Mot de Passe"
            type="password"
            fullWidth
            value={formData.motDePasse}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="Rne"
            label="RNE"
            type="text"
            fullWidth
            value={formData.Rne}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="specialite"
            label="Specialite"
            type="text"
            fullWidth
            value={formData.specialite}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="image"
            label="Image URL"
            type="text"
            fullWidth
            value={formData.image}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="numeroProfessionnel"
            label="Numero Professionnel"
            type="text"
            fullWidth
            value={formData.numeroProfessionnel}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="adresseCabinet"
            label="Adresse Cabinet"
            type="text"
            fullWidth
            value={formData.adresseCabinet}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="telephoneCabinet"
            label="Telephone Cabinet"
            type="text"
            fullWidth
            value={formData.telephoneCabinet}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="experience"
            label="Experience"
            type="number"
            fullWidth
            value={formData.experience}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="age"
            label="Age"
            type="number"
            fullWidth
            value={formData.age}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            value={formData.description}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="formation"
            label="Formation"
            type="text"
            fullWidth
            value={formData.formation}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="signature"
            label="Signature"
            type="text"
            fullWidth
            value={formData.signature}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>



    </Box>
  );
}
