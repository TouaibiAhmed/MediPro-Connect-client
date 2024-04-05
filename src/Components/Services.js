import React, { useState } from 'react';
import './Services.css';

const Services = () => {
  const [page, setPage] = useState(1);
  const departmentsPerPage = 9; // Nombre de départements par page

  // Liste des départements (exemples)
  const departments = [
    
        { name: 'Médecine Générale', description: 'Consultation générale pour tous types de maladies.', image: 'images/Médecine Générale.jpeg' },
        { name: 'Cardiologie', description: 'Consultation et traitement des problèmes cardiaques.', image: '/images/cardiologie.jpg' },
        { name: 'Pédiatrie', description: 'Spécialisé dans les soins de santé des nourrissons, enfants et adolescents.', image: '/images/pediatrie.jpg' },
        { name: 'Gynécologie', description: 'Consultation et traitement des problèmes de santé des femmes.', image: '/images/gynecologie.jpg' },
        { name: 'Neurologie', description: 'Spécialisé dans les maladies du système nerveux.', image: '/images/neurologie.jpg' },
        { name: 'Dermatologie', description: 'Consultation et traitement des problèmes de peau, des cheveux et des ongles.', image: '/images/dermatologie.jpg' },
        { name: 'Orthopédie', description: 'Consultation et traitement des problèmes liés aux os, aux articulations et aux muscles.', image: '/images/orthopedie.jpg' },
        { name: 'Endocrinologie', description: 'Spécialisé dans les troubles hormonaux et métaboliques.', image: '/images/endocrinologie.jpg' },
        { name: 'Ophtalmologie', description: 'Consultation et traitement des problèmes de vision et des yeux.', image: '/images/ophtalmologie.jpg' },
        { name: 'Oto-rhino-laryngologie (ORL)', description: 'Consultation et traitement des problèmes liés aux oreilles, au nez et à la gorge.', image: '/images/orl.jpg' },
        { name: 'Chirurgie générale', description: 'Spécialisé dans les interventions chirurgicales générales.', image: '/images/chirurgie_generale.jpg' },
        { name: 'Psychiatrie', description: 'Consultation et traitement des troubles mentaux et émotionnels.', image: '/images/psychiatrie.jpg' },
        { name: 'Rhumatologie', description: 'Spécialisé dans les maladies des articulations, des muscles et des tissus conjonctifs.', image: '/images/rhumatologie.jpg' },
        { name: 'Urologie', description: 'Consultation et traitement des problèmes du système urinaire chez les hommes et les femmes.', image: '/images/urologie.jpg' },
        { name: 'Radiologie', description: 'Spécialisé dans limagerie médicale pour le diagnostic des maladies.', image: '/images/radiologie.jpg' },
        { name: 'Anesthésiologie', description: 'Spécialisé dans la gestion de la douleur et lanesthésie lors des interventions chirurgicales.', image: '/images/anesthesiologie.jpg' },
        { name: 'Hématologie', description: 'Spécialisé dans les maladies du sang et des organes hématopoïétiques.', image: '/images/hematologie.jpg' },
        { name: 'Nutrition et diététique', description: 'Consultation et conseils sur la nutrition et les régimes alimentaires.', image: '/images/nutrition_dietetique.jpg' },
        { name: 'Médecine du travail', description: 'Spécialisé dans la santé des travailleurs et la prévention des risques professionnels.', image: '/images/medecine_travail.jpg' },
        { name: 'Oncologie', description: 'Spécialisé dans le diagnostic et le traitement des cancers.', image: '/images/oncologie.jpg' }
      ];
      

  // Fonction pour afficher les départements de la page actuelle
  const renderDepartments = () => {
    const startIndex = (page - 1) * departmentsPerPage;
    const endIndex = startIndex + departmentsPerPage;
    return departments.slice(startIndex, endIndex).map((department, index) => (
      <li className="service-item" key={startIndex + index}>
        <div className="service-info">
          <img src={department.image} alt={department.name} className="service-image" />
          <div className="service-details">
            <p><strong>Département: </strong>{department.name}</p>
            <p><strong>Description: </strong>{department.description}</p>
          </div>
        </div>
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
      <h2>Nos Services</h2>
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