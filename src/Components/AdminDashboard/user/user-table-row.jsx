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

export default function UserTableRow({
  selected,
  onClick,
  doctor,
  onUpdate 
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [doctorStatus, setDoctorStatus] = useState(doctor.status);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleChangeStatus = async (event) => {
    const newStatus = event.target.value;
    setDoctorStatus(newStatus);
    try {
      await axios.put(`http://localhost:3000/api/medecins/updateMedecinStatus/${doctor._id}`, { status: newStatus });
      if (typeof onUpdate === 'function') {
        onUpdate(); // Call the onUpdate function passed as a prop to refresh the list
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const toggleStatus = async () => {
    const newStatus = doctorStatus === 'activé' ? 'en attente' : 'activé';
    setDoctorStatus(newStatus);
    try {
      await axios.put(`http://localhost:3000/api/medecins/updateMedecinStatus/${doctor._id}`, { status: newStatus });
      if (typeof onUpdate === 'function') {
        onUpdate(); // Call the onUpdate function passed as a prop to refresh the list
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
    handleCloseMenu(); // Close the menu after the action
  };

  const fullName = `${doctor.nom} ${doctor.prenom}`;

  const statusStyles = {
    activé: { backgroundColor: 'green', color: 'white' },
    'en attente': { backgroundColor: 'red', color: 'white' }
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onChange={onClick} />
        </TableCell>
        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={fullName} src={doctor.image || '/static/mock-images/avatars/avatar_default.jpg'} onClick={() => onClick(doctor._id)} />
            <Typography variant="subtitle2" noWrap>
              {fullName}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell>{doctor.specialite}</TableCell>
        <TableCell>{doctor.Rne}</TableCell>
        <TableCell align="center">
          {doctor.status === 'activé' ? 'Yes' : 'No'}
        </TableCell>
        <TableCell>
          <FormControl fullWidth>
            <InputLabel id="doctor-status-label">Status</InputLabel>
            <Select
              labelId="doctor-status-label"
              id="doctor-status-select"
              value={doctorStatus}
              label="Status"
              onChange={handleChangeStatus}
              fullWidth
            >
              <MenuItem value="activé">Active</MenuItem>
              <MenuItem value="en attente">Banned</MenuItem>
            </Select>
          </FormControl>
        </TableCell>
        <TableCell>
          <Label sx={doctorStatus === 'activé' ? statusStyles.activé : statusStyles['en attente']}>
            {doctorStatus}
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
          <Iconify icon={doctorStatus === 'activé' ? "eva:close-circle-outline" : "eva:checkmark-circle-2-outline"} sx={{ ml: 2 }} />
        </MenuItem>
        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  doctor: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    nom: PropTypes.string.isRequired,
    prenom: PropTypes.string.isRequired,
    image: PropTypes.string,
    specialite: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    Rne: PropTypes.string,
  }),
  onUpdate: PropTypes.func // Make sure to validate this new prop
};
