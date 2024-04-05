import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import './DisplayDossierMedical.css';

const DisplayDossierMedical = () => {
  const { id } = useParams();
console.log(id)
  const [dossierMedical, setDossierMedical] = useState(null);


  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({}); // Define formData state variable

  const navigate = useNavigate(); 


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/DossierMedical/consulterDossierMedical/${id}`);
        setDossierMedical(response.data);
        setFormData(response.data); 

      } catch (error) {
        console.error('Error fetching dossier medical:', error);
      }
    };

    fetchData();
  }, [id]);



  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDossierMedical(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/api/DossierMedical/updateDossierMedical/${id}`, dossierMedical);
      // Optionally, you may want to re-fetch the data after successful update
      // const response = await axios.get(`http://localhost:3000/api/DossierMedical/consulterDossierMedical/${id}`);
      // setDossierMedical(response.data);
      setEditMode(false); // Exit edit mode after successful update
    } catch (error) {
      console.error('Error updating dossier medical:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/DossierMedical/supprimerDossierMedical/${id}`);
      toast.success('Dossier médical supprimé avec succès');
      // Redirect to the previous page
      navigate(-1); // Navigate back to the previous page
    } catch (error) {
      console.error('Error deleting dossier medical:', error);
      toast.error('Erreur lors de la suppression du dossier médical');
    }
  };

 




  if (!dossierMedical) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dossier-medical-details">
    <div className="title-container">
      <center><h2>Dossier médical</h2></center>
    </div>
    <div className="button-containerr">
  {editMode ? (
    <button onClick={handleUpdate}>Save</button>
  ) : (
    <button onClick={toggleEditMode}>Edit</button>
  )}
  <button onClick={handleDelete}>Delete</button> 
