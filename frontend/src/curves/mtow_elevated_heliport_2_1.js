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
    text: "OAT (°C)",
    x: 3250,
    y: 500,
    angle: 45,
  },
  {
    text: "-25",
    x: 3750,
    y: 2000,
    angle: 80,
  },
  {
    text: "-20",
    x: 3690,
    y: 3800,
    angle: 80,
  },
  {
    text: "-10",
    x: 3570,
    y: 4400,
    angle: 50,
  },
  {
    text: "0",
    x: 3520,
    y: 3800,
    angle: 50,
  },
  {
    text: "10",
    x: 3470,
    y: 3300,
    angle: 50,
  },
  {
    text: "20",
    x: 3420,
    y: 2800,
    angle: 50,
  },
  {
    text: "30",
    x: 3370,
    y: 2200,
    angle: 50,
  },
  {
    text: "40",
    x: 3320,
    y: 1500,
    angle: 47,
  },
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
    absoluteMinX: 3604,
    absoluteMaxX: 3726,
    absoluteMinY: -2000,
    absoluteMaxY: 5000,
    ranges: [
      {
        rangeX: [3000, 3629],
        rangeY: [4500, 5000],
        values: [
          { x: 3604, y: 5000 },
          { x: 3611, y: 4844 },
          { x: 3621, y: 4649 },
          { x: 3629, y: 4500 },
        ],
      },
      {
        rangeX: [3630, 3800],
        rangeY: [-2000, 4499],
        values: [
          { x: 3629, y: 4500 },
          { x: 3660, y: 3000 },
          { x: 3678, y: 2000 },
          { x: 3694, y: 1000 },
          { x: 3708, y: 0 },
          { x: 3717, y: -1000 },
          { x: 3726, y: -2000 },
        ],
      },
    ],
  },
  "-20": {
    absoluteMinX: 3562,
    absoluteMaxX: 3721,
    absoluteMinY: -2000,
    absoluteMaxY: 5000,
    ranges: [
      {
        rangeX: [3000, 3615],
        rangeY: [4500, 5000],
        values: [
          { x: 3562, y: 5000 },
          { x: 3576, y: 4844 },
          { x: 3598, y: 4656 },
          { x: 3615, y: 4500 },
        ],
      },
      {
        rangeX: [3616, 3800],
        rangeY: [-2000, 4499],
        values: [
          { x: 3615, y: 4500 },
          { x: 3649, y: 3000 },
          { x: 3668, y: 2000 },
          { x: 3685, y: 1000 },
          { x: 3701, y: 0 },
          { x: 3713, y: -1000 },
          { x: 3721, y: -2000 },
        ],
      },
    ],
  },
  "-10": {
    absoluteMinX: 3424,
    absoluteMaxX: 3721,
    absoluteMinY: -2000,
    absoluteMaxY: 5000,
    ranges: [
      {
        rangeX: [3000, 3598],
        rangeY: [3500, 5000],
        values: [
          { x: 3424, y: 5000 },
          { x: 3480, y: 4500 },
          { x: 3538, y: 4000 },
          { x: 3598, y: 3500 },
        ],
      },
      {
        rangeX: [3599, 3627],
        rangeY: [2993, 3499],
        values: [
          { x: 3598, y: 3500 },
          { x: 3607, y: 3337 },
          { x: 3619, y: 3147 },
          { x: 3627, y: 2993 },
        ],
      },
      {
        rangeX: [3628, 3800],
        rangeY: [-2000, 2992],
        values: [
          { x: 3627, y: 2993 },
          { x: 3648, y: 2000 },
          { x: 3668, y: 1000 },
          { x: 3685, y: 0 },
          { x: 3700, y: -1000 },
          { x: 3711, y: -2000 },
        ],
      },
    ],
  },
  0: {
    absoluteMinX: 3302,
    absoluteMaxX: 3698,
    absoluteMinY: -2000,
    absoluteMaxY: 5000,
    ranges: [
      {
        rangeX: [3000, 3588],
        rangeY: [2498, 5000],
        values: [
          { x: 3302, y: 5000 },
          { x: 3400, y: 4111 },
          { x: 3500, y: 3246 },
          { x: 3588, y: 2498 },
        ],
      },
      {
        rangeX: [3589, 3625],
        rangeY: [2000, 2497],
        values: [
          { x: 3588, y: 2498 },
          { x: 3600, y: 2341 },
          { x: 3614, y: 2154 },
          { x: 3625, y: 2000 },
        ],
      },
      {
        rangeX: [3626, 3800],
        rangeY: [-2000, 1999],
        values: [
          { x: 3625, y: 2000 },
          { x: 3647, y: 1000 },
          { x: 3666, y: 0 },
          { x: 3684, y: -1000 },
          { x: 3698, y: -2000 },
        ],
      },
    ],
  },
  10: {
    absoluteMinX: 3208,
    absoluteMaxX: 3684,
    absoluteMinY: -2000,
    absoluteMaxY: 5000,
    ranges: [
      {
        rangeX: [3000, 3600],
        rangeY: [1531, 5000],
        values: [
          { x: 3208, y: 5000 },
          { x: 3372, y: 3500 },
          { x: 3486, y: 2500 },
          { x: 3600, y: 1531 },
        ],
      },
      {
        rangeX: [3601, 3626],
        rangeY: [997, 1530],
        values: [
          { x: 3600, y: 1531 },
          { x: 3609, y: 1383 },
          { x: 3619, y: 1153 },
          { x: 3626, y: 997 },
        ],
      },
      {
        rangeX: [3627, 3800],
        rangeY: [-2000, 996],
        values: [
          { x: 3626, y: 997 },
          { x: 3647, y: 0 },
          { x: 3668, y: -1000 },
          { x: 3684, y: -2000 },
        ],
      },
    ],
  },
  20: {
    absoluteMinX: 3097,
    absoluteMaxX: 3669,
    absoluteMinY: -2000,
    absoluteMaxY: 5000,
    ranges: [
      {
        rangeX: [3000, 3597],
        rangeY: [500, 5000],
        values: [
          { x: 3097, y: 5000 },
          { x: 3300, y: 3111 },
          { x: 3481, y: 1500 },
          { x: 3597, y: 500 },
        ],
      },
      {
        rangeX: [3598, 3628],
        rangeY: [0, 499],
        values: [
          { x: 3597, y: 500 },
          { x: 3607, y: 361 },
          { x: 3620, y: 148 },
          { x: 3628, y: 0 },
        ],
      },
      {
        rangeX: [3628, 3800],
        rangeY: [-2000, -1],
        values: [
          { x: 3628, y: 0 },
          { x: 3647, y: -1000 },
          { x: 3669, y: -2000 },
        ],
      },
    ],
  },
  30: {
    absoluteMinX: 3000,
    absoluteMaxX: 3650,
    absoluteMinY: -2000,
    absoluteMaxY: 4907,
    ranges: [
      {
        rangeX: [3000, 3584],
        rangeY: [-500, 5000],
        values: [
          { x: 3000, y: 4907 },
          { x: 3255, y: 2500 },
          { x: 3419, y: 1000 },
          { x: 3584, y: -500 },
        ],
      },
      {
        rangeX: [3585, 3630],
        rangeY: [-1000, -501],
        values: [
          { x: 3584, y: -500 },
          { x: 3600, y: -661 },
          { x: 3615, y: -862 },
          { x: 3630, y: -1000 },
        ],
      },
      {
        rangeX: [3631, 3800],
        rangeY: [-2000, -1001],
        values: [
          { x: 3630, y: -1000 },
          { x: 3635, y: -1321 },
          { x: 3644, y: -1664 },
          { x: 3650, y: -2000 },
        ],
      },
    ],
  },
  40: {
    absoluteMinX: 3000,
    absoluteMaxX: 3608,
    absoluteMinY: -2000,
    absoluteMaxY: 3768,
    ranges: [
      {
        rangeX: [3000, 3800],
        rangeY: [-2000, 5000],
        values: [
          { x: 3000, y: 3768 },
          { x: 3182, y: 2000 },
          { x: 3399, y: 0 },
          { x: 3608, y: -2000 },
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
export const mtow_elevated_heliport_2_1_predictWeight = (temperature, zp) => {
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
    40
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
      zp += 20
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

export const mtow_elevated_heliport_2_1_data = {
  name: "mtow_elevated_heliport_2_1",
  title: "MAXIMUM TAKEOFF WEIGHT ELEVATED HELIPORT #2",
  xmin: 3000, // X axis minimum value
  xmax: 5000, // X axis reference 0
  x0: 3000, // X axis maximum value
  ymin: -2000, // Y axis minimum value
  ymax: 5000, // Y axis maximum value
  y0: -2000, // Y axis reference 0
  gridSpacingX: 100, // X axis grid spacing (value)
  gridSpacingY: 500, // Y axis grid spacing (value)
  gridSpacingThickX: 200, // X axis thick grid spacing (value)
  gridSpacingThickY: 1000, // Y axis thick grid spacing (value)
  labelSpacingX: 200, // X axis label spacing (value)
  labelSpacingY: 1000, // Y axis label spacing (value)
  xLabel: "WEIGHT (kg)",
  yLabel: "Hp (ft x 1000)",
  scatterPlot: scatterPlot(data),
  curves: curves(),
  labels: labels,
  borderLines: [],
  areas: [],
}
