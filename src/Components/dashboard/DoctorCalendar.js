import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './DoctorCalendar.css'; 

const localizer = momentLocalizer(moment);

const DoctorCalendar = () => {
  const currentDate = moment().format('MMMM Do YYYY'); // Get current date in the format "Month Day Year"

  const appointments = [
    { name: 'Ahmed', prename: 'Touaibi', age: 21, date: '06/02/2024', datef: '07/02/2024', time: '9.15-10.15 am' },
    // ... more appointments
  ];

  const myEventsList = appointments.map(appointment => {
    return {
      title: `${appointment.name} ${appointment.prename}`,
      start: new Date(appointment.date),
      end: new Date(appointment.datef),
      allDay: false
    };
  });

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
        style={{ marginLeft: '30%',height: 550, width: '1100px', marginTop:'40px', marginTop:'60px'}}
        className="custom-calendar" 

      />
    </div>
  );
};

export default DoctorCalendar;
