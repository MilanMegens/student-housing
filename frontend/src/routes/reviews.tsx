import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/reviews')({
  component: Reviews,
})

function Reviews() {
  return <h1>Reviews</h1>
}