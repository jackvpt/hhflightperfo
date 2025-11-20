import {
  checkValueInLimits,
  checkValueInSubrange,
  extrapolation,
  getLowHighValues,
  getRegressions,
  scatterPlot,
  setValueInsideLimits,
} from "../utils/calculations"
import { limitErrorObject } from "../utils/string"

// Labels for temperatures
const labels = [
  {
    text: "ISA +10",
    x: 880,
    y: 4970,
    angle: 7,
  },
  {
    text: "ISA +20",
    x: 730,
    y: 4690,
    angle: 5,
  },
  {
    text: "ISA +30",
    x: 580,
    y: 4380,
    angle: 4,
  },
]

// Border lines (left side of flight envelope and bottom)
const borderLines = []

/**
 * Data structure
 * The data is organized by temperature, each containing ranges with weight (x) and pressure altitude (y) points.
 * Polynomial regressions are created for each temperature to predict y from x and vice versa.
 * The goal is to model the relationship between weight and altitude for different temperatures.
 * The data is used to create a flight envelope for the aircraft.
 */
const data = {
  10: {
    absoluteMinX: -1000,
    absoluteMaxX: 1000,
    absoluteMinY: 4871,
    absoluteMaxY: 4920,
    ranges: [
      {
        rangeX: [-1000, 600],
        rangeY: [3000, 5000],
        values: [
          { x: -1000, y: 4920 },
          { x: -500, y: 4920 },
          { x: 0, y: 4920 },
          { x: 600, y: 4920 },
        ],
      },
      {
        rangeX: [601, 1000],
        rangeY: [3000, 5000],
        values: [
          { x: 600, y: 4920 },
          { x: 700, y: 4906 },
          { x: 800, y: 4897 },
          { x: 900, y: 4884 },
          { x: 1000, y: 4871 },
        ],
      },
    ],
  },
  20: {
    absoluteMinX: -1000,
    absoluteMaxX: 1000,
    absoluteMinY: 4572,
    absoluteMaxY: 4810,
    ranges: [
      {
        rangeX: [-1000, 1000],
        rangeY: [3000, 5000],
        values: [
          { x: -1000, y: 4810 },
          { x: -500, y: 4749 },
          { x: 0, y: 4691 },
          { x: 500, y: 4630 },
          { x: 1000, y: 4572 },
        ],
      },
    ],
  },
  30: {
    absoluteMinX: -1000,
    absoluteMaxX: 1000,
    absoluteMinY: 4245,
    absoluteMaxY: 4454,
    ranges: [
      {
        rangeX: [-1000, 1000],
        rangeY: [3000, 5000],
        values: [
          { x: -1000, y: 4454 },
          { x: -500, y: 4398 },
          { x: 0, y: 4346 },
          { x: 500, y: 4296 },
          { x: 1000, y: 4245 },
        ],
      },
    ],
  },
}

/**
 *
 * @param {Number} ISA
 * @param {Number} zp
 * @returns {Number} predicted weight
 * @description Predict weight given ISA and Zp using the polynomial regressions.
 */
export const mtow_pc2dle_isa20_1_predictWeight = (platformISA, zp) => {
  // Check flight enveloppe with ISA
  if (!checkValueInSubrange(data, platformISA)) {
    return {
      value: null,
      error: "Outside defined ISA range",
      text: "N/A",
    }
  }

  // Get low and high ISA surrounding values
  let { lowValue: isaLow, highValue: isaHigh } = getLowHighValues(
    platformISA,
    10,
    10
  )

  // Check flight enveloppe with Zp
  const valueInLimits = checkValueInLimits(data, isaLow, isaHigh, zp, "xAxis")
  if (!valueInLimits.inLimits)
    return limitErrorObject(valueInLimits, "pressure altitude")

  // Get regressions for low and high ISA
  const regressions = getRegressions(data, zp)
  const weightLow = regressions[isaLow].predict(zp)
  const weightHigh = regressions[isaHigh].predict(zp)

  // Extrapolate weight for given ISA
  let weight = extrapolation(
    platformISA,
    isaLow,
    weightLow,
    isaHigh,
    weightHigh
  )

  // Check flight enveloppe with Weight
  const weightInLimits = setValueInsideLimits(
    data,
    isaLow,
    isaHigh,
    weight,
    "yAxis"
  )
  return { value: Math.round(weightInLimits), error: null, text: null }
}

