import { createSlice } from "@reduxjs/toolkit"

export const initialState = {
  windDirection: 10,
  windSpeed: 10,
  qnh: 1013,
  takeoffTemperature: 15,
  takeoffAltitude: 0,
  takeoffZp: 0,
  platformWindSpeed:15,
  platformQnh:1013,
  platformAltitude:100,
  platformZp:100,
  platformTemperature:15,
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

      // Recalculate platformZp if altitude or QNH change
      if (field === "platformAltitude" || field === "platformQnh") {
        state.platformZp = calculateZP(state.platformAltitude, state.platformQnh)
      }
    },

    updateFromMetar: (state, action) => {
      const { windDirection, windSpeed, qnh, temperature, altitude } =
        action.payload

      if (windDirection !== undefined) state.windDirection = windDirection
      if (windSpeed !== undefined) state.windSpeed = windSpeed
      if (qnh !== undefined) state.qnh = qnh
      if (temperature !== undefined) state.takeoffTemperature = temperature
      if (altitude !== undefined) state.takeoffAltitude = altitude

      state.takeoffZp = calculateZP(state.takeoffAltitude, state.qnh)
    },
  },
})

export const { updateField, updateFromMetar } = weatherDataSlice.actions

export default weatherDataSlice.reducer
