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
const labels = []

// Border lines (left side of flight envelope and bottom)
const borderLines = [
  [
    { x: 4820, y: 0 },
    { x: 4820, y: 3.69 },
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
  3000: {
    absoluteMinX: 3000,
    absoluteMaxX: 4367,
    absoluteMinY: 0,
    absoluteMaxY: 10,
    ranges: [
      {
        rangeX: [3000, 5000],
        rangeY: [0, 10],
        values: [
          { x: 3000, y: 10 },
          { x: 3300, y: 7.34 },
          { x: 3600, y: 4.98 },
          { x: 3900, y: 2.92 },
          { x: 4200, y: 1.01 },
          { x: 4367, y: 0 },
        ],
      },
    ],
  },
  3100: {
    absoluteMinX: 3100,
    absoluteMaxX: 4527,
    absoluteMinY: 0,
    absoluteMaxY: 10,
    ranges: [
      {
        rangeX: [3000, 5000],
        rangeY: [0, 10],
        values: [
          { x: 3100, y: 10 },
          { x: 3300, y: 8.26 },
          { x: 3600, y: 5.89 },
          { x: 3900, y: 3.81 },
          { x: 4200, y: 1.93 },
          { x: 4527, y: 0 },
        ],
      },
    ],
  },
  3200: {
    absoluteMinX: 3200,
    absoluteMaxX: 4683,
    absoluteMinY: 0,
    absoluteMaxY: 10,
    ranges: [
      {
        rangeX: [3000, 5000],
        rangeY: [0, 10],
        values: [
          { x: 3200, y: 10 },
          { x: 3400, y: 8.32 },
          { x: 3600, y: 6.77 },
          { x: 3900, y: 4.67 },
          { x: 4200, y: 2.78 },
          { x: 4500, y: 1.02 },
          { x: 4683, y: 0 },
        ],
      },
    ],
  },
  3300: {
    absoluteMinX: 3300,
    absoluteMaxX: 4820,
    absoluteMinY: 0.12,
    absoluteMaxY: 10,
    ranges: [
      {
        rangeX: [3000, 5000],
        rangeY: [0, 10],
        values: [
          { x: 3300, y: 10 },
          { x: 3600, y: 7.6 },
          { x: 3900, y: 5.49 },
          { x: 4200, y: 3.59 },
          { x: 4500, y: 1.85 },
          { x: 4600, y: 1.31 },
          { x: 4820, y: 0.12 },
        ],
      },
    ],
  },
  3400: {
    absoluteMinX: 3400,
    absoluteMaxX: 4820,
    absoluteMinY: 0.91,
    absoluteMaxY: 10,
    ranges: [
      {
        rangeX: [3000, 5000],
        rangeY: [0, 10],
        values: [
          { x: 3400, y: 10 },
          { x: 3600, y: 8.42 },
          { x: 3900, y: 6.3 },
          { x: 4200, y: 4.39 },
          { x: 4500, y: 2.65 },
          { x: 4700, y: 1.56 },
          { x: 4820, y: 0.91 },
        ],
      },
    ],
  },
  3500: {
    absoluteMinX: 3500,
    absoluteMaxX: 4820,
    absoluteMinY: 1.7,
    absoluteMaxY: 10,
    ranges: [
      {
        rangeX: [3000, 5000],
        rangeY: [0, 10],
        values: [
          { x: 3500, y: 10 },
          { x: 3600, y: 9.24 },
          { x: 3900, y: 7.1 },
          { x: 4200, y: 5.16 },
          { x: 4500, y: 3.41 },
          { x: 4700, y: 2.35 },
          { x: 4820, y: 1.7 },
        ],
      },
    ],
  },
  3600: {
    absoluteMinX: 3600,
    absoluteMaxX: 4820,
    absoluteMinY: 2.46,
    absoluteMaxY: 10,
    ranges: [
      {
        rangeX: [3000, 5000],
        rangeY: [0, 10],
        values: [
          { x: 3600, y: 10 },
          { x: 3900, y: 7.86 },
          { x: 4200, y: 5.92 },
          { x: 4500, y: 4.16 },
          { x: 4700, y: 3.1 },
          { x: 4820, y: 2.46 },
        ],
      },
    ],
  },
  3700: {
    absoluteMinX: 3700,
    absoluteMaxX: 4820,
    absoluteMinY: 3.69,
    absoluteMaxY: 10,
    ranges: [
      {
        rangeX: [3000, 5000],
        rangeY: [0, 10],
        values: [
          { x: 3700, y: 10 },
          { x: 3900, y: 8.69 },
          { x: 4200, y: 6.91 },
          { x: 4500, y: 5.28 },
          { x: 4700, y: 4.28 },
          { x: 4820, y: 3.69 },
        ],
      },
    ],
  },
}

/**
 *
 * @param {Number} weight
 * @param {Number} coef
 * @returns {Number} predicted weight
 * @description Predict weight given temperature and Zp using the reverse polynomial regressions.
 */
export const mtow_elevated_heliport_2_2_predictWeight = (weight, coef) => {
  // Check flight enveloppe with weight
  if (!checkValueInSubrange(data, weight)) {
    return {
      value: null,
      error: "Outside defined weight range",
      text: "N/A",
    }
  }

  // Get low and high weight surrounding values
  const { lowValue: weightLow, highValue: weightHigh } = getLowHighValues(
    weight,
    3000,
    3700
  )

  // Check flight enveloppe with Zp
  if (!checkValueInLimits(data, weightLow, weightHigh, coef, "yAxis")) {
    return {
      value: null,
      error: "Outside defined coefficient range",
      text: "N/A",
    }
  }

  // Get regressions for low and high weight
  const regressions = getRegressionsReverse(data, coef, 4)
  const weightResultLow = regressions[weightLow].predict(coef)
  const weightResultHigh = regressions[weightHigh].predict(coef)

  // Extrapolate weight for given weight
  const weightResult = extrapolation(
    weight,
    weightLow,
    weightResultLow,
    weightHigh,
    weightResultHigh
  )

  // Check flight enveloppe with Weight
  const weightInLimits = setValueInsideLimits(
    data,
    weightLow,
    weightHigh,
    weightResult,
    "xAxis"
  )
  return { value: Math.round(weightInLimits), error: null, text: null }
}

/**
 * Generates curve data points for each temperature based on reverse regression calculations.
 *
 * @function curves
 * @returns {Object<string, Array<{x: number, y: number}>>} An object where:
 * - Each key is a weight (as a number),
 * - Each value is an array of points representing a curve,
 *   with:
 *   - `x`: weight result value (predicted),
 *   - `y`: Coef value (input).
 *
 * @description
 * For each weight:
 * - Iterates through Coef values from `absoluteMinY` to `absoluteMaxY` with a step of 0.1.
 * - Uses reverse regression to compute the corresponding resulting weight.
 * - Only includes points where the resulting weight is within the defined absolute X range.
 */
const curves = () => {
  const curves = {}

  for (const weight in data) {
    const curve = []
    for (
      let coef = data[weight].absoluteMinY;
      coef <= data[weight].absoluteMaxY;
      coef += 0.1
    ) {
      const regressions = getRegressionsReverse(data, coef)
      const weightResult = regressions[weight].predict(coef)
      const absoluteMinX = data[weight].absoluteMinX
      const absoluteMaxX = data[weight].absoluteMaxX
      if (weightResult >= absoluteMinX && weight <= absoluteMaxX)
        curve.push({ x: weightResult, y: coef })
    }
    curves[weight] = curve
  }
  return curves
}

export const mtow_elevated_heliport_2_2_data = {
  name: "mtow_elevated_heliport_2_2",
  title: "MAXIMUM TAKEOFF WEIGHT ELEVATED HELIPORT #2",
  xmin: 3000, // X axis minimum value
  xmax: 5000, // X axis reference 0
  x0: 3000, // X axis maximum value
  ymin: 0, // Y axis minimum value
  ymax: 10, // Y axis maximum value
  y0: 0, // Y axis reference 0
  gridSpacingX: 100, // X axis grid spacing (value)
  gridSpacingY: 1, // Y axis grid spacing (value)
  gridSpacingThickX: 200, // X axis thick grid spacing (value)
  gridSpacingThickY: 2, // Y axis thick grid spacing (value)
  labelSpacingX: 200, // X axis label spacing (value)
  labelSpacingY: 1, // Y axis label spacing (value)
  xLabel: "WEIGHT (kg)",
  yLabel: "",
  scatterPlot: scatterPlot(data),
  curves: curves(),
  labels: labels,
  borderLines: borderLines,
  areas: [],
}
