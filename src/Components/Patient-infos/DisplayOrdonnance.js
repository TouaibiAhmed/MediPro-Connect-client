// PrescriptionComponent.jsx
import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react'; // Import QRCode component
import './DisplayOrdonnance.css';
import { useParams  } from 'react-router-dom';

import axios from 'axios';







const DisplayOrdonnance = () => {

  const [prescriptionData, setPrescriptionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { ordonnanceId } = useParams();

  console.log('Ordonnance ID:', ordonnanceId);



  useEffect(() => {
    // Function to fetch prescription data from backend using Axios
    const fetchPrescriptionData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/ordonnance/consulterOrdonnance/${ordonnanceId}`);
        setPrescriptionData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPrescriptionData(); // Call the function to fetch data when the component mounts
  }, [ordonnanceId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }





  const prescriptionDetailsData = {
    diagnostic: prescriptionData.diagnostic,
    medicaments: prescriptionData.medicaments
  };






  return (
    <div className="prescription">
    <h1 className="title">Ordonnance Médicale</h1>
    {/* Render prescription data dynamically */}
    <div className="header">
      <div className="doctor-info">
        <div>
          <h2>Dr.{prescriptionData.medecinId.nom} {prescriptionData.medecinId.prenom}</h2>
          <p className="speciality">Speciality: {prescriptionData.medecinId.specialite}</p>
        </div>
        <div className="contact-info">
          <p>Adresse Cabinet: {prescriptionData.medecinId.adresseCabinet}</p>
          <p>Numero Professionnel: {prescriptionData.medecinId.numeroProfessionnel}</p>
          <p>Code Postale: {prescriptionData.medecinId.codePostal}</p>

        </div>
      </div>
    </div>
    <div className="patient-info">
      <h3>Patient Information</h3>
      <p><strong>Nom Patient: </strong> {prescriptionData.patientId.nom} {prescriptionData.patientId.prenom}</p>
      <p><strong>Date </strong> {prescriptionData.date}</p>

    </div>
    <div className="prescription-details">
      <h3>Prescription Details</h3>
      <p><strong>Diagnostic:</strong> {prescriptionData.diagnostic}</p>
      <div className="medicaments">
        <h4>Medicaments</h4>
        <div className="medicament-list">
        {prescriptionData.medicaments.map((medicament, index) => (
          <div key={index}>
            <p><strong>Name:</strong> {medicament.name}</p>
            <p><strong>Dosage:</strong> {medicament.dosage}</p>
            <p><strong>Frequence:</strong> {medicament.frequency}</p>
          </div>
          
        ))}
      </div>
      </div>
    </div>
    <div className="signature">
      <p className="signature-label">Signature:</p>
      <p><strong>Signature:</strong>   <img src={doctor.signature} alt="Signature" className="signature-img" /></p>
    </div>
    {/* Display QR Code with prescription data */}
    <div className="qr-code-container">
      <QRCode value={JSON.stringify(prescriptionDetailsData)} />
    </div>
  </div>
);
};

export default DisplayOrdonnance;
