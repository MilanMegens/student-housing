import Sidebar from './components/Sidebar'

function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
      </main>
    </div>
  )
}

export default App