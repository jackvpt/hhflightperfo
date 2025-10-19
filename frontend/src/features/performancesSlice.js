import { createSlice } from "@reduxjs/toolkit"

export const initialState = {
  report: "",
  d1: [],
  vtoss: 60,
  mtowClearArea: 0,
  headWind: 0,
  factoredHeadWind: 0,
}

const performancesSlice = createSlice({
  name: "performances",
  initialState,
  reducers: {
    updatePerformanceField: (state, action) => {
      const { field, value } = action.payload
      state[field] = value
    },
  },
})

export const { updatePerformanceField } = performancesSlice.actions

export default performancesSlice.reducer
