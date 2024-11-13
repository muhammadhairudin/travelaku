import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Card } from '../../../../components/molecules';
import { Text } from '../../../../components/atoms';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const RevenueChart = ({ data }) => {
  const chartData = {
    labels: data?.map(item => item.month) || [],
    datasets: [
      {
        label: 'Pendapatan',
        data: data?.map(item => item.revenue) || [],
        borderColor: '#1E3D59',
        backgroundColor: 'rgba(30, 61, 89, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw;
            return `Rp ${value.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `Rp ${value.toLocaleString()}`
        }
      }
    }
  };

  return (
    <Card className="p-6">
      <Text variant="h2" className="text-xl font-bold mb-6">
        Grafik Pendapatan
      </Text>
      <div className="h-[300px]">
        <Line data={chartData} options={options} />
      </div>
    </Card>
  );
};

RevenueChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      month: PropTypes.string.isRequired,
      revenue: PropTypes.number.isRequired
    })
  )
};

export default RevenueChart; 