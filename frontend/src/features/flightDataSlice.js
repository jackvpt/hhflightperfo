import { createSlice } from "@reduxjs/toolkit"

export const initialState = {
  takeoffAirfield: null,
  runwayHeading: 20,
  takeOffWeight: 0,
}

const flightDataSlice = createSlice({
  name: "flightData",
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload
      state[field] = value
    },
  },
})

export const { updateField } = flightDataSlice.actions

export default flightDataSlice.reducer
