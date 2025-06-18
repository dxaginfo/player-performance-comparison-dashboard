import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { searchPlayersThunk, clearSearchResults } from '@/store/slices/playersSlice'
import { RootState } from '@/store'

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showResults, setShowResults] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const searchRef = useRef<HTMLDivElement>(null)
  
  const { searchResults, loading } = useSelector((state: RootState) => state.players)
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  
  useEffect(() => {
    if (searchQuery.length >= 2) {
      const timerId = setTimeout(() => {
        dispatch(searchPlayersThunk(searchQuery))
        setShowResults(true)
      }, 300)
      
      return () => clearTimeout(timerId)
    }
  }, [searchQuery, dispatch])
  
  const handlePlayerSelect = (playerId: string) => {
    navigate(`/player/${playerId}`)
    setShowResults(false)
    setSearchQuery('')
    dispatch(clearSearchResults())
  }
  
  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => searchQuery.length >= 2 && setShowResults(true)}
          placeholder="Search for players..."
          className="w-full bg-primary-800 text-white placeholder-gray-300 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-white/50"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      {showResults && (
        <div className="absolute mt-2 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600 mx-auto"></div>
            </div>
          ) : searchResults.length > 0 ? (
            <ul>
              {searchResults.map((player) => (
                <li key={player.id}>
                  <button
                    onClick={() => handlePlayerSelect(player.id)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-3"
                  >
                    {player.imageUrl && (
                      <img 
                        src={player.imageUrl} 
                        alt={player.name} 
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <div className="font-medium">{player.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {player.position} • {player.teams[0]?.teamName || 'N/A'}
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : searchQuery.length >= 2 ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No players found
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}

export default SearchBar