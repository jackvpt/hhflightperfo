import { d1_predictD1 } from "../curves/d1"
import { mtow_ca_40_predictWeight } from "../curves/mtow_ca_40"
import { mtow_ca_50_predictWeight } from "../curves/mtow_ca_50"
import { degToRad } from "./calculations"

export const computeHeadWind = (windDirection, windSpeed, runwayHeading) => {
  const windAngle = Number(windDirection) - Number(runwayHeading)
  const headWind = Number(windSpeed) * Math.cos(degToRad(windAngle))
  return Math.round(headWind)
}

export const computeFactoredHeadWind = (headWind) => {
  if (headWind <= 0) return Math.round(headWind * 1.5)
  return Math.round(headWind * 0.5)
}

export const computeD1 = (headWind) => {
  let d1Details = []
  for (let vtoss = 40; vtoss <= 80; vtoss += 10) {
    const distance = d1_predictD1(headWind, vtoss)
    d1Details.push({
      vtoss,
      distance,
    })
  }

  return d1Details
}

export const computeMtow_ca_40 = (temperature, zp) => {
  return mtow_ca_40_predictWeight(temperature, zp)
}
export const computeMtow_ca_50 = (temperature, zp) => {
  return mtow_ca_50_predictWeight(temperature, zp)
}
