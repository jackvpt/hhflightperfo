import {
  checkValueInLimits,
  checkValueInSubrange,
  extrapolation,
  getLowHighValues,
  getRegressions,
  getRegressionsReverse,
  scatterPlot,
  setValueInsideLimits,
} from "../utils/calculations"

// Labels for temperatures
const labels = [
  // {
  //   text: "-40",
  //   x: 4050,
  //   y: 7300,
  //   angle: 35,
  // },
  // {
  //   text: "-30",
  //   x: 3970,
  //   y: 7150,
  //   angle: 35,
  // },
  // {
  //   text: "-20",
  //   x: 3890,
  //   y: 7050,
  //   angle: 38,
  // },
  // {
  //   text: "-10",
  //   x: 3850,
  //   y: 6400,
  //   angle: 40,
  // },
  // {
  //   text: "0",
  //   x: 3800,
  //   y: 5600,
  //   angle: 40,
  // },
  // {
  //   text: "10",
  //   x: 3800,
  //   y: 4800,
  //   angle: 42,
  // },
  // {
  //   text: "20",
  //   x: 3800,
  //   y: 3750,
  //   angle: 42,
  // },
  // {
  //   text: "30",
  //   x: 3800,
  //   y: 2700,
  //   angle: 45,
  // },
  // {
  //   text: "40",
  //   x: 3800,
  //   y: 1550,
  //   angle: 45,
  // },
  // {
  //   text: "50",
  //   x: 3800,
  //   y: -100,
  //   angle: 45,
  // },
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
  0: {
    absoluteMinX: 0,
    absoluteMaxX: 200,
    absoluteMinY: 1.38,
    absoluteMaxY: 8.49,
    ranges: [
      {
        rangeX: [0, 200],
        rangeY: [0, 10],
        values: [
          { x: 0, y: 8.49 },
          { x: 10, y: 7.97 },
          { x: 20, y: 7.36 },
          { x: 30, y: 6.71 },
          { x: 40, y: 6.03 },
          { x: 50, y: 5.44 },
          { x: 100, y: 3.43 },
          { x: 150, y: 2.25 },
          { x: 200, y: 1.38 },
        ],
      },
    ],
  },
  10: {
    absoluteMinX: 0,
    absoluteMaxX: 200,
    absoluteMinY: 0.55,
    absoluteMaxY: 7.16,
    ranges: [
      {
        rangeX: [0, 200],
        rangeY: [0, 10],
        values: [
          { x: 0, y: 7.16 },
          { x: 10, y: 6.49 },
          { x: 20, y: 5.69 },
          { x: 30, y: 4.95 },
          { x: 40, y: 4.32 },
          { x: 50, y: 3.81 },
          { x: 100, y: 2.24 },
          { x: 150, y: 1.27 },
          { x: 200, y: 0.55 },
        ],
      },
    ],
  },
  20: {
    absoluteMinX: 0,
    absoluteMaxX: 172,
    absoluteMinY: 0,
    absoluteMaxY: 5.15,
    ranges: [
      {
        rangeX: [0, 200],
        rangeY: [0, 10],
        values: [
          { x: 0, y: 5.15 },
          { x: 10, y: 4.1 },
          { x: 20, y: 3.28 },
          { x: 30, y: 2.75 },
          { x: 40, y: 2.33 },
          { x: 50, y: 2.02 },
          { x: 60, y: 1.75 },
          { x: 70, y: 1.52 },
          { x: 80, y: 1.32 },
          { x: 90, y: 1.13 },
          { x: 100, y: 0.95 },
          { x: 110, y: 0.8 },
          { x: 120, y: 0.64 },
          { x: 130, y: 0.51 },
          { x: 140, y: 0.39 },
          { x: 150, y: 0.26 },
          { x: 160, y: 0.15 },
          { x: 172, y: 0 },
        ],
      },
    ],
  },
  30: {
    absoluteMinX: 0,
    absoluteMaxX: 130,
    absoluteMinY: 0,
    absoluteMaxY: 1.78,
    ranges: [
      {
        rangeX: [0, 200],
        rangeY: [0, 10],
        values: [
          { x: 0, y: 1.78 },
          { x: 50, y: 0.82 },
          { x: 100, y: 0.22 },
          { x: 130, y: 0 },
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
export const mtow_elevated_heliport_predictWeight = (temperature, zp) => {
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
  if (!checkValueInLimits(data, tempLow, tempHigh, zp, "yAxis")) {
    return {
      value: null,
      error: "Outside defined pressure altitude range",
      text: "N/A",
    }
  }

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

  for (const wind in data) {
    const curve = []
    for (
      let dropDown = data[wind].absoluteMinX;
      dropDown <= data[wind].absoluteMaxX;
      dropDown += 2
    ) {
      const regressions = getRegressions(data, dropDown)
      const coef = regressions[wind].predict(dropDown)
      const absoluteMinY = data[wind].absoluteMinY
      const absoluteMaxY = data[wind].absoluteMaxY
      if (coef >= absoluteMinY && coef <= absoluteMaxY)
        curve.push({ x: dropDown, y: coef })
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
const areas = [
  // {
  //   color: "rgba(100,100,100,0.6)",
  //   points: [
  //     ...curves()["-40"],
  //     { x: 3418, y: 10321 },
  //     { x: 3488, y: 9314 },
  //     { x: 3485, y: 8765 },
  //     ...curves()["-15"].reverse(),
  //     { x: 4293, y: -2000 },
  //   ],
  // },
]

export const mtow_elevated_heliport_data = {
  name: "mtow_elevated_heliport",
  title: "MAXIMUM TAKEOFF WEIGHT ELEVATED HELIPORT",
  xmin: 0, // X axis minimum value
  xmax: 200, // X axis reference 0
  x0: 0, // X axis maximum value
  ymin: 0, // Y axis minimum value
  ymax: 10, // Y axis maximum value
  y0: 0, // Y axis reference 0
  gridSpacingX: 10, // X axis grid spacing (value)
  gridSpacingY: 1, // Y axis grid spacing (value)
  gridSpacingThickX: 50, // X axis thick grid spacing (value)
  gridSpacingThickY: 2, // Y axis thick grid spacing (value)
  labelSpacingX: 50, // X axis label spacing (value)
  labelSpacingY: 2, // Y axis label spacing (value)
  reverseX: true, // Reverse X axis
  xLabel: "DROP DOWN (ft)",
  yLabel: "",
  scatterPlot: scatterPlot(data),
  curves: curves(),
  labels: labels,
  borderLines: borderLines,
  areas: areas,
}
