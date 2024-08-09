import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const StockChart = ({ data }) => {
  // Extract dates and prices from the data
  const labels = data.map((item) => item.date)
  const prices = data.map((item) => item.price)

  // Chart.js data structure
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Price',
        data: prices,
        borderColor: '#42A5F5',
        backgroundColor: 'rgba(66, 165, 245, 0.2)',
        pointRadius: 1,
        pointHoverRadius: 8,
        fill: true,
      },
    ],
  }

  // chart.js options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: $${context.raw}`
          },
        },
      },
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 6,
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price (USD)',
        },
      },
    },
  }

  return (
    <div className='stock-chart'>
      <Line data={chartData} options={options} />
    </div>
  )
}

export default StockChart
