import { checkValueInLimits, checkValueInSubrange, extrapolation, getLowHighValues, getRegressionsReverse, scatterPlot, setValueInsideLimits } from "../utils/calculations"

// Labels for temperatures
const labels = [
  {
    text: "-40",
    x: 4750,
    y: 8500,
    angle: 35,
  },
  {
    text: "-30",
    x: 4700,
    y: 7650,
    angle: 35,
  },
  {
    text: "-20",
    x: 4650,
    y: 6900,
    angle: 35,
  },
  {
    text: "-10",
    x: 4600,
    y: 6100,
    angle: 35,
  },
  {
    text: "0",
    x: 4600,
    y: 5200,
    angle: 40,
  },
  {
    text: "10",
    x: 4575,
    y: 4300,
    angle: 42,
  },
  {
    text: "20",
    x: 4550,
    y: 3600,
    angle: 40,
  },
  {
    text: "30",
    x: 4480,
    y: 2600,
    angle: 38,
  },
  {
    text: "40",
    x: 4400,
    y: 1200,
    angle: 40,
  },
  {
    text: "50",
    x: 4300,
    y: -250,
    angle: 38,
  },
]

// Border lines (left side of flight envelope and bottom)
const borderLines = [
  [
    { x: 4407, y: -1500 },
    { x: 4920, y: -1500 },
  ],
  [
    { x: 4140, y: 11409 },
    { x: 4140, y: 5757 },
    { x: 4125, y: 5439 },
    { x: 4029, y: 4550 },
    { x: 3885, y: 3681 },
    { x: 3822, y: 3383 },
  ],
  [
    { x: 4850, y: 7329 },
    { x: 4850, y: -1500 },
  ],
  [
    { x: 4920, y: 5829 },
    { x: 4920, y: -1500 },
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
    absoluteMinX: 4140,
    absoluteMaxX: 4850,
    absoluteMinY: -1500,
    absoluteMaxY: 11409,
    ranges: [
      {
        rangeX: [3000, 5000],
        rangeY: [-2000, 20000],
        values: [
          { x: 3000, y: 18960 },
          { x: 3500, y: 15500 },
          { x: 4000, y: 12288 },
          { x: 4140, y: 11409 },
          { x: 4500, y: 9292 },
          { x: 4850, y: 7329 },
          { x: 5000, y: 6509 },
        ],
      },
    ],
  },
  "-30": {
    absoluteMinX: 4140,
    absoluteMaxX: 4920,
    absoluteMinY: -1500,
    absoluteMaxY: 10325,
    ranges: [
      {
        rangeX: [3000, 5000],
        rangeY: [-2000, 20000],
        values: [
          { x: 3000, y: 18270 },
          { x: 3500, y: 14607 },
          { x: 4000, y: 11236 },
          { x: 4140, y: 10325 },
          { x: 4500, y: 8185 },
          { x: 4850, y: 6207 },
          { x: 4920, y: 5829 },
          { x: 5000, y: 5416 },
        ],
      },
    ],
  },
  "-20": {
    absoluteMinX: 4140,
    absoluteMaxX: 4920,
    absoluteMinY: -1500,
    absoluteMaxY: 9303,
    ranges: [
      {
        rangeX: [3000, 5000],
        rangeY: [-2000, 20000],
        values: [
          { x: 3000, y: 17398 },
          { x: 3500, y: 13385 },
          { x: 4000, y: 10195 },
          { x: 4140, y: 9303 },
          { x: 4500, y: 7128 },
          { x: 4850, y: 5150 },
          { x: 5000, y: 4280 },
        ],
      },
    ],
  },
  "-15": {
    absoluteMinX: 4140,
    absoluteMaxX: 4850,
    absoluteMinY: -1500,
    absoluteMaxY: 8774,
    ranges: [
      {
        rangeX: [3000, 5000],
        rangeY: [-2000, 20000],
        values: [
          { x: 4140, y: 8774 },
          { x: 4400, y: 7194 },
          { x: 4600, y: 6024 },
          { x: 4850, y: 4623 },
        ],
      },
    ],
  },
  "-10": {
    absoluteMinX: 4140,
    absoluteMaxX: 4920,
    absoluteMinY: -1500,
    absoluteMaxY: 8290,
    ranges: [
      {
        rangeX: [3000, 5000],
        rangeY: [-2000, 20000],
        values: [
          { x: 3000, y: 16254 },
          { x: 3500, y: 12608 },
          { x: 4000, y: 9185 },
          { x: 4140, y: 8290 },
          { x: 4500, y: 6099 },
          { x: 4850, y: 4106 },
          { x: 5000, y: 3246 },
        ],
      },
    ],
  },
  0: {
    absoluteMinX: 4140,
    absoluteMaxX: 4920,
    absoluteMinY: -1500,
    absoluteMaxY: 7308,
    ranges: [
      {
        rangeX: [3000, 5000],
        rangeY: [-2000, 20000],
        values: [
          { x: 3000, y: 15180 },
          { x: 3500, y: 11651 },
          { x: 4000, y: 8227 },
          { x: 4140, y: 7308 },
          { x: 4500, y: 5111 },
          { x: 4850, y: 3081 },
          { x: 5000, y: 2250 },
        ],
      },
    ],
  },
  10: {
    absoluteMinX: 4140,
    absoluteMaxX: 4920,
    absoluteMinY: -1500,
    absoluteMaxY: 6350,
    ranges: [
      {
        rangeX: [3000, 5000],
        rangeY: [-2000, 20000],
        values: [
          { x: 3000, y: 13876 },
          { x: 3500, y: 10589 },
          { x: 4000, y: 7266 },
          { x: 4140, y: 6350 },
          { x: 4500, y: 4130 },
          { x: 4850, y: 2113 },
          { x: 5000, y: 1285 },
        ],
      },
    ],
  },
  20: {
    absoluteMinX: 4125,
    absoluteMaxX: 4920,
    absoluteMinY: -1500,
    absoluteMaxY: 5439,
    ranges: [
      {
        rangeX: [3000, 5000],
        rangeY: [-2000, 20000],
        values: [
          { x: 3000, y: 12418 },
          { x: 3500, y: 9201 },
          { x: 4000, y: 6168 },
          { x: 4125, y: 5439 },
          { x: 4500, y: 3197 },
          { x: 4850, y: 1187 },
          { x: 5000, y: 347 },
        ],
      },
    ],
  },
  30: {
    absoluteMinX: 4029,
    absoluteMaxX: 4920,
    absoluteMinY: -1500,
    absoluteMaxY: 4550,
    ranges: [
      {
        rangeX: [3000, 5000],
        rangeY: [-2000, 20000],
        values: [
          { x: 3000, y: 10746 },
          { x: 3500, y: 7629 },
          { x: 4029, y: 4550 },
          { x: 4500, y: 1861 },
          { x: 4850, y: -26 },
          { x: 5000, y: -793 },
        ],
      },
    ],
  },
  40: {
    absoluteMinX: 3883,
    absoluteMaxX: 4920,
    absoluteMinY: -1500,
    absoluteMaxY: 3681,
    ranges: [
      {
        rangeX: [3000, 5000],
        rangeY: [-2000, 20000],
        values: [
          { x: 3252, y: 7494 },
          { x: 3500, y: 5960 },
          { x: 3885, y: 3681 },
          { x: 4300, y: 1182 },
          { x: 4784, y: -1500 },
          { x: 4871, y: -2000 },
        ],
      },
    ],
  },
  50: {
    absoluteMinX: 3822,
    absoluteMaxX: 4920,
    absoluteMinY: -1500,
    absoluteMaxY: 3383,
    ranges: [
      {
        rangeX: [3000, 4156],
        rangeY: [-58, 20000],
        values: [
          { x: 3000, y: 11078 },
          { x: 3500, y: 6442 },
          { x: 3822, y: 3383 },
          { x: 4156, y: -58 },
        ],
      },
      {
        rangeX: [4157, 5000],
        rangeY: [-2000, -57],
        values: [
          { x: 4156, y: -58 },
          { x: 4300, y: -862 },
          { x: 4407, y: -1500 },
          { x: 4485, y: -2000 },
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
export const mtow_ca_60_predictWeight = (temperature, zp) => {
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
      { x: 4140, y: 8774 },
      ...curves()["-15"].reverse(),
      { x: 4850, y: -1500 },
      { x: 4920, y: -1500 },
      { x: 4920, y: 5829 },
      { x: 4850, y: 6207 },
    ],
  },
]

export const mtow_ca_60_data = {
  name: "mtow_ca_60",
  title: "MAXIMUM TAKEOFF WEIGHT CLEAR AREA VTOSS ≥ 60 KT",
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
