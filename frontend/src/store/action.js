import { updateField as updateWeatherField } from "../features/weatherDataSlice.js"
import { updateField as updateFlightField } from "../features/flightDataSlice.js"
import { setPerformances } from "../features/performancesSlice.js"
import { computeHeadWind } from "../utils/performancesCalculations.js"

// Centralized action to update any field in the Redux store
export const updateAnyField = (name, rawValue) => (dispatch, getState) => {
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

    // 2️⃣ Performances recalculation after state update
  const { weatherData, flightData } = getState()

  // Headwind calculation
  const headWind = computeHeadWind(
    weatherData.windDirection,
    weatherData.windSpeed,
    flightData.runwayHeading
  )

  // Dispatch the recalculated headwind
  dispatch(setPerformances({ headWind }))
}
