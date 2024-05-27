import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './DoctorCalendar.css'; 
import { useParams } from 'react-router-dom';

import axios from 'axios';



const localizer = momentLocalizer(moment);

const DoctorCalendar = ({ doctorId }) => {
  const currentDate = moment().format('MMMM Do YYYY'); // Get current date in the format "Month Day Year"

  const [appointments, setAppointments] = useState([]);



  

console.log(doctorId);



  useEffect(() => {
    // Fetch doctor's appointments from backend
    fetchDoctorAppointments();
  }, [doctorId]); 

  const fetchDoctorAppointments = async () => {
    try {
      // Fetch data from backend using axios
      const response = await axios.get(`http://localhost:3000/api/rendezVous/listAppointments/${doctorId}`); 
      const data = response.data;
      setAppointments(data); // Update state with fetched appointments
    } catch (error) {
      console.error('Error fetching doctor appointments:', error);
    }
  };


 
  const myEventsList = appointments.map(appointment => ({
    title: `${appointment.patient[0].nom} ${appointment.patient[0].prenom}`,
    start: moment(appointment.date).toDate(),
    end: moment(appointment.date).toDate(),
    allDay: false,
   
  }));


  const eventStyleGetter = () => {
    return {
      style: {
        backgroundColor: '#A0C49D',
      },
    };
  };

  return (
    <div className="calendar-container" >

      <div className="calendar-header" >
        
        <h2 className='current'>{currentDate}</h2>
     
      </div>
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ marginLeft: '20%',height: 550, width: '1200px', marginTop:'60px'}}
        className="custom-calendar" 
        eventPropGetter={eventStyleGetter}

      />
    </div>
  );
};

export default DoctorCalendar;
