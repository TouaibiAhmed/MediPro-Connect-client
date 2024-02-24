import React, {useState} from 'react';
import './Appointments.css'; // Ensure you have a corresponding CSS file for styling


const Appointments = ({ requests, onAccept, onCancel }) => {


    const [appointmentRequests, setAppointmentRequests] = useState([
        // Placeholder data for appointment requests
        { patientName: 'Ahmed', prename: 'Touaibi', age: 21, date: '20/02/2024', visitTime: '10:00-10:30 am' },
        { patientName: 'Belgacem', prename: 'Balti', age: 22, date: '20/02/2024', visitTime: '11:00-11:30 am' },
        { patientName: 'Jane Doe', prename: 'Jane', age: 28, date: '20/02/2024', visitTime: '10:00-10:30 am' },
        { patientName: 'Jane Doe', prename: 'Jane', age: 28, date: '20/02/2024', visitTime: '10:00-10:30 am' },
        { patientName: 'Jane Doe', prename: 'Jane', age: 28, date: '20/02/2024', visitTime: '10:00-10:30 am' },

        // ... more requests
      ]);
    
      // Handlers for accepting and canceling appointment requests
      const acceptAppointment = (index) => {
        // Logic for accepting the appointment
        // Implement your logic here, for example:
        // setAppointmentRequests(currentRequests => {
        //   // Here you could send a request to your backend to accept the appointment
        //   // and then filter out the accepted appointment from state
        //   return currentRequests.filter((_, i) => i !== index);
        // });
        console.log(`Accepted appointment request at index ${index}`);
      };
    
      const cancelAppointment = (index) => {
        // Logic for canceling the appointment
        setAppointmentRequests(currentRequests =>
          currentRequests.filter((_, i) => i !== index)
        );
      };
    

      


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
  <div className="appointment-requests">
  <h2>Appointment Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Prename</th>
            <th>Age</th>
            <th>Date</th>
            <th>Visit Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointmentRequests.map((request, index) => (
            <tr key={index}>
              <td>{request.patientName}</td>
              <td>{request.prename}</td>
              <td>{request.age}</td>
              <td>{request.date}</td> {/* Ensure you have the 'date' in your data */}
              <td>{request.visitTime}</td>
              <td>
                <button onClick={() => acceptAppointment(index)}>Accept</button>
                <button onClick={() => cancelAppointment(index)}>Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Appointments;
