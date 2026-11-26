import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend)
ChartJS.defaults.font.family = 'DM Sans'
ChartJS.defaults.color = '#65758B'
ChartJS.defaults.locale = 'nl-NL'