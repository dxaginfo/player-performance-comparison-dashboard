import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadPlayerById, loadPlayerStats } from '@/store/slices/playersSlice'
import { addPlayerToComparison } from '@/store/slices/comparisonSlice'
import { RootState } from '@/store'

const PlayerDetails = () => {
  const { playerId } = useParams<{ playerId: string }>()
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState('overview')
  
  const { currentPlayer, playerStats, loading, error } = useSelector((state: RootState) => state.players)
  const { selectedPlayers } = useSelector((state: RootState) => state.comparison)
  
  useEffect(() => {
    if (playerId) {
      dispatch(loadPlayerById(playerId))
      dispatch(loadPlayerStats(playerId))
    }
  }, [playerId, dispatch])
  
  const handleAddToComparison = () => {
    if (currentPlayer && !selectedPlayers.includes(currentPlayer.id) && selectedPlayers.length < 4) {
      dispatch(addPlayerToComparison({ playerId: currentPlayer.id, playerData: currentPlayer }))
    }
  }
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
      </div>
    )
  }
  
  if (error || !currentPlayer) {
    return (
      <div className="card text-center py-12">
        <h2 className="text-xl font-semibold mb-4">Error Loading Player</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{error || 'Player not found'}</p>
        <Link to="/search" className="btn-primary">
          Back to Search
        </Link>
      </div>
    )
  }
  
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'stats', label: 'Statistics' },
    { id: 'shooting', label: 'Shooting' },
    { id: 'advanced', label: 'Advanced' },
    { id: 'game-log', label: 'Game Log' },
  ]
  
  return (
    <div className="space-y-6">
      {/* Player Header */}
      <div className="card p-0 overflow-hidden">
        <div className="bg-gradient-to-r from-primary-700 to-primary-500 text-white p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {currentPlayer.imageUrl ? (
              <img 
                src={currentPlayer.imageUrl} 
                alt={currentPlayer.name}
                className="w-32 h-40 object-cover rounded-md border-2 border-white shadow-md"
              />
            ) : (
              <div className="w-32 h-40 bg-primary-800 rounded-md flex items-center justify-center">
                <svg className="w-16 h-16 text-primary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            )}
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold">{currentPlayer.name}</h1>
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
                <div>
                  <span className="text-primary-200">Position</span>
                  <p className="font-medium">{currentPlayer.position || 'N/A'}</p>
                </div>
                <div>
                  <span className="text-primary-200">Team</span>
                  <p className="font-medium">{currentPlayer.teams[0]?.teamName || 'N/A'}</p>
                </div>
                <div>
                  <span className="text-primary-200">Jersey</span>
                  <p className="font-medium">#{currentPlayer.jerseyNumber || 'N/A'}</p>
                </div>
                <div>
                  <span className="text-primary-200">Status</span>
                  <p className="font-medium">{currentPlayer.active ? 'Active' : 'Inactive'}</p>
                </div>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                <button 
                  onClick={handleAddToComparison}
                  disabled={selectedPlayers.includes(currentPlayer.id) || selectedPlayers.length >= 4}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${selectedPlayers.includes(currentPlayer.id)
                    ? 'bg-green-500 text-white'
                    : selectedPlayers.length >= 4
                      ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                      : 'bg-white text-primary-700 hover:bg-primary-50'}`}
                >
                  {selectedPlayers.includes(currentPlayer.id)
                    ? 'Added to Comparison'
                    : selectedPlayers.length >= 4
                      ? 'Max Players Selected'
                      : 'Add to Comparison'}
                </button>
                
                {selectedPlayers.length > 0 && (
                  <Link 
                    to="/compare" 
                    className="px-4 py-2 rounded-md text-sm font-medium bg-primary-800 text-white hover:bg-primary-900"
                  >
                    View Comparison
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Player Details */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-white dark:bg-gray-800">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Height</h3>
            <p className="text-lg">{currentPlayer.height || 'N/A'}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Weight</h3>
            <p className="text-lg">{currentPlayer.weight || 'N/A'}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Born</h3>
            <p className="text-lg">{new Date(currentPlayer.birthdate).toLocaleDateString() || 'N/A'}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">From</h3>
            <p className="text-lg">{currentPlayer.college || currentPlayer.country || 'N/A'}</p>
          </div>
          {currentPlayer.draftYear && (
            <div className="col-span-full">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Draft</h3>
              <p className="text-lg">
                {currentPlayer.draftYear} Round {currentPlayer.draftRound}, Pick {currentPlayer.draftPick}
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-6 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 font-medium text-sm border-b-2 ${activeTab === tab.id
                ? 'text-primary-600 dark:text-primary-400 border-primary-600 dark:border-primary-400'
                : 'text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'}`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      
      {/* Tab Content - Placeholder for now */}
      <div className="card">
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Player Overview</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              This section would display a comprehensive overview of {currentPlayer.name}'s career, including key statistics, achievements, and career milestones.
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-md text-center">
              <p className="text-gray-500 dark:text-gray-400">
                In a full implementation, this would include career highlights, team history, and performance trends.
              </p>
            </div>
          </div>
        )}
        
        {activeTab === 'stats' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Player Statistics</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Detailed statistics for {currentPlayer.name}, including regular season, playoff, and career averages.
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-md text-center">
              <p className="text-gray-500 dark:text-gray-400">
                In a full implementation, this would include interactive tables and charts with detailed statistics by season and game type.
              </p>
            </div>
          </div>
        )}
        
        {activeTab === 'shooting' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Shooting Analysis</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Analysis of {currentPlayer.name}'s shooting patterns, efficiency by zone, and shot selection.
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-md text-center">
              <p className="text-gray-500 dark:text-gray-400">
                In a full implementation, this would include shot charts, heat maps, and analysis of shooting efficiency from different areas of the court.
              </p>
            </div>
          </div>
        )}
        
        {activeTab === 'advanced' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Advanced Metrics</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Advanced statistics for {currentPlayer.name}, including efficiency metrics, win shares, and player impact estimates.
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-md text-center">
              <p className="text-gray-500 dark:text-gray-400">
                In a full implementation, this would include advanced analytics such as PER, True Shooting %, Win Shares, VORP, and other modern basketball metrics.
              </p>
            </div>
          </div>
        )}
        
        {activeTab === 'game-log' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Game Log</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Game-by-game performance log for {currentPlayer.name}'s recent games.
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-md text-center">
              <p className="text-gray-500 dark:text-gray-400">
                In a full implementation, this would include a filterable, sortable table of game-by-game statistics.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PlayerDetails