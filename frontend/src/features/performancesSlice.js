import { createSlice } from "@reduxjs/toolkit"

export const initialState = {
  d1:[],
  vtoss:60,
  mtowClearArea:0,

}

const performancesSlice = createSlice({
  name: "performances",
  initialState,
  reducers: {
    setPerformances: (state, action) => {
      return { ...state, ...action.payload }
    },
  },
})

export const { setPerformances } = performancesSlice.actions

export default performancesSlice.reducer
