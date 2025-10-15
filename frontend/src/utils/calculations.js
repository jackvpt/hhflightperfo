export const calculateHeadWind = (windDirection, windSpeed, runwayHeading) => {
  const windAngle = Number(windDirection) - Number(runwayHeading)
  const headWind = Number(windSpeed) * Math.cos((windAngle * Math.PI) / 180)
  return Math.round(headWind)
}

export const extrapolation = (x, x0, y0, x1, y1) => {
  if (x1 === x0) throw new Error("x0 and x1 cannot be the same value")
  return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0)
}