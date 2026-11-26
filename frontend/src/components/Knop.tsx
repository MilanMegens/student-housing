import type { ReactNode } from 'react'

export default function Knop({
  actief,
  onClick,
  children,
}: {
  actief: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition ${
        actief ? 'bg-white text-donkerblauw shadow-sm' : 'text-grijsblauw hover:text-donkerblauw'
      }`}
    >
      {children}
    </button>
  )
}