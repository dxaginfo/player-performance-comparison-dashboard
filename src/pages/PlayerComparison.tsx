import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { RootState } from '@/store'
import {
  addPlayerToComparison,
  removePlayerFromComparison,
  setChartType,
  setNormalizeBy
} from '@/store/slices/comparisonSlice'
import { fetchPlayerById, comparePlayerStats } from '@/services/playerService'
import PlayerComparisonRadarChart from '@/components/charts/PlayerComparisonRadarChart'
import StatComparisonBarChart from '@/components/charts/StatComparisonBarChart'
import { StatCategory, Player } from '@/types/Player'

const PlayerComparison = () => {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const { 
    selectedPlayers, 
    chartType, 
    normalizeBy,
    selectedCategories,
    playerColors,
    playersData
  } = useSelector((state: RootState) => state.comparison)
  
  // Load players from URL if provided
  useEffect(() => {
    const playersParam = searchParams.get('players')
    if (playersParam) {
      const playerIds = playersParam.split(',')
      
      const loadPlayers = async () => {
        setLoading(true)
        setError(null)
        
        try {
          for (const id of playerIds) {
            // Skip if already in comparison
            if (selectedPlayers.includes(id)) continue
            
            const playerData = await fetchPlayerById(id)
            dispatch(addPlayerToComparison({ playerId: id, playerData }))
          }
        } catch (err) {
          console.error('Error loading players:', err)
          setError('Failed to load player data')
        } finally {
          setLoading(false)
        }
      }
      
      loadPlayers()
    }
  }, [searchParams, dispatch, selectedPlayers])
  
  const categoryGroups: { [key: string]: StatCategory[] } = {
    scoring: selectedCategories.filter(c => c.category === 'scoring'),
    rebounds: selectedCategories.filter(c => c.category === 'rebounds'),
    playmaking: selectedCategories.filter(c => c.category === 'playmaking'),
    defense: selectedCategories.filter(c => c.category === 'defense'),
    efficiency: selectedCategories.filter(c => c.category === 'efficiency'),
  }
  
  // Prepare data for charts
  const prepareChartData = () => {
    // This would normally be more complex, working with actual stat data
    // For the prototype, we'll generate random data for visualization purposes
    return selectedPlayers.map(playerId => {
      const player = playersData[playerId]
      
      // Generate random values for each category for demo purposes
      const values: Record<string, number> = {}
      selectedCategories.forEach(cat => {
        values[cat.id] = Math.random() * 30 + 5
      })
      
      return {
        id: playerId,
        name: player?.name || 'Unknown Player',
        color: playerColors[playerId] || '#ccc',
        values
      }
    })
  }
  
  const chartData = prepareChartData()
  
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold mb-2">Player Comparison</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Compare player statistics and performance metrics
        </p>
      </header>
      
      {/* Controls Section */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div>
            <h2 className="text-lg font-semibold mb-3">Selected Players</h2>
            
            {selectedPlayers.length === 0 ? (
              <p className="text-gray-500">No players selected. Use the search to add players.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {selectedPlayers.map(playerId => (
                  <div 
                    key={playerId}
                    className="flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-full"
                    style={{ borderLeft: `4px solid ${playerColors[playerId] || '#ccc'}` }}
                  >
                    <span>{playersData[playerId]?.name || playerId}</span>
                    <button
                      onClick={() => dispatch(removePlayerFromComparison(playerId))}
                      className="ml-2 text-gray-500 hover:text-red-500"
                      aria-label="Remove player"
                    >
                      &times;
                    </button>
                  </div>
                ))}
                
                {selectedPlayers.length < 4 && (
                  <a 
                    href="/search?mode=compare" 
                    className="px-3 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Player
                  </a>
                )}
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <div>
              <label htmlFor="chart-type" className="block text-sm font-medium mb-1">Chart Type</label>
              <select 
                id="chart-type"
                value={chartType}
                onChange={(e) => dispatch(setChartType(e.target.value as any))}
                className="input-field py-1 px-2 text-sm"
              >
                <option value="radar">Radar Chart</option>
                <option value="bar">Bar Chart</option>
                <option value="line">Line Chart</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="normalize-by" className="block text-sm font-medium mb-1">Normalize</label>
              <select 
                id="normalize-by"
                value={normalizeBy}
                onChange={(e) => dispatch(setNormalizeBy(e.target.value as any))}
                className="input-field py-1 px-2 text-sm"
              >
                <option value="raw">Raw Values</option>
                <option value="per36">Per 36 Minutes</option>
                <option value="per100">Per 100 Possessions</option>
                <option value="perGame">Per Game</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-4 rounded-md">
          {error}
        </div>
      ) : selectedPlayers.length === 0 ? (
        <div className="card text-center py-12">
          <h3 className="text-xl font-semibold mb-4">Start Your Comparison</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Search for players to add them to your comparison. You can compare up to 4 players at once.
          </p>
          <a href="/search?mode=compare" className="btn-primary inline-block">
            Search Players
          </a>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Visualization Section */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Performance Comparison</h2>
            
            {chartType === 'radar' ? (
              <PlayerComparisonRadarChart
                data={chartData.map(player => ({
                  player: player.name,
                  values: player.values,
                  color: player.color
                }))}
                categories={selectedCategories}
                maxValue={40} // Would be determined by actual data max values
              />
            ) : (
              <StatComparisonBarChart
                playersData={chartData}
                statCategories={selectedCategories}
                horizontal={false}
              />
            )}
          </div>
          
          {/* Detailed Stats Section */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Detailed Statistics</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="text-left p-3">Statistic</th>
                    {chartData.map(player => (
                      <th 
                        key={player.id} 
                        className="text-right p-3"
                        style={{ color: player.color }}
                      >
                        {player.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {selectedCategories.map(cat => (
                    <tr key={cat.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="p-3">{cat.name}</td>
                      {chartData.map(player => (
                        <td key={`${player.id}-${cat.id}`} className="text-right p-3">
                          {player.values[cat.id].toFixed(1)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PlayerComparison