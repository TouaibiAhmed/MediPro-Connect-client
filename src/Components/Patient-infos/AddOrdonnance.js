// AddOrdonnanceComponent.jsx
import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import './DisplayOrdonnance.css';
import axios from 'axios';
import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';


import { Snackbar, Button } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const AddOrdonnance = () => {



  const [patientId, setPatientId] = useState('');
  const [date, setDate] = useState('');
  const [diagnostic, setDiagnostic] = useState('');
  const [medicaments, setMedicaments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [doctor, setDoctor] = useState(null);



  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');





  const medecinId = sessionStorage.getItem('userId');



  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/medecins/consulterProfil/${medecinId}`);
        setDoctor(response.data);
        setLoading(false);
      } catch (error) {
        setError('Erreur lors de la récupération du profil du médecin.');
        setLoading(false);
      }
    };

    fetchDoctorProfile();
  }, [medecinId]);




  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    specialite: '',
    adresseCabinet: '',
    numeroProfessionnel: '',
    codePostal: '',
    date: '',
    diagnostic: '',
    medicaments: [],
    signature: ''
  });
    
  const navigate = useNavigate();


  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};

    
      const handleMedicamentChange = (index, field, value) => {
        const updatedMedicaments = [...formData.medicaments];
        updatedMedicaments[index][field] = value;
        setFormData({
          ...formData,
          medicaments: updatedMedicaments
        });
      };
    
      const addMedicament = () => {
        setFormData({
          ...formData,
          medicaments: [...formData.medicaments, { name: '', dosage: '', frequency: '' }]
        });
      };











  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {

        const patientId = window.location.pathname.split('/').pop(); // Assuming the patient ID is part of the URL path

        console.log("Submitting data:", { medecinId, date: formData.date, diagnostic: formData.diagnostic, medicaments });

        const response = await axios.post(`http://localhost:3000/api/ordonnance/ajouterOrdonnance/${patientId}`, {
        medecinId, 
        date: formData.date,
        diagnostic: formData.diagnostic,
        medicaments
      }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });


  
    setSnackbarMessage('Ordonnance ajouté avec succès');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
    setTimeout(() => {
      navigate(`/profile/patient/${patientId}`); // Navigate back to the previous page after showing the Snackbar
    }, 2000); // Adjust time as needed


      console.log('Ordonnance added:', response.data);
      toast.success('Ordonnance ajouté avec succès');
    }catch (error) {
      console.error('Failed to add ordonnance:', error);
      if (error.response) {
          console.error('Error response:', error.response.data);
          toast.error(`Erreur lors de l'ajout de l'ordonnance: ${error.response.data.message}`);
      } else {
          toast.error("Erreur lors de l'ajout de l'ordonnance");
      }
  }
  
    setLoading(false);
  };

  















  

  return (

    <div className="prescription">


<Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>

            {doctor ? (
 <>
      <h1 className="titrre">Ordonnance Médicale</h1>
      <div className="headerr">
        <div className="doctor-infos">
          <div>
          <h2>Dr.{doctor.nom} {doctor.prenom}</h2>
              <p className="specialiteee">Speciality: {doctor.specialite}</p>
            </div>
            <div className="contact-infos">
              <p>Adresse Cabinet: {doctor.adresseCabinet}</p>
              <p>Numero Professionnel: {doctor.numeroProfessionnel}</p>
              <p>Code Postale: {doctor.codePostal}</p>
          </div>
        </div>
      </div>
      </>
      ) : (
        <p>Loading doctor profile...</p>
      )}
      <div className="patient-infos">
      <h3>Patient Information</h3>
      <p><strong>Nom Patient: </strong>  <input className='medic-input' type="text" name="nom" value={formData.nom} onChange={handleChange} /></p>
      <p><strong>Prenom: </strong>   <input className='medic-input' type="text" name="prenom" value={formData.prenom} onChange={handleChange} /></p>
      <p><strong>Date: </strong>  <input className='medic-input' type="date" name="date" value={formData.date} onChange={handleChange} /></p>
      </div>
      <div className="prescription-details">
      <h3>Prescription Details</h3>

      <p>Diagnostic</p><textarea className='medic-input'  type="text" name="diagnostic" value={formData.diagnostic} onChange={handleChange} />
        <div className="medicaments">
        <h4>Medicaments</h4>

          {formData.medicaments.map((medicament, index) => (
            <div key={index} className='medic'>
                      <p><strong>nom: </strong>       <input  className='medic-input' type="text" value={medicament.name} onChange={(e) => handleMedicamentChange(index, 'name', e.target.value)} /></p>
                      <p><strong>dosage: </strong>   <input className='medic-input'  type="text" value={medicament.dosage} onChange={(e) => handleMedicamentChange(index, 'dosage', e.target.value)} /> </p>
            <p><strong>frequence: </strong>   <input type="text" className='medic-input' value={medicament.frequency} onChange={(e) => handleMedicamentChange(index, 'frequency', e.target.value)} /></p>
            </div>
          ))}
          <button className='addbtnn' onClick={addMedicament}>Add Medicament</button>
        </div>
      </div>
      <div className="signature">
  <p className="signature-label"></p>
  <img src={`data:image/png;base64,${doctor?.signature}`} alt="signature" className="signature-img" />
</div>

      <div className="qr-code-container">
      <QRCode value={JSON.stringify(formData.medicaments)} />
    </div>

  

    <button className="submit"onClick={handleSubmit}>Submit</button> {/* Added Submit button */}

    </div>
  );
};



export default AddOrdonnance;