</div>

    <p className="name">Patient: {dossierMedical.nom}</p>
    <div className="section-container">
      <h3>Informations Personnelles :</h3>
      <div className="left-column">
        <div className="form-group">
          <label htmlFor="nom">Nom :</label>
          {editMode ? (
            <input
              type="text"
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleInputChange}
              required
            />
          ) : (
            <p>{dossierMedical.nom}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="dateNaissance">Date de naissance :</label>
          {editMode ? (
            <input
              type="date"
              id="dateNaissance"
              name="dateNaissance"
              value={formData.dateNaissance}
              onChange={handleInputChange}
              required
            />
          ) : (
            <p>{dossierMedical.dateNaissance}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="sexe">Sexe :</label>
          {editMode ? (
            <div className="checkbox-container">
              <label className="checkbox-label">
                <input
                  className="checkbox-input"
                  type="checkbox"
                  value="homme"
                  checked={formData.sexe === 'homme'}
                  onChange={handleInputChange}
                  name="sexe"
                />
                Homme
              </label>
              <label className="checkbox-label">
                <input
                  className="checkbox-input"
                  type="checkbox"
                  value="femme"
                  checked={formData.sexe === 'femme'}
                  onChange={handleInputChange}
                  name="sexe"
                />
                Femme
              </label>
            </div>
          ) : (
            <p>{dossierMedical.sexe}</p>
          )}
        </div>
        {/* Repeat the same pattern for other attributes */}
      </div>
      <div className="right-column">
        <div className="form-group">
          <label htmlFor="adresseResidentielle">Adresse résidentielle :</label>
          {editMode ? (
            <input
              type="text"
              id="adresseResidentielle"
              name="adresseResidentielle"
              value={formData.adresseResidentielle}
              onChange={handleInputChange}
              required
            />
          ) : (
            <p>{dossierMedical.adresseResidentielle}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="numerosTelephone">Numéros de téléphone :</label>
          {editMode ? (
            <input
              type="text"
              id="numerosTelephone"
              name="numerosTelephone"
              value={formData.numeroTelephone}
              onChange={handleInputChange}
              required
            />
          ) : (
            <p>{dossierMedical.numeroTelephone}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="adresseEmail">Adresse e-mail :</label>
          {editMode ? (
            <input
              type="email"
              id="adresseEmail"
              name="adresseEmail"
              value={formData.adresseEmail}
              onChange={handleInputChange}
              required
            />
          ) : (
            <p>{dossierMedical.adresseEmail}</p>
          )}
        </div>
        
        {/* Repeat the same pattern for other attributes */}
      </div>
    </div>
    <div className="section-container">
        {/* Informations sur l'assurance maladie */}
        <h3>Informations sur l'assurance maladie :</h3>
        <div className="left-column">
          <div className="form-group">
            <label htmlFor="taille">Taille :</label>
            {editMode ? (
            <input
              type="text"
              id="taille"
              name="informationsAssuranceMaladie.taille"
              value={formData.informationsAssuranceMaladie?.taille || ''}
              onChange={handleInputChange}
            />
            ) : (
              <p>{dossierMedical.taille} Cm</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="poids">Poids :</label>
            {editMode ? (
            <input
              type="text"
              id="poids"
              name="informationsAssuranceMaladie.poids"
              value={formData.poids || ''}
              onChange={handleInputChange}
            />
            ) : (
              <p>{dossierMedical.poids}Kg</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="groupeSanguin">Groupe sanguin :</label>
            {editMode ? (
            <input
              type="text"
              id="groupeSanguin"
              name="informationsAssuranceMaladie.groupeSanguin"
              value={formData.groupeSanguin || ''}
              onChange={handleInputChange}
            />
             ) : (
              <p>{dossierMedical.Poids}</p>
            )}
          </div>
        </div>

        </div>

        <div className="section-container">
<h3>Maladies :</h3>
  <div className="left-column">
  <div className="form-group">
            <label htmlFor="histoireMaladies">Histoire des maladies passées :</label>
            {editMode ? (

            <textarea
              id="histoireMaladies"
              name="informationsAssuranceMaladie.histoireMaladies"
              value={formData.histoireMaladies || ''}
              onChange={handleInputChange}
            />
            ) : (
              <p>{dossierMedical.histoireMaladies}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="chirurgiesHospitalisations">Détails des chirurgies ou hospitalisations antérieures :</label>
            {editMode ? (
            <textarea
              id="chirurgiesHospitalisations"
              name="informationsAssuranceMaladie.chirurgiesHospitalisations"
              value={formData.chirurgiesHospitalisations || ''}
              onChange={handleInputChange}
            />
            ) : (
              <p>{dossierMedical.chirurgiesHospitalisations}</p>
            )}
          </div>
        </div>
        <div className="right-column">
          <div className="form-group">
            <label htmlFor="allergies">Allergies :</label>
            {editMode ? (

            <input
              type="text"
              id="allergies"
              name="informationsAssuranceMaladie.allergies"
              value={formData.allergies || ''}
              onChange={handleInputChange}
            />
            ) : (
              <p>{dossierMedical.allergies}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="vaccinations">Vaccinations :</label>
            {editMode ? (

            <input
              type="text"
              id="vaccinations"
              name="informationsAssuranceMaladie.vaccinations"
              value={formData.vaccinations || ''}
              onChange={handleInputChange}
            />
            ) : (
              <p>{dossierMedical.vaccinations}</p>
            )}
          </div>
        </div>
      </div>

      <div className="section-container">
          <h3>Antécédents familiaux :</h3>
          <div className="left-column">
            <div className="form-group">
              <label htmlFor="maladiesHereditaires">Maladies héréditaires :</label>
              {editMode ? (

              <textarea
                id="maladiesHereditaires"
                name="antecedentsFamiliaux.maladiesHereditaires"
                value={formData.maladiesHereditaires || ''}
                onChange={handleInputChange}
              />
              ) : (
                <p>{dossierMedical.maladiesHereditaires}</p>
              )}
            </div>
          </div>
        </div>

        {/* Habitudes de vie et facteurs de risque */}
        <div className="section-container">
          <h3>Habitudes de vie et facteurs de risque :</h3>
          <div className="left-column">
            <div className="form-group">
              <label htmlFor="tabagisme">Tabagisme :</label>
              {editMode ? (

              <input
                type="checkbox"
                id="tabagisme"
                name="habitudesVieFacteursRisque.tabagisme"
                checked={formData.tabagisme || false}
                onChange={handleInputChange}
              />
              ) : (
                <p>{dossierMedical.tabagisme}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="consommationAlcool">Consommation d'alcool :</label>
              {editMode ? (

              <input
                type="checkbox"
                id="consommationAlcool"
                name="habitudesVieFacteursRisque.consommationAlcool"
                checked={formData.consommationAlcool || false}
                onChange={handleInputChange}
              />
              ) : (
                <p>{dossierMedical.consommationAlcool}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="drogues">Drogues :</label>
              {editMode ? (

              <input
                type="checkbox"
                id="drogues"
                name="habitudesVieFacteursRisque.drogues"
                checked={formData.drogues || false}
                onChange={handleInputChange}
              />
              ) : (
                <p>{dossierMedical.consommationAlcool}</p>
              )}
            </div>
          </div>
          <div className="right-column">
            <div className="form-group">
              <label htmlFor="regimeAlimentaireActivitePhysique">Régime alimentaire et activité physique :</label>
              {editMode ? (

              <textarea
                id="regimeAlimentaireActivitePhysique"
                name="habitudesVieFacteursRisque.regimeAlimentaireActivitePhysique"
                value={formData.regimeAlimentaireActivitePhysique || ''}
                onChange={handleInputChange}
              />
              ) : (
                <p>{dossierMedical.regimeAlimentaireActivitePhysique}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="expositionsProfessionnelles">Expositions professionnelles :</label>
              {editMode ? (

              <textarea
                id="expositionsProfessionnelles"
                name="habitudesVieFacteursRisque.expositionsProfessionnelles"
                value={formData.expositionsProfessionnelles || ''}
                onChange={handleInputChange}
              />
              ) : (
                <p>{dossierMedical.expositionsProfessionnelles}</p>
              )}
            </div>
          </div>
        </div>

        {/* Notes et observations médicales */}
        <div className="section-container">
          <h3>Notes et observations médicales :</h3>
          <div className="left-column">
            <div className="form-group">
              <label htmlFor="comptesRendusConsultation">Comptes rendus de consultation :</label>
              {editMode ? (

              <textarea
                id="comptesRendusConsultation"
                name="comptesRendusConsultation"
                value={formData.comptesRendusConsultation || ''}
                onChange={handleInputChange}
              />
              ) : (
                <p>{dossierMedical.comptesRendusConsultation}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="resultatsExamensAnalyses">Résultats des examens et analyses :</label>
              {editMode ? (

              <textarea
                id="resultatsExamensAnalyses"
                name="resultatsExamensAnalyses"
                value={formData.resultatsExamensAnalyses || ''}
                onChange={handleInputChange}
              />
              ) : (
                <p>{dossierMedical.resultatsExamensAnalyses}</p>
              )}
            </div>
          </div>
        </div>

        {/* Plans de soins et de traitement */}
        <div className="section-container">
          <h3>Plans de soins et de traitement :</h3>
          <div className="left-column">
            <div className="form-group">
              <label htmlFor="planTraitementActuel">Plan de traitement actuel :</label>
              {editMode ? (

              <textarea
                id="planTraitementActuel"
                name="planTraitementActuel"
                value={formData.planTraitementActuel || ''}
                onChange={handleInputChange}
              />
              ) : (
                <p>{dossierMedical.planTraitementActuel}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="recommandationsConseilsMedicaux">Recommandations et conseils médicaux :</label>
              {editMode ? (

              <textarea
                id="recommandationsConseilsMedicaux"
                name="recommandationsConseilsMedicaux"
                value={formData.recommandationsConseilsMedicaux || ''}
                onChange={handleInputChange}
              />
              ) : (
                <p>{dossierMedical.recommandationsConseilsMedicaux}</p>
              )}
            </div>
          </div>
        </div>




  </div>











        
        
   
);
};

export default DisplayDossierMedical;
