export type Maand = { jaar: number; maand: number; elektriciteit: number; gas: number }
export type HuisMaand = { huis_id: number; jaar: number; maand: number; elektriciteit: number; gas: number }
export type Punt = { label: string; elektriciteit: number; gas: number }
export type Soort = 'alles' | 'energie' | 'gas'
export type Huis = { huis_id: number; stad: string; adres: string }