import {
  checkValueInLimits,
  checkValueInSubrange,
  extrapolation,
  getLowHighValues,
  getRegressionsReverse,
  scatterPlot,
  setValueInsideLimits,
} from "../utils/calculations"

// Labels for temperatures
const labels = [
  {
    text: "OAT (°C)",
    x: 4300,
    y: 7700,
    angle: 42,
  },
  {
    text: "-25",
    x: 4600,
    y: 5800,
    angle: 40,
  },
  {
    text: "-20",
    x: 4580,
    y: 5400,
    angle: 40,
  },
  {
    text: "-15",
    x: 4560,
    y: 4950,
    angle: 40,
  },
  {
    text: "-10",
    x: 4540,
    y: 4500,
    angle: 40,
  },
  {
    text: "0",
    x: 4520,
    y: 3700,
    angle: 40,
  },
  {
    text: "10",
    x: 4500,
    y: 2700,
    angle: 45,
  },
  {
    text: "20",
    x: 4480,
    y: 1650,
    angle: 45,
  },
  {
    text: "30",
    x: 4460,
    y: 400,
    angle: 48,
  },
  {
    text: "40",
    x: 4440,
    y: -1200,
    angle: 48,
  },

]

// Border lines (left side of flight envelope and bottom)
const borderLines = [
  [
    { x: 4110, y: 8079 },
    { x: 4106, y: 7514 },
    { x: 4112, y: 7006 },
    { x: 4116, y: 6446 },
    { x: 4108, y: 5507 },
    { x: 4088, y: 4525 },
    { x: 4052, y: 3600 },
    { x: 3985, y: 2702 },
    { x: 3875, y: 1809 },
  ],
  [
    { x: 4750, y: 4448 },
    { x: 4750, y: -2000 },
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
  "-25": {
    absoluteMinX: 4110,
    absoluteMaxX: 4750,
    absoluteMinY: 4448,
    absoluteMaxY: 15561,
    ranges: [
      {
        rangeX: [3000, 5000],
        rangeY: [-2000, 20000],
        values: [
          { x: 3000, y: 15561 },
          { x: 3400, y: 12632 },
          { x: 3700, y: 10643 },
          { x: 4110, y: 8079 },
          { x: 4300, y: 6913 },
          { x: 4500, y: 5790 },
          { x: 4750, y: 4448 },
        ],
      },
    ],
  },
  "-20": {
    absoluteMinX: 4106,
    absoluteMaxX: 4750,
    absoluteMinY: 3853,
    absoluteMaxY: 15068,
    ranges: [
      {
        rangeX: [3000, 5000],
        rangeY: [-2000, 20000],
        values: [
          { x: 3000, y: 15068 },
          { x: 3400, y: 12125 },
          { x: 3700, y: 10112 },
          { x: 4106, y: 7514 },
          { x: 4300, y: 6335 },
          { x: 4500, y: 5231 },
          { x: 4750, y: 3853 },
        ],
      },
    ],
  },
  "-15": {
    absoluteMinX: 4112,
    absoluteMaxX: 4750,
    absoluteMinY: 3322,
    absoluteMaxY: 14606,
    ranges: [
      {
        rangeX: [3000, 5000],
        rangeY: [-2000, 20000],
        values: [
          { x: 3000, y: 14606 },
          { x: 3400, y: 11709 },
          { x: 3700, y: 9680 },
          { x: 4112, y: 7006 },
          { x: 4300, y: 5864 },
          { x: 4500, y: 4712 },
          { x: 4750, y: 3322 },
        ],
      },
    ],
  },
  "-10": {
    absoluteMinX: 4116,
    absoluteMaxX: 4750,
    absoluteMinY: 2771,
    absoluteMaxY: 14155,
    ranges: [
      {
        rangeX: [3000, 5000],
        rangeY: [-2000, 20000],
        values: [
          { x: 3000, y: 14155 },
          { x: 3400, y: 11278 },
          { x: 3700, y: 9200 },
          { x: 4116, y: 6446 },
          { x: 4300, y: 5343 },
          { x: 4500, y: 4187 },
          { x: 4750, y: 2771 },
        ],
      },
    ],
  },
  0: {
    absoluteMinX: 4108,
    absoluteMaxX: 4750,
    absoluteMinY: 1766,
    absoluteMaxY: 13071,
    ranges: [
      {
        rangeX: [3000, 5000],
        rangeY: [-2000, 20000],
        values: [
          { x: 3000, y: 13071 },
          { x: 3400, y: 10178 },
          { x: 3700, y: 8115 },
          { x: 4108, y: 5507 },
          { x: 4300, y: 4349 },
          { x: 4500, y: 3182 },
          { x: 4750, y: 1766 },
        ],
      },
    ],
  },
  10: {
    absoluteMinX: 4088,
    absoluteMaxX: 4750,
    absoluteMinY: 649,
    absoluteMaxY: 11978,
    ranges: [
      {
        rangeX: [3000, 5000],
        rangeY: [-2000, 20000],
        values: [
          { x: 3000, y: 11978 },
          { x: 3400, y: 9092 },
          { x: 3700, y: 7013 },
          { x: 4088, y: 4525 },
          { x: 4300, y: 3235 },
          { x: 4500, y: 2046 },
          { x: 4750, y: 649 },
        ],
      },
    ],
  },
  20: {
    absoluteMinX: 4052,
    absoluteMaxX: 4750,
    absoluteMinY: -528,
    absoluteMaxY: 10725,
    ranges: [
      {
        rangeX: [3000, 5000],
        rangeY: [-2000, 20000],
        values: [
          { x: 3000, y: 10725 },
          { x: 3400, y: 7858 },
          { x: 3700, y: 5874 },
          { x: 4052, y: 3600 },
          { x: 4300, y: 2056 },
          { x: 4500, y: 891 },
          { x: 4750, y: -528 },
        ],
      },
    ],
  },
  30: {
    absoluteMinX: 3985,
    absoluteMaxX: 4739,
    absoluteMinY: -2000,
    absoluteMaxY: 9322,
    ranges: [
      {
        rangeX: [3000, 5000],
        rangeY: [-2000, 20000],
        values: [
          { x: 3000, y: 9322 },
          { x: 3400, y: 6557 },
          { x: 3700, y: 4550 },
          { x: 3985, y: 2702 },
          { x: 4300, y: 691 },
          { x: 4500, y: -519 },
          { x: 4739, y: -2000 },
        ],
      },
    ],
  },
  40: {
    absoluteMinX: 3875,
    absoluteMaxX: 4458,
    absoluteMinY: -2000,
    absoluteMaxY: 7135,
    ranges: [
      {
        rangeX: [3000, 5000],
        rangeY: [-2000, 20000],
        values: [
          { x: 3100, y: 7135 },
          { x: 3400, y: 5054 },
          { x: 3700, y: 2990 },
          { x: 3875, y: 1809 },
          { x: 4200, y: -280 },
          { x: 4458, y: -2000 },
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
export const mlw_elevated_heliport_predictWeight = (temperature, zp) => {
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
      ...curves()["-25"],
      { x: 4106, y: 7514 },
      { x: 4112, y: 7006 },
      ...curves()["-15"].reverse(),
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
export const mlw_elevated_heliport_data = {
  name: "mlw_elevated_heliport",
  title: "MAXIMUM LANDING WEIGHT ELEVATED HELIPORT",
  xmin: 3000, // X axis minimum value
  xmax: 5300, // X axis reference 0
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
