import { d1_predictD1 } from "../curves/d1"
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

export const computeD1=(headWind)=>{
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