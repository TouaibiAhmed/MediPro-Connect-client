import React, { useState } from 'react';
import './PatientsHistory.css'; // Make sure to create a corresponding CSS file

const PatientHistory = ({ interactions }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredInteractions = interactions.filter(interaction =>
    interaction.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
        <aside className="sidebar">
    <div className="profile-section">
      <img src="/images/img.jpg" alt="Dr. Profile" className="profile-image" />
      <h3 className="profile-name">Dr. Touaibi Ahmed</h3>
      <p className="profile-title">Dentist</p>
    </div>
    <nav className="navigation-menu">
      <ul>
        <li className="menu-item ">
          <span className="menu-icon dashboard-icon"></span>
          Dashboard
        </li>
        <li className="menu-item active">
          <span className="menu-icon appointments-icon"></span>
          Appointments
        </li>
        <li className="menu-item">
          <span className="menu-icon history-icon"></span>
          Patients History
        </li>
        <li className="menu-item">
          <span className="menu-icon reports-icon"></span>
          Reports
        </li>
      </ul>
    </nav>
    <p  className='medipro'> © 2024 MediPro Connect. </p>
  </aside>
    <div className="patient-interactions">
      <h2>Patient Interactions</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Notes</th>
            <th>Outcome</th>
          </tr>
        </thead>
        <tbody>
          {interactions.map((interaction, index) => (
            <tr key={index}>
              <td>{interaction.date}</td>
              <td>{interaction.type}</td>
              <td>{interaction.notes}</td>
              <td>{interaction.outcome}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default PatientHistory;
