import { extrapolation, getRegressionsReverse } from "../utils/calculations"

// Labels for temperatures
const labels = [
  {
    text: "-40",
    x: 4450,
    y: 9160,
    angle: 35,
  },
  {
    text: "-30",
    x: 4440,
    y: 8400,
    angle: 37,
  },
  {
    text: "-20",
    x: 4430,
    y: 7400,
    angle: 37,
  },
  {
    text: "-10",
    x: 4420,
    y: 6400,
    angle: 37,
  },
  {
    text: "0",
    x: 4410,
    y: 5400,
    angle: 40,
  },
  {
    text: "10",
    x: 4400,
    y: 4400,
    angle: 40,
  },
  {
    text: "20",
    x: 4350,
    y: 3500,
    angle: 40,
  },
  {
    text: "30",
    x: 4300,
    y: 2500,
    angle: 40,
  },
  {
    text: "40",
    x: 4250,
    y: 1300,
    angle: 45,
  },
  {
    text: "50",
    x: 4200,
    y: -350,
    angle: 46,
  },
]

// Border lines (left side of flight envelope and bottom)
const borderLines = [
  [
    { x: 4257, y: -1500 },
    { x: 4920, y: -1500 },
    { x: 4920, y: 5192 },
    { x: 4850, y: 5517 },
    { x: 4850, y: 6380 },
  ],
  [
    { x: 3946, y: 11402 },
    { x: 3988, y: 10322 },
    { x: 3985, y: 9276 },
    { x: 3985, y: 8809 },
    { x: 3996, y: 8275 },
    { x: 3981, y: 7290 },
    { x: 3955, y: 6348 },
    { x: 3919, y: 5423 },
    { x: 3857, y: 4530 },
    { x: 3753, y: 3654 },
    { x: 3708, y: 3362 },
  ],
]

/**
 * Data structure
 * The data is organized by temperature, each containing ranges with weight (x) and pressure altitude (y) points.
 * Polynomial regressions are created for each temperature to predict y from x and vice versa.
 * The goal is to model the relationship between weight and altitude for different temperatures.
 * The data is used to create a flight envelope for the aircraft.
 */
