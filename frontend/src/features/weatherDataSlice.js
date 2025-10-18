import { createSlice } from "@reduxjs/toolkit"

export const initialState = {
  windDirection: 10,
  windSpeed: 10,
  qnh: 1013,
  takeoffTemperature: 15,
  takeoffAltitude: 0,
  takeoffZp: 0,
}

const calculateZP = (altitude, qnh) => {
  const deltaQnh = 1013 - qnh
  const zp = altitude + deltaQnh * 28
  return Math.round(zp)
}

const weatherDataSlice = createSlice({
  name: "weatherData",
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload
      state[field] = value

      // Recalculate takeoffZp if altitude or QNH change
      if (field === "takeoffAltitude" || field === "qnh") {
        state.takeoffZp = calculateZP(state.takeoffAltitude, state.qnh)
      }
    },
  },
})

export const { updateField } = weatherDataSlice.actions

export default weatherDataSlice.reducer
