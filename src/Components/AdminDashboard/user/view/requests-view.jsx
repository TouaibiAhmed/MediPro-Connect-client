import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card, Stack, Table, Button, Container, TableBody, Typography, TableContainer,
  TablePagination, Box
} from '@mui/material';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../requests-table-row'; // This should be adjusted to DoctorTableRow if renamed
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

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/medecins/DoctorsEnAttente');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

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
    fetchDoctors(); // Fetch doctors again to reflect the updated status
  };

  const filteredDoctors = doctors.filter(doctor => {
    const fullName = `${doctor.nom} ${doctor.prenom}`.toLowerCase();
    return fullName.includes(filterName.toLowerCase());
  });

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredDoctors.length - page * rowsPerPage);

  return (
    <Box sx={{ marginLeft: 35, marginTop: 14, width: 1200 }}>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">Doctors</Typography>
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
                    { id: 'Email', label: 'Email' },
                    { id: 'Office Address', label: 'Office Address' },
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
    </Box>
  );
}
