import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fShortenNumber } from './utils/format-number';

// ----------------------------------------------------------------------

export default function AppWidgetSummary({ title, total, icon, color = 'primary', sx, ...other }) {
  return (
    <Card
      component={Stack}
      direction="row"
      alignItems="center"
      sx={{
        p: 2,    
        borderRadius: 2, 
        textAlign: 'left',
        ...sx,
        bgcolor: `${color}.lighter`, // Set background color lightly based on the color prop
      }}
      {...other}
    >
      {icon && (
        <Box sx={{
          width: 48, // Increased size
          height: 48, // Increased size
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: color, // Use color prop for background
          borderRadius: '50%', // Make it round
          marginRight: 2, // Add spacing between the icon and text
        }}>
          {icon}
        </Box>
      )}
      <Stack spacing={0.5}>
        <Typography variant="h4" sx={{ fontWeight: 'medium' }}>
          {fShortenNumber(total)}
        </Typography>
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {title}
        </Typography>
      </Stack>
    </Card>
  );
}

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  title: PropTypes.string,
  total: PropTypes.number,
};
