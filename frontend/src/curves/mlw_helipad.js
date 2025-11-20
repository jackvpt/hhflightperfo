import {
  checkValueInLimits,
  checkValueInSubrange,
  extrapolation,
  getLowHighValues,
  getRegressionsReverse,
  scatterPlot,
  setValueInsideLimits,
} from "../utils/calculations"
import { limitErrorObject } from "../utils/string"

// Labels for temperatures
const labels = [
  {
    text: "-40",
    x: 4450,
    y: 7550,
    angle: 35,
  },
  {
    text: "-30",
    x: 4425,
    y: 6550,
    angle: 38,
  },
  {
    text: "-20",
    x: 4400,
    y: 5600,
    angle: 40,
  },
  {
    text: "-10",
    x: 4375,
    y: 4800,
    angle: 40,
  },
  {
    text: "0",
    x: 4350,
    y: 3850,
    angle: 40,
  },
  {
    text: "10",
    x: 4325,
    y: 3000,
    angle: 42,
  },
  {
    text: "20",
    x: 4300,
    y: 2250,
    angle: 42,
  },
  {
    text: "30",
    x: 4275,
    y: 1500,
    angle: 45,
  },
  {
    text: "40",
    x: 4250,
    y: 800,
    angle: 45,
  },
  {
    text: "50",
    x: 4225,
    y: 100,
    angle: 45,
  },
]