const data = {
  "-40": {
    absoluteMinX: 3946,
    absoluteMaxX: 4850,
    absoluteMinY: -1500,
    absoluteMaxY: 20000,
    ranges: [
      {
        rangeX: [3946, 4850],
        rangeY: [-2000, 20000],
        values: [
          { x: 3000, y: 17782 },
          { x: 3500, y: 14242 },
          { x: 3946, y: 11402 },
          { x: 4500, y: 8231 },
          { x: 4850, y: 6380 },
          { x: 5000, y: 5660 },
        ],
      },
    ],
  },
  "-30": {
    absoluteMinX: 3988,
    absoluteMaxX: 4920,
    absoluteMinY: -1500,
    absoluteMaxY: 20000,
    ranges: [
      {
        rangeX: [3988, 4920],
        rangeY: [-2000, 20000],
        values: [
          { x: 3000, y: 17000 },
          { x: 3500, y: 13433 },
          { x: 3988, y: 10322 },
          { x: 4500, y: 7360 },
          { x: 4850, y: 5517 },
          { x: 4920, y: 5192 },
          { x: 5000, y: 4749 },
        ],
      },
    ],
  },
  "-20": {
    absoluteMinX: 3985,
    absoluteMaxX: 4920,
    absoluteMinY: -1500,
    absoluteMaxY: 20000,
    ranges: [
      {
        rangeX: [3985, 4920],
        rangeY: [-2000, 20000],
        values: [
          { x: 3000, y: 16018 },
          { x: 3500, y: 12432 },
          { x: 3985, y: 9276 },
          { x: 4500, y: 6238 },
          { x: 4850, y: 4359 },
          { x: 4920, y: 4012 },
          { x: 5000, y: 3568 },
        ],
      },
    ],
  },
  "-15": {
    absoluteMinX: 3985,
    absoluteMaxX: 4850,
    absoluteMinY: -1500,
    absoluteMaxY: 20000,
    ranges: [
      {
        rangeX: [3985, 4850],
        rangeY: [-2000, 20000],
        values: [
          { x: 3985, y: 8809 },
          { x: 4300, y: 6906 },
          { x: 4600, y: 5220 },
          { x: 4850, y: 3883 },
        ],
      },
    ],
  },
  "-10": {
    absoluteMinX: 3996,
    absoluteMaxX: 4920,
    absoluteMinY: -1500,
    absoluteMaxY: 8275,
    ranges: [
      {
        rangeX: [3996, 4920],
        rangeY: [-2000, 20000],
        values: [
          { x: 3000, y: 15076 },
          { x: 3500, y: 11547 },
          { x: 3996, y: 8275 },
          { x: 4500, y: 5242 },
          { x: 4850, y: 3310 },
          { x: 4920, y: 2935 },
          { x: 5000, y: 2519 },
        ],
      },
    ],
  },
  0: {
    absoluteMinX: 3981,
    absoluteMaxX: 4920,
    absoluteMinY: -1500,
    absoluteMaxY: 20000,
    ranges: [
      {
        rangeX: [3000, 5000],
        rangeY: [-2000, 20000],
        values: [
          { x: 3000, y: 14009 },
          { x: 3500, y: 10435 },
          { x: 3981, y: 7290 },
          { x: 4500, y: 4240 },
          { x: 4850, y: 2301 },
          { x: 4920, y: 1937 },
          { x: 5000, y: 1523 },
        ],
      },
    ],
  },
  10: {
    absoluteMinX: 3955,
    absoluteMaxX: 4920,
    absoluteMinY: -1500,
    absoluteMaxY: 20000,
    ranges: [
      {
        rangeX: [3955, 4920],
        rangeY: [-2000, 20000],
        values: [
          { x: 3000, y: 12926 },
          { x: 3500, y: 9360 },
          { x: 3955, y: 6348 },
          { x: 4500, y: 3120 },
          { x: 4850, y: 1194 },
          { x: 4920, y: 800 },
          { x: 5000, y: 390 },
        ],
      },
    ],
  },
  20: {
    absoluteMinX: 3919,
    absoluteMaxX: 4920,
    absoluteMinY: -1500,
    absoluteMaxY: 20000,
    ranges: [
      {
        rangeX: [3919, 4920],
        rangeY: [-2000, 20000],
        values: [
          { x: 3000, y: 11643 },
          { x: 3500, y: 8145 },
          { x: 3919, y: 5423 },
          { x: 4500, y: 1970 },
          { x: 4850, y: 46 },
          { x: 4920, y: -348 },
          { x: 5000, y: -789 },
        ],
      },
    ],
  },
  30: {
    absoluteMinX: 3857,
    absoluteMaxX: 4920,
    absoluteMinY: -1500,
    absoluteMaxY: 20000,
    ranges: [
      {
        rangeX: [3857, 4920],
        rangeY: [-2000, 20000],
        values: [
          { x: 3000, y: 10200 },
          { x: 3500, y: 6836 },
          { x: 3857, y: 4530 },
          { x: 4500, y: 615 },
          { x: 4850, y: -1424 },
          { x: 4951, y: -2000 },
        ],
      },
    ],
  },
  40: {
    absoluteMinX: 3753,
    absoluteMaxX: 4920,
    absoluteMinY: -1500,
    absoluteMaxY: 20000,
    ranges: [
      {
        rangeX: [3753, 4655],
        rangeY: [-2000, 20000],
        values: [
          { x: 3197, y: 7332 },
          { x: 3500, y: 5354 },
          { x: 3753, y: 3654 },
          { x: 4100, y: 1474 },
          { x: 4500, y: -1023 },
          { x: 4574, y: -1500 },
          { x: 4655, y: -2000 },
        ],
      },
    ],
  },
  50: {
    absoluteMinX: 3708,
    absoluteMaxX: 4920,
    absoluteMinY: -1500,
    absoluteMaxY: 20000,
    ranges: [
      {
        rangeX: [3708, 4022],
        rangeY: [24, 20000],
        values: [
          { x: 3000, y: 10212 },
          { x: 3500, y: 5483 },
          { x: 3708, y: 3362 },
          { x: 3800, y: 2437 },
          { x: 3900, y: 1373 },
          { x: 4022, y: 24 },
        ],
      },
      {
        rangeX: [4023, 4331],
        rangeY: [-2000, 23],
        values: [
          { x: 4022, y: 24 },
          { x: 4100, y: -461 },
          { x: 4200, y: -1116 },
          { x: 4331, y: -2000 },
        ],
      },
    ],
  },
}

