import { PolynomialRegression } from "ml-regression-polynomial"

// Utility function for linear extrapolation
export const extrapolation = (
  entry,
  entryLow,
  valueLow,
  entryHigh,
  valueHigh
) => {
  if (entryHigh === entryLow)
    return valueLow // avoid division by zero
  return (
    valueLow +
    ((valueHigh - valueLow) * (entry - entryLow)) / (entryHigh - entryLow)
  )
}

/**
 * @param {Number} weight
 * @returns {PolynomialRegression} regressions table
 * @description Create polynomial regressions
 * These regressions can be used to predict y given a x.
 * The degree of the polynomial can be adjusted as needed.
 */
export const getRegressions = (data, entry) => {
  const regressions = {}
  for (const curve in data) {
    const pointsInRange = data[curve].ranges.flatMap((subrange) =>
      entry >= subrange.rangeX[0] && entry <= subrange.rangeX[1]
        ? subrange.values
        : []
    )
    const xs = pointsInRange.map((point) => point.x)
    const ys = pointsInRange.map((point) => point.y)

    // Create the polynomial regression (degree 5 here)
    regressions[curve] = new PolynomialRegression(xs, ys, 3)
  }

  return regressions
}

/**
 * @param {Number} weight
 * @returns {PolynomialRegression} regressions table
 * @description Create polynomial regressions
 * These regressions can be used to predict x given y
 * The degree of the polynomial can be adjusted as needed.
 */
export const getRegressionsReverse = (data, entry) => {
  const regressionsReverse = {}

  for (const curve in data) {
    const pointsInRange = data[curve].ranges.flatMap((subrange) =>
      entry >= subrange.rangeY[0] && entry <= subrange.rangeY[1]
        ? subrange.values
        : []
    )
    const xs = pointsInRange.map((point) => point.x)
    const ys = pointsInRange.map((point) => point.y)

    // Create the polynomial regression (degree 5 here)
    regressionsReverse[curve] = new PolynomialRegression(ys, xs, 3)
  }
  return regressionsReverse
}

// Utility function to convert degrees to radians
export const degToRad = (deg) => (deg * Math.PI) / 180
