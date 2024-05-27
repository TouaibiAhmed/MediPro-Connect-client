import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PeopleIcon from '@mui/icons-material/People';
import EventNoteIcon from '@mui/icons-material/EventNote';
import MoodIcon from '@mui/icons-material/Mood';
import axios from 'axios';
import { faker } from '@faker-js/faker';

import AppTasks from './app-tasks';
import AppNewsUpdate from './app-news-update';
import AppOrderTimeline from './app-order-timeline';
import AppCurrentVisits from './app-current-visits';
import AppWebsiteVisits from './app-website-visits';
import AppWidgetSummary from './app-widget-summary';
import AppTrafficBySite from './app-traffic-by-site';
import AppCurrentSubject from './app-current-subject';
import AppConversionRates from './app-conversion-rates';
import Iconify from './components/iconify';

// ----------------------------------------------------------------------

export default function AppView() {
  const [totalPatients, setTotalPatients] = useState(null);
  const [totalDoctors, setTotalDoctors] = useState(null);
  const [totalRdv, setTotalRdv] = useState(null);
  const [averageRate, setAverageRate] = useState(null);

  const [patientsByMonth, setPatientsByMonth] = useState([]);
  const [doctorsByMonth, setDoctorsByMonth] = useState([]);
  const [rdvByMonth, setRdvByMonth] = useState([]);
  const [patientsByCountry, setPatientsByCountry] = useState([]);
  const [rendezVousBySpecialty, setRendezVousBySpecialty] = useState([]);

  useEffect(() => {
    const fetchTotalPatients = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/patient/totalPatient');
        setTotalPatients(response.data.totalPatients);
      } catch (error) {
        console.error('Error fetching total patients:', error);
      }
    };

    const fetchTotalDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/medecins/totalMedecin');
        setTotalDoctors(response.data.totalDoctors);
      } catch (error) {
        console.error('Error fetching total doctors:', error);
      }
    };

    const fetchTotalRdv = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/rendezVous/totalRDV');
        setTotalRdv(response.data[0].totalRdv);
      } catch (error) {
        console.error('Error fetching total rdv:', error);
      }
    };

    const fetchAverageRating = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/review/averageRating');
        setAverageRate(response.data.averageRating);
      } catch (error) {
        console.error('Error fetching average rating:', error);
      }
    };

    const fetchPatientsByMonth = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/patient/getPatientsByMonth');
        setPatientsByMonth(response.data.map(item => item.count));
      } catch (error) {
        console.error('Error fetching patients by month:', error);
      }
    };

    const fetchDoctorsByMonth = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/medecins/getDoctorsByMonth');
        setDoctorsByMonth(response.data.map(item => item.count));
      } catch (error) {
        console.error('Error fetching doctors by month:', error);
      }
    };

    const fetchRdvByMonth = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/rendezVous/RDVbyMonth');
        setRdvByMonth(response.data.map(item => item.count));
      } catch (error) {
        console.error('Error fetching rdv by month:', error);
      }
    };

    const fetchPatientsByCountry = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/patient/patientsByCountry');
        setPatientsByCountry(response.data);
      } catch (error) {
        console.error('Error fetching patients by country:', error);
      }
    };

    const fetchRendezVousBySpecialty = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/rendezVous/rendezVousBySpecialty');
        setRendezVousBySpecialty(response.data);
      } catch (error) {
        console.error('Error fetching rendezVous by specialty:', error);
      }
    };

    fetchTotalPatients();
    fetchTotalDoctors();
    fetchTotalRdv();
    fetchAverageRating();
    fetchPatientsByMonth();
    fetchDoctorsByMonth();
    fetchRdvByMonth();
    fetchPatientsByCountry();
    fetchRendezVousBySpecialty();
  }, []);

  const labels = [
    '01/01/2024',
    '02/01/2024',
    '03/01/2024',
    '04/01/2024',
    '05/01/2024',
    '06/01/2024',
    '07/01/2024',
    '08/01/2024',
    '09/01/2024',
    '10/01/2024',
    '11/01/2024',
    '12/01/2024',
  ];

  return (
    <Box sx={{ marginLeft: 35 }}>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5, mt: 15 }}>
          Dashboard
        </Typography>

        <Grid container spacing={3}>
          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Total Patients"
              total={totalPatients}
              color="success"
              icon={<PeopleIcon sx={{ fontSize: 36, color: '#2B3499' }} />}
            />
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Total Doctors"
              total={totalDoctors}
              color="info"
              icon={<LocalHospitalIcon sx={{ fontSize: 36, color: '#FF6C22' }} />}
            />
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Total Appointments Done"
              total={totalRdv}
              color="warning"
              icon={<EventNoteIcon sx={{ fontSize: 36, color: '#FF9209' }} />}
            />
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Patients Satisfaction"
              total={averageRate ? `${averageRate.toFixed(2)} / 5` : 'Loading...'}
              color="error"
              icon={<MoodIcon sx={{ fontSize: 36, color: '#FFD099' }} />}
            />
          </Grid>

          <Grid xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Website Visits"
              chart={{
                labels,
                series: [
                  {
                    name: 'Appointments',
                    type: 'column',
                    fill: 'solid',
                    data: rdvByMonth,
                  },
                  {
                    name: 'Patients',
                    type: 'area',
                    fill: 'gradient',
                    data: patientsByMonth,
                  },
                  {
                    name: 'Doctors',
                    type: 'line',
                    fill: 'solid',
                    data: doctorsByMonth,
                  },
                ],
              }}
            />
          </Grid>

          <Grid xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Specialities Attendance"
              chart={{
                series: rendezVousBySpecialty.map(item => ({
                  label: item.specialty,
                  value: item.count
                })),
              }}
              sx={{ height: '460px', mt: 4 }} // Adjust the height and margin-top
            />
          </Grid>

          <Grid xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Patients by Country"
              chart={{
                series: patientsByCountry.map(item => ({
                  label: item.country,
                  value: item.count
                })),
              }}
              sx={{ height: '500px' }} // Adjust the height as needed
            />
          </Grid>

          <Grid xs={12} md={7} lg={4}>
            <AppCurrentSubject
              title="Doctor Appointment Metrics"
              chart={{
                categories: [
                  'Patient Satisfaction',
                  'Appointment Duration',
                  'Follow-up Efficiency',
                  'No-show Rate',
                ],
                series: [
                  { name: 'Current Month', data: [85, 40, 20, 75, 5] },
                  { name: 'Previous Month', data: [30, 25, 11, 38, 10] },
                ],
              }}
            />
          </Grid>

          <Grid xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Appointment Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  'Dr. Smith, 3 new patients',
                  'Invoice #12345 paid',
                  'Follow-up with patient #37745',
                  'Appointment rescheduled #AP-2356',
                  'Lab results reviewed #LR-2346',
                ][index],
                type: `event${index + 1}`,
                time: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 20,
                  icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 74,
                  icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 12,
                  icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 19,
                  icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,
                },
              ]}
              sx={{ height: '450px' }} // Adjust the height as needed
            />
          </Grid>

          <Grid xs={12} md={6} lg={4}>
            <AppTasks
              title="Clinic Tasks"
              list={[
                { id: '1', name: 'Schedule annual staff training' },
                { id: '2', name: 'Review and restock medical supplies' },
                { id: '3', name: 'Confirm next week’s patient appointments' },
                { id: '4', name: 'Audit patient billing records' },
                { id: '5', name: 'Complete monthly health compliance checks' },
              ]}
              sx={{ height: '450px' }} // Adjust the height as needed
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
