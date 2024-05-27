import React, { useState, useEffect } from 'react';
import './DossierMedical.modules.css'
import axios from 'axios'; // Import Axios
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { Snackbar, Button } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const DossierMedical = () => {

  const navigate = useNavigate();

  const [patient, setPatient] = useState(null);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const [formData, setFormData] = useState({
    nomMedecin: '',
    specialiteMedecin:'',
    nom:'',
    dateDeNaissance: '',
    sexe: '',
    adresseResidentielle: '',
    numeroTelephone: '',
    informationsAssuranceMaladie: {
      taille: '',
      poids: '',
      groupeSanguin: '',
      maladies: '',
      histoireMaladies: '',
      chirurgiesHospitalisations: '',
      allergies: '',
      vaccinations: '',
      medicamentsTraitements: '',
      traitementsRecus: '',
    },
    antecedentsFamiliaux: {
      maladiesHereditaires: '',
    },
    habitudesVieFacteursRisque: {
      tabagisme: false,
      consommationAlcool: false,
      drogues: false,
      regimeAlimentaireActivitePhysique: '',
      expositionsProfessionnellesEnvironnementales: '',
    },
    notesObservationsMedicales: '',
    comptesRendusConsultation: '',
    resultatsExamensAnalyses: '',
    planSoins: '',
    planTraitementActuel: '',
    recommandationsConseilsMedicaux: '',
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handling checkboxes for boolean values
    if (type === 'checkbox') {
      setFormData(formData => ({
        ...formData,
        [name]: checked,  // Directly using the checked value, which is a boolean
      }));
    } else {
      const nestedFields = name.split('.');
      if (nestedFields.length > 1) {
        setFormData(formData => ({
          ...formData,
          [nestedFields[0]]: {
            ...formData[nestedFields[0]],
            [nestedFields[1]]: value,
          },
        }));
      } else {
        setFormData(formData => ({
          ...formData,
          [name]: value,
        }));
      }
    }
  };
  

  const {patientId} = useParams();
console.log(patientId)
  
  const handleSubmit = async (e) => {



    e.preventDefault();


    const adjustedFormData = {

      patient: patientId ,

      nomMedecin: formData.nomMedecin,
      specialiteMedecin: formData.specialiteMedecin,
      dateNaissance: formData.dateDeNaissance, // Make sure the backend expects dateNaissance and not dateDeNaissance
      sexe: formData.sexe,
      adresseResidentielle: formData.adresseResidentielle,
      numeroTelephone: formData.numeroTelephone,
      taille: parseInt(formData.informationsAssuranceMaladie.taille),
      poids: parseInt(formData.informationsAssuranceMaladie.poids),
      groupeSanguin: formData.informationsAssuranceMaladie.groupeSanguin,
      maladiesHereditaires: formData.antecedentsFamiliaux.maladiesHereditaires,
      tabagisme: Boolean(formData.habitudesVieFacteursRisque.tabagisme),
      consommationAlcool: Boolean(formData.habitudesVieFacteursRisque.consommationAlcool),
      drogues: Boolean(formData.habitudesVieFacteursRisque.drogues),
      regimeAlimentaireActivitePhysique: formData.habitudesVieFacteursRisque.regimeAlimentaireActivitePhysique,
      expositionsProfessionnellesEnvironnementales: formData.habitudesVieFacteursRisque.expositionsProfessionnellesEnvironnementales,
      comptesRendusConsultation: formData.comptesRendusConsultation,
      resultatsExamensAnalyses: formData.resultatsExamensAnalyses,
      planTraitementActuel: formData.planTraitementActuel,
      recommandationsConseilsMedicaux: formData.recommandationsConseilsMedicaux,
      histoireMaladies: formData.informationsAssuranceMaladie.histoireMaladies,
      chirurgiesHospitalisations: formData.informationsAssuranceMaladie.chirurgiesHospitalisations,
      allergies: formData.informationsAssuranceMaladie.allergies,
      vaccinations: formData.informationsAssuranceMaladie.vaccinations,
    };

    try {
      console.log("Adjusted Form Data:", adjustedFormData);  // Debug to see what's being sent
      console.log('Patient ID:', patientId); // Log the extracted patientId
    
      

      const response = await axios.post(`http://localhost:3000/api/dossierMedical/ajouterDossierMedical/${patientId}`, adjustedFormData);
          
      setSnackbarMessage('Dossier médical ajouté avec succès');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate(`/profile/patient/${patientId}`); // Navigate back to the previous page after showing the Snackbar
      }, 2000); // Adjust time as needed
            console.log('Medical folder created:', response.data);

    } catch (error) {
      console.error('Error creating medical folder:', error.response ? error.response.data : error);
      toast.error("Erreur lors de l'ajout du dossier médical");

    }
  };
  

  




  return (
    <div className="medical-record-form">
  <div className="title-containerr">

  <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>

      <center><h2 >Dossier médical</h2> </center>
      </div>
      <form onSubmit={handleSubmit}>

<div className='form-group'>
      <label htmlFor="nomMedecin">Médecin traitant: :</label>
          <input
            type="text"
            id="nomMedecin"
            name="nomMedecin"
            value={formData.nomMedecin}
            onChange={handleInputChange}
            required
          />
         
      <label htmlFor="specialiteMedecin">Spécialité :</label>
          <input
            type="text"
            id="specialiteMedecin"
            name="specialiteMedecin"
            value={formData.specialiteMedecin}
            onChange={handleInputChange}
            required
          />
      </div>
      <div className="section-container">

     

        <h3>Informations Personnelles :</h3>
        <div class="left-column">
        <div className="form-group">
          <label htmlFor="nom">Nom :</label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={formData.nom}
            onChange={handleInputChange}
            required
          />
          </div>
        <div className="form-group">
          <label htmlFor="dateDeNaissance">Date de naissance :</label>
          <input
            type="date"
            id="dateDeNaissance"
            name="dateDeNaissance"
            value={formData.dateDeNaissance}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="sexe">Sexe :</label>
          <select
            id="sexe"
            name="sexe"
            value={formData.sexe}
            onChange={handleInputChange}
            required
          >
            <option value="">Sélectionner</option>
            <option value="homme">Homme</option>
            <option value="femme">Femme</option>
            <option value="autre">Autre</option>
          </select>
        </div>
</div>
<div className="right-column">
        <div className="form-group">
          <label htmlFor="adresseResidentielle">Adresse résidentielle :</label>
          <input
            type="text"
            id="adresseResidentielle"
            name="adresseResidentielle"
            value={formData.adresseResidentielle}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="numeroTelephone">Numéros de téléphone :</label>
          <input
            type="tel"
            id="numeroTelephone"
            name="numeroTelephone"
            value={formData.numeroTelephone}
            onChange={handleInputChange}
            required
          />
        </div>
       
        </div>
</div>
<div className="section-container">

        <h3>Informations sur l'assurance maladie :</h3>

        <div className="left-column">

        <div className="form-group">
          <label htmlFor="taille">Taille :</label>
          <input
            type="text"
            id="taille"
            name="informationsAssuranceMaladie.taille"
            value={formData.informationsAssuranceMaladie.taille}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="poids">Poids :</label>
          <input
            type="text"
            id="poids"
            name="informationsAssuranceMaladie.poids"
            value={formData.informationsAssuranceMaladie.poids}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="groupeSanguin">Groupe sanguin :</label>
          <input
            type="text"
            id="groupeSanguin"
            name="informationsAssuranceMaladie.groupeSanguin"
            value={formData.informationsAssuranceMaladie.groupeSanguin}
            onChange={handleInputChange}
          />
        </div>
        </div>
</div>




        <div className="section-container">
<h3>Maladies :</h3>
  <div className="left-column">

        
        <div className="form-group">
          <label htmlFor="histoireMaladies">Histoire des maladies passées :</label>
          <textarea
            id="histoireMaladies"
            name="informationsAssuranceMaladie.histoireMaladies"
            value={formData.informationsAssuranceMaladie.histoireMaladies}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="chirurgiesHospitalisations">Détails des chirurgies ou hospitalisations antérieures :</label>
          <textarea
            id="chirurgiesHospitalisations"
            name="informationsAssuranceMaladie.chirurgiesHospitalisations"
            value={formData.informationsAssuranceMaladie.chirurgiesHospitalisations}
            onChange={handleInputChange}
          />
        </div>
        </div>
        <div className="right-column">
        <div className="form-group">
          <label htmlFor="allergies">Allergies :</label>
          <input
            type="text"
            id="allergies"
            name="informationsAssuranceMaladie.allergies"
            value={formData.informationsAssuranceMaladie.allergies}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="vaccinations">Vaccinations :</label>
          <input
            type="text"
            id="vaccinations"
            name="informationsAssuranceMaladie.vaccinations"
            value={formData.informationsAssuranceMaladie.vaccinations}
            onChange={handleInputChange}
          />
        </div>
        </div>
        </div>



        <div className="section-container">
<h3> Médicaments et Traitements :</h3>

        <div className="left-column">


        <div className="form-group">
          <label htmlFor="medicamentsTraitements">Liste des médicaments actuels :</label>

          <textarea
            id="medicamentsTraitements"
            name="informationsAssuranceMaladie.medicamentsTraitements"
            value={formData.informationsAssuranceMaladie.medicamentsTraitements}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="traitementsRecus">Traitements reçus récemment :</label>
          <textarea
            id="traitementsRecus"
            name="informationsAssuranceMaladie.traitementsRecus"
            value={formData.informationsAssuranceMaladie.traitementsRecus}
            onChange={handleInputChange}
          />
        </div>
        </div>
      </div>


     

      <div className="section-container">

      <h3>Antécédents familiaux :</h3>

        
      <div className="left-column">

        <div className="form-group">
          <label htmlFor="maladiesHereditaires">Maladies héréditaires :</label>
          <textarea
            id="maladiesHereditaires"
            name="antecedentsFamiliaux.maladiesHereditaires"
            value={formData.antecedentsFamiliaux.maladiesHereditaires}
            onChange={handleInputChange}
          />
        </div>
        </div>
        </div>

        <div className="section-container">
  <h3>Habitudes de vie et facteurs de risque :</h3>
  <div className="left-column">
    <div className="form-group">
      <label htmlFor="tabagisme">Tabagisme :</label>
      <input
        type="checkbox"
        id="tabagisme"
        name="habitudesVieFacteursRisque.tabagisme"
        checked={formData.habitudesVieFacteursRisque.tabagisme}
        onChange={handleInputChange}
      />
    </div>
    <div className="form-group">
      <label htmlFor="consommationAlcool">Consommation d'alcool :</label>
      <input
        type="checkbox"
        id="consommationAlcool"
        name="habitudesVieFacteursRisque.consommationAlcool"
        checked={formData.habitudesVieFacteursRisque.consommationAlcool}
        onChange={handleInputChange}
      />
    </div>
    <div className="form-group">
      <label htmlFor="drogues">Drogues :</label>
      <input
        type="checkbox"
        id="drogues"
        name="habitudesVieFacteursRisque.drogues"
        checked={formData.habitudesVieFacteursRisque.drogues}
        onChange={handleInputChange}
      />
    </div>
  </div>

        <div className="right-column">
        <div className="form-group">
          <label htmlFor="regimeAlimentaireActivitePhysique">Régime alimentaire et activité physique :</label>
          <textarea
            id="regimeAlimentaireActivitePhysique"
            name="habitudesVieFacteursRisque.regimeAlimentaireActivitePhysique"
            value={formData.habitudesVieFacteursRisque.regimeAlimentaireActivitePhysique}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="expositionsProfessionnellesEnvironnementales">Expositions professionnelles :</label>
          <textarea
            id="expositionsProfessionnellesEnvironnementales"
            name="habitudesVieFacteursRisque.expositionsProfessionnellesEnvironnementales"
            value={formData.habitudesVieFacteursRisque.expositionsProfessionnellesEnvironnementales}
            onChange={handleInputChange}
          />
        </div>
</div>
</div>
<div className="section-container">
<h3>Notes et observations médicales :</h3>

<div class="left-column">

    
        <div className="form-group">
        <label htmlFor="comptesRendusConsultation">Comptes rendus de consultation :</label>

          <textarea
            id="comptesRendusConsultation"
            name="comptesRendusConsultation"
            value={formData.comptesRendusConsultation}
            onChange={handleInputChange}
          />
        </div>


        <div className="form-group">
        <label htmlFor="resultatsExamensAnalyses">Résultats des examens et analyses :</label>

          <textarea
            id="resultatsExamensAnalyses"
            name="resultatsExamensAnalyses"
            value={formData.resultatsExamensAnalyses}
            onChange={handleInputChange}
          />
        </div>
</div>
</div>


<div className="section-container">
<h3>Plans de soins et de traitement :</h3>


        <div className="left-column">
  
  <div className="form-group">
    <label htmlFor="planTraitementActuel">Plan de traitement actuel :</label>
    <textarea
      id="planTraitementActuel"
      name="planTraitementActuel"
      value={formData.planTraitementActuel}
      onChange={handleInputChange}
    />
  </div>
  <div className="form-group">
    <label htmlFor="recommandationsConseilsMedicaux">Recommandations et conseils médicaux :</label>
    <textarea
      id="recommandationsConseilsMedicaux"
      name="recommandationsConseilsMedicaux"
      value={formData.recommandationsConseilsMedicaux}
      onChange={handleInputChange}
    />
  </div>
</div>
</div>
        <button className="submitBtn"type="submit">Créer</button>
      </form>
    </div>
  );
};

export default DossierMedical;