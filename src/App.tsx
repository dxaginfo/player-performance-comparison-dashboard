import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import PlayerSearch from './pages/PlayerSearch'
import PlayerComparison from './pages/PlayerComparison'
import PlayerDetails from './pages/PlayerDetails'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="search" element={<PlayerSearch />} />
        <Route path="compare" element={<PlayerComparison />} />
        <Route path="player/:playerId" element={<PlayerDetails />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App