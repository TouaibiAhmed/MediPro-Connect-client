import React, { useState } from 'react';
import './Services.css';
import { Link } from 'react-router-dom';

const Services = () => {
  const [page, setPage] = useState(1);
  const departmentsPerPage = 9; // Nombre de départements par page

    // Liste des départements (exemples)
    const departments = [
      
          { name: 'General Practitioner', description: 'General consultation for all types of illnesses.', image: 'images/med gen.jpg' },
          { name: 'Cardiology', description: ' Consultation and treatment of heart problems.', image: '/images/cardio.jpg' },
          { name: 'Pediatrics', description: 'Specialized in healthcare for infants, children, and adolescents.', image: '/images/pedia.jpeg' },
          { name: 'Gynecology', description: 'Consultation and treatment of womens health problems.', image: '/images/gyneco.jpg' },
          { name: 'Neurology', description: 'Specialized in diseases of the nervous system.', image: '/images/neuro.jpg' },
          { name: 'Dermatology', description: 'Consultation and treatment of skin, hair, and nail problems.', image: '/images/dermato.jpeg' },
          { name: 'Orthopedics', description: ' Consultation and treatment of problems related to bones, joints, and muscles.', image: '/images/orthopédie.jpg' },
          { name: 'Endocrinology', description: 'Specialized in hormonal and metabolic disorders.', image: '/images/endocrinologie.jpeg' },
          { name: 'Ophthalmology', description: 'Consultation and treatment of vision and eye problems.', image: '/images/ophtalmologie.jpg' },
          { name: 'Otolaryngology (ENT)', description: 'Consultation and treatment of problems related to ears, nose, and throat.', image: '/images/orl.jpg' },
          { name: 'Psychiatry', description: 'Consultation and treatment of mental and emotional disorders.', image: '/images/psyc.jpg' },
          { name: 'Rheumatology', description: ' Specialized in joint, muscle, and connective tissue diseases.', image: '/images/rhumatologie.jpg' },
          { name: 'Urology', description: 'Consultation and treatment of urinary system problems in both men and women.', image: '/images/urologie.jpg' },
          { name: 'Anesthesiology', description: 'Specialized in pain management and anesthesia during surgical procedures.', image: '/images/anesthesiologie.jpg' },
          { name: 'Nutrition and Dietetics', description: ' Consultation and advice on nutrition and dietary plans.', image: '/images/nutrition.jpg' },
          { name: 'Dental Care', description: ' Specialized in the diagnosis and treatment of dental conditions.', image: '/images/dentist.jpg' },
          { name: 'Radiology', description: ' Specialized in medical imaging and diagnostic techniques using radiation.', image: '/images/radio.jpg' },
          { name: 'Gastroenterology', description: 'Specialized in digestive, intestinal, and gastrointestinal disorders. ', image: '/images/gastro.jpg' }


        ];
      

  // Fonction pour afficher les départements de la page actuelle
  const renderDepartments = () => {
    const startIndex = (page - 1) * departmentsPerPage;
    const endIndex = startIndex + departmentsPerPage;
    return departments.slice(startIndex, endIndex).map((department, index) => (
      <li className="service-item" key={startIndex + index}>
           <Link
  to={`/doctors?speciality=${encodeURIComponent(department.name)}`}
  departments={departments} // Pass departments as a prop
>
          <div className="service-info">
            <img src={department.image} alt={department.name} className="service-image" />
            <div className="service-details">
              <p><strong>Département: </strong>{department.name}</p>
              <p><strong>Description: </strong>{department.description}</p>
            </div>
          </div>
        </Link>
      </li>
    ));
  };

  const totalPages = Math.ceil(departments.length / departmentsPerPage);

  // Fonctions pour passer à la page suivante et précédente
  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="services-container">
      <div className="services-header">
    <h1 className='services'>Services</h1>
  </div>
      <ul className="services-list">
        {renderDepartments()}
      </ul>
      <div className="pagination">
        <button onClick={prevPage} disabled={page === 1}>Précédent</button>
        <span>{page} / {totalPages}</span>
        <button onClick={nextPage} disabled={page === totalPages}>Suivant</button>
      </div>
    </div>
  );
};

export default Services;