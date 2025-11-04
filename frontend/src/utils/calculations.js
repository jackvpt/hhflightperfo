import { PolynomialRegression } from "ml-regression-polynomial"

// Utility function for linear extrapolation
export const extrapolation = (
  entry,
  entryLow,
  valueLow,
  entryHigh,
  valueHigh
) => {
  if (entryHigh === entryLow) return valueLow // avoid division by zero
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
export const getRegressions = (data, entry,degree=3) => {
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
    regressions[curve] = new PolynomialRegression(xs, ys, degree)
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
export const getRegressionsReverse = (data, entry,degree=3) => {
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
    regressionsReverse[curve] = new PolynomialRegression(ys, xs, degree)
  }
  return regressionsReverse
}

/**
 * Gets the low and high values surrounding a given value based on a step.
 * @param {Number} value
 * @param {Number} step
 * @param {Number} max
 * @returns {lowValue:Number,highValue:Number}
 */
export const getLowHighValues = (value, step, max) => {
  const lowValue = Math.floor(value / step) * step
  let highValue = lowValue + step
  if (highValue > max) highValue = max
  return { lowValue, highValue }
}

/**
 * Checks if a value is within the defined subrange of a dataset.
 * @param {[{x,y}]} data
 * @param {Number} value
 * @returns {Boolean}
 */
export const checkValueInSubrange = (data, value) => {
  const subrange = Object.keys(data).map(Number)
  const minSubrange = Math.min(...subrange)
  const maxSubrange = Math.max(...subrange)
  if (value < minSubrange || value > maxSubrange) {
    return false
  }
  return true
}

/**
 * Checks if a value is within the defined limits of a dataset.
 * @param {[{x,y}]} data
 * @param {Number} low
 * @param {Number} high
 * @param {Number} value
 * @returns {Boolean}
 */
export const checkValueInLimits = (data, low, high, value, axis) => {
  // Determine which properties to use based on the axis
  const minKey = axis === "yAxis" ? "absoluteMinY" : "absoluteMinX"
  const maxKey = axis === "yAxis" ? "absoluteMaxY" : "absoluteMaxX"

  // Calculate lower and upper limits
  const min = Math.min(data[high][minKey], data[low][minKey])
  const max = Math.max(data[high][maxKey], data[low][maxKey])

  // Check if the value is within limits
  return value >= min && value <= max
}

/**
 * Sets a value inside the defined limits of a dataset.
 * @param {[{x,y}]} data
 * @param {Number} low
 * @param {Number} high
 * @param {Number} value
 * @returns {value:Number,error:String,text:String}
 */
export const setValueInsideLimits = (data, low, high, value, axis) => {
  // Determine which properties to use based on the axis
  const minKey = axis === "yAxis" ? "absoluteMinY" : "absoluteMinX"
  const maxKey = axis === "yAxis" ? "absoluteMaxY" : "absoluteMaxX"

  // Check lower limit
  const min = Math.min(data[high][minKey], data[low][minKey])
  if (value < min) return min

  // Check upper limit
  const max = Math.max(data[high][maxKey], data[low][maxKey])
  if (value > max) return max

  // Value is within limits
  return value
}

/**
 * Generates scatter plot data points from the defined ranges for all temperatures.
 *
 * @function scatterPlot
 * @returns {Array<{x: number, y: number}>} An array of scatter plot points,
 * where each point contains:
 * - `x`: weight value
 * - `y`: Zp value
 */
export const scatterPlot =(data)=>{
    const points = []

  for (const temperature in data) {
    const ranges = data[temperature].ranges

    for (const range of ranges) {
      const rangePoints = range.values.map((point) => ({
        x: point.x,
        y: point.y,
      }))

      points.push(...rangePoints)
    }
  }

  return points
}

// Utility function to convert degrees to radians
export const degToRad = (deg) => (deg * Math.PI) / 180
