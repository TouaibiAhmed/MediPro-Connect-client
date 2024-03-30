import React, { useState } from 'react';
import './DossierMedical.css'
import axios from 'axios'; // Import Axios
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const DossierMedical = () => {
  const { patientId } = useParams();
    console.log('Patient ID:', patientId); // Add this line to check if patientId is correctly obtained


  
  const [formData, setFormData] = useState({
    nom: '',
    dateDeNaissance: '',
    sexe: '',
    adresseResidentielle: '',
    numerosTelephone: '',
    adresseEmail: '',
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
      tabagisme: '',
      consommationAlcool: '',
      drogues: '',
      regimeAlimentaireActivitePhysique: '',
      expositionsProfessionnelles: '',
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
    
    // Check if the input field is a checkbox
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      // Check if the input field belongs to a nested object
      const nestedFields = name.split('.');
      if (nestedFields.length > 1) {
        // If it's a nested field, update the nested object immutably
        setFormData({
          ...formData,
          [nestedFields[0]]: {
            ...formData[nestedFields[0]],
            [nestedFields[1]]: value,
          },
        });
      } else {
        // If it's not a nested field or checkbox, update normally
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    }
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Extract patientId from the route params
      const patientId = window.location.pathname.split('/').pop(); // Assuming the patient ID is part of the URL path
      console.log('Patient ID:', patientId); // Log the extracted patientId
    
      toast.success('Dossier médical ajouté avec succès');
      const response = await axios.post(`http://localhost:3000/api/dossierMedical/ajouterDossierMedical/${patientId}`, formData);
      console.log('Medical folder created:', response.data);
    } catch (error) {
      console.error('Error creating medical folder:', error);
      toast.error("Erreur lors de l'ajout du dossier médical");

    }
  };
  
  
  
  

  return (
    <div className="medical-record-form">
  <div className="title-container">

      <center><h2 >Dossier médical</h2> </center>
      </div>
<p className='name'>Patient: ...............</p>
      <form onSubmit={handleSubmit}>
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
          <label htmlFor="numerosTelephone">Numéros de téléphone :</label>
          <input
            type="tel"
            id="numerosTelephone"
            name="numerosTelephone"
            value={formData.numeroTelephone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="adresseEmail">Adresse e-mail :</label>
          <input
            type="email"
            id="adresseEmail"
            name="adresseEmail"
            value={formData.adresseEmail}
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
          <label htmlFor="expositionsProfessionnelles">Expositions professionnelles :</label>
          <textarea
            id="expositionsProfessionnelles"
            name="habitudesVieFacteursRisque.expositionsProfessionnelles"
            value={formData.habitudesVieFacteursRisque.expositionsProfessionnelles}
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
        <button type="submit">Créer</button>
      </form>
    </div>
  );
};

export default DossierMedical;