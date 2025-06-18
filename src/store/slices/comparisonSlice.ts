import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StatCategory, Player } from '@/types/Player'

interface ComparisonState {
  selectedPlayers: string[];
  selectedCategories: StatCategory[];
  chartType: 'bar' | 'radar' | 'line';
  normalizeBy: 'raw' | 'per36' | 'per100' | 'perGame';
  seasonFilter: 'career' | 'lastSeason' | 'bestSeason' | 'custom';
  customSeasonStart: string | null;
  customSeasonEnd: string | null;
  playerColors: Record<string, string>;
  playersData: Record<string, Player>;
}

const defaultColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']

const initialState: ComparisonState = {
  selectedPlayers: [],
  selectedCategories: [
    { id: 'pts', name: 'Points', category: 'scoring' },
    { id: 'reb', name: 'Rebounds', category: 'rebounds' },
    { id: 'ast', name: 'Assists', category: 'playmaking' },
    { id: 'stl', name: 'Steals', category: 'defense' },
    { id: 'blk', name: 'Blocks', category: 'defense' },
  ],
  chartType: 'radar',
  normalizeBy: 'raw',
  seasonFilter: 'career',
  customSeasonStart: null,
  customSeasonEnd: null,
  playerColors: {},
  playersData: {},
}

const comparisonSlice = createSlice({
  name: 'comparison',
  initialState,
  reducers: {
    addPlayerToComparison: (state, action: PayloadAction<{ playerId: string, playerData: Player }>) => {
      const { playerId, playerData } = action.payload
      
      if (state.selectedPlayers.length < 4 && !state.selectedPlayers.includes(playerId)) {
        state.selectedPlayers.push(playerId)
        state.playersData[playerId] = playerData
        
        // Assign a color if not already assigned
        if (!state.playerColors[playerId]) {
          const colorIndex = state.selectedPlayers.length - 1
          state.playerColors[playerId] = defaultColors[colorIndex % defaultColors.length]
        }
      }
    },
    removePlayerFromComparison: (state, action: PayloadAction<string>) => {
      const playerId = action.payload
      state.selectedPlayers = state.selectedPlayers.filter(id => id !== playerId)
    },
    clearComparison: (state) => {
      state.selectedPlayers = []
      state.playersData = {}
    },
    toggleStatCategory: (state, action: PayloadAction<StatCategory>) => {
      const category = action.payload
      const index = state.selectedCategories.findIndex(c => c.id === category.id)
      
      if (index >= 0) {
        state.selectedCategories = state.selectedCategories.filter(c => c.id !== category.id)
      } else {
        state.selectedCategories.push(category)
      }
    },
    setChartType: (state, action: PayloadAction<'bar' | 'radar' | 'line'>) => {
      state.chartType = action.payload
    },
    setNormalizeBy: (state, action: PayloadAction<'raw' | 'per36' | 'per100' | 'perGame'>) => {
      state.normalizeBy = action.payload
    },
    setSeasonFilter: (state, action: PayloadAction<'career' | 'lastSeason' | 'bestSeason' | 'custom'>) => {
      state.seasonFilter = action.payload
    },
    setCustomSeasonRange: (state, action: PayloadAction<{ start: string, end: string }>) => {
      state.customSeasonStart = action.payload.start
      state.customSeasonEnd = action.payload.end
    },
  },
})

export const {
  addPlayerToComparison,
  removePlayerFromComparison,
  clearComparison,
  toggleStatCategory,
  setChartType,
  setNormalizeBy,
  setSeasonFilter,
  setCustomSeasonRange,
} = comparisonSlice.actions

export default comparisonSlice.reducer