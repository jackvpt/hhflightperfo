import { PolynomialRegression } from "ml-regression-polynomial"
import { getRegressions } from "../utils/calculations"

// Labels for wind
export const labels = [
  {
    text: "0 kt",
    x: 54,
    y: 520,
    angle: -40,
  },
  {
    text: "10 kts",
    x: 57,
    y: 370,
    angle: -35,
  },
  {
    text: "20 kts",
    x: 59,
    y: 255,
    angle: -30,
  },
  {
    text: "30 kts",
    x: 62,
    y: 185,
    angle: -25,
  },
  {
    text: "40 kts",
    x: 63,
    y: 110,
    angle: -25,
  },
  {
    text: "50 kts",
    x: 64,
    y: 62,
    angle: -8,
  },
  {
    text: "FACTORED HEAD WIND",
    x: 66,
    y: 710,
    angle: -45,
  },
]

// Border lines (left side of flight envelope and bottom)
const borderLines = []

/**
 * Data structure
 * The data is organized by wind, each containing ranges with VTOSS (x) and D1 distance (y) points.
 * Polynomial regressions are created for each wind to predict y from x and vice versa.
 * The goal is to model the relationship between VTOSS and D1 for different winds.
 */
const data = {
  0: {
    absoluteMinY: 0,
    absoluteMaxY: 1000,
    absoluteMinX: 40,
    absoluteMaxX: 80,
    ranges: [
      {
        rangeX: [40, 80],
        rangeY: [0, 1000],
        values: [
          { x: 40, y: 319 },
          { x: 50, y: 434 },
          { x: 60, y: 573 },
          { x: 70, y: 736 },
          { x: 80, y: 923 },
        ],
      },
    ],
  },
  10: {
    absoluteMinY: 0,
    absoluteMaxY: 1000,
    absoluteMinX: 40,
    absoluteMaxX: 80,
    ranges: [
      {
        rangeX: [40, 80],
        rangeY: [0, 1000],
        values: [
          { x: 40, y: 174 },
          { x: 50, y: 264 },
          { x: 60, y: 378 },
          { x: 70, y: 516 },
          { x: 80, y: 680 },
        ],
      },
    ],
  },
  20: {
    absoluteMinY: 0,
    absoluteMaxY: 1000,
    absoluteMinX: 40,
    absoluteMaxX: 80,
    ranges: [
      {
        rangeX: [40, 80],
        rangeY: [0, 1000],
        values: [
          { x: 40, y: 78 },
          { x: 50, y: 143 },
          { x: 60, y: 234 },
          { x: 70, y: 348 },
          { x: 80, y: 487 },
        ],
      },
    ],
  },
  30: {
    absoluteMinY: 0,
    absoluteMaxY: 1000,
    absoluteMinX: 40,
    absoluteMaxX: 80,
    ranges: [
      {
        rangeX: [40, 80],
        rangeY: [0, 1000],
        values: [
          { x: 40, y: 37 },
          { x: 50, y: 80 },
          { x: 60, y: 143 },
          { x: 70, y: 234 },
          { x: 80, y: 348 },
        ],
      },
    ],
  },
  40: {
    absoluteMinY: 0,
    absoluteMaxY: 1000,
    absoluteMinX: 40,
    absoluteMaxX: 80,
    ranges: [
      {
        rangeX: [40, 80],
        rangeY: [0, 1000],
        values: [
          { x: 40, y: 21 },
          { x: 50, y: 32 },
          { x: 60, y: 68 },
          { x: 70, y: 136 },
          { x: 80, y: 225 },
        ],
      },
    ],
  },
  50: {
    absoluteMinY: 0,
    absoluteMaxY: 1000,
    absoluteMinX: 40,
    absoluteMaxX: 80,
    ranges: [
      {
        rangeX: [40, 80],
        rangeY: [0, 1000],
        values: [
          { x: 40, y: 21 },
          { x: 44, y: 21 },
          { x: 50, y: 24 },
          { x: 60, y: 32 },
          { x: 70, y: 58 },
          { x: 73, y: 69 },
          { x: 76, y: 89 },
          { x: 80, y: 116 },
        ],
      },
    ],
  },
}

