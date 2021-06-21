import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'game',
  initialState: {},
  reducers: {
    updateGame: (state, { payload }) => {
      Object.assign(state, payload)
    }
  }
})

export const { updateGame } = slice.actions

export default slice.reducer
