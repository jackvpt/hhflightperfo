import { updateField as updateWeatherField } from "../features/weatherDataSlice.js"
import { updateField as updateFlightField } from "../features/flightDataSlice.js"
import { updatePerformanceField } from "../features/performancesSlice.js"
import { computeD1, computeHeadWind } from "../utils/performancesCalculations.js"

// Centralized action to update any field in the Redux store
export const updateAnyField = (name, rawValue) => (dispatch) => {
  const value = isNaN(Number(rawValue)) ? rawValue : Number(rawValue)

  // Fields grouped by feature
  const weatherFields = new Set([
    "windDirection",
    "windSpeed",
    "mainAirfieldQnh",
    "mainAirfieldTemperature",
    "mainAirfieldHeadWind",
  ])
  const flightFields = new Set(["runwayHeading"])

  if (weatherFields.has(name)) {
    dispatch(updateWeatherField({ field: name, value }))
  } else if (flightFields.has(name)) {
    dispatch(updateFlightField({ field: name, value }))
  } else {
    console.warn(`Field ${name} unknown in updateAnyField action`)
  }
}

export const recalculatePerformances = () => (dispatch, getState) => {
  const state = getState()
  const { windDirection, windSpeed } = state.weatherData
  const { runwayHeading } = state.flightData

  // Headwind calculation
  const headWind = computeHeadWind(windDirection, windSpeed, runwayHeading)
  dispatch(updatePerformanceField({ field: "headWind", value: headWind }))
  
  // D1 calculation
  const d1 = computeD1(headWind)
  dispatch(updatePerformanceField({ field: "d1", value: d1 }))
}
