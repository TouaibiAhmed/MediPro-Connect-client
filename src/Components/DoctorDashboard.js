import React, { useState } from 'react';
import './DoctorDashboard.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Bar, Pie } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto'; // You need to import this for Chart.js 3

const data = {
  labels: ['Satisfied', 'Unsatisfied', 'NA'],
  datasets: [
    {
      data: [85, 6, 9],
      backgroundColor: [
        '#49A9EA',
        '#36CAAB',
        '#FFD700'
      ],
      hoverBackgroundColor: [
        '#49A9EA',
        '#36CAAB',
        '#FFD700'
      ],
      borderWidth: 0, // Set this to 0 to remove the border
    }
  ]
};

const options = {
  cutoutPercentage: 80,
  maintainAspectRatio: false, // Add this to maintain the aspect ratio without stretching
  plugins: {
    legend: {
      display: true,
      position: 'bottom'
    }
  }
};







const DoctorDashboard = () => {

  

  // New state for selected date
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Format: YYYY-MM-DD


  const changeDate = (increment) => {
    setSelectedDate((prevDate) => {
      const currentDate = new Date(prevDate);
      currentDate.setDate(currentDate.getDate() + increment);
      return currentDate.toISOString().split('T')[0];
    });
  };

  const localizer = momentLocalizer(moment);


  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August','September', 'October', 'Novermber', 'December' ],
    datasets: [
      {
        label: 'Number of Appointments',
        data: [9, 14, 6, 11, 7, 10,9, 14, 6, 11, 7, 10],
        backgroundColor: 'rgba(41, 166, 250)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };
  
  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  




    const appointments = [
    { name: 'Ahmed', prename: 'Touaibi', age: 21, date: '06/02/2024', time: '9.15-10.15 am' },
    // ... more appointments
  ];

  const myEventsList = appointments.map(appointment => {
    return {
      title: `${appointment.name} ${appointment.prename}`,
      start: new Date(appointment.date),
      end: new Date(appointment.date),
      allDay: false
    };
  });


  const stats = [
    { label: 'Total Patients', value: 10, icon: '/images/stat-icon1.svg '  },
    { label: 'Total Appointments', value: 14, icon: '/images/stat-icon2.svg'    },
    { label: 'Total Review', value: '4.2/5', icon: '/images/stat-icon3.svg'  },
    // ... more stats
  ];
  



  






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
      <div className="stat-info">
        <div className="stat-label">{stat.label}</div>
        <div className="stat-value">{stat.value}</div>
      </div>
      <div className="stat-icon-wrapper">
        <img src={stat.icon} alt="" className="stat-icon"/>
      </div>
    </div>
  ))}
</section>


  <div className="appointment-activity">


<div className="calendar-container">
  <h2>Appointment Activity</h2>
  <Calendar
    localizer={localizer}
    events={myEventsList}
    startAccessor="start"
    endAccessor="end"
    style={{ height: 400 , width: '100%'}} // Removed width here to be controlled by CSS
  />
</div>
<div className="charts-container">

<div className="bar-chart-container">
  <h2>Monthly Appointments</h2>
  <Bar data={chartData} options={chartOptions} style={{ height: 100 , width: 600 }} />
</div>

<div className="doughnut-chart-container">
    <h2>New Patients</h2>
    <div style={{ position: 'relative', width: '300px', height: '300px', marginLeft: '20px' }}>
      <Doughnut data={data} options={options} />
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', }}>
      <div style={{ marginRight: '10px' }}><strong>85%</strong> Satisfied</div>
      <div style={{ marginRight: '10px' }}><strong>6%</strong> Unsatisfied</div>
      <div><strong>9%</strong> NA</div>
    </div>
  </div>

</div>

</div>

      </main>
    </div>
  );
};

export default DoctorDashboard;
