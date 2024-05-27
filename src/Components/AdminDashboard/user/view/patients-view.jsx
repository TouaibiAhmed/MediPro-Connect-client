import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card, Stack, Table, Button, Container, TableBody, Typography, TableContainer,
  TablePagination, Box
} from '@mui/material';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';

import TableNoData from '../table-no-data';
import PatientTableRow from '../patient-table-row'; // Updated component name
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';

export default function PatientPage() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('nom');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [patients, setPatients] = useState([]);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/patient/getPatients');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(patients.map((patient) => patient._id));
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
    fetchPatients();
  };

  const filteredPatients = patients.filter(patient => {
    const fullName = `${patient.nom} ${patient.prenom}`.toLowerCase();
    return fullName.includes(filterName.toLowerCase());
  });

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredPatients.length - page * rowsPerPage);

  return (
    <Box sx={{ marginLeft: 35, marginTop: 14, width: 1200 }}>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">Patients</Typography>
          <Button variant="contained" color="primary" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Patient
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
                  rowCount={patients.length}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: 'Name', label: 'Name', disableSorting: true },
                    { id: 'Telephone', label: 'Telephone' },
                    { id: 'Email', label: 'Email' },
                    { id: 'Verified', label: 'Verified' },
                    { id: 'Status', label: 'Status', alignRight: true },
                  ]}
                />
                <TableBody>
                  {filteredPatients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((patient) => (
                    <PatientTableRow
                      key={patient._id}
                      patient={patient}
                      selected={selected.includes(patient._id)}
                      onClick={(event) => handleClick(event, patient._id)}
                      onUpdate={handleUpdate}
                    />
                  ))}
                  <TableEmptyRows emptyRows={emptyRows} />
                  {!filteredPatients.length && <TableNoData query={filterName} />}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            component="div"
            count={filteredPatients.length}
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
