import { configureStore } from '@reduxjs/toolkit'
import playersReducer from './slices/playersSlice'
import uiReducer from './slices/uiSlice'
import comparisonReducer from './slices/comparisonSlice'

export const store = configureStore({
  reducer: {
    players: playersReducer,
    ui: uiReducer,
    comparison: comparisonReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch