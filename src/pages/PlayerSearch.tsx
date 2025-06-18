import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useSearchParams } from 'react-router-dom'
import { searchPlayersThunk } from '@/store/slices/playersSlice'
import { addPlayerToComparison } from '@/store/slices/comparisonSlice'
import { RootState } from '@/store'

const PlayerSearch = () => {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')
  const isCompareMode = searchParams.get('mode') === 'compare'
  
  const { searchResults, loading } = useSelector((state: RootState) => state.players)
  const { selectedPlayers } = useSelector((state: RootState) => state.comparison)
  
  useEffect(() => {
    if (searchQuery.length >= 2) {
      const timer = setTimeout(() => {
        dispatch(searchPlayersThunk(searchQuery))
      }, 300)
      
      return () => clearTimeout(timer)
    }
  }, [searchQuery, dispatch])
  
  const handleAddToComparison = (playerId: string) => {
    const player = searchResults.find(p => p.id === playerId)
    if (player && selectedPlayers.length < 4) {
      dispatch(addPlayerToComparison({ playerId, playerData: player }))
    }
  }
  
  const filteredResults = activeFilter === 'all'
    ? searchResults
    : searchResults.filter(player => {
        if (activeFilter === 'active') return player.active
        if (activeFilter === 'inactive') return !player.active
        if (activeFilter === 'rookie') return player.rookie
        return true
      })
  
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold mb-2">Player Search</h1>
        <p className="text-gray-600 dark:text-gray-300">
          {isCompareMode 
            ? 'Search for players to add to your comparison'
            : 'Search for NBA players to view detailed statistics'}
        </p>
      </header>
      
      <div className="card">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by player name..."
            className="input-field pl-10"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        {/* Filters */}
        <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
          {[
            { id: 'all', label: 'All Players' },
            { id: 'active', label: 'Active Players' },
            { id: 'inactive', label: 'Retired Players' },
            { id: 'rookie', label: 'Rookies' },
          ].map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-sm ${activeFilter === filter.id
                ? 'bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Results Section */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : searchQuery.length < 2 ? (
          <div className="card text-center py-12">
            <p className="text-gray-500">Enter at least 2 characters to search</p>
          </div>
        ) : filteredResults.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-gray-500">No players found matching "{searchQuery}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredResults.map(player => (
              <div key={player.id} className="card flex">
                {player.imageUrl ? (
                  <img 
                    src={player.imageUrl} 
                    alt={player.name}
                    className="w-20 h-24 object-cover rounded-md"
                  />
                ) : (
                  <div className="w-20 h-24 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
                    <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
                
                <div className="ml-4 flex-1">
                  <h3 className="font-semibold text-lg">{player.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {player.position} • {player.teams[0]?.teamName || 'N/A'}
                  </p>
                  
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1 space-x-2">
                    <span>{player.height}</span>
                    <span>•</span>
                    <span>{player.weight}</span>
                    {player.active && (
                      <>
                        <span>•</span>
                        <span className="text-green-600 dark:text-green-400">Active</span>
                      </>
                    )}
                  </div>
                  
                  <div className="mt-3 flex space-x-2">
                    {isCompareMode ? (
                      <button
                        onClick={() => handleAddToComparison(player.id)}
                        disabled={selectedPlayers.includes(player.id) || selectedPlayers.length >= 4}
                        className={`text-xs px-3 py-1 rounded ${selectedPlayers.includes(player.id)
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                          : selectedPlayers.length >= 4
                            ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                            : 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-primary-900/50'}`}
                      >
                        {selectedPlayers.includes(player.id)
                          ? 'Added to Comparison'
                          : selectedPlayers.length >= 4
                            ? 'Max Players Selected'
                            : 'Add to Comparison'}
                      </button>
                    ) : (
                      <Link
                        to={`/player/${player.id}`}
                        className="text-xs px-3 py-1 rounded bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-primary-900/50"
                      >
                        View Profile
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {isCompareMode && selectedPlayers.length > 0 && (
        <div className="fixed bottom-6 right-6 bg-primary-600 text-white px-4 py-3 rounded-lg shadow-lg">
          <div className="flex items-center gap-3">
            <span>{selectedPlayers.length} player{selectedPlayers.length !== 1 ? 's' : ''} selected</span>
            <Link 
              to="/compare" 
              className="bg-white text-primary-600 px-4 py-1 rounded-md font-medium hover:bg-gray-100 transition-colors"
            >
              View Comparison
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default PlayerSearch