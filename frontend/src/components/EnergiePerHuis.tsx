import { useState } from 'react'
import HuizenGrafiek from './HuizenGrafiek'
import HuisKiezer from './HuisKiezer'
import Knop from './Knop'
import type { HuisMaand, Huis } from '../types'

const maanden = ['Jan', 'Feb', 'Mrt', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec']
const MAX_HUIZEN = 6

export default function EnergiePerHuis({ data, huizen }: { data: HuisMaand[]; huizen: Huis[] }) {
  const [gekozen, setGekozen] = useState<number[]>(huizen.slice(0, 3).map((h) => h.huis_id))
  const [periode, setPeriode] = useState<'maand' | 'jaar'>('maand')
  const [soort, setSoort] = useState<'energie' | 'gas'>('energie')

  const jaren = [...new Set(data.map((rij) => rij.jaar))]
  const volledigeJaren = jaren.filter(
    (j) => data.filter((rij) => rij.jaar === j && rij.huis_id === huizen[0]?.huis_id).length === 12,
  )
  const laatsteJaar = Math.max(...volledigeJaren)

  const waarde = (rij: HuisMaand) => Number(soort === 'energie' ? rij.elektriciteit : rij.gas)

  const labels = periode === 'maand' ? maanden : volledigeJaren.map(String)

  const lijnen = gekozen.map((huis) => {
    const vanHuis = data.filter((rij) => rij.huis_id === huis)
    const info = huizen.find((h) => h.huis_id === huis)
    return {
      naam: info ? `${info.adres}, ${info.stad}` : `Huis ${huis}`,
      waarden:
        periode === 'maand'
          ? vanHuis.filter((rij) => rij.jaar === laatsteJaar).map(waarde)
          : volledigeJaren.map((j) =>
              vanHuis.filter((rij) => rij.jaar === j).reduce((som, rij) => som + waarde(rij), 0),
            ),
    }
  })

  function wissel(huis: number) {
    setGekozen((oud) => {
      if (oud.includes(huis)) return oud.filter((h) => h !== huis)
      if (oud.length >= MAX_HUIZEN) return oud
      return [...oud, huis].sort((a, b) => a - b)
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          <div className="flex gap-1 p-1 rounded-xl bg-[#E6EBEF]">
            <Knop actief={periode === 'maand'} onClick={() => setPeriode('maand')}>Maand</Knop>
            <Knop actief={periode === 'jaar'} onClick={() => setPeriode('jaar')}>Jaar</Knop>
          </div>
          <div className="flex gap-1 p-1 rounded-xl bg-[#E6EBEF]">
            <Knop actief={soort === 'energie'} onClick={() => setSoort('energie')}>Energie</Knop>
            <Knop actief={soort === 'gas'} onClick={() => setSoort('gas')}>Gas</Knop>
          </div>
        </div>

        <HuisKiezer huizen={huizen} gekozen={gekozen} max={MAX_HUIZEN} onWissel={wissel} />
      </div>

      <div className="bg-white rounded-2xl border border-[#dce4ee] p-6">
        <p className="text-xs font-bold tracking-widest uppercase text-donkerblauw">
          {periode === 'maand' ? `Maandoverzicht ${laatsteJaar}` : 'Jaaroverzicht'}
        </p>
        <h2 className="font-heading text-xl text-donkerblauw mt-1 mb-4">
          {soort === 'energie' ? 'Energie per huis (kWh)' : 'Gas per huis (m³)'}
        </h2>
        <div className="h-[400px]">
          {gekozen.length === 0 ? (
            <p className="text-grijsblauw">Kies minimaal één huis.</p>
          ) : (
            <HuizenGrafiek labels={labels} lijnen={lijnen} eenheid={soort === 'energie' ? 'kWh' : 'm³'} />
          )}
        </div>
      </div>
    </div>
  )
}