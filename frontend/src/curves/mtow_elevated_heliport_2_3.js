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
    x: 4200,
    y: 3300,
    angle: 40,
  },
  {
    text: "-25",
    x: 4770,
    y: 4900,
    angle: 40,
  },
  {
    text: "-20",
    x: 4720,
    y: 4550,
    angle: 40,
  },
  {
    text: "-10",
    x: 4640,
    y: 3950,
    angle: 40,
  },
  {
    text: "0",
    x: 4580,
    y: 3300,
    angle: 40,
  },
  {
    text: "10",
    x: 4510,
    y: 2600,
    angle: 40,
  },
  {
    text: "20",
    x: 4430,
    y: 1900,
    angle: 40,
  },
  {
    text: "30",
    x: 4320,
    y: 1150,
    angle: 40,
  },
  {
    text: "40",
    x: 4210,
    y: 300,
    angle: 40,
  },

]

// Border lines (left and right side of flight envelope)
const borderLines = [
  [
    { x: 4091, y: 5000 },
    { x: 4082, y: 4543 },
    { x: 4045, y: 3604 },
    { x: 3976, y: 2703 },
    { x: 3869, y: 1814 },
  ],
  [
              { x: 4820, y: 4009 },
{ x: 4820, y: -2000 },
  ]
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
    absoluteMinX: 4638,
    absoluteMaxX: 4820,
    absoluteMinY: 4009,
    absoluteMaxY: 5000,
    ranges: [
      {
        rangeX: [3000, 5000],
        rangeY: [-2000, 5000],
        values: [
          { x: 4638, y: 5000 },
          { x: 4700, y: 4643 },
          { x: 4763, y: 4329 },
          { x: 4820, y: 4009 },
        ],
      },
    ],
  },
  "-20": {
    absoluteMinX: 4532,
    absoluteMaxX: 4820,
    absoluteMinY: 3261,
    absoluteMaxY: 5000,
    ranges: [
      {
        rangeX: [3000, 4800],
        rangeY: [3500, 5000],
        values: [
          { x: 4532, y: 5000 },
          { x: 4622, y: 4500 },
          { x: 4714, y: 4000 },
          { x: 4800, y: 3500 },
        ],
      },
      {
        rangeX: [4801, 5000],
        rangeY: [-2000, 3499],
        values: [
          { x: 4800, y: 3500 },
          { x: 4809, y: 3431 },
          { x: 4816, y: 3356 },
          { x: 4820, y: 3261 },
        ],
      },
    ],
  },
  "-10": {
    absoluteMinX: 4353,
    absoluteMaxX: 4820,
    absoluteMinY: 2185,
    absoluteMaxY: 5000,
    ranges: [
      {
        rangeX: [3000, 4789],
        rangeY: [2500, 5000],
        values: [
          { x: 4353, y: 5000 },
          { x: 4500, y: 4143 },
          { x: 4700, y: 3018 },
          { x: 4789, y: 2500 },
        ],
      },
      {
        rangeX: [4790, 5000],
        rangeY: [-2000, 2499],
        values: [
          { x: 4789, y: 2500 },
          { x: 4802, y: 2372 },
          { x: 4816, y: 2250 },
          { x: 4820, y: 2185 },
        ],
      },
    ],
  },
  0: {
    absoluteMinX: 4184,
    absoluteMaxX: 4820,
    absoluteMinY: 1156,
    absoluteMaxY: 5000,
    ranges: [
      {
        rangeX: [3000, 4787],
        rangeY: [1500, 5000],
        values: [
          { x: 4184, y: 5000 },
          { x: 4400, y: 3720 },
          { x: 4600, y: 2550 },
          { x: 4787, y: 1500 },
        ],
      },
      {
        rangeX: [4788, 5000],
        rangeY: [-2000, 1499],
        values: [
          { x: 4787, y: 1500 },
          { x: 4800, y: 1380 },
          { x: 4812, y: 1261 },
          { x: 4820, y: 1156 },
        ],
      },
    ],
  },
  10: {
    absoluteMinX: 4082,
    absoluteMaxX: 4820,
    absoluteMinY: 122,
    absoluteMaxY: 5000,
    ranges: [
      {
        rangeX: [3000, 4767],
        rangeY: [500, 5000],
        values: [
          { x: 4007, y: 5000 },
          { x: 4082, y: 4543 },
          { x: 4300, y: 3184 },
          { x: 4600, y: 1433 },
          { x: 4767, y: 500 },
        ],
      },
      {
        rangeX: [4768, 5000],
        rangeY: [-2000, 499],
        values: [
          { x: 4767, y: 500 },
          { x: 4787, y: 383 },
          { x: 4808, y: 234 },
          { x: 4820, y: 122 },
        ],
      },
    ],
  },
  20: {
    absoluteMinX: 4045,
    absoluteMaxX: 4820,
    absoluteMinY: -1022,
    absoluteMaxY: 5000,
    ranges: [
      {
        rangeX: [3000, 5000],
        rangeY: [-2000, 5000],
        values: [
          { x: 3822, y: 5000 },
          { x: 4045, y: 3604 },
          { x: 4300, y: 2006 },
          { x: 4600, y: 277 },
          { x: 4820, y: -1022 },
        ],
      },
    ],
  },
  30: {
    absoluteMinX: 3976,
    absoluteMaxX: 4732,
    absoluteMinY: -2000,
    absoluteMaxY: 5000,
    ranges: [
      {
        rangeX: [3000, 5000],
        rangeY: [-2000, 5000],
        values: [
          { x: 3624, y: 5000 },
          { x: 3976, y: 2703 },
          { x: 4200, y: 1273 },
          { x: 4500, y: -564 },
          { x: 4732, y: -2000 },
        ],
      },
    ],
  },
  40: {
    absoluteMinX: 3869,
    absoluteMaxX: 4448,
    absoluteMinY: -2000,
    absoluteMaxY: 5000,
    ranges: [
      {
        rangeX: [3000, 5000],
        rangeY: [-2000, 5000],
        values: [
          { x: 3398, y: 5000 },
          { x: 3600, y: 3610 },
          { x: 3869, y: 1814 },
          { x: 4200, y: -322 },
          { x: 4448, y: -2000 },
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
export const mtow_elevated_heliport_2_3_predictWeight = (temperature, zp) => {
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

export const mtow_elevated_heliport_2_3_data = {
  name: "mtow_elevated_heliport_2_3",
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
  borderLines: borderLines,
  areas: [],
}
