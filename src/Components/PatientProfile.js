    import React, { useState, useEffect } from 'react';
    import { useParams, Link, useNavigate  } from 'react-router-dom';
    import axios from 'axios';
    import './PatientProfile.css'; // Import your custom CSS file
    import { toast, ToastContainer } from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.css';
    import { Cloudinary } from 'cloudinary-core'; // Import Cloudinary



    const PatientProfile = () => {
      
      const [patient, setPatient] = useState(null);
      const { idPatient } = useParams();
      const navigate = useNavigate(); 
      console.log('Patient ID:', idPatient);

      const authToken = localStorage.getItem('authToken');


      const [editing, setEditing] = useState(false);

      const [showProfileCard, setShowProfileCard] = useState(true); // State for profile card visibility

      const [activeButton, setActiveButton] = useState(null); // State for the currently active button

      const [medicalRecords, setMedicalRecords] = useState([]); // State for medical records

      const [showMedicalRecords, setShowMedicalRecords] = useState(false); // State for showing medical records

      const [showUploadModal, setShowUploadModal] = useState(false);


      const [selectedFile, setSelectedFile] = useState(null);

      const [showOrdonnance, setShowOrdonnance] = useState(false); // State for showing ordonnance section

      const [ordonnances, setOrdonnances] = useState([]);


      const cloudinary = new Cloudinary({
        cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME, 
      });


      const loggedInUserId = idPatient; // Add this line




        const [formData, setFormData] = useState({
          nom: '',
          prenom: '',
          adresse: '',
          telephone: '',
          dateNaissance: '',
          email: '',
          statutSocial: '',
          image: '',
          sexe: '',
          Allergie:'',
          oldPassword: '',
          newPassword: ''
        });








      const toggleEditing = () => {
        setEditing(!editing);
        // Reset form data to current patient data when exiting editing mode
        if (!editing && patient) {
          setFormData({
            nom: patient.nom,
            prenom: patient.prenom,
            adresse: patient.adresse,
            telephone: patient.telephone,
            dateNaissance: patient.dateNaissance,
            email: patient.email,
            statutSocial: patient.statutSocial,
            image: patient.image,
            sexe: patient.sexe,
            Allergie:patient.Allergie,
            oldPassword: '',
            newPassword: ''
                });
        }
      };
      






      useEffect(() => {
        const fetchPatient = async () => {
          try {
            const response = await axios.get(`http://localhost:3000/api/patient/consulterprofil/${idPatient}`);
            
      
            const patientData = response.data;

            setPatient({
              nom: patientData.nom,
              prenom: patientData.prenom,
              adresse: patientData.adresse,
              telephone: patientData.telephone,
              dateOfBirth: patientData.dateNaissance, // Corrected key
              email: patientData.email,
              statutSociale: patientData.statutSocial, // Corrected key
              image: patientData.image,
              sexe: patientData.sexe,
              Allergie: patientData.Allergie, // Corrected key
              dossiersMedicaux: patientData.dossiersMedicaux, 
              Ordonnances: patientData.ordonnances        });     


            if (patientData && patientData.dossiersMedicaux) {
              setMedicalRecords(patientData.dossiersMedicaux);
            }
            
            if (patientData.ordonnances) {
              console.log("Ordonnance IDs:", patientData.ordonnances);
              setOrdonnances(patientData.ordonnances); // Update this line
            }
          

            } catch (error) {
            console.error('Error fetching patient:', error);
          }
        };

        fetchPatient();
      }, [idPatient]);



      const handleUpdate = async () => {
        try {
          console.log("Updating patient data:", patient);
          const response = await axios.put(`http://localhost:3000/api/patient/updateProfil/${idPatient}`, patient);
          console.log("Update response:", response.data);
      
          const updatedPatientData = response.data;
          setPatient({
            ...patient,
            dateNaissance: updatedPatientData.dateNaissance, // Corrected key
            statutSocial: updatedPatientData.statutSocial, // Corrected key
          });
          setEditing(false);
        } catch (error) {
          console.error('Error updating patient profile:', error);
        }
      };
      
      





      const toggleProfileCard = () => {
        // Only toggle the visibility of the profile card if it's not already displayed
        if (!showProfileCard) {
          setShowProfileCard(true);
        }
      };
      const handleButtonClick = (buttonName) => {
        console.log('Button clicked:', buttonName);
        setActiveButton(buttonName);
        // Update showProfileCard state based on the button clicked
        if (buttonName === 'profile') {
          setShowProfileCard(true);
          setShowMedicalRecords(false);
          setShowOrdonnance(false);
        } else if (buttonName === 'medicalRecords') {
          setShowProfileCard(false);
          setShowMedicalRecords(true);
          setShowOrdonnance(false);
        } else if (buttonName === 'ordonnance') {
          setShowProfileCard(false);
          setShowMedicalRecords(false);
          setShowOrdonnance(true);
        }
      };


      // Assume that the logged-in user's ID is the same as the profile being viewed

      



      const toggleMedicalRecords = () => {
        setShowMedicalRecords(!showMedicalRecords);
      };








      
      const handleImageChange = async (file) => {
        try {
          const formData = new FormData();
          formData.append('image', file);
      
          const response = await axios.post('http://localhost:3000/api/upload/image', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
      
          const imageUrl = response.data.imageUrl;
          setPatient({ ...patient, image: imageUrl });
        } catch (error) {
          console.error('Error uploading image:', error);
          // Handle error here (e.g., display error message to user)
        }
      };


    
      const handleMedicalRecordClick = async (recordId) => {
        // Handle click on medical record
        try {
          // Navigate to DisplayDossierMedical component with recordId as URL parameter
          navigate(`/display-dossier-medical/${recordId}`);
        } catch (error) {
          console.error('Error navigating to DisplayDossierMedical:', error);
        }
      };



      const handleUploadNewRecordClick = () => {
        setShowUploadModal(true);
      };
      
      const handleCancelClick = () => {
        setShowUploadModal(false);
        setSelectedFile(null); // Clear selected file
      };
    
      // Function to handle file upload
      const handleFileUpload = async () => {
        if (!selectedFile) {
          console.log("No file selected.");
          return;
        }
      
        try {
          const formData = new FormData();
          formData.append('file', selectedFile);
      
          // Make a POST request to upload the file to Cloudinary
          const response = await axios.post(`https://api.cloudinary.com/v1_1/dqrzdmgyl/upload`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${process.env.REACT_APP_CLOUDINARY_API_KEY}:${process.env.REACT_APP_CLOUDINARY_API_SECRET}`, // Use your Cloudinary API key and API secret
            }
          });
      
          console.log("File uploaded successfully:", response.data);
      
          // Update medicalRecords state with Cloudinary URL
          setMedicalRecords(prevRecords => [...prevRecords, response.data.secure_url]);
      
          // Clear selected file
          setSelectedFile(null);
          setShowUploadModal(false);
        } catch (error) {
          console.error('Error uploading file:', error);
          // Handle error here (e.g., display error message to user)
        }
      };
      
    
      // Function to handle file input change
      const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
      };

      const handleAddMedicalRecordClick = () => {
        // Handle click on "Add Medical Record" button
        try {
          // Navigate to DossierMedical component with the patient ID as URL parameter
          navigate(`/dossier-medical/${idPatient}`);
        } catch (error) {
          console.error('Error navigating to DossierMedical:', error);
        }
      };


      const handleAddOrdonnance = () =>{

        try{
          navigate(`/addOrdonnance/${idPatient}`);
        }catch(error){
          console.error('Error navigating to Ordonnance:', error);

        }
      };


 
      

      const handleOrdonnanceButtonClick = () => {
        console.log('Ordonnance button clicked');
        setActiveButton('ordonnance');
        setShowProfileCard(false); // Hide profile card when ordonnance section is active
        setShowMedicalRecords(false); // Hide medical records section when ordonnance section is active
        setShowOrdonnance(true); // Show ordonnance section
      };
      

      const navigateToOrdonnance  = async(ordonnanceId) =>{
        try{
          navigate(`/ordonnance/${ordonnanceId}`)
        }  catch (error) {
          console.error('Error navigating to DisplayOrdonnance:', error);
        }
      }




      
      

      if (!patient) {
        return <div>Loading...</div>;
      }


      const dateOfBirth = patient.dateOfBirth ? patient.dateOfBirth.split('T')[0] : '';

      

      return (
        <div className="patient-container">

          <div className="sidebar">
          {editing ? (
        <>
          <label htmlFor="profile-image">
            <img src={patient.image} alt="Profile" className="profile-image" />
            <input
              type="file"
              id="profile-image"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => handleImageChange(e.target.files[0])}
            />
          </label>
        </>
      ) : (
        <>
          <img src={patient.image} alt="Profile" className="profile-image" />
        </>
      )}

            <p className="sidebar-name"> {patient.nom} {patient.prenom}</p>

            <ul className="profile-menu">
      <li>
            <button className={`btnn ${activeButton === 'profile' ? 'active' : ''}`} onClick={() => handleButtonClick('profile')}>
          <img src="/images/acc.png" alt="User Icon" className="sidebar-icon" />
          <span>Profile</span>

        </button>
      </li>
      <li>
      <button className={`btnn ${activeButton === 'medicalRecords' ? 'active' : ''}`} onClick={() => handleButtonClick('medicalRecords')}>
          <img src="/images/dossier.png" alt="Medical File Icon" className="sidebar-icon" />
          <span>Dossier Medical</span>
        </button>
      </li>
      <li>
      <button className={`btnn ${activeButton === 'ordonnance' ? 'active' : ''}`} onClick={handleOrdonnanceButtonClick}>
          <img src="/images/ord.png" alt="Prescription Icon" className="sidebar-icon" />
          <span>Ordonnance</span>
        </button>
      </li>
      <li>
        <button className="btnn">
          <img src="/images/rdv.png" alt="Calendar Icon" className="sidebar-icon" />
        <span> Rendez-vous</span>
        </button>
      </li>
      <li>
        <button className="btnn" onClick={toggleEditing}>
          <img src="/images/settings.png" alt="Settings Icon" className="sidebar-icon" />
        <span> Settings</span>
        </button>
      </li>
      <li>
        <button className="btnn" >
          <img src="/images/logout.png" alt="Logout Icon" className="sidebar-icon" />
        <span> Logout</span>
        </button>
      </li>

    </ul>
          </div>
          {showProfileCard && (
          <div className="patient-profile-card">
            <div className="card">
              <h5 className="card-header">Patient Account</h5>
              <div className="card-body">
              {patient && (
      <>
        <p className="card-text">Email (Login): {editing ? <input type="email" value={patient.email} onChange={(e) => setPatient(prevPatient => ({ ...prevPatient, email: e.target.value }))} /> : patient.email}</p>
        <p className="card-text">Last Name: {editing ? <input type="text" value={patient.nom} onChange={(e) => setPatient(prevPatient => ({ ...prevPatient, nom: e.target.value }))} /> : patient.nom}</p>
        <p className="card-text">First Name: {editing ? <input type="text" value={patient.prenom} onChange={(e) => setPatient(prevPatient => ({ ...prevPatient, prenom: e.target.value }))} /> : patient.prenom}</p>
        <p className="card-text">Date Of Birth: {editing ? <input type="date" value={dateOfBirth} onChange={(e) => setPatient(prevPatient => ({ ...prevPatient, dateOfBirth: e.target.value }))} /> : dateOfBirth}</p>
        <p className="card-text">Tel: {editing ? <input type="text" value={patient.telephone} onChange={(e) => setPatient(prevPatient => ({ ...prevPatient, telephone: e.target.value }))} /> : patient.telephone}</p>
        <p className="card-text">Adresse: {editing ? <input type="text" value={patient.adresse} onChange={(e) => setPatient(prevPatient => ({ ...prevPatient, adresse: e.target.value }))} /> : patient.adresse}</p>
        <p className="card-text">Sexe:
      {editing ? (
        <div className="checkbox-container">
          <label className="checkbox-label">
            <input className="checkbox-input"

              type="checkbox"
              value="Homme"
              checked={patient.sexe === 'Homme'}
              onChange={(e) => setPatient(prevPatient => ({ ...prevPatient, sexe: e.target.checked ? 'Homme' : 'Femme' }))}
            />
            Homme
          </label>
          <label className="checkbox-label">
            <input className="checkbox-input"

              type="checkbox"
              value="Femme"
              checked={patient.sexe === 'Femme'}
              onChange={(e) => setPatient(prevPatient => ({ ...prevPatient, sexe: e.target.checked ? 'Femme' : 'Homme' }))}
            />
            Femme
          </label>
        </div>
      ) : patient.sexe}
    </p>   
    <p className="card-text">Statut Sociale:
      {editing ? (
        <select
          value={patient.statutSociale}
          onChange={(e) => setPatient(prevPatient => ({ ...prevPatient, statutSociale: e.target.value }))}
        >
          <option value="Célibataire">Célibataire</option>
          <option value="Marié">Marié</option>
          <option value="Divorcé">Divorcé</option>
        </select>
      ) : patient.statutSociale}
    </p>
    <p className="card-text" style={{ position: "relative" }}>Allergie:
      {editing ? (
        <textarea
        style={{ position: "absolute", top: "0", left: "120px", width: "200px", height: "50px" }}

          value={patient.Allergie}
          onChange={(e) => setPatient(prevPatient => ({ ...prevPatient, Allergie: e.target.value }))}
        />
      ) : patient.Allergie}
    </p>
    {editing && (
    <>
      <div className="password-container">
      <p className="card-text">Change Password:</p>
      <div className="password-inputs">
        <p className="card-text">
          <input type="password" value={formData.oldPassword} onChange={(e) => setFormData(prevFormData => ({ ...prevFormData, oldPassword: e.target.value }))} placeholder="Old Password" />
        </p>
        <p className="card-text">
          <input type="password" value={formData.newPassword} onChange={(e) => setFormData(prevFormData => ({ ...prevFormData, newPassword: e.target.value }))} placeholder="New Password" />
        </p>
      </div>
      <button className="btn btn-primary" onClick={handleUpdate}>Update</button>
    </div>
    </>
  )}






      </>
    )}


    </div>
              
            </div>
          </div>
          )}





{showMedicalRecords && (
  <div className="medical-records-container">
    <h3>Medical Records
   
    </h3>
    <div className='add'>
  <button className="btn-add" onClick={handleAddMedicalRecordClick}>
    <img src="/images/ajouter.png" alt="Add Icon" /> 
  </button>
</div>

    <div className="medical-records">
    {medicalRecords.map((recordId, index) => (
        <div key={recordId} className="medical-record-card" >
          <div className="card-icon">
            <img src="/images/dossier-medical.png" alt="Medical Record Icon" />
          </div>
          <div className="card-content">
            <p onClick={() => handleMedicalRecordClick(recordId)}>Dossier Médical {index + 1}</p>
          </div>
         
        </div>
      ))}

           <div className="medical-record-card upload-card"  onClick={() => handleUploadNewRecordClick ()}>
        <div className="card-icon">
          <img src="/images/telecharger.png" alt="Upload Icon" />
        </div>
        <div className="card-content">
          <p>Upload New Record</p>
        </div>
      </div>
   
   

      {showUploadModal && (
       <div className="modal"  style={{ opacity: showUploadModal ? 1 : 0 }} >
       <div className="modal-header">
         <div className="modal-logo">
           <span className="logo-circle">
             <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="512" height="419.116" viewBox="0 0 512 419.116">
               <defs>
                 <clipPath id="clip-folder-new">
                   <rect width="512" height="419.116" />
                 </clipPath>
               </defs>
               <g id="folder-new" clipPath="url(#clip-folder-new)">
                 <path id="Union_1" data-name="Union 1" d="M16.991,419.116A16.989,16.989,0,0,1,0,402.125V16.991A16.989,16.989,0,0,1,16.991,0H146.124a17,17,0,0,1,10.342,3.513L227.217,57.77H437.805A16.989,16.989,0,0,1,454.8,74.761v53.244h40.213A16.992,16.992,0,0,1,511.6,148.657L454.966,405.222a17,17,0,0,1-16.6,13.332H410.053v.562ZM63.06,384.573H424.722L473.86,161.988H112.2Z" fill="var(--c-action-primary)" stroke="" strokeWidth="1" />
               </g>
             </svg>
           </span>
         </div>
         <button className="btn-close">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" fill="var(--c-text-secondary)"/></svg>
         </button>
       </div>
       <div className="modal-body">
         <h2 className="modal-title">Upload a file</h2>
         <input type="file" onChange={handleFileChange} />

         <p className="modal-description">Attach the file below</p>
         <button className="upload-area">
           <span className="upload-area-icon">
             <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="340.531" height="419.116" viewBox="0 0 340.531 419.116">
               <g id="files-new" clipPath="url(#clip-files-new)">
                 <path id="Union_2" data-name="Union 2" d="M-2904.708-8.885A39.292,39.292,0,0,1-2944-48.177V-388.708A39.292,39.292,0,0,1-2904.708-428h209.558a13.1,13.1,0,0,1,9.3,3.8l78.584,78.584a13.1,13.1,0,0,1,3.8,9.3V-48.177a39.292,39.292,0,0,1-39.292,39.292Zm-13.1-379.823V-48.177a13.1,13.1,0,0,0,13.1,13.1h261.947a13.1,13.1,0,0,0,13.1-13.1V-323.221h-52.39a26.2,26.2,0,0,1-26.194-26.195v-52.39h-196.46A13.1,13.1,0,0,0-2917.805-388.708Zm146.5,241.621a14.269,14.269,0,0,1-7.883-12.758v-19.113h-68.841c-7.869,0-7.87-47.619,0-47.619h68.842v-18.8a14.271,14.271,0,0,1,7.882-12.758,14.239,14.239,0,0,1,14.925,1.354l57.019,42.764c.242.185.328.485.555.671a13.9,13.9,0,0,1,2.751,3.292,14.57,14.57,0,0,1,.984,1.454,14.114,14.114,0,0,1,1.411,5.987,14.006,14.006,0,0,1-1.411,5.973,14.653,14.653,0,0,1-.984,1.468,13.9,13.9,0,0,1-2.751,3.293c-.228.2-.313.485-.555.671l-57.019,42.764a14.26,14.26,0,0,1-8.558,2.847A14.326,14.326,0,0,1-2771.3-147.087Z" transform="translate(2944 428)" fill="var(--c-action-primary)"/>
               </g>
             </svg>
           </span>
           <span className="upload-area-title">Drag file(s) here to upload.</span>
           <span className="upload-area-description">
             Alternatively, you can select a file by <br/><strong>clicking here</strong>
           </span>
         </button>
       </div>
       <div className="modal-footer">
       <button className="btn-secondary" onClick={handleCancelClick}>Cancel</button>
            <button className="btn-primary" onClick={handleFileUpload}>Upload File</button>
       </div>
     </div>
      )}
         
         


         





   

    </div>
  </div>
)}


  {showOrdonnance && (
    <div className="ordonnances-container">
      <h3>Ordonnances</h3>
      <div className='add'>
        <button className="btn-add" onClick={handleAddOrdonnance}>                      
          <img src="/images/ajouter.png" alt="Add Icon" /> 
        </button>
      </div>

      <div className="ordonnances">
      {ordonnances.map((ordonnanceId, index) => (
          
          <div key={`${ordonnanceId}-${index}`} className="ordonnance-card">
          <div className="card-icon">
              <img src="/images/ordonnance.png" alt="Ordonnance Icon" />
            </div>
            <div className="card-content">
           <p> <Link to={`/ordonnance/${ordonnanceId}`}>Ordonnance {index + 1}</Link></p>
            </div>
          </div>
        ))}

        
      </div>
    </div>
  )}













        </div>  
      );
    };

    export default PatientProfile;
