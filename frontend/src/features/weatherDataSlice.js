import { createSlice } from "@reduxjs/toolkit"

export const initialState = {
  windDirection: 10,
  windSpeed: 10,
  mainAirfieldQnh: 1013,
  mainAirfieldTemperature: 15,
  mainAirfieldHeadWind: 10,
}

const weatherDataSlice = createSlice({
  name: "weatherData",
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload
      state[field] = value
    },
  },
})

export const { updateField } = weatherDataSlice.actions

export default weatherDataSlice.reducer
