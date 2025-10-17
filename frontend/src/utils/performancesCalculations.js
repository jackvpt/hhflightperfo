import { d1_predictDistance } from "../curves/d1"
import { degToRad, extrapolation } from "./calculations"

export const computeHeadWind = (windDirection, windSpeed, runwayHeading) => {
  const windAngle = Number(windDirection) - Number(runwayHeading)
  const headWind = Number(windSpeed) * Math.cos(degToRad(windAngle))
  return Math.round(headWind)
}

export const computeD1 = (headWind) => {
  let d1Details = []
  for (let vtoss = 40; vtoss <= 80; vtoss += 10) {
    const headWindLow = Math.round(headWind / 10) * 10
    const headWindHigh = headWindLow + 10
    const resultLow = d1_predictDistance(headWindLow, vtoss)
    const resultHigh = d1_predictDistance(headWindHigh, vtoss)

    const distance = Math.round(
      extrapolation(headWind, headWindLow, resultLow, headWindHigh, resultHigh)
    )

    d1Details.push({
      vtoss,
      headWindLow,
      headWindHigh,
      resultLow,
      resultHigh,
      distance,
    })
  }

  return d1Details
}
