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

import { useEffect, useRef, useState } from 'react'

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
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

  // animation duration setup
  const totalDuration = 1000
  const delayBetweenPoints = data.length > 0 ? totalDuration / data.length : 0
  const previousY = (ctx) =>
    ctx.index === 0
      ? ctx.chart.scales.y.getPixelForValue(100)
      : ctx.chart
          .getDatasetMeta(ctx.datasetIndex)
          .data[ctx.index - 1].getProps(['y'], true).y

  // chart.js options
  const options = {
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
          text: 'Share Price ($)',
        },
      },
    },
    // chart animation
    animation: {
      x: {
        type: 'number',
        easing: 'linear',
        duration: delayBetweenPoints,
        from: NaN,
        delay(ctx) {
          if (ctx.type !== 'data' || ctx.xStarted) {
            return 0
          }
          ctx.xStarted = true
          return ctx.index * delayBetweenPoints
        },
      },
      y: {
        type: 'number',
        easing: 'linear',
        duration: delayBetweenPoints,
        from: previousY,
        delay(ctx) {
          if (ctx.type !== 'data' || ctx.yStarted) {
            return 0
          }
          ctx.yStarted = true
          return ctx.index * delayBetweenPoints
        },
      },
    },
  }

  // prevent animation on subsequent renders
  const chartOptions = {
    ...options,
    animations: animate.current ? options.animations : false,
  }

  return (
    <div className='stock-chart'>
      <Line data={chartData} options={chartOptions} />
    </div>
  )
}

export default StockChart
