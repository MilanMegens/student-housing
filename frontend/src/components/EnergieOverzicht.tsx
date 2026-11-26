import { useState } from 'react'
import EnergieGrafiek from './EnergieGrafiek'
import Knop from './Knop'
import type { Maand, Punt, Soort } from '../types'

const maanden = ['Jan', 'Feb', 'Mrt', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec']

export default function EnergieOverzicht({ data }: { data: Maand[] }) {
  const [periode, setPeriode] = useState<'maand' | 'jaar'>('maand')
  const [soort, setSoort] = useState<Soort>('alles')

  const jaren = [...new Set(data.map((rij) => rij.jaar))]
  const volledigeJaren = jaren.filter((jaar) => data.filter((rij) => rij.jaar === jaar).length === 12)
  const laatsteJaar = Math.max(...volledigeJaren)

  const perMaand: Punt[] = data
    .filter((rij) => rij.jaar === laatsteJaar)
    .map((rij) => ({
      label: maanden[rij.maand - 1],
      elektriciteit: Number(rij.elektriciteit),
      gas: Number(rij.gas),
    }))

  const perJaar: Punt[] = volledigeJaren.map((jaar) => {
    const rijen = data.filter((rij) => rij.jaar === jaar)
    return {
      label: String(jaar),
      elektriciteit: rijen.reduce((som, rij) => som + Number(rij.elektriciteit), 0),
      gas: rijen.reduce((som, rij) => som + Number(rij.gas), 0),
    }
  })

  const punten = periode === 'maand' ? perMaand : perJaar

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-3">
        <div className="flex gap-1 p-1 rounded-xl bg-[#E6EBEF]">
          <Knop actief={periode === 'maand'} onClick={() => setPeriode('maand')}>Maand</Knop>
          <Knop actief={periode === 'jaar'} onClick={() => setPeriode('jaar')}>Jaar</Knop>
        </div>
        <div className="flex gap-1 p-1 rounded-xl bg-[#E6EBEF]">
          <Knop actief={soort === 'alles'} onClick={() => setSoort('alles')}>Alles</Knop>
          <Knop actief={soort === 'energie'} onClick={() => setSoort('energie')}>Energie</Knop>
          <Knop actief={soort === 'gas'} onClick={() => setSoort('gas')}>Gas</Knop>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#dce4ee] p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-donkerblauw">
              {periode === 'maand' ? `Maandoverzicht ${laatsteJaar}` : 'Jaaroverzicht'}
            </p>
            <h2 className="font-heading text-xl text-donkerblauw mt-1">Totaal verbruik</h2>
          </div>
          <div className="flex gap-4 text-sm text-grijsblauw">
            {soort !== 'gas' && (
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blauw" /> Energie (kWh)
              </span>
            )}
            {soort !== 'energie' && (
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-oranje" /> Gas (m³)
              </span>
            )}
          </div>
        </div>
        <div className="h-[400px]">
          <EnergieGrafiek punten={punten} soort={soort} />
        </div>
      </div>
    </div>
  )
}