/**
 * Generates curve data points for each isa based on regression calculations.
 *
 * @function curves
 * @returns {Object<string, Array<{x: number, y: number}>>} An object where:
 * - Each key is a ISA,
 * - Each value is an array of points representing a curve,
 *   with:
 *   - `x`: zp value (input),
 *   - `y`: weight value (predicted).
 *
 * @description
 * For each ISA:
 * - Iterates through Zp values from `absoluteMinX` to `absoluteMaxX` with a step of 10.
 * - Uses  regression to compute the corresponding weight.
 * - Only includes points where the weight is within the defined absolute Y range.
 */
const curves = () => {
  const curves = {}

  for (const isa in data) {
    const curve = []
    for (
      let zp = data[isa].absoluteMinX;
      zp <= data[isa].absoluteMaxX;
      zp += 10
    ) {
      const regressions = getRegressions(data, zp)
      const weight = regressions[isa].predict(zp)
      const absoluteMinY = data[isa].absoluteMinY
      const absoluteMaxY = data[isa].absoluteMaxY
      if (weight >= absoluteMinY && weight <= absoluteMaxY)
        curve.push({ x: zp, y: weight })
    }
    curves[isa] = curve
  }
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

/**
 * Chart configuration and data for the MTOW PC2DLE ISA graph.
 *
 * @constant
 * @type {Object}
 *
 * @property {string} name - Unique identifier of the dataset.
 * @property {string} title - Full title of the chart.
 *
 * @property {number} xmin - Minimum value of the X axis.
 * @property {number} xmax - Reference (zero) value of the X axis.
 * @property {number} x0 - Maximum value of the X axis.
 *
 * @property {number} ymin - Minimum value of the Y axis.
 * @property {number} ymax - Maximum value of the Y axis.
 * @property {number} y0 - Reference (zero) value of the Y axis.
 *
 * @property {number} gridSpacingX - Grid spacing for minor gridlines along the X axis.
 * @property {number} gridSpacingY - Grid spacing for minor gridlines along the Y axis.
 * @property {number} gridSpacingThickX - Grid spacing for major (thick) gridlines along the X axis.
 * @property {number} gridSpacingThickY - Grid spacing for major (thick) gridlines along the Y axis.
 *
 * @property {number} labelSpacingX - Spacing of labels along the X axis.
 * @property {number} labelSpacingY - Spacing of labels along the Y axis.
 *
 * @property {string} xLabel - Label displayed on the X axis.
 * @property {string} yLabel - Label displayed on the Y axis.
 *
 * @property {Array<{x: number, y: number}>} scatterPlot - Data points used for the scatter plot.
 * @property {Object<string, Array<{x: number, y: number}>>} curves - Curve data for each temperature.
 * @property {Array<Object>} labels - Label definitions to display on the chart.
 * @property {Array<Object>} borderLines - Border line definitions for chart boundaries or references.
 * @property {Array<{color: string, points: Array<{x: number, y: number}>>} areas - Polygonal areas to shade or highlight on the chart.
 *
 * @description
 * This object centralizes all configuration and data required to render
 * the **MTOW PC2DLE ISA** performance chart, including axis settings,
 * grid spacing, labels, scatter plot points, regression curves, borders, and shaded areas.
 */
export const mtow_pc2dle_isa20_1_data = {
  name: "mtow_pc2dle_isa+20_1",
  title: "MAXIMUM TAKEOFF WEIGHT PC2DLE ISA+20",
  xmin: -1000, // X axis minimum value
  xmax: 1000, // X axis reference 0
  x0: -1000, // X axis maximum value
  ymin: 3000, // Y axis minimum value
  ymax: 5000, // Y axis maximum value
  y0: 3000, // Y axis reference 0
  gridSpacingX: 100, // X axis grid spacing (value)
  gridSpacingY: 100, // Y axis grid spacing (value)
  gridSpacingThickX: 500, // X axis thick grid spacing (value)
  gridSpacingThickY: 500, // Y axis thick grid spacing (value)
  labelSpacingX: 500, // X axis label spacing (value)
  labelSpacingY: 500, // Y axis label spacing (value)
  xLabel: "Hp (ft)",
  yLabel: "WEIGHT (kg)",
  scatterPlot: scatterPlot(data),
  curves: curves(),
  labels: labels,
  borderLines: borderLines,
  areas: areas,
}
