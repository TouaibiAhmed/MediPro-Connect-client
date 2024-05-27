import { useEffect, useState } from 'react';
import axios from 'axios';

import { useParams } from 'react-router-dom';


// material-ui
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Grid,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Stack,
  TextField,
  Typography
} from '@mui/material';

// project import
import OrdersTable from './OrdersTable';
import IncomeAreaChart from './IncomeAreaChart';
import MonthlyBarChart from './MonthlyBarChart';
import ReportAreaChart from './ReportAreaChart';
import SalesColumnChart from './SalesColumnChart';
import MainCard from './MainCard';
import AnalyticEcommerce from './AnalyticEcommerce';
import Sidebar from './Sidebar'
// assets
import { GiftOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';


// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

// sales report status
const status = [
  {
    value: 'today',
    label: 'Today'
  },
  {
    value: 'month',
    label: 'This Month'
  },
  {
    value: 'year',
    label: 'This Year'
  }
];

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  const [value, setValue] = useState('today');
  const [slot, setSlot] = useState('week');

  const [totalPatients, setTotalPatients] = useState(null);

  const [totalRdv, setTotalRdv] = useState(null);


  const [acceptedAppointments, setAcceptedAppointments] = useState(null); // New state for accepted appointments


  const [totalPatientsWithRatings, setTotalPatientsWithRatings] = useState(null);
  const [averageRating, setAverageRating] = useState(null);


  const [patientsReviewedDoctor, setPatientsReviewedDoctor] = useState(null); // New state for number of patients that reviewed the doctor


  const [revenuePerDoctor, setRevenuePerDoctor] = useState(null);



  const [patientsPerMonth, setPatientsPerMonth] = useState([]);


  const { id } = useParams();
console.log(id);



  const fetchTotalPatients = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/rendezVous/patientPerDoctor/${id}`);
      const totalPatientsData = response.data[0]?.totalPatients || null; // Assuming your backend sends back totalPatients in the response
      setTotalPatients(totalPatientsData);
    } catch (error) {
      console.error('Error fetching total patients:', error);
      setTotalPatients(null);
    }
  };



  const fetchTotalRdvForFirstDoctor = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/rendezVous/nbreRdv/${id}`);
      const totalRdvData = response.data[0]?.totalRdv || null;
      setTotalRdv(totalRdvData);
    } catch (error) {
      console.error('Error fetching total rdv:', error);
      setTotalRdv(null);
    }
  };




  const fetchAcceptedAppointments = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/rendezVous/totalRendezVousAccepte/${id}`);
      const acceptedAppointmentsData = response.data[0]?.totalRdvAccepte || 0;
      setAcceptedAppointments(acceptedAppointmentsData);
    } catch (error) {
      console.error('Error fetching accepted appointments:', error);
      setAcceptedAppointments(0);
    }
  };



  const fetchTotalPatientsWithRatings = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/review/countPatientsWithRatings/${id}`);
      const totalPatientsData = response.data.totalPatientsWithRatings;
      setTotalPatientsWithRatings(totalPatientsData);
    } catch (error) {
      console.error('Error fetching total patients with ratings:', error);
      setTotalPatientsWithRatings(null);
    }
  };

  const fetchAverageRating = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/medecins/AverageRating/${id}`);
      const averageRatingData = response.data.averageRating;
      setAverageRating(averageRatingData);
    } catch (error) {
      console.error('Error fetching average rating:', error);
      setAverageRating(null);
    }
  };


  const fetchPatientsReviewedDoctor = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/medecins/NumberOfPatientsReviewed/${id}`);
      const patientsReviewedDoctorData = response.data.numberOfPatientsReviewed;
      setPatientsReviewedDoctor(patientsReviewedDoctorData);
    } catch (error) {
      console.error('Error fetching number of patients reviewed doctor:', error);
      setPatientsReviewedDoctor(null);
    }
  };



  const fetchRevenuePerDoctor = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/medecins/totalIncome/${id}`);
      console.log('Revenue data response:', response.data); // Log the response data

      const revenueData = response.data.totalIncome ;
      setRevenuePerDoctor(revenueData);
    } catch (error) {
      console.error('Error fetching revenue per doctor:', error);
      setRevenuePerDoctor(null);
    }
  };



  const fetchPatientsPerMonth = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/api/rendezVous/patientsPerMonth/${id}`);
        const patientsPerMonthData = response.data || [];
        // Process and use this data to update your chart
    } catch (error) {
        console.error('Error fetching patients per month:', error);
    }
};




  // Fetch total patients for the first doctor when component mounts
  useEffect(() => {
    fetchTotalPatients();
    fetchTotalRdvForFirstDoctor();
    fetchTotalPatientsWithRatings();
    fetchAverageRating();
    fetchPatientsReviewedDoctor();
    fetchRevenuePerDoctor();
    fetchAcceptedAppointments();

    fetchPatientsPerMonth();

  }, [id]);
























  return (
    <Grid container>
  
    {/* Dashboard Content */}
    <Grid item xs={9} style={{ marginLeft: '20%', padding: '20px', marginTop: '30px' }}>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        {/* Row 1 */}
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <Typography variant="h5">Dashboard</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce title="Total Patients" count={totalPatients}  />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce title="Total RendezVous" count={acceptedAppointments}  />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce title="Average Rating " count={averageRating }    />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce title="Patients with Ratings" count={patientsReviewedDoctor}  />
        </Grid>

        {/* Row 2 */}
        <Grid item xs={12} md={7} lg={8}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Patients Type</Typography>
            </Grid>
            <Grid item>
              <Stack direction="row" alignItems="center" spacing={0}>
                <Button
                  size="small"
                  onClick={() => setSlot('month')}
                  color={slot === 'month' ? 'primary' : 'secondary'}
                  variant={slot === 'month' ? 'outlined' : 'text'}
                >
                  Month
                </Button>
                <Button
                  size="small"
                  onClick={() => setSlot('week')}
                  color={slot === 'week' ? 'primary' : 'secondary'}
                  variant={slot === 'week' ? 'outlined' : 'text'}
                >
                  Week
                </Button>
              </Stack>
            </Grid>
          </Grid>
          <MainCard content={false} sx={{ mt: 1.5 }}>
            <Box sx={{ pt: 1, pr: 2 }}>
              <IncomeAreaChart slot={slot} />
            </Box>
          </MainCard>
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <Grid container alignIte  ms="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Income Overview</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <Box sx={{ p: 3, pb: 0 }}>
              <Stack spacing={2}>
                <Typography variant="h6" color="textSecondary">
                  Total Statistics
                </Typography>
                {revenuePerDoctor !== null ? (
      <Typography variant="h3">${revenuePerDoctor}</Typography>
    ) : (
      <Typography variant="h3">Loading...</Typography>
    )}
           </Stack>
            </Box>
            <MonthlyBarChart />
          </MainCard>
        </Grid>

        {/* Row 3 */}
        <Grid item xs={12} md={7} lg={8}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Recent Requests</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <OrdersTable />
          </MainCard>
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          {/* Change the title of the chart */}
          <Typography variant="h5">Appointments Overview</Typography>
        </Grid>
        <Grid item />
      </Grid>
      <MainCard sx={{ mt: 2 }} content={false}>
        <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
          {/* Customize the list items based on your requirements */}
          <ListItemButton divider>
            <ListItemText primary="Total Appointments" />
            {/* Change the content of the list items */}
            <Typography variant="h5">100</Typography>
          </ListItemButton>
          <ListItemButton divider>
            <ListItemText primary="Pending Appointments" />
            <Typography variant="h5">20</Typography>
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="Completed Appointments" />
            <Typography variant="h5">80</Typography>
          </ListItemButton>
        </List>
        {/* Integrate the ReportAreaChart component */}
        <ReportAreaChart />
      </MainCard>
    </Grid>

        {/* Row 4 */}
        <Grid item xs={12} md={7} lg={8}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5"></Typography>
            </Grid>
            <Grid item>
              <TextField
                id="standard-select-currency"
                size="small"
                select
                value={value}
                onChange={(e) => setValue(e.target.value)}
                sx={{ '& .MuiInputBase-input': { py: 0.5, fontSize: '0.875rem' } }}
              >
                {status.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <MainCard sx={{ mt: 1.75 }}>
            <Stack spacing={1.5} sx={{ mb: -12 }}>
              <Typography variant="h6" color="secondary">
Male / Female Number Variation              </Typography>
              <Typography variant="h4"></Typography>
            </Stack>
            <SalesColumnChart />
          </MainCard>
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Interactions History</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <List
              component="nav"
              sx={{
                px: 0,
                py: 0,
                '& .MuiListItemButton-root': {
                  py: 1.5,
                  '& .MuiAvatar-root': avatarSX,
                  '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
                }
              }}
            >
              <ListItemButton divider>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      color: 'success.main',
                      bgcolor: 'success.lighter'
                    }}
                  >
                    <GiftOutlined />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={<Typography variant="subtitle1">Next Appointment</Typography>} secondary="Today, 2:00 AM" />
               
              </ListItemButton>
              <ListItemButton divider>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      color: 'primary.main',
                      bgcolor: 'primary.lighter'
                    }}
                  >
                    <MessageOutlined />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={<Typography variant="subtitle1">Last Interaction</Typography>} secondary="5 August, 1:45 PM" />
                
              </ListItemButton>
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      color: 'error.main',
                      bgcolor: 'error.lighter'
                    }}
                  >
                    <SettingOutlined />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={<Typography variant="subtitle1">Current Appointment</Typography>} secondary="7 minutes ago" />
                
              </ListItemButton>
            </List>
          </MainCard>
          <MainCard sx={{ mt: 2 }}>
            <Stack spacing={3}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Stack>
                    <Typography variant="h5" noWrap>
                      Help & Support Chat
                    </Typography>
                    <Typography variant="caption" color="secondary" noWrap>
                      Typical replay within 5 min
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item>
                  <AvatarGroup sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
                    <Avatar alt="Remy Sharp"  />
                   
                  </AvatarGroup>
                </Grid>
              </Grid>
              <Button size="small" variant="contained" sx={{ textTransform: 'capitalize' }}>
                Need Help?
              </Button>
            </Stack>
          </MainCard>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);
};
export default DashboardDefault;
