import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  type ScriptableContext,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import type { Punt, Soort } from '../types'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip)
ChartJS.defaults.font.family = 'DM Sans'
ChartJS.defaults.color = '#65758B'

function verloop(rgb: string) {
  return (ctx: ScriptableContext<'line'>) => {
    const { chart } = ctx
    if (!chart.chartArea) return 'transparent'
    const kleur = chart.ctx.createLinearGradient(0, chart.chartArea.top, 0, chart.chartArea.bottom)
    kleur.addColorStop(0, `rgba(${rgb}, 0.2)`)
    kleur.addColorStop(1, `rgba(${rgb}, 0)`)
    return kleur
  }
}

export default function EnergieGrafiek({ punten, soort }: { punten: Punt[]; soort: Soort }) {
  const elektriciteitLijn = {
    label: 'Energie',
    data: punten.map((p) => p.elektriciteit),
    borderColor: '#06336C',
    backgroundColor: verloop('6, 51, 108'),
    borderWidth: 2,
    pointRadius: 0,
    tension: 0,
    fill: true,
  }

  const gasLijn = {
    label: 'Gas',
    data: punten.map((p) => p.gas),
    borderColor: '#FF8500',
    backgroundColor: verloop('255, 133, 0'),
    borderWidth: 2,
    pointRadius: 0,
    tension: 0,
    fill: true,
  }

  return (
    <Line
      data={{
        labels: punten.map((p) => p.label),
        datasets: [
          ...(soort !== 'gas' ? [elektriciteitLijn] : []),
          ...(soort !== 'energie' ? [gasLijn] : []),
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y} ${ctx.dataset.label === 'Gas' ? 'm³' : 'kWh'}`,
                },
            },
            },
            scales: {
            x: { grid: { display: false } },
            y: {
                beginAtZero: true,
                grid: { color: '#EAF1F9' },
                border: { display: false },
            },
        },
      }}
    />
  )
}