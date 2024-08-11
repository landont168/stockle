import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const DistributionChart = ({ distribution }) => {
  // set up distribution data
  const data = {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
      {
        data: distribution,
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        borderColor: '#4CAF50',
        borderWidth: 2,
      },
    ],
  }

  // format horizontal bar chart with no gridlines
  const options = {
    indexAxis: 'y',
    scales: {
      x: {
        display: true,
        suggestedMax: Math.max(...distribution) + 1,
        ticks: {
          stepSize: 2,
        },
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  }
  return <Bar data={data} options={options} />
}

export default DistributionChart
