import { createSlice } from "@reduxjs/toolkit"
import { getQFUForWind } from "../utils/calculations"

export const initialState = {
  takeoffAirfield: null,
  runwayHeading: 20,
  takeOffWeight: 4800,
  platformDropDown: 60,
  platformMaxTtet: 3,
  platformLandingWeight: 4800,
  platformTakeoffWeight: 4800,
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
