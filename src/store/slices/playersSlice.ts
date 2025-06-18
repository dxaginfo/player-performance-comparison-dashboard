import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { fetchPlayerById, searchPlayers, fetchPlayerStats } from '@/services/playerService'
import { Player, PlayerStats } from '@/types/Player'

interface PlayersState {
  playersList: Player[];
  currentPlayer: Player | null;
  playerStats: Record<string, PlayerStats>;
  searchResults: Player[];
  loading: boolean;
  error: string | null;
}

const initialState: PlayersState = {
  playersList: [],
  currentPlayer: null,
  playerStats: {},
  searchResults: [],
  loading: false,
  error: null,
}

export const loadPlayerById = createAsyncThunk(
  'players/loadPlayerById',
  async (playerId: string) => {
    const response = await fetchPlayerById(playerId)
    return response
  }
)

export const loadPlayerStats = createAsyncThunk(
  'players/loadPlayerStats',
  async (playerId: string) => {
    const response = await fetchPlayerStats(playerId)
    return { playerId, stats: response }
  }
)

export const searchPlayersThunk = createAsyncThunk(
  'players/searchPlayers',
  async (query: string) => {
    const response = await searchPlayers(query)
    return response
  }
)

const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = []
    },
    clearCurrentPlayer: (state) => {
      state.currentPlayer = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPlayerById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loadPlayerById.fulfilled, (state, action: PayloadAction<Player>) => {
        state.loading = false
        state.currentPlayer = action.payload
      })
      .addCase(loadPlayerById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to load player data'
      })
      .addCase(loadPlayerStats.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loadPlayerStats.fulfilled, (state, action) => {
        state.loading = false
        const { playerId, stats } = action.payload
        state.playerStats[playerId] = stats
      })
      .addCase(loadPlayerStats.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to load player stats'
      })
      .addCase(searchPlayersThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(searchPlayersThunk.fulfilled, (state, action: PayloadAction<Player[]>) => {
        state.loading = false
        state.searchResults = action.payload
      })
      .addCase(searchPlayersThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to search players'
      })
  },
})

export const { clearSearchResults, clearCurrentPlayer } = playersSlice.actions
export default playersSlice.reducer