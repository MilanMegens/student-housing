import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import EnergieOverzicht from '../components/EnergieOverzicht'
import EnergiePerHuis from '../components/EnergiePerHuis'
import type { Maand, HuisMaand, Huis } from '../types'

export const Route = createFileRoute('/energie')({
  loader: async () => {
    const [totaal, perHuis, huizen] = await Promise.all([
      fetch('/api/energie').then((r) => r.json() as Promise<Maand[]>),
      fetch('/api/energie/per-huis').then((r) => r.json() as Promise<HuisMaand[]>),
      fetch('/api/huizen').then((r) => r.json() as Promise<Huis[]>),
    ])
    return { totaal, perHuis, huizen }
  },
  component: Energie,
})

function Energie() {
  const { totaal, perHuis, huizen } = Route.useLoaderData()
  const [tab, setTab] = useState<'overzicht' | 'perHuis'>('overzicht')

  const tabKlasse = (actief: boolean) =>
    `pb-3 font-semibold border-b-2 transition ${
      actief ? 'text-donkerblauw border-oranje' : 'text-grijsblauw border-transparent hover:text-donkerblauw'
    }`

  return (
    <div className="p-8 flex flex-col gap-6">
      <div className="">
          <div className="text-xs text-donkerblauw font-extrabold tracking-widest">DUURZAAMHEID</div>
          <div className="text-3xl mt-[6px] mx-0 mb-[7px]">Energie & gas</div>
          <div className="text-xs text-zinc-500">Bekijk het energie- en gasverbruik per periode en per huis.</div>
      </div>

      <div className="flex gap-8 border-b border-[#dce4ee]">
        <button className={tabKlasse(tab === 'overzicht')} onClick={() => setTab('overzicht')}>
          Overzicht
        </button>
        <button className={tabKlasse(tab === 'perHuis')} onClick={() => setTab('perHuis')}>
          Per huis
        </button>
      </div>

      {tab === 'overzicht' ? <EnergieOverzicht data={totaal} /> : <EnergiePerHuis data={perHuis} huizen={huizen} />}
    </div>
  )
}