import { updateField as updateWeatherField } from "../features/weatherDataSlice.js"
import { updateField as updateFlightField } from "../features/flightDataSlice.js"
import { updatePerformanceField } from "../features/performancesSlice.js"
import {
  computeD1,
  computeFactoredHeadWind,
  computeHeadWind,
  computeLandingTtet_pc2dle,
  computeMlw_ca,
  computeMlw_elevated_heliport,
  computeMlw_helipad,
  computeMlw_pc2dle,
  computeMlw_pc2dle_weight,
  computeMtow_ca_40,
  computeMtow_ca_50,
  computeMtow_ca_60,
  computeMtow_elevated_heliport_1,
  computeMtow_elevated_heliport_2_1,
  computeMtow_elevated_heliport_2_2,
  computeMtow_elevated_heliport_2_3,
  computeMtow_helipad,
  computeMtow_pc2dle,
  computeTakeOffTtet_pc2dle,
  computeTakeOffTtet_pc2dle_corrected,
  computeVlss_pc2dle,
  landingTTetCorection,
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
    "platformQnh",
    "platformAltitude",
    "platformTemperature",
  ])
  const flightFields = new Set([
    "runwayHeading",
    "platformDropDown",
    "platformMaxTtet",
    "platformLandingWeight",
    "platformTakeoffWeight",
  ])

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
    platformTemperature,
    platformZp,
    platformISA,
  } = state.weatherData
  let {
    runwayHeading,
    platformDropDown,
    platformMaxTtet,
    platformLandingWeight,
    platformTakeoffWeight,
  } = state.flightData
  // Takeoff Headwind & Factored headwind calculation
  const headWind = computeHeadWind(windDirection, windSpeed, runwayHeading)
  dispatch(
    updatePerformanceField({
      path: "pc1.clearArea.takeoff.headWind",
      value: headWind,
    })
  )
  const factoredHeadWind = computeFactoredHeadWind(headWind)
  dispatch(
    updatePerformanceField({
      path: "pc1.clearArea.takeoff.factoredHeadWind",
      value: factoredHeadWind,
    })
  )

  // D1 calculation
  const d1 = computeD1(factoredHeadWind)
  dispatch(
    updatePerformanceField({ path: "pc1.clearArea.takeoff.d1", value: d1 })
  )

  // MTOW Clear area VTOSS=40kt
  const mtow_ca_40 = computeMtow_ca_40(takeoffTemperature, takeoffZp)
  dispatch(
    updatePerformanceField({
      path: "pc1.clearArea.takeoff.mtow_vtoss40",
      value: mtow_ca_40,
    })
  )
  // MTOW Clear area VTOSS=50kt
  const mtow_ca_50 = computeMtow_ca_50(takeoffTemperature, takeoffZp)
  dispatch(
    updatePerformanceField({
      path: "pc1.clearArea.takeoff.mtow_vtoss50",
      value: mtow_ca_50,
    })
  )

  // MTOW Clear area VTOSS>=60kt
  const mtow_ca_60 = computeMtow_ca_60(takeoffTemperature, takeoffZp)
  dispatch(
    updatePerformanceField({
      path: "pc1.clearArea.takeoff.mtow_vtoss60",
      value: mtow_ca_60,
    })
  )
  // MLW Clear area
  const mlw_ca = computeMlw_ca(takeoffTemperature, takeoffZp)
  dispatch(
    updatePerformanceField({ path: "pc1.clearArea.landing.mlw", value: mlw_ca })
  )

  // MTOW Helipad
  const mtow_helipad = computeMtow_helipad(takeoffTemperature, takeoffZp)
  dispatch(
    updatePerformanceField({
      path: "pc1.helipad.takeoff.mtow",
      value: mtow_helipad,
    })
  )

  // MLW Helipad
  const mlw_helipad = computeMlw_helipad(takeoffTemperature, takeoffZp)
  dispatch(
    updatePerformanceField({
      path: "pc1.helipad.landing.mlw",
      value: mlw_helipad,
    })
  )

  // Platform Factored headwind calculation
  const platformFactoredHeadwind = computeFactoredHeadWind(platformWindSpeed)
  dispatch(
    updatePerformanceField({
      path: "miscellaneous.platformFactoredWind",
      value: platformFactoredHeadwind,
    })
  )

  // MTOW Elevated Heliport
  // #1: Coefficient
  const mtow_elevated_heliport_1 = computeMtow_elevated_heliport_1(
    platformFactoredHeadwind,
    platformDropDown
  )
  dispatch(
    updatePerformanceField({
      path: "pc1.elevatedHeliport.takeoff.mtow_1_coeff",
      value: mtow_elevated_heliport_1,
    })
  )

  // #2: Minimal weight
  const mtow_elevated_heliport_2_1 = computeMtow_elevated_heliport_2_1(
    platformTemperature,
    platformZp
  )
  dispatch(
    updatePerformanceField({
      path: "pc1.elevatedHeliport.takeoff.mtow_2_1_weight",
      value: mtow_elevated_heliport_2_1,
    })
  )

  // #3: Weight A
  const mtow_elevated_heliport_2_2 = computeMtow_elevated_heliport_2_2(
    mtow_elevated_heliport_2_1,
    mtow_elevated_heliport_1
  )
  dispatch(
    updatePerformanceField({
      path: "pc1.elevatedHeliport.takeoff.mtow_2_2_weight",
      value: mtow_elevated_heliport_2_2,
    })
  )

  // #4: Weight B
  const mtow_elevated_heliport_2_3 = computeMtow_elevated_heliport_2_3(
    platformTemperature,
    platformZp
  )
  dispatch(
    updatePerformanceField({
      path: "pc1.elevatedHeliport.takeoff.mtow_2_3_weight",
      value: mtow_elevated_heliport_2_3,
    })
  )
  // Final MTOW Elevated Heliport is the minimum of Weight A and Weight B
  let mtow_elevated_heliport = "N/A"
  if (
    mtow_elevated_heliport_2_2 !== "N/A" &&
    mtow_elevated_heliport_2_3 !== "N/A"
  ) {
    mtow_elevated_heliport = Math.min(
      mtow_elevated_heliport_2_2,
      mtow_elevated_heliport_2_3
    )
  }
  dispatch(
    updatePerformanceField({
      path: "pc1.elevatedHeliport.takeoff.mtow",
      value: mtow_elevated_heliport,
    })
  )

  // MLW Elevated Heliport
  const mlw_elevated_heliport = computeMlw_elevated_heliport(
    platformTemperature,
    platformZp
  )
  dispatch(
    updatePerformanceField({
      path: "pc1.elevatedHeliport.landing.mlw",
      value: mlw_elevated_heliport,
    })
  )

  // MTOW PC2DLE
  const mtow_pc2dle = computeMtow_pc2dle(platformISA, platformZp)
  dispatch(
    updatePerformanceField({
      path: "pc2dle.takeoff.mtow",
      value: mtow_pc2dle,
    })
  )

  // TAKEOFF TTET PC2DLE
  const takeoff_ttet_pc2dle = computeTakeOffTtet_pc2dle(
    platformISA,
    platformDropDown,
    mtow_pc2dle,
    platformFactoredHeadwind,
    platformZp,
    platformISA
  )
  dispatch(
    updatePerformanceField({
      path: "pc2dle.takeoff.ttet",
      value: takeoff_ttet_pc2dle,
    })
  )

  // CORRECTED TAKEOFF TTET PC2DLE
  const takeoff_ttet_pc2dle_corrected = computeTakeOffTtet_pc2dle_corrected(
    takeoff_ttet_pc2dle,
    platformFactoredHeadwind,
    platformZp,
    platformISA
  )
  dispatch(
    updatePerformanceField({
      path: "pc2dle.takeoff.ttetCorrected",
      value: takeoff_ttet_pc2dle_corrected,
    })
  )

  // MLW PC2DLE
  const mlw_pc2dle = computeMlw_pc2dle(platformISA, platformZp)
  dispatch(
    updatePerformanceField({
      path: "pc2dle.landing.mlw",
      value: mlw_pc2dle,
    })
  )

  // LANDING TTET PC2DLE AT MLW
  const landing_ttet_pc2dle = computeLandingTtet_pc2dle(
    platformISA,
    platformDropDown,
    mtow_pc2dle,
    platformFactoredHeadwind,
    platformZp,
    platformISA
  )
  dispatch(
    updatePerformanceField({
      path: "pc2dle.landing.ttet",
      value: landing_ttet_pc2dle,
    })
  )

  // CORRECTED LANDING TTET PC2DLE AT MLW
  let landing_ttet_pc2dle_corrected = "N/A"

  if (landing_ttet_pc2dle !== "N/A")
    landing_ttet_pc2dle_corrected =
      landing_ttet_pc2dle +
      landingTTetCorection(platformFactoredHeadwind, platformZp, platformISA)

  dispatch(
    updatePerformanceField({
      path: "pc2dle.landing.ttetCorrected",
      value: landing_ttet_pc2dle_corrected,
    })
  )

  // LANDING VLSS PC2DLE AT MLW
  const landing_vlss_pc2dle = computeVlss_pc2dle(landing_ttet_pc2dle_corrected)

  dispatch(
    updatePerformanceField({
      path: "pc2dle.landing.vlss",
      value: landing_vlss_pc2dle,
    })
  )

  // MLW PC2DLE ACCORDING TO GIVEN TTET
  const landingTtetCorrection = landingTTetCorection(
    platformFactoredHeadwind,
    platformZp,
    platformISA
  )
  let landing_ttet_pc2dle_beforeCorrection =
    platformMaxTtet - landingTtetCorrection

  if (landing_ttet_pc2dle_beforeCorrection < 0) {
    dispatch(
      updateFlightField({
        field: "platformMaxTtet",
        value: landingTtetCorrection,
      })
    )
    platformMaxTtet = landingTtetCorrection
    landing_ttet_pc2dle_beforeCorrection = 0
  }

  dispatch(
    updatePerformanceField({
      path: "pc2dle.landing.givenTtetBeforeCorrection",
      value: landing_ttet_pc2dle_beforeCorrection,
    })
  )

  // MLW PC2DLE GIVEN TTET CORRECTED
  const mlw_pc2dle_givenTtet_weight = computeMlw_pc2dle_weight(
    platformDropDown,
    landing_ttet_pc2dle_beforeCorrection,
    platformFactoredHeadwind,
    platformZp,
    platformISA
  )
  dispatch(
    updatePerformanceField({
      path: "pc2dle.landing.mlw_givenTtet",
      value: mlw_pc2dle_givenTtet_weight,
    })
  )

  // LANDING VLSS PC2DLE ACCORDING TO GIVEN TTET
  const landing_vlss_pc2dle_givenTtet = computeVlss_pc2dle(platformMaxTtet)
  dispatch(
    updatePerformanceField({
      path: "pc2dle.landing.vlss_givenTtet",
      value: landing_vlss_pc2dle_givenTtet,
    })
  )

  // LANDING TTET PC2DLE AT GIVEN WEIGHT
  // Get MLW for TTET=0
  const ttet0Corrected = Math.max(0, -landingTtetCorrection)
  const mlw_pc2dle_ttet0 = computeMlw_pc2dle_weight(
    platformDropDown,
    ttet0Corrected,
    platformFactoredHeadwind,
    platformZp,
    platformISA
  )
  dispatch(
    updatePerformanceField({
      path: "pc2dle.landing.mlw_ttet0",
      value: mlw_pc2dle_ttet0,
    })
  )

  // Check if given weight > weight at TTET=0
  let landing_ttet_pc2dle_givenWeight_corrected,
    landing_ttet_pc2dle_givenWeight = 0
  if (platformLandingWeight > mlw_pc2dle_ttet0 || mlw_pc2dle_ttet0 === "N/A") {
    landing_ttet_pc2dle_givenWeight = computeLandingTtet_pc2dle(
      platformISA,
      platformDropDown,
      platformLandingWeight,
      platformFactoredHeadwind,
      platformZp,
      platformISA
    )

    // CORRECTED LANDING TTET PC2DLE AT GIVEN WEIGHT
    if (landing_ttet_pc2dle_givenWeight !== "N/A")
      landing_ttet_pc2dle_givenWeight_corrected =
        landing_ttet_pc2dle_givenWeight + landingTtetCorrection
    else landing_ttet_pc2dle_givenWeight_corrected = "N/A"
  }

  dispatch(
    updatePerformanceField({
      path: "pc2dle.landing.ttet_givenWeight",
      value: landing_ttet_pc2dle_givenWeight,
    })
  )

  dispatch(
    updatePerformanceField({
      path: "pc2dle.landing.ttet_givenWeightCorrected",
      value: landing_ttet_pc2dle_givenWeight_corrected,
    })
  )

  // LANDING VLSS PC2DLE ACCORDING TO GIVEN WEIGHT
  let landing_vlss_pc2dle_givenWeight = "N/A"

  if (landing_ttet_pc2dle_givenWeight_corrected !== "N/A")
    landing_vlss_pc2dle_givenWeight = computeVlss_pc2dle(
      landing_ttet_pc2dle_givenWeight_corrected
    )

  dispatch(
    updatePerformanceField({
      path: "pc2dle.landing.vlss_givenWeight",
      value: landing_vlss_pc2dle_givenWeight,
    })
  )
}
