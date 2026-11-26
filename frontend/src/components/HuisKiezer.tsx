import { useEffect, useRef, useState } from 'react'
import { huisKleuren } from '../kleuren'
import type { Huis } from '../types'

export default function HuisKiezer({
  huizen,
  gekozen,
  max,
  onWissel,
}: {
  huizen: Huis[]
  gekozen: number[]
  max: number
  onWissel: (huis: number) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function klik(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', klik)
    return () => document.removeEventListener('mousedown', klik)
  }, [])

  return (
    <div ref={ref} className="relative w-72">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between bg-white border border-[#dce4ee] rounded-xl px-5 py-3 font-semibold text-donkerblauw hover:border-blauw transition"
      >
        {gekozen.length} {gekozen.length === 1 ? 'huis' : 'huizen'} gekozen
        <svg
          className={`w-4 h-4 transition ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-full max-h-72 overflow-y-auto bg-white border border-[#dce4ee] rounded-xl p-2 z-10 shadow-lg">
          <p className="px-3 py-2 text-xs text-grijsblauw">Kies maximaal {max} huizen</p>
          {huizen.map(({ huis_id: huis, stad, adres }) => {
            const index = gekozen.indexOf(huis)
            const aan = index !== -1
            const kleur = huisKleuren[index % huisKleuren.length]
            const vol = !aan && gekozen.length >= max
            return (
              <button
                key={huis}
                onClick={() => onWissel(huis)}
                disabled={vol}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition ${
                  aan ? 'text-donkerblauw font-semibold' : 'text-grijsblauw'
                } ${vol ? 'opacity-40 cursor-not-allowed' : 'hover:bg-lichtblauw'}`}
              >
                <span
                  className="w-4 h-4 rounded flex items-center justify-center border-2"
                  style={{ borderColor: aan ? kleur : '#dce4ee', backgroundColor: aan ? kleur : 'transparent' }}
                >
                  {aan && (
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4">
                      <path d="M5 12l5 5 9-10" />
                    </svg>
                  )}
                </span>
                <span className="flex flex-col leading-tight">
                  <span>{stad}</span>
                  <span className="text-xs font-normal text-grijsblauw">{adres}</span>
                </span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}