/**
 *
 * @param {Number} temperature
 * @param {Number} zp
 * @returns {Number} predicted weight
 * @description Predict weight given temperature and Zp using the reverse polynomial regressions.
 */
export const mtow_ca_50_predictWeight = (temperature, zp) => {
  const tempLow = Math.floor(temperature / 10) * 10
  let tempHigh = tempLow + 10
  if (tempHigh > 50) {
    tempHigh = 50
  }

  const regressions = getRegressionsReverse(data, zp)
  const weightLow = regressions[tempLow].predict(zp)
  const weightHigh = regressions[tempHigh].predict(zp)

  const weight = extrapolation(
    temperature,
    tempLow,
    weightLow,
    tempHigh,
    weightHigh
  )
  return Math.round(weight)
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
const scatterPlot = () => {
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

/**
 * Generates curve data points for each temperature based on reverse regression calculations.
 *
 * @function curves
 * @returns {Object<string, Array<{x: number, y: number}>>} An object where:
 * - Each key is a temperature (as a string),
 * - Each value is an array of points representing a curve,
 *   with:
 *   - `x`: weight value (predicted),
 *   - `y`: Zp value (input).
 *
 * @description
 * For each temperature:
 * - Iterates through Zp values from `absoluteMinY` to `absoluteMaxY` with a step of 10.
 * - Uses reverse regression to compute the corresponding weight.
 * - Only includes points where the weight is within the defined absolute X range.
 */
const curves = () => {
  const curves = {}

  for (const temperature in data) {
    const curve = []
    for (
      let zp = data[temperature].absoluteMinY;
      zp <= data[temperature].absoluteMaxY;
      zp += 50
    ) {
      const regressions = getRegressionsReverse(data, zp)
      const weight = regressions[temperature].predict(zp)
      const absoluteMinX = data[temperature].absoluteMinX
      const absoluteMaxX = data[temperature].absoluteMaxX
      if (weight >= absoluteMinX && weight <= absoluteMaxX)
        curve.push({ x: weight, y: zp })
    }
    curves[temperature] = curve
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
const areas = [
  {
    color: "rgba(100,100,100,0.6)",
    points: [
      ...curves()["-40"],
      { x: 3946, y: 11402 },
      { x: 3988, y: 10322 },
      { x: 3985, y: 9276 },
      { x: 3985, y: 8809 },
      ...curves()["-15"].reverse(),
      { x: 4850, y: -1500 },
      { x: 4920, y: -1500 },
      { x: 4920, y: -1500 },
      { x: 4920, y: 5192 },
      { x: 4850, y: 5517 },
      { x: 4850, y: 6380 },
    ],
  },
]

/**
 * Chart configuration and data for the MTOW Clear Area VTOSS 40 KTS graph.
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
 * the **MTOW Clear Area VTOSS 40 KTS** performance chart, including axis settings,
 * grid spacing, labels, scatter plot points, regression curves, borders, and shaded areas.
 */
export const mtow_ca_50_data = {
  name: "mtow_ca_50",
  title: "MAXIMUM TAKEOFF WEIGHT CLEAR AREA VTOSS 50 KTS",
  xmin: 3000, // X axis minimum value
  xmax: 5000, // X axis reference 0
  x0: 0, // X axis maximum value
  ymin: -2000, // Y axis minimum value
  ymax: 20000, // Y axis maximum value
  y0: 0, // Y axis reference 0
  gridSpacingX: 100, // X axis grid spacing (value)
  gridSpacingY: 1000, // Y axis grid spacing (value)
  gridSpacingThickX: 500, // X axis thick grid spacing (value)
  gridSpacingThickY: 5000, // Y axis thick grid spacing (value)
  labelSpacingX: 500, // X axis label spacing (value)
  labelSpacingY: 5000, // Y axis label spacing (value)
  xLabel: "WEIGHT (kg)",
  yLabel: "Hp (ft x 1000)",
  scatterPlot: scatterPlot(),
  curves: curves(),
  labels: labels,
  borderLines: borderLines,
  areas: areas,
}
