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

import { useEffect, useRef, useState } from 'react'

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
  const animate = useRef(true)

  useEffect(() => {
    animate.current = false
  }, [])

  // extract dates and prices
  const [labels, setLabels] = useState(data.map((item) => item.date))
  const [prices, setPrices] = useState(data.map((item) => item.price))

  useEffect(() => {
    setLabels(data.map((item) => item.date))
    setPrices(data.map((item) => item.price))
    console.log('fetching...')
  }, [data])
  // determine chart color based on price change
  const priceChange = prices[prices.length - 1] - prices[0]
  const borderColor = priceChange > 0 ? '#4CAF50' : '#EF5350'
  const backgroundColor =
    priceChange > 0 ? 'rgba(76, 175, 80, 0.2)' : 'rgba(239, 83, 80, 0.2)'

  // chart.js data structure
  const chartData = {
    labels: labels,
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

  // chart.js options
  const options = {
    type: 'line',
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: (context) => {
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
          text: 'Price (USD)',
        },
      },
    },
    // chart animation
    animations: {
      tension: {
        duration: 300,
        easing: 'easeOutQuad',
        from: 0.5,
        to: 0,
        loop: false,
      },
      x: {
        type: 'number',
        easing: 'linear',
        duration: 500,
        from: NaN,
        delay(ctx) {
          return ctx.index * 10
        },
      },
      y: {
        type: 'number',
        easing: 'linear',
        duration: 500,
        from: (ctx) => ctx.chart.scales.y.getPixelForValue(100),
        delay(ctx) {
          return ctx.index * 10
        },
      },
    },
  }

  const chartOptions = {
    ...options,
    animations: animate.current ? options.animations : false, // Disable animation on updates
  }

  if (data.length === 0) {
    console.log('no data')
    return <div>No data available</div>
  }

  return (
    <div className='stock-chart'>
      <Line data={chartData} options={chartOptions} />
    </div>
  )
}

export default StockChart
