// AddOrdonnanceComponent.jsx
import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import './DisplayOrdonnance.css';
import axios from 'axios';
import { toast } from 'react-toastify';


const AddOrdonnance = () => {



  const [patientId, setPatientId] = useState('');
  const [date, setDate] = useState('');
  const [diagnostic, setDiagnostic] = useState('');
  const [medicaments, setMedicaments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [doctor, setDoctor] = useState(null);


  const medecinId = '65e47398033b77842a4c84d0'; //change late to session.id 

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/medecins/consulterProfil/65e47398033b77842a4c84d0`);
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
    


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
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
console.log(patientId);


        const response = await axios.post(`http://localhost:3000/api/ordonnance/ajouterOrdonnance/${patientId}`, {
        medecinId, // Assuming you want to keep medecin ID the same
        date,
        diagnostic,
        medicaments
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}` // Assuming you have an accessToken available for authentication
        }
      });
      console.log('Ordonnance added:', response.data);
      toast.success('Ordonnance ajouté avec succès');
    } catch (error) {
      setError(error.message);
      toast.error("Erreur lors de l'ajout de l'ordonnance");

    }
    setLoading(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
















  

  return (

    <div className="prescription">
            {doctor ? (
 <>
      <h1 className="title">Ordonnance Médicale</h1>
      <div className="header">
        <div className="doctor-info">
          <div>
          <h2>Dr.{doctor.nom} {doctor.prenom}</h2>
              <p className="speciality">Speciality: {doctor.specialite}</p>
            </div>
            <div className="contact-info">
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
      <div className="patient-info">
      <h3>Patient Information</h3>
      <p><strong>Nom Patient: </strong>  <input type="text" name="nom" value={formData.nom} onChange={handleChange} /></p>
      <p><strong>Prenom: </strong>   <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} /></p>
      <p><strong>Date: </strong>  <input type="date" name="date" value={formData.date} onChange={handleChange} /></p>
      </div>
      <div className="prescription-details">
      <h3>Prescription Details</h3>

      <p>Diagnostic</p><textarea  type="text" name="diagnostic" value={formData.diagnostic} onChange={handleChange} />
        <div className="medicaments">
        <h4>Medicaments</h4>

          {formData.medicaments.map((medicament, index) => (
            <div key={index}>
                      <p><strong>nom: </strong>       <input className='medic' type="text" value={medicament.name} onChange={(e) => handleMedicamentChange(index, 'name', e.target.value)} /></p>
                      <p><strong>dosage: </strong>   <input className='medic'  type="text" value={medicament.dosage} onChange={(e) => handleMedicamentChange(index, 'dosage', e.target.value)} /> </p>
            <p><strong>frequence: </strong>   <input type="text" className='medic' value={medicament.frequency} onChange={(e) => handleMedicamentChange(index, 'frequency', e.target.value)} /></p>
            </div>
          ))}
          <button onClick={addMedicament}>Add Medicament</button>
        </div>
      </div>
      <div className="signature">
      <p><strong>Signature:</strong>   </p>
      </div>

      <div className="qr-code-container">
      <QRCode value={JSON.stringify(formData.medicaments)} />
    </div>
    <button className="submit"onClick={handleSubmit}>Submit</button> {/* Added Submit button */}

    </div>
  );
};

  /*<img src={doctor.signature} alt="Signature" className="signature-img" />*/

export default AddOrdonnance;
