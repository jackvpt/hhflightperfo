export const computeHeadWind = (windDirection, windSpeed, runwayHeading) => {
  const windAngle = Number(windDirection) - Number(runwayHeading)
  const headWind = Number(windSpeed) * Math.cos((windAngle * Math.PI) / 180)
  return Math.round(headWind)
}

