import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/evenementen')({
  component: Evenementen,
})

function Evenementen() {
  return <h1>Evenementen</h1>
}