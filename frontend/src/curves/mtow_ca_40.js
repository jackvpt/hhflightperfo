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
    text: "-40",
    x: 4200,
    y: 8400,
    angle: 30,
  },
  {
    text: "-30",
    x: 4200,
    y: 7500,
    angle: 35,
  },
  {
    text: "-20",
    x: 4200,
    y: 6400,
    angle: 40,
  },
  {
    text: "-10",
    x: 4200,
    y: 5450,
    angle: 40,
  },
  {
    text: "0",
    x: 4200,
    y: 4450,
    angle: 40,
  },
  {
    text: "10",
    x: 4200,
    y: 3350,
    angle: 40,
  },
  {
    text: "20",
    x: 4200,
    y: 2200,
    angle: 40,
  },
  {
    text: "30",
    x: 4100,
    y: 1350,
    angle: 40,
  },
  {
    text: "40",
    x: 4000,
    y: 500,
    angle: 42,
  },
  {
    text: "50",
    x: 3870,
    y: -630,
    angle: 46,
  },
]

// Border lines (left side of flight envelope and bottom)
const borderLines = [
  [
    { x: 3873, y: -1500 },
    { x: 4839, y: -1500 },
  ],
  [
    { x: 3600, y: 11406 },
    { x: 3636, y: 10824 },
    { x: 3639, y: 10334 },
    { x: 3636, y: 9292 },
    { x: 3644, y: 8296 },
    { x: 3644, y: 7897 },
    { x: 3631, y: 7315 },
    { x: 3608, y: 6362 },
    { x: 3573, y: 5456 },
    { x: 3516, y: 4540 },
    { x: 3418, y: 3679 },
    { x: 3376, y: 3389 },
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
    absoluteMinX: 3598,
    absoluteMaxX: 4839,
    absoluteMinY: -1500,
    absoluteMaxY: 11406,
    ranges: [
      {
        rangeX: [3500, 4600],
        rangeY: [5547, 20000],
        values: [
          { x: 3000, y: 15686 },
          { x: 3598, y: 11406 },
          { x: 4000, y: 8915 },
          { x: 4500, y: 6032 },
          { x: 4600, y: 5547 },
        ],
      },
      {
        rangeX: [4601, 4631],
        rangeY: [5026, 5546],
        values: [
          { x: 4600, y: 5547 },
          { x: 4610, y: 5371 },
          { x: 4622, y: 5167 },
          { x: 4631, y: 5026 },
        ],
      },
      {
        rangeX: [4632, 5000],
        rangeY: [-2000, 5025],
        values: [
          { x: 4631, y: 5026 },
          { x: 4700, y: 3263 },
          { x: 4771, y: 1000 },
          { x: 4800, y: 0 },
          { x: 4828, y: -1500 },
          { x: 4839, y: -2000 },
        ],
      },
    ],
  },
  "-30": {
    absoluteMinX: 3638,
    absoluteMaxX: 4826,
    absoluteMinY: -1500,
    absoluteMaxY: 10334,
    ranges: [
      {
        rangeX: [3000, 4607],
        rangeY: [4497, 20000],
        values: [
          { x: 3000, y: 14880 },
          { x: 3639, y: 10334 },
          { x: 4000, y: 8038 },
          { x: 4500, y: 5148 },
          { x: 4607, y: 4497 },
        ],
      },
      {
        rangeX: [4608, 5000],
        rangeY: [-2000, 4496],
        values: [
          { x: 4607, y: 4497 },
          { x: 4700, y: 2092 },
          { x: 4803, y: -1500 },
          { x: 4815, y: -2000 },
        ],
      },
    ],
  },
  "-20": {
    absoluteMinX: 3636,
    absoluteMaxX: 4826,
    absoluteMinY: -1500,
    absoluteMaxY: 9292,
    ranges: [
      {
        rangeX: [3000, 4577],
        rangeY: [3525, 20000],
        values: [
          { x: 3000, y: 13895 },
          { x: 3636, y: 9292 },
          { x: 4000, y: 6896 },
          { x: 4500, y: 3958 },
          { x: 4577, y: 3525 },
        ],
      },
      {
        rangeX: [4578, 4619],
        rangeY: [3049, 3524],
        values: [
          { x: 4577, y: 3525 },
          { x: 4589, y: 3397 },
          { x: 4607, y: 3189 },
          { x: 4619, y: 3048 },
        ],
      },
      {
        rangeX: [4620, 5000],
        rangeY: [-2000, 3048],
        values: [
          { x: 4619, y: 3048 },
          { x: 4699, y: 1006 },
          { x: 4734, y: 0 },
          { x: 4777, y: -1500 },
          { x: 4790, y: -2000 },
        ],
      },
    ],
  },
  "-15": {
    absoluteMinX: 3636,
    absoluteMaxX: 4762,
    absoluteMinY: -1500,
    absoluteMaxY: 8815,
    ranges: [
      {
        rangeX: [3000, 4582],
        rangeY: [2989, 20000],
        values: [
          { x: 3636, y: 8815 },
          { x: 4000, y: 6404 },
          { x: 4200, y: 5198 },
          { x: 4400, y: 4042 },
          { x: 4582, y: 2989 },
        ],
      },
      {
        rangeX: [4583, 4624],
        rangeY: [2474, 2988],
        values: [
          { x: 4582, y: 2989 },
          { x: 4594, y: 2854 },
          { x: 4613, y: 2616 },
          { x: 4624, y: 2474 },
        ],
      },
      {
        rangeX: [4625, 5000],
        rangeY: [-2000, 2473],
        values: [
          { x: 4624, y: 2474 },
          { x: 4643, y: 1986 },
          { x: 4682, y: 983 },
          { x: 4717, y: -22 },
          { x: 4762, y: -1500 },
        ],
      },
    ],
  },
  "-10": {
    absoluteMinX: 3646,
    absoluteMaxX: 4826,
    absoluteMinY: -1500,
    absoluteMaxY: 8296,
    ranges: [
      {
        rangeX: [3000, 4568],
        rangeY: [2498, 20000],
        values: [
          { x: 3000, y: 13018 },
          { x: 3644, y: 8296 },
          { x: 4000, y: 5993 },
          { x: 4500, y: 2893 },
          { x: 4568, y: 2498 },
        ],
      },
      {
        rangeX: [4569, 4618],
        rangeY: [2015, 2497],
        values: [
          { x: 4568, y: 2498 },
          { x: 4583, y: 2352 },
          { x: 4600, y: 2192 },
          { x: 4618, y: 2015 },
        ],
      },
      {
        rangeX: [4619, 5000],
        rangeY: [-2000, 2014],
        values: [
          { x: 4618, y: 2015 },
          { x: 4622, y: 3000 },
          { x: 4698, y: 0 },
          { x: 4730, y: -1000 },
          { x: 4748, y: -1500 },
          { x: 4760, y: -2000 },
        ],
      },
    ],
  },
  0: {
    absoluteMinX: 3631,
    absoluteMaxX: 4826,
    absoluteMinY: -1500,
    absoluteMaxY: 7315,
    ranges: [
      {
        rangeX: [3000, 4572],
        rangeY: [1447, 20000],
        values: [
          { x: 3000, y: 11886 },
          { x: 3631, y: 7315 },
          { x: 4000, y: 4945 },
          { x: 4500, y: 1884 },
          { x: 4572, y: 1447 },
        ],
      },
      {
        rangeX: [4573, 4621],
        rangeY: [994, 1446],
        values: [
          { x: 4572, y: 1447 },
          { x: 4589, y: 1294 },
          { x: 4604, y: 1145 },
          { x: 4621, y: 993 },
        ],
      },
      {
        rangeX: [4622, 5000],
        rangeY: [-2000, 993],
        values: [
          { x: 4621, y: 993 },
          { x: 4661, y: 0 },
          { x: 4696, y: -1000 },
          { x: 4714, y: -1500 },
          { x: 4729, y: -2000 },
        ],
      },
    ],
  },
  10: {
    absoluteMinX: 3608,
    absoluteMaxX: 4826,
    absoluteMinY: -1500,
    absoluteMaxY: 6362,
    ranges: [
      {
        rangeX: [3000, 4620],
        rangeY: [1, 20000],
        values: [
          { x: 3000, y: 10819 },
          { x: 3608, y: 6362 },
          { x: 4000, y: 3806 },
          { x: 4500, y: 765 },
          { x: 4620, y: 0 },
        ],
      },
      {
        rangeX: [4621, 5000],
        rangeY: [-2000, 0],
        values: [
          { x: 4620, y: 0 },
          { x: 4641, y: -500 },
          { x: 4659, y: -1000 },
          { x: 4678, y: -1500 },
          { x: 4696, y: -2000 },
        ],
      },
    ],
  },
  20: {
    absoluteMinX: 3575,
    absoluteMaxX: 4826,
    absoluteMinY: -1500,
    absoluteMaxY: 5456,
    ranges: [
      {
        rangeX: [3000, 4595],
        rangeY: [-1000, 20000],
        values: [
          { x: 3000, y: 9555 },
          { x: 3573, y: 5456 },
          { x: 4000, y: 2639 },
          { x: 4500, y: -395 },
          { x: 4595, y: -1000 },
        ],
      },
      {
        rangeX: [4596, 5000],
        rangeY: [-2000, -1001],
        values: [
          { x: 4595, y: -1000 },
          { x: 4618, y: -1250 },
          { x: 4642, y: -1500 },
          { x: 4654, y: -1750 },
          { x: 4664, y: -2000 },
        ],
      },
    ],
  },
  30: {
    absoluteMinX: 3517,
    absoluteMaxX: 4826,
    absoluteMinY: -1500,
    absoluteMaxY: 4540,
    ranges: [
      {
        rangeX: [3000, 5000],
        rangeY: [-2000, 20000],
        values: [
          { x: 3000, y: 8185 },
          { x: 3516, y: 4540 },
          { x: 4000, y: 1308 },
          { x: 4200, y: 34 },
          { x: 4443, y: -1500 },
          { x: 4512, y: -2000 },
        ],
      },
    ],
  },
  40: {
    absoluteMinX: 3419,
    absoluteMaxX: 4826,
    absoluteMinY: -1500,
    absoluteMaxY: 3679,
    ranges: [
      {
        rangeX: [3000, 5000],
        rangeY: [-2000, 20000],
        values: [
          { x: 3000, y: 6705 },
          { x: 3418, y: 3679 },
          { x: 3500, y: 3079 },
          { x: 3800, y: 1027 },
          { x: 4000, y: -327 },
          { x: 4169, y: -1500 },
          { x: 4241, y: -2000 },
        ],
      },
    ],
  },
  50: {
    absoluteMinX: 3376,
    absoluteMaxX: 4826,
    absoluteMinY: -1500,
    absoluteMaxY: 3389,
    ranges: [
      {
        rangeX: [3000, 3668],
        rangeY: [1, 20000],
        values: [
          { x: 3000, y: 7379 },
          { x: 3200, y: 5396 },
          { x: 3376, y: 3389 },
          { x: 3497, y: 2000 },
          { x: 3668, y: 0 },
        ],
      },
      {
        rangeX: [3669, 5000],
        rangeY: [-2000, 0],
        values: [
          { x: 3668, y: 0 },
          { x: 3737, y: -500 },
          { x: 3805, y: -1000 },
          { x: 3873, y: -1502 },
          { x: 3942, y: -2000 },
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
export const mtow_ca_40_predictWeight = (temperature, zp) => {
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
      ...curves()["-40"],
      { x: 3600, y: 11406 },
      { x: 3636, y: 10824 },
      { x: 3639, y: 10334 },
      { x: 3636, y: 9292 },
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
export const mtow_ca_40_data = {
  name: "mtow_ca_40",
  title: "MAXIMUM TAKEOFF WEIGHT CLEAR AREA VTOSS 40 KT",
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
  scatterPlot: scatterPlot(data),
  curves: curves(),
  labels: labels,
  borderLines: borderLines,
  areas: areas,
}
