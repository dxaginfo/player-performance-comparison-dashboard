import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UiState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  activeTab: string;
  selectedSeason: string;
  statView: 'traditional' | 'advanced' | 'per36' | 'per100';
}

const initialState: UiState = {
  theme: 'light',
  sidebarOpen: true,
  activeTab: 'overview',
  selectedSeason: 'career',
  statView: 'traditional',
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload
    },
    setSelectedSeason: (state, action: PayloadAction<string>) => {
      state.selectedSeason = action.payload
    },
    setStatView: (state, action: PayloadAction<'traditional' | 'advanced' | 'per36' | 'per100'>) => {
      state.statView = action.payload
    },
  },
})

export const { toggleTheme, toggleSidebar, setActiveTab, setSelectedSeason, setStatView } = uiSlice.actions
export default uiSlice.reducer