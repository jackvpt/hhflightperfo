import {
  checkValueInLimits,
  checkValueInSubrange,
  extrapolation,
  getLowHighValues,
  getRegressions,
  scatterPlot,
  setValueInsideLimits,
} from "../utils/calculations"

// Labels for winds
const labels = [
  {
    text: "HEADWIND (kt)",
    x: 100,
    y: 6.8,
    angle: 0,
  },
  {
    text: "AFTER FACTORING",
    x: 100,
    y: 6.5,
    angle: 0,
  },
  {
    text: "0",
    x: 40,
    y: 6.6,
    angle: -50,
  },
  {
    text: "10",
    x: 35,
    y: 5.2,
    angle: -60,
  },
  {
    text: "20",
    x: 30,
    y: 3.3,
    angle: -60,
  },
  {
    text: "30",
    x: 25,
    y: 1.5,
    angle: -35,
  },
]

/**
 * Data structure
 * The data is organized by wind, each containing ranges with dropdown (x) and coefficient (y) points.
 * Polynomial regressions are created for each wind to predict y from x and vice versa.
 * The goal is to model the relationship between dropdown and coefficient for different winds.
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
          { x: 60, y: 4.91 },
          { x: 70, y: 4.47 },
          { x: 80, y: 4.09 },
          { x: 90, y: 3.73 },
          { x: 100, y: 3.43 },
          { x: 110, y: 3.15 },
          { x: 120, y: 2.9 },
          { x: 130, y: 2.66 },
          { x: 140, y: 2.44 },
          { x: 150, y: 2.25 },
          { x: 160, y: 2.05 },
          { x: 170, y: 1.87 },
          { x: 180, y: 1.7 },
          { x: 190, y: 1.54 },
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
          { x: 60, y: 3.4 },
          { x: 70, y: 3.04 },
          { x: 80, y: 2.74 },
          { x: 90, y: 2.47 },
          { x: 100, y: 2.24 },
          { x: 110, y: 2.0 },
          { x: 120, y: 1.79 },
          { x: 130, y: 1.61 },
          { x: 140, y: 1.43 },
          { x: 150, y: 1.27 },
          { x: 160, y: 1.11 },
          { x: 170, y: 0.96 },
          { x: 180, y: 0.82 },
          { x: 190, y: 0.68 },
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
export const mtow_elevated_heliport_1_predictCoef = (wind, dropDown) => {
  // Check flight enveloppe with wind
  if (!checkValueInSubrange(data, wind)) {
    return {
      value: null,
      error: "Outside defined wind range",
      text: "N/A",
    }
  }

  // Get low and high wind surrounding values
  const { lowValue: windLow, highValue: windHigh } = getLowHighValues(
    wind,
    10,
    30
  )

  // Check flight enveloppe with drop down
  if (!checkValueInLimits(data, windLow, windHigh, dropDown, "xAxis").inLimits) {
    return {
      value: null,
      error: "Outside defined drop down range",
      text: "N/A",
    }
  }

  // Get regressions for low and high temperature
  const regressions = getRegressions(data, dropDown)
  const coefLow = regressions[windLow].predict(dropDown)
  const coefHigh = regressions[windHigh].predict(dropDown)

  // Extrapolate weight for given wind
  const coef = extrapolation(wind, windLow, coefLow, windHigh, coefHigh)

  // Check flight enveloppe with Weight
  const coefInLimits = setValueInsideLimits(
    data,
    windLow,
    windHigh,
    coef,
    "yAxis"
  )
  return { value: Number(coefInLimits.toFixed(2)), error: null, text: null }
}

/**
 * Generates curve data points for each wind based on regression calculations.
 *
 * @function curves
 * @returns {Object<string, Array<{x: number, y: number}>>} An object where:
 * - Each key is a wind (as a string),
 * - Each value is an array of points representing a curve,
 *   with:
 *   - `x`: Dropdown value (input),
 *   - `y`: coefficient value (predicted).
 *
 * @description
 * For each wind:
 * - Iterates through Dropdown values from `absoluteMinX` to `absoluteMaxX` with a step of 2.
 * - Uses regression to compute the corresponding coef.
 * - Only includes points where the coef is within the defined absolute Y range.
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
      const regressions = getRegressions(data, dropDown,4 )
      const coef = regressions[wind].predict(dropDown)
      const absoluteMinY = data[wind].absoluteMinY
      const absoluteMaxY = data[wind].absoluteMaxY
      if (coef >= absoluteMinY && coef <= absoluteMaxY)
        curve.push({ x: dropDown, y: coef })
    }

    curves[wind] = curve
  }
  return curves
}

export const mtow_elevated_heliport_1_data = {
  name: "mtow_elevated_heliport_1",
  title: "MAXIMUM TAKEOFF WEIGHT ELEVATED HELIPORT #1",
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
  yAxisSide: "right",
  reverseX: true, // Reverse X axis
  xLabel: "DROP DOWN (ft)",
  yLabel: "",
  scatterPlot: scatterPlot(data),
  curves: curves(),
  labels: labels,
  borderLines: [],
  areas: [],
}