// Border lines (left side of flight envelope and bottom)
const borderLines = [
  [
    { x: 3737, y: 11416 },
    { x: 3737, y: 3361 },
  ],
  [
    { x: 4375, y: -1500 },
    { x: 4700, y: -1500 },
    { x: 4700, y: 5452 },
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
    absoluteMinX: 3737,
    absoluteMaxX: 4700,
    absoluteMinY: -1500,
    absoluteMaxY: 11416,
    ranges: [
      {
        rangeX: [3000, 5000],
        rangeY: [-2000, 20000],
        values: [
          { x: 3000, y: 16888 },
          { x: 3737, y: 11416 },
          { x: 4100, y: 9046 },
          { x: 4400, y: 7200 },
          { x: 4700, y: 5452 },
          { x: 5000, y: 3781 },
        ],
      },
    ],
  },
  "-30": {
    absoluteMinX: 3737,
    absoluteMaxX: 4700,
    absoluteMinY: -1500,
    absoluteMaxY: 10326,
    ranges: [
      {
        rangeX: [3000, 5000],
        rangeY: [-2000, 20000],
        values: [
          { x: 3000, y: 15865 },
          { x: 3737, y: 10326 },
          { x: 4100, y: 7942 },
          { x: 4400, y: 6072 },
          { x: 4700, y: 4304 },
          { x: 5000, y: 2645 },
        ],
      },
    ],
  },
  "-20": {
    absoluteMinX: 3737,
    absoluteMaxX: 4700,
    absoluteMinY: -1500,
    absoluteMaxY: 9297,
    ranges: [
      {
        rangeX: [3000, 5000],
        rangeY: [-2000, 20000],
        values: [
          { x: 3000, y: 14871 },
          { x: 3737, y: 9297 },
          { x: 4100, y: 6867 },
          { x: 4400, y: 5000 },
          { x: 4700, y: 3224 },
          { x: 5000, y: 1548 },
        ],
      },
    ],
  },
  "-15": {
    absoluteMinX: 3737,
    absoluteMaxX: 4700,
    absoluteMinY: -1500,
    absoluteMaxY: 8770,
    ranges: [
      {
        rangeX: [3000, 5000],
        rangeY: [-2000, 20000],
        values: [
          { x: 3000, y: 14360 },
          { x: 3737, y: 8770 },
          { x: 4100, y: 6352 },
          { x: 4400, y: 4486 },
          { x: 4700, y: 2709 },
          { x: 5000, y: 1023 },
        ],
      },
    ],
  },
  "-10": {
    absoluteMinX: 3737,
    absoluteMaxX: 4700,
    absoluteMinY: -1500,
    absoluteMaxY: 8275,
    ranges: [
      {
        rangeX: [3000, 5000],
        rangeY: [-2000, 20000],
        values: [
          { x: 3000, y: 13902 },
          { x: 3737, y: 8275 },
          { x: 4100, y: 5845 },
          { x: 4400, y: 3953 },
          { x: 4700, y: 2194 },
          { x: 5000, y: 488 },
        ],
      },
    ],
  },
  0: {
    absoluteMinX: 3737,
    absoluteMaxX: 4700,
    absoluteMinY: -1500,
    absoluteMaxY: 7277,
    ranges: [
      {
        rangeX: [3000, 5000],
        rangeY: [-2000, 20000],
        values: [
          { x: 3000, y: 12972 },
          { x: 3737, y: 7277 },
          { x: 4100, y: 4846 },
          { x: 4400, y: 2948 },
          { x: 4700, y: 1167 },
          { x: 5000, y: -556 },
        ],
      },
    ],
  },
  10: {
    absoluteMinX: 3737,
    absoluteMaxX: 4700,
    absoluteMinY: -1500,
    absoluteMaxY: 6333,
    ranges: [
      {
        rangeX: [3000, 5000],
        rangeY: [-2000, 20000],
        values: [
          { x: 3000, y: 12056 },
          { x: 3737, y: 6333 },
          { x: 4100, y: 3874 },
          { x: 4400, y: 1986 },
          { x: 4700, y: 174 },
          { x: 5000, y: -1557 },
        ],
      },
    ],
  },
  20: {
    absoluteMinX: 3737,
    absoluteMaxX: 4700,
    absoluteMinY: -1500,
    absoluteMaxY: 5409,
    ranges: [
      {
        rangeX: [3000, 5000],
        rangeY: [-2000, 20000],
        values: [
          { x: 3000, y: 11183 },
          { x: 3737, y: 5409 },
          { x: 4100, y: 2944 },
          { x: 4400, y: 1028 },
          { x: 4700, y: -797 },
          { x: 4910, y: -2000 },
        ],
      },
    ],
  },
  30: {
    absoluteMinX: 3737,
    absoluteMaxX: 4700,
    absoluteMinY: -1500,
    absoluteMaxY: 4500,
    ranges: [
      {
        rangeX: [3000, 5000],
        rangeY: [-2000, 20000],
        values: [
          { x: 3000, y: 10343 },
          { x: 3737, y: 4500 },
          { x: 4100, y: 2057 },
          { x: 4400, y: 105 },
          { x: 4661, y: -1500 },
          { x: 4748, y: -2000 },
        ],
      },
    ],
  },
  40: {
    absoluteMinX: 3737,
    absoluteMaxX: 4700,
    absoluteMinY: -1500,
    absoluteMaxY: 3633,
    ranges: [
      {
        rangeX: [3000, 5000],
        rangeY: [-2000, 20000],
        values: [
          { x: 3239, y: 7479 },
          { x: 3737, y: 3633 },
          { x: 4000, y: 1843 },
          { x: 4300, y: -159 },
          { x: 4515, y: -1500 },
          { x: 4595, y: -2000 },
        ],
      },
    ],
  },
  50: {
    absoluteMinX: 3737,
    absoluteMaxX: 4700,
    absoluteMinY: -1500,
    absoluteMaxY: 3361,
    ranges: [
      {
        rangeX: [3000, 4144],
        rangeY: [0, 20000],
        values: [
          { x: 3000, y: 10346 },
          { x: 3737, y: 3361 },
          { x: 4000, y: 1153 },
          { x: 4144, y: 0 },
        ],
      },
      {
        rangeX: [4145, 5000],
        rangeY: [-2000, -1],
        values: [
          { x: 4144, y: 0 },
          { x: 4200, y: -392 },
          { x: 4300, y: -1029 },
          { x: 4375, y: -1500 },
          { x: 4453, y: -2000 },
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
export const mlw_helipad_predictWeight = (temperature, zp) => {
  // Check flight enveloppe with temperature
  if (!checkValueInSubrange(data, temperature)) {
    return {
      value: null,
      error: "Outside defined temperature range",
      text: "N/A",
    }
  }

  // Get low and high temperature surrounding values
  const { lowValue: tempLow, highValue: tempHigh } = getLowHighValues(
    temperature,
    10,
    50
  )

  // Check flight enveloppe with Zp
  const valueInLimits = checkValueInLimits(data, tempLow, tempHigh, zp, "yAxis")
  if (!valueInLimits.inLimits)
    return limitErrorObject(valueInLimits, "pressure altitude")

  // Get regressions for low and high temperature
  const regressions = getRegressionsReverse(data, zp)
  const weightLow = regressions[tempLow].predict(zp)
  const weightHigh = regressions[tempHigh].predict(zp)

  // Extrapolate weight for given temperature
  const weight = extrapolation(
    temperature,
    tempLow,
    weightLow,
    tempHigh,
    weightHigh
  )

  // Check flight enveloppe with Weight
  const weightInLimits = setValueInsideLimits(
    data,
    tempLow,
    tempHigh,
    weight,
    "xAxis"
  )
  return { value: Math.round(weightInLimits), error: null, text: null }
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
      { x: 3737, y: 8770 },
      ...curves()["-15"].reverse(),
    ],
  },
]

export const mlw_helipad_data = {
  name: "mlw_helipad",
  title: "MAXIMUM LANDING WEIGHT GROUND HELIPAD",
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
  yLabel: "Hp (ft)",
  scatterPlot: scatterPlot(data),
  curves: curves(),
  labels: labels,
  borderLines: borderLines,
  areas: areas,
}
