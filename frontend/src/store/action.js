import { updateField as updateWeatherField } from "../features/weatherDataSlice.js"
import { updateField as updateFlightField } from "../features/flightDataSlice.js"
import { updatePerformanceField } from "../features/performancesSlice.js"
import {
  computeD1,
  computeFactoredHeadWind,
  computeHeadWind,
  computeMlw_ca,
  computeMlw_helipad,
  computeMtow_ca_40,
  computeMtow_ca_50,
  computeMtow_ca_60,
  computeMtow_elevated_heliport_1,
  computeMtow_helipad,
} from "../utils/performancesCalculations.js"

// Centralized action to update any field in the Redux store
export const updateAnyField = (name, rawValue) => (dispatch) => {
  const value = isNaN(Number(rawValue)) ? rawValue : Number(rawValue)

  // Fields grouped by feature
  const weatherFields = new Set([
    "windDirection",
    "windSpeed",
    "qnh",
    "takeoffTemperature",
    "takeoffAltitude",
    "mainAirfieldHeadWind",
    "platformWindSpeed",
  ])
  const flightFields = new Set(["runwayHeading", "platformDropDown"])

  if (weatherFields.has(name)) {
    dispatch(updateWeatherField({ field: name, value }))
  } else if (flightFields.has(name)) {
    dispatch(updateFlightField({ field: name, value }))
  } else {
    console.warn(`Field ${name} unknown in updateAnyField action`)
  }
}

export const calculatePerformances = () => (dispatch, getState) => {
  const state = getState()
  const {
    windDirection,
    windSpeed,
    takeoffTemperature,
    takeoffZp,
    platformWindSpeed,
  } = state.weatherData
  const { runwayHeading, platformDropDown } = state.flightData

  // Takeoff Headwind & Factored headwind calculation
  const headWind = computeHeadWind(windDirection, windSpeed, runwayHeading)
  dispatch(updatePerformanceField({ field: "headWind", value: headWind }))
  const factoredHeadWind = computeFactoredHeadWind(headWind)
  dispatch(
    updatePerformanceField({
      field: "factoredHeadWind",
      value: factoredHeadWind,
    })
  )

  // D1 calculation
  const d1 = computeD1(factoredHeadWind)
  dispatch(updatePerformanceField({ field: "d1", value: d1 }))

  // MTOW Clear area VTOSS=40kt
  const mtow_ca_40 = computeMtow_ca_40(takeoffTemperature, takeoffZp)
  dispatch(updatePerformanceField({ field: "mtow_ca_40", value: mtow_ca_40 }))

  // MTOW Clear area VTOSS=50kt
  const mtow_ca_50 = computeMtow_ca_50(takeoffTemperature, takeoffZp)
  dispatch(updatePerformanceField({ field: "mtow_ca_50", value: mtow_ca_50 }))

  // MTOW Clear area VTOSS>=60kt
  const mtow_ca_60 = computeMtow_ca_60(takeoffTemperature, takeoffZp)
  dispatch(updatePerformanceField({ field: "mtow_ca_60", value: mtow_ca_60 }))

  // MLW Clear area
  const mlw_ca = computeMlw_ca(takeoffTemperature, takeoffZp)
  dispatch(updatePerformanceField({ field: "mlw_ca", value: mlw_ca }))

  // MTOW Helipad
  const mtow_helipad = computeMtow_helipad(takeoffTemperature, takeoffZp)
  dispatch(
    updatePerformanceField({ field: "mtow_helipad", value: mtow_helipad })
  )

  // MLW Helipad
  const mlw_helipad = computeMlw_helipad(takeoffTemperature, takeoffZp)
  dispatch(updatePerformanceField({ field: "mlw_helipad", value: mlw_helipad }))

  // Platform Factored headwind calculation
  const platformFactoredHeadwind = computeFactoredHeadWind(platformWindSpeed)
  dispatch(
    updatePerformanceField({
      field: "platformFactoredWind",
      value: platformFactoredHeadwind,
    })
  )

  // MTOW Elevated Heliport 1
  const mtow_elevated_heliport_1 = computeMtow_elevated_heliport_1(
    platformFactoredHeadwind,
    platformDropDown
  )
  dispatch(
    updatePerformanceField({
      field: "mtow_elevated_heliport_1",
      value: mtow_elevated_heliport_1,
    })
  )
}