export const d1_predictDistance = (wind, vtoss) => {
  const regressions = getRegressions(data, vtoss)
  if (regressions[wind]) {
    return regressions[wind].predict(vtoss)
  } else {
    throw new Error(`No regression for wind=${wind}`)
  }
}

export const d1_predictRoundVtoss = (vtoss) => {
  return Math.round(vtoss / 10) * 10
}

/**
 * Generates scatter plot data points from the defined ranges for all winds.
 *
 * @function scatterPlot
 * @returns {Array<{x: number, y: number}>} An array of scatter plot points,
 * where each point contains:
 * - `x`: VTOSS
 * - `y`: D1
 */
export const scatterPlot = () => {
  let points = []

  for (const wind in data) {
    const ranges = data[wind].ranges

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

/**
 * Generates curve data points for each wind based on regression calculations.
 *
 * @function curves
 * @returns {Object<string, Array<{x: number, y: number}>>} An object where:
 * - Each key is a wind (as a string),
 * - Each value is an array of points representing a curve,
 *   with:
 *   - `x`: VTOSS value (input),
 *   - `y`: D1 value (predicted).
 *
 * @description
 * For each wind:
 * - Iterates through D1 values from `absoluteMinX` to `absoluteMaxX` with a step of 1.
 * - Uses regression to compute the corresponding D1.
 * - Only includes points where the D1 is within the defined absolute Y range.
 */
const curves = () => {
  const curves = {}

  for (const wind in data) {
    const curve = []
    for (
      let vtoss = data[wind].absoluteMinX;
      vtoss <= data[wind].absoluteMaxX;
      vtoss += 1
    ) {
      const regressions = getRegressions(data, vtoss)
      const d1 = regressions[wind].predict(vtoss)
      const absoluteMinY = data[wind].absoluteMinY
      const absoluteMaxY = data[wind].absoluteMaxY
      if (vtoss >= absoluteMinY && d1 <= absoluteMaxY)
        curve.push({ x: vtoss, y: d1 })
    }
    curves[wind] = curve
  }
  console.log("curves :>> ", curves)
  return curves
}

/**
 * Defines polygonal areas to be displayed on a chart.
 *
 * @constant
 * @type {Array<{color: string, points: Array<{x: number, y: number}>>>}
 *
 * @property {string} color - The fill color of the area, including alpha transparency (RGBA format).
 * @property {Array<{x: number, y: number}>} points - The ordered list of points (vertices) defining the polygon.
 * These points are composed of:
 * - Curve points from the `curves()` function (for specific temperatures),
 * - Additional fixed points to close the shape.
 */
const areas = []

export const d1_data = {
  name: "d1",
  title: "D1 - REJECTED TAKEOFF DISTANCE",
  xmin: 40, // X axis minimum value
  xmax: 80, // X axis maximum value
  x0: 40, // X axis reference 0
  ymin: 0, // Y axis minimum value
  ymax: 1000, // Y axis maximum value
  y0: 0, // Y axis reference 0
  gridSpacingX: 2, // X axis grid spacing (value)
  gridSpacingY: 25, // Y axis grid spacing (value)
  gridSpacingThickX: 10, // X axis thick grid spacing (value)
  gridSpacingThickY: 100, // Y axis thick grid spacing (value)
  labelSpacingX: 10, // X axis label spacing (value)
  labelSpacingY: 100, // Y axis label spacing (value)
  xLabel: "VTOSS (kts)",
  yLabel: "Distance (m)",
  scatterPlot: scatterPlot(),
  curves: curves(),
  labels: labels,
  borderLines: borderLines,
  areas: areas,
}
