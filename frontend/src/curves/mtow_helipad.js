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
    x: 4050,
    y: 7300,
    angle: 35,
  },
  {
    text: "-30",
    x: 3970,
    y: 7150,
    angle: 35,
  },
  {
    text: "-20",
    x: 3890,
    y: 7050,
    angle: 38,
  },
  {
    text: "-10",
    x: 3850,
    y: 6400,
    angle: 40,
  },
  {
    text: "0",
    x: 3800,
    y: 5600,
    angle: 40,
  },
  {
    text: "10",
    x: 3800,
    y: 4800,
    angle: 42,
  },
  {
    text: "20",
    x: 3800,
    y: 3750,
    angle: 42,
  },
  {
    text: "30",
    x: 3800,
    y: 2700,
    angle: 45,
  },
  {
    text: "40",
    x: 3800,
    y: 1550,
    angle: 45,
  },
  {
    text: "50",
    x: 3800,
    y: -100,
    angle: 45,
  },
]

// Border lines (left side of flight envelope and bottom)
const borderLines = [
  [
    { x: 3889, y: -1500 },
    { x: 4292, y: -1500 },
  ],
  [
    { x: 3327, y: 11421 },
    { x: 3418, y: 10321 },
    { x: 3488, y: 9314 },
    { x: 3485, y: 8765 },
    { x: 3478, y: 8287 },
    { x: 3467, y: 7289 },
    { x: 3483, y: 6360 },
    { x: 3468, y: 5433 },
    { x: 3454, y: 4538 },
    { x: 3414, y: 3657 },
    { x: 3397, y: 3375 },
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
    absoluteMinX: 3327,
    absoluteMaxX: 4293,
    absoluteMinY: -1500,
    absoluteMaxY: 13883,
    ranges: [
      {
        rangeX: [3000, 4159],
        rangeY: [5988, 20000],
        values: [
          { x: 3000, y: 13883 },
          { x: 3327, y: 11421 },
          { x: 3600, y: 9539 },
          { x: 3800, y: 8194 },
          { x: 4000, y: 6898 },
          { x: 4159, y: 5988 },
        ],
      },
      {
        rangeX: [4160, 4232],
        rangeY: [5487, 5987],
        values: [
          { x: 4159, y: 5988 },
          { x: 4183, y: 5841 },
          { x: 4208, y: 5644 },
          { x: 4232, y: 5487 },
        ],
      },
      {
        rangeX: [4233, 4293],
        rangeY: [-2000, 5486],
        values: [
          { x: 4232, y: 5487 },
          { x: 4257, y: 3985 },
          { x: 4282, y: 2025 },
          { x: 4291, y: 0 },
          { x: 4292, y: -1500 },
          { x: 4293, y: -2000 },
        ],
      },
    ],
  },
  "-30": {
    absoluteMinX: 3418,
    absoluteMaxX: 4292,
    absoluteMinY: -1500,
    absoluteMaxY: 13445,
    ranges: [
      {
        rangeX: [3000, 4164],
        rangeY: [5417, 20000],
        values: [
          { x: 3000, y: 13445 },
          { x: 3418, y: 10321 },
          { x: 3600, y: 9046 },
          { x: 3800, y: 7675 },
          { x: 4000, y: 6391 },
          { x: 4164, y: 5417 },
        ],
      },
      {
        rangeX: [4165, 4220],
        rangeY: [4981, 5416],
        values: [
          { x: 4164, y: 5417 },
          { x: 4183, y: 5287 },
          { x: 4203, y: 4114 },
          { x: 4220, y: 4981 },
        ],
      },
      {
        rangeX: [4221, 4292],
        rangeY: [-2000, 4980],
        values: [
          { x: 4220, y: 4981 },
          { x: 4239, y: 3970 },
          { x: 4269, y: 2000 },
          { x: 4288, y: 0 },
          { x: 4290, y: -1500 },
          { x: 4292, y: -2000 },
        ],
      },
    ],
  },
  "-20": {
    absoluteMinX: 3488,
    absoluteMaxX: 4288,
    absoluteMinY: -1500,
    absoluteMaxY: 9314,
    ranges: [
      {
        rangeX: [3000, 4136],
        rangeY: [4981, 20000],
        values: [
          { x: 3000, y: 12970 },
          { x: 3300, y: 10674 },
          { x: 3488, y: 9314 },
          { x: 3700, y: 7806 },
          { x: 3900, y: 6463 },
          { x: 4136, y: 4981 },
        ],
      },
      {
        rangeX: [4137, 4206],
        rangeY: [4489, 4980],
        values: [
          { x: 4136, y: 4981 },
          { x: 4161, y: 4814 },
          { x: 4190, y: 4611 },
          { x: 4206, y: 4489 },
        ],
      },
      {
        rangeX: [4207, 4288],
        rangeY: [-2000, 4488],
        values: [
          { x: 4206, y: 4489 },
          { x: 4254, y: 2000 },
          { x: 4269, y: 2000 },
          { x: 4278, y: 0 },
          { x: 4284, y: -1500 },
          { x: 4288, y: -2000 },
        ],
      },
    ],
  },
  "-15": {
    absoluteMinX: 3485,
    absoluteMaxX: 4287,
    absoluteMinY: -1500,
    absoluteMaxY: 8765,
    ranges: [
      {
        rangeX: [3000, 4099],
        rangeY: [4655, 20000],
        values: [
          { x: 3000, y: 12406 },
          { x: 3300, y: 10125 },
          { x: 3485, y: 8765 },
          { x: 3700, y: 7261 },
          { x: 3900, y: 5904 },
          { x: 4099, y: 4655 },
        ],
      },
      {
        rangeX: [4100, 4204],
        rangeY: [3958, 4654],
        values: [
          { x: 4099, y: 4655 },
          { x: 4133, y: 4443 },
          { x: 4169, y: 4199 },
          { x: 4204, y: 3958 },
        ],
      },
      {
        rangeX: [4205, 4287],
        rangeY: [-2000, 3957],
        values: [
          { x: 4204, y: 3958 },
          { x: 4227, y: 3000 },
          { x: 4245, y: 2000 },
          { x: 4273, y: 0 },
          { x: 4284, y: -1500 },
          { x: 4287, y: -2000 },
        ],
      },
    ],
  },
  "-10": {
    absoluteMinX: 3478,
    absoluteMaxX: 4286,
    absoluteMinY: -1500,
    absoluteMaxY: 8287,
    ranges: [
      {
        rangeX: [3000, 4183],
        rangeY: [3492, 20000],
        values: [
          { x: 3000, y: 11958 },
          { x: 3300, y: 9620 },
          { x: 3478, y: 8287 },
          { x: 3700, y: 6722 },
          { x: 3900, y: 5366 },
          { x: 4100, y: 4036 },
          { x: 4183, y: 3492 },
        ],
      },
      {
        rangeX: [4184, 4216],
        rangeY: [2988, 3491],
        values: [
          { x: 4183, y: 3492 },
          { x: 4193, y: 3354 },
          { x: 4207, y: 3142 },
          { x: 4216, y: 2988 },
        ],
      },
      {
        rangeX: [4217, 4286],
        rangeY: [-2000, 2987],
        values: [
          { x: 4216, y: 2988 },
          { x: 4236, y: 2000 },
          { x: 4267, y: 0 },
          { x: 4281, y: -1500 },
          { x: 4286, y: -2000 },
        ],
      },
    ],
  },
  0: {
    absoluteMinX: 3467,
    absoluteMaxX: 4279,
    absoluteMinY: -1500,
    absoluteMaxY: 7289,
    ranges: [
      {
        rangeX: [3000, 4137],
        rangeY: [2692, 20000],
        values: [
          { x: 3000, y: 10937 },
          { x: 3300, y: 8558 },
          { x: 3467, y: 7289 },
          { x: 3700, y: 5656 },
          { x: 3900, y: 4277 },
          { x: 4137, y: 2692 },
        ],
      },
      {
        rangeX: [4138, 4216],
        rangeY: [2003, 2691],
        values: [
          { x: 4137, y: 2692 },
          { x: 4163, y: 2529 },
          { x: 4177, y: 2407 },
          { x: 4191, y: 2268 },
          { x: 4202, y: 2140 },
          { x: 4216, y: 2003 },
        ],
      },
      {
        rangeX: [4217, 4279],
        rangeY: [-2000, 2002],
        values: [
          { x: 4216, y: 2003 },
          { x: 4252, y: 0 },
          { x: 4273, y: -1500 },
          { x: 4279, y: -2000 },
        ],
      },
    ],
  },
  10: {
    absoluteMinX: 3483,
    absoluteMaxX: 4269,
    absoluteMinY: -1500,
    absoluteMaxY: 6360,
    ranges: [
      {
        rangeX: [3000, 4191],
        rangeY: [1490, 20000],
        values: [
          { x: 3000, y: 10109 },
          { x: 3300, y: 7743 },
          { x: 3483, y: 6360 },
          { x: 3700, y: 4829 },
          { x: 3900, y: 3419 },
          { x: 4100, y: 2105 },
          { x: 4191, y: 1490 },
        ],
      },
      {
        rangeX: [4192, 4216],
        rangeY: [996, 1489],
        values: [
          { x: 4191, y: 1490 },
          { x: 4196, y: 1384 },
          { x: 4208, y: 1126 },
          { x: 4216, y: 996 },
        ],
      },
      {
        rangeX: [4217, 4269],
        rangeY: [-2000, 995],
        values: [
          { x: 4216, y: 996 },
          { x: 4237, y: 0 },
          { x: 4260, y: -1500 },
          { x: 4269, y: -2000 },
        ],
      },
    ],
  },
  20: {
    absoluteMinX: 3468,
    absoluteMaxX: 4255,
    absoluteMinY: -1500,
    absoluteMaxY: 5433,
    ranges: [
      {
        rangeX: [3000, 4183],
        rangeY: [492, 20000],
        values: [
          { x: 3000, y: 8994 },
          { x: 3300, y: 6742 },
          { x: 3468, y: 5433 },
          { x: 3700, y: 3775 },
          { x: 3900, y: 2397 },
          { x: 4100, y: 1046 },
          { x: 4183, y: 492 },
        ],
      },
      {
        rangeX: [4184, 4216],
        rangeY: [-11, 491],
        values: [
          { x: 4183, y: 492 },
          { x: 4194, y: 335 },
          { x: 4206, y: 138 },
          { x: 4216, y: -11 },
        ],
      },
      {
        rangeX: [4217, 4255],
        rangeY: [-2000, -12],
        values: [
          { x: 4216, y: -11 },
          { x: 4247, y: -1500 },
          { x: 4255, y: -2000 },
        ],
      },
    ],
  },
  30: {
    absoluteMinX: 3454,
    absoluteMaxX: 4240,
    absoluteMinY: -1500,
    absoluteMaxY: 4538,
    ranges: [
      {
        rangeX: [3000, 4158],
        rangeY: [-460, 20000],
        values: [
          { x: 3000, y: 7971 },
          { x: 3300, y: 5705 },
          { x: 3454, y: 4538 },
          { x: 3700, y: 2745 },
          { x: 3900, y: 1329 },
          { x: 4158, y: -460 },
        ],
      },
      {
        rangeX: [4159, 4219],
        rangeY: [-1001, -461],
        values: [
          { x: 4158, y: -460 },
          { x: 4176, y: -609 },
          { x: 4203, y: -836 },
          { x: 4219, y: -1001 },
        ],
      },
      {
        rangeX: [4220, 4240],
        rangeY: [-2000, -1002],
        values: [
          { x: 4219, y: -1001 },
          { x: 4225, y: -1284 },
          { x: 4231, y: -1500 },
          { x: 4240, y: -2000 },
        ],
      },
    ],
  },
  40: {
    absoluteMinX: 3414,
    absoluteMaxX: 4192,
    absoluteMinY: -1500,
    absoluteMaxY: 3657,
    ranges: [
      {
        rangeX: [3000, 5000],
        rangeY: [-2000, 20000],
        values: [
          { x: 3000, y: 6878 },
          { x: 3414, y: 3657 },
          { x: 3800, y: 836 },
          { x: 4123, y: -1500 },
          { x: 4192, y: -2000 },
        ],
      },
    ],
  },
  50: {
    absoluteMinX: 3397,
    absoluteMaxX: 3956,
    absoluteMinY: -1500,
    absoluteMaxY: 3375,
    ranges: [
      {
        rangeX: [3000, 3696],
        rangeY: [-4, 20000],
        values: [
          { x: 3000, y: 7350 },
          { x: 3397, y: 3375 },
          { x: 3525, y: 2000 },
          { x: 3696, y: -4 },
        ],
      },
      {
        rangeX: [3697, 3956],
        rangeY: [-2000, -5],
        values: [
          { x: 3696, y: -4 },
          { x: 3800, y: -821 },
          { x: 3889, y: -1500 },
          { x: 3956, y: -2000 },
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
export const mtow_helipad_predictWeight = (temperature, zp) => {
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
      { x: 3418, y: 10321 },
      { x: 3488, y: 9314 },
      { x: 3485, y: 8765 },
      ...curves()["-15"].reverse(),
      { x: 4293, y: -2000 },
    ],
  },
]

export const mtow_helipad_data = {
  name: "mtow_helipad",
  title: "MAXIMUM TAKEOFF WEIGHT GROUND HELIPAD",
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
