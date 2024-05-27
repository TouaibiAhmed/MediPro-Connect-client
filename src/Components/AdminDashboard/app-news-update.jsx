import PropTypes from 'prop-types';
import { Box, Card, CardHeader, Divider, Stack, Button, Typography, Link, Scrollbar } from '@mui/material';
import { Scrollbars } from 'react-custom-scrollbars';


function AppNewsUpdate({ title, subheader, list, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Scrollbars>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {list.map((report) => (
            <ReportItem key={report.id} report={report} />
          ))}
        </Stack>
      </Scrollbars>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
        >
          View all
        </Button>
      </Box>
    </Card>
  );
}

AppNewsUpdate.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

function ReportItem({ report }) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        component="img"
        alt={report.userName}
        src={report.image || ''} // Use default image if none provided
        sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }}
      />
      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Typography variant="subtitle2" noWrap>{report.userName}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {report.reportText}
        </Typography>
      </Box>
      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
      </Typography>
    </Stack>
  );
}

ReportItem.propTypes = {
  report: PropTypes.shape({
    image: PropTypes.string,
    userName: PropTypes.string,
    reportText: PropTypes.string,
    postedAt: PropTypes.instanceOf(Date),
  }),
};
export default AppNewsUpdate;
