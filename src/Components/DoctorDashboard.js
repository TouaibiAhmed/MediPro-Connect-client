import React, { useState } from 'react';
import './DoctorDashboard.css';
import Appointments from './Appointments';
const DoctorDashboard = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentsPerPage] = useState(5);

  // New state for selected date
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Format: YYYY-MM-DD


  const changeDate = (increment) => {
    setSelectedDate((prevDate) => {
      const currentDate = new Date(prevDate);
      currentDate.setDate(currentDate.getDate() + increment);
      return currentDate.toISOString().split('T')[0];
    });
  };

    const appointments = [
    { name: 'Ahmed', prename: 'Touaibi', age: 21, date: '06/02/2024', time: '9.15-10.15 am' },
    // ... more appointments
  ];
  const stats = [
    { label: 'Total Patients', value: 10, icon: '👥' },
    { label: 'Total Appointments', value: 14, icon: '📅' },
    { label: 'Total Review', value: '4.2/5', icon: '⭐' },
    // ... more stats
  ];
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = appointments.slice(indexOfFirstAppointment, indexOfLastAppointment);

  const totalPageCount = Math.ceil(appointments.length / appointmentsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPageCount; i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const goToPrevPage = () => setCurrentPage(currentPage => Math.max(1, currentPage - 1));
  const goToNextPage = () => setCurrentPage(currentPage => Math.min(totalPageCount, currentPage + 1));

  
  







  return (
    
    <div className="dashboard-container">
        <aside className="sidebar">
      <div className="profile-section">
        <img src="/images/doctor.png" alt="Dr. Profile" className="profile-image" />
        <h3 className="profile-name">Dr. Touaibi Ahmed</h3>
        <p className="profile-title">Dentist</p>
      </div>
      <nav className="navigation-menu">
        <ul>
          <li className="menu-item active">
            <span className="menu-icon dashboard-icon"></span>
            Dashboard
          </li>
          <li className="menu-item">
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

      <main className="main-content">
        <header className="dashboard-header">
          {/* Search and other header content */}
        </header>
        <section className="stats-section">
      {stats.map((stat, index) => (
        <div key={index} className="stat-item">
          <span className="stat-icon">{stat.icon}</span>
          <div className="stat-info">
          <div className="stat-label">{stat.label}</div>
            <div className="stat-value">{stat.value}</div>
            
          </div>
        </div>
      ))}
    </section>
  
        <section className="appointment-activity">
        <div className="date-switcher">
            <button onClick={() => changeDate(-1)}>&lt;</button>
            <span>{selectedDate}</span>
            <button onClick={() => changeDate(1)}>&gt;</button>
          </div>
          <h2>Appointment Activity</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Prename</th>
                <th>Age</th>
                <th>Date</th>
                <th>Visit Time</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment, index) => (
                <tr key={index}>
                  <td>{appointment.name}</td>
                  <td>{appointment.prename}</td>
                  <td>{appointment.age}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
           <div className="pagination">
            <span className={`page-item ${currentPage === 1 ? 'disabled' : ''}`} onClick={goToPrevPage}>
              Prev
            </span>
            {pageNumbers.map(number => (
              <span key={number} className={`page-item ${currentPage === number ? 'active' : ''}`} onClick={() => paginate(number)}>
                {number}
              </span>
            ))}
            <span className={`page-item ${currentPage === totalPageCount ? 'disabled' : ''}`} onClick={goToNextPage}>
              Next
            </span>
          </div>
             </section>
       
      </main>
    </div>
  );
};

export default DoctorDashboard;
