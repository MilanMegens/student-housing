export type Maand = { jaar: number; maand: number; elektriciteit: number; gas: number }
export type Punt = { label: string; elektriciteit: number; gas: number }
export type Soort = 'alles' | 'energie' | 'gas'