import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/energie')({
  component: EnergieGas,
})

function EnergieGas() {
  return <h1>Energie & gas</h1>
}