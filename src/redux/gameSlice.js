import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'game',
  initialState: {},
  reducers: {
    updateGame: (state, { payload }) => {
      Object.assign(state, payload)
    },
    setCurrentPlayerSeat: (state, { payload }) => {
      state.currentPlayerSeat = payload
    }
  }
})

export const { updateGame, setCurrentPlayerSeat } = slice.actions

export default slice.reducer
