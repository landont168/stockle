import { useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ChartOptions,
  TooltipItem,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { StockHistory } from 'types'

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

interface StockChartProps {
  data: StockHistory[]
}

const StockChart = ({ data }: StockChartProps) => {
  if (!data) return null

  const dates = useMemo(() => data.map((item) => item.date), [data])
  const prices = useMemo(() => data.map((item) => item.price), [data])

  const priceChange = prices[prices.length - 1] - prices[0]
  const borderColor = priceChange > 0 ? '#4CAF50' : '#EF5350'
  const backgroundColor =
    priceChange > 0 ? 'rgba(76, 175, 80, 0.2)' : 'rgba(239, 83, 80, 0.2)'

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'Price',
        data: prices,
        borderColor: borderColor,
        backgroundColor: backgroundColor,
        hoverBackgroundColor: borderColor,
        pointRadius: 1,
        pointHoverRadius: 4,
        fill: true,
        tension: 0.1,
      },
    ],
  }
  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: (context: TooltipItem<'line'>) => {
            const price = (context.raw as number).toFixed(2)
            return `${price} USD`
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
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          maxTicksLimit: 6,
        },
        title: {
          display: true,
          text: 'Share Price (USD)',
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
