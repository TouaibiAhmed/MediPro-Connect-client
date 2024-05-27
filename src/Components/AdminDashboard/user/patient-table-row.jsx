import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel'; 

import Label from '../components/label';
import Iconify from '../components/iconify';

export default function PatientTableRow({
  selected,
  onClick,
  patient,
  onUpdate 
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [patientStatus, setPatientStatus] = useState(patient.status);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleChangeStatus = async (event) => {
    const newStatus = event.target.value;
    setPatientStatus(newStatus);
    try {
      await axios.put(`http://localhost:3000/api/patients/updatePatientStatus/${patient._id}`, { status: newStatus });
      if (typeof onUpdate === 'function') {
        onUpdate(); 
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const toggleStatus = async () => {
    const newStatus = patientStatus === 'active' ? 'pending' : 'active';
    setPatientStatus(newStatus);
    try {
      await axios.put(`http://localhost:3000/api/patients/updatePatientStatus/${patient._id}`, { status: newStatus });
      if (typeof onUpdate === 'function') {
        onUpdate();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
    handleCloseMenu();
  };

  const fullName = `${patient.nom} ${patient.prenom}`;

  const statusStyles = {
    active: { backgroundColor: 'green', color: 'white' },
    pending: { backgroundColor: 'red', color: 'white' }
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onChange={onClick} />
        </TableCell>
        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={fullName} src={patient.image || '/static/mock-images/avatars/avatar_default.jpg'} onClick={() => onClick(patient._id)} />
            <Typography variant="subtitle2" noWrap>
              {fullName}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell>{patient.telephone}</TableCell>
        <TableCell>{patient.email}</TableCell>
        <TableCell align="center">
          {patient.status === 'active' ? 'Yes' : 'No'}
        </TableCell>
        <TableCell>
          <FormControl fullWidth>
            <InputLabel id="patient-status-label">Status</InputLabel>
            <Select
              labelId="patient-status-label"
              id="patient-status-select"
              value={patientStatus}
              label="Status"
              onChange={handleChangeStatus}
              fullWidth
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
            </Select>
          </FormControl>
        </TableCell>
        <TableCell>
          <Label sx={patientStatus === 'active' ? statusStyles.active : statusStyles.pending}>
            {patientStatus}
          </Label>
        </TableCell>
        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={toggleStatus} sx={{ color: 'error.main' }}>
          Toggle Status
          <Iconify icon={patientStatus === 'active' ? "eva:close-circle-outline" : "eva:checkmark-circle-2-outline"} sx={{ ml: 2 }} />
        </MenuItem>
        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

PatientTableRow.propTypes = {
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  patient: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    nom: PropTypes.string.isRequired,
    prenom: PropTypes.string.isRequired,
    image: PropTypes.string,
    telephone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func
};
