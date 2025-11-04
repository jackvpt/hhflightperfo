import { createSlice } from "@reduxjs/toolkit"

export const initialState = {
  report: "",
  d1: [],
  mtow_ca_40: null,
  headWind: null,
  factoredHeadWind: null,
  platformFactoredWind: null,
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
