import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
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
  Legend,
  Filler
)

interface StockChartProps {
  data: StockHistory[]
}

const StockChart = ({ data }: StockChartProps) => {
  if (!data) return null

  // extract dates and prices from data
  const [dates, setDates] = useState(data.map((item) => item.date))
  const [prices, setPrices] = useState(data.map((item) => item.price))
  useEffect(() => {
    setDates(data.map((item) => item.date))
    setPrices(data.map((item) => item.price))
  }, [data])

  // set chart color based on price change
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
  const options: any = {
    type: 'line',
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
          label: (context: any) => {
            const price = context.raw.toFixed(2)
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
