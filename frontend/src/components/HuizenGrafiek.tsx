import { Line } from 'react-chartjs-2'
import './chartSetup'
import { huisKleuren } from '../kleuren'

type Lijn = { naam: string; waarden: number[] }

export default function HuizenGrafiek({ labels, lijnen, eenheid }: { labels: string[]; lijnen: Lijn[]; eenheid: string }) {
  return (
    <Line
      data={{
        labels,
        datasets: lijnen.map((lijn, i) => {
          const kleur = huisKleuren[i % huisKleuren.length]
          return {
            label: lijn.naam,
            data: lijn.waarden,
            borderColor: kleur,
            backgroundColor: kleur,
            borderWidth: 2,
            pointRadius: 0,
            tension: 0,
            fill: false,
          }
        }),
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: {
            position: 'top',
            align: 'end',
            labels: { usePointStyle: true, pointStyle: 'circle', boxWidth: 8, boxHeight: 8, padding: 16 },
          },
          tooltip: {
            callbacks: { label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y} ${eenheid}` },
          },
        },
        scales: {
          x: { grid: { display: false } },
          y: { beginAtZero: true, grid: { color: '#EAF1F9' }, border: { display: false } },
        },
      }}
    />
  )
}