import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { styled, useTheme } from '@mui/material/styles';
import { fNumber } from './utils/format-number';
import Chart, { useChart } from './components/chart';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 300; // Decreased height
const LEGEND_HEIGHT = 72;

const StyledChart = styled(Chart)(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(2),
  '& .apexcharts-canvas, .apexcharts-inner, svg, foreignObject': {
    height: `100% !important`,
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    borderTop: `dashed 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

export default function AppCurrentVisits({ title, subheader, chart, ...other }) {
  const theme = useTheme();
  const { colors, series, options } = chart;

  const total = chart.series.reduce((acc, item) => acc + item.value, 0);
  const normalizedSeries = chart.series.map(item => ({
    label: item.label,
    value: Math.round((item.value / total) * 100)
  }));

  const chartSeries = series.map((i) => i.value);
  const chartOptions = useChart({
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    colors,
    labels: series.map((i) => i.label),
    stroke: {
      colors: [theme.palette.background.paper],
    },
    legend: {
      floating: true,
      position: 'bottom',
      horizontalAlign: 'center',
      itemMargin: {
        horizontal: 10,
        vertical: 5,
      },
    },
    dataLabels: {
      enabled: true,
      dropShadow: {
        enabled: false,
      },
      formatter: (val, opts) => `${val}%`, // Show percentage on data labels
      style: {
        colors: ['#333'],
        fontSize: '12px',
        fontFamily: 'Arial, sans-serif',
        fontWeight: 'bold',
      },
      offsetX: 0, // Adjust X offset as needed
      offsetY: -10, // Adjust Y offset as needed
      background: {
        enabled: true,
        foreColor: '#fff',
        borderRadius: 2,
        padding: 2,
        opacity: 0.9,
      },
    },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (value) => `${fNumber(value)}%`, // Show percentage in tooltip
        title: {
          formatter: (seriesName) => `${seriesName}`,
        },
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: false,
          },
        },
        dataLabels: {
          offset: -30, // Adjust this value to move the labels away from the chart
        },
      },
    },
    ...chart.options, // Assuming additional options can be passed
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 4 }} />
      <StyledChart
        dir="ltr"
        type="pie"
        series={chartSeries}
        options={chartOptions}
        width="100%"
        height="230px"
      />
    </Card>
  );
}

AppCurrentVisits.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
};
