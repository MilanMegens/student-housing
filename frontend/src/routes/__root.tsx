import { createRootRoute, Outlet } from '@tanstack/react-router'
import Sidebar from '../components/Sidebar'

export const Route = createRootRoute({
  component: () => (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-lichtblauw">
        <Outlet />
      </main>
    </div>
  ),
})