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
import { limitErrorObject } from "../utils/string"

// Labels for temperatures
const labels = [
  {
    text: "AVAILABLE DROP DOWN (ft)",
    x: 2.5,
    y: 4150,
    angle: -40,
  },
  {
    text: "0",
    x: 3,
    y: 4520,
    angle: -38,
  },
  {
    text: "50",
    x: 2,
    y: 4740,
    angle: -38,
  },
  {
    text: "100",
    x: 1,
    y: 4870,
    angle: -30,
  },
]

// Border lines (sides of flight envelope)
const borderLines = [
  {
    color: "",
    thickness: 1.5,
    points: [
      { x: 0.5, y: 3815 },
      { x: 0.5, y: 4920 },
    ],
  },
  {
    color: "",
    thickness: 1.5,
    points: [
      { x: 0.5, y: 4920 },
      { x: 4.9, y: 4920 },
    ],
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
  0: {
    absoluteMinX: 0.5,
    absoluteMaxX: 4.9,
    absoluteMinY: 3815,
    absoluteMaxY: 4920,
    ranges: [
      {
        rangeX: [0, 1],
        rangeY: [3815, 3906],
        values: [
          { x: 0.5, y: 3815 },
          { x: 0.6, y: 3831 },
          { x: 0.7, y: 3850 },
          { x: 0.8, y: 3869 },
          { x: 0.9, y: 3887 },
          { x: 1, y: 3906 },
        ],
      },
      {
        rangeX: [1.001, 9],
        rangeY: [3907, 4920],
        values: [
          { x: 1, y: 3906 },
          { x: 2, y: 4153 },
          { x: 3, y: 4411 },
          { x: 4, y: 4680 },
          { x: 4.92, y: 4920 },
        ],
      },
    ],
  },
  10: {
    absoluteMinX: 0.5,
    absoluteMaxX: 4.6,
    absoluteMinY: 3960,
    absoluteMaxY: 4920,
    ranges: [
      {
        rangeX: [0, 1],
        rangeY: [3960, 4056],
        values: [
          { x: 0.5, y: 3960 },
          { x: 0.6, y: 3975 },
          { x: 0.7, y: 3994 },
          { x: 0.8, y: 4013 },
          { x: 0.9, y: 4034 },
          { x: 1, y: 4056 },
        ],
      },
      {
        rangeX: [1.001, 9],
        rangeY: [4057, 4920],
        values: [
          { x: 1, y: 4056 },
          { x: 2, y: 4285 },
          { x: 3, y: 4524 },
          { x: 4, y: 4773 },
          { x: 4.61, y: 4920 },
        ],
      },
    ],
  },
  20: {
    absoluteMinX: 0.5,
    absoluteMaxX: 4.3,
    absoluteMinY: 4081,
    absoluteMaxY: 4920,
    ranges: [
      {
        rangeX: [0, 1],
        rangeY: [4081, 4179],
        values: [
          { x: 0.5, y: 4081 },
          { x: 0.6, y: 4099 },
          { x: 0.7, y: 4118 },
          { x: 0.8, y: 4136 },
          { x: 0.9, y: 4161 },
          { x: 1, y: 4179 },
        ],
      },
      {
        rangeX: [1.001, 9],
        rangeY: [4180, 4920],
        values: [
          { x: 1, y: 4179 },
          { x: 2, y: 4394 },
          { x: 3, y: 4622 },
          { x: 4, y: 4851 },
          { x: 4.3, y: 4920 },
        ],
      },
    ],
  },
  30: {
    absoluteMinX: 0.5,
    absoluteMaxX: 4,
    absoluteMinY: 4189,
    absoluteMaxY: 4920,
    ranges: [
      {
        rangeX: [0, 1],
        rangeY: [4189, 4285],
        values: [
          { x: 0.5, y: 4189 },
          { x: 0.6, y: 4206 },
          { x: 0.7, y: 4226 },
          { x: 0.8, y: 4245 },
          { x: 0.9, y: 4266 },
          { x: 1, y: 4285 },
        ],
      },
      {
        rangeX: [1.001, 9],
        rangeY: [4286, 4920],
        values: [
          { x: 1, y: 4285 },
          { x: 2, y: 4487 },
          { x: 3, y: 4704 },
          { x: 4, y: 4920 },
        ],
      },
    ],
  },
  40: {
    absoluteMinX: 0.5,
    absoluteMaxX: 3.7,
    absoluteMinY: 4280,
    absoluteMaxY: 4920,
    ranges: [
      {
        rangeX: [0, 1],
        rangeY: [4280, 4377],
        values: [
          { x: 0.5, y: 4280 },
          { x: 0.6, y: 4299 },
          { x: 0.7, y: 4315 },
          { x: 0.8, y: 4336 },
          { x: 0.9, y: 4358 },
          { x: 1, y: 4377 },
        ],
      },
      {
        rangeX: [1.001, 9],
        rangeY: [4378, 4920],
        values: [
          { x: 1, y: 4377 },
          { x: 2, y: 4569 },
          { x: 3, y: 4776 },
          { x: 3.7, y: 4920 },
        ],
      },
    ],
  },
  50: {
    absoluteMinX: 0.5,
    absoluteMaxX: 3.4,
    absoluteMinY: 4363,
    absoluteMaxY: 4920,
    ranges: [
      {
        rangeX: [0, 1],
        rangeY: [4363, 4459],
        values: [
          { x: 0.5, y: 4363 },
          { x: 0.6, y: 4381 },
          { x: 0.7, y: 4401 },
          { x: 0.8, y: 4418 },
          { x: 0.9, y: 4438 },
          { x: 1, y: 4459 },
        ],
      },
      {
        rangeX: [1.001, 9],
        rangeY: [4460, 4920],
        values: [
          { x: 1, y: 4459 },
          { x: 1.77, y: 4600 },
          { x: 2.5, y: 4744 },
          { x: 3.4, y: 4920 },
        ],
      },
    ],
  },
  60: {
    absoluteMinX: 0.5,
    absoluteMaxX: 3.1,
    absoluteMinY: 4438,
    absoluteMaxY: 4920,
    ranges: [
      {
        rangeX: [0, 1],
        rangeY: [4438, 4531],
        values: [
          { x: 0.5, y: 4438 },
          { x: 0.6, y: 4456 },
          { x: 0.7, y: 4476 },
          { x: 0.8, y: 4494 },
          { x: 0.9, y: 4513 },
          { x: 1, y: 4531 },
        ],
      },
      {
        rangeX: [1.001, 9],
        rangeY: [4532, 4920],
        values: [
          { x: 1, y: 4531 },
          { x: 1.7, y: 4657 },
          { x: 2.5, y: 4807 },
          { x: 3.1, y: 4920 },
        ],
      },
    ],
  },
  70: {
    absoluteMinX: 0.5,
    absoluteMaxX: 2.8,
    absoluteMinY: 4508,
    absoluteMaxY: 4920,
    ranges: [
      {
        rangeX: [0, 1],
        rangeY: [4508, 4599],
        values: [
          { x: 0.5, y: 4508 },
          { x: 0.6, y: 4526 },
          { x: 0.7, y: 4545 },
          { x: 0.8, y: 4561 },
          { x: 0.9, y: 4583 },
          { x: 1, y: 4599 },
        ],
      },
      {
        rangeX: [1.001, 9],
        rangeY: [4600, 4920],
        values: [
          { x: 1, y: 4600 },
          { x: 1.5, y: 4686 },
          { x: 2.2, y: 4810 },
          { x: 2.8, y: 4920 },
        ],
      },
    ],
  },
  80: {
    absoluteMinX: 0.5,
    absoluteMaxX: 2.5,
    absoluteMinY: 4574,
    absoluteMaxY: 4920,
    ranges: [
      {
        rangeX: [0, 1],
        rangeY: [4574, 4663],
        values: [
          { x: 0.5, y: 4574 },
          { x: 0.6, y: 4592 },
          { x: 0.7, y: 4611 },
          { x: 0.8, y: 4626 },
          { x: 0.9, y: 4648 },
          { x: 1, y: 4663 },
        ],
      },
      {
        rangeX: [1.001, 9],
        rangeY: [4664, 4920],
        values: [
          { x: 1, y: 4663 },
          { x: 1.5, y: 4748 },
          { x: 2, y: 4832 },
          { x: 2.5, y: 4920 },
        ],
      },
    ],
  },
  90: {
    absoluteMinX: 0.5,
    absoluteMaxX: 2.3,
    absoluteMinY: 4634,
    absoluteMaxY: 4920,
    ranges: [
      {
        rangeX: [0, 1],
        rangeY: [4634, 4721],
        values: [
          { x: 0.5, y: 4634 },
          { x: 0.6, y: 4653 },
          { x: 0.7, y: 4670 },
          { x: 0.8, y: 4687 },
          { x: 0.9, y: 4706 },
          { x: 1, y: 4721 },
        ],
      },
      {
        rangeX: [1.001, 9],
        rangeY: [4722, 5000],
        values: [
          { x: 1, y: 4721 },
          { x: 1.4, y: 4787 },
          { x: 1.8, y: 4853 },
          { x: 2.3, y: 4920 },
        ],
      },
    ],
  },
  100: {
    absoluteMinX: 0.5,
    absoluteMaxX: 1.9,
    absoluteMinY: 4693,
    absoluteMaxY: 4920,
    ranges: [
      {
        rangeX: [0, 9],
        rangeY: [3000, 5000],
        values: [
          { x: 0.5, y: 4693 },
          { x: 1, y: 4778 },
          { x: 1.5, y: 4858 },
          { x: 1.9, y: 4920 },
        ],
      },
    ],
  },
  110: {
    absoluteMinX: 0.5,
    absoluteMaxX: 1.6,
    absoluteMinY: 4747,
    absoluteMaxY: 4920,
    ranges: [
      {
        rangeX: [0, 9],
        rangeY: [3000, 5000],
        values: [
          { x: 0.5, y: 4747 },
          { x: 0.8, y: 4798 },
          { x: 1.2, y: 4863 },
          { x: 1.6, y: 4920 },
        ],
      },
    ],
  },
  120: {
    absoluteMinX: 0.5,
    absoluteMaxX: 1.3,
    absoluteMinY: 4802,
    absoluteMaxY: 4920,
    ranges: [
      {
        rangeX: [0, 9],
        rangeY: [3000, 5000],
        values: [
          { x: 0.5, y: 4802 },
          { x: 0.8, y: 4848 },
          { x: 1.1, y: 4897 },
          { x: 1.3, y: 4920 },
        ],
      },
    ],
  },
  130: {
    absoluteMinX: 0.5,
    absoluteMaxX: 0.9,
    absoluteMinY: 4846,
    absoluteMaxY: 4920,
    ranges: [
      {
        rangeX: [0, 9],
        rangeY: [3000, 5000],
        values: [
          { x: 0.5, y: 4846 },
          { x: 0.7, y: 4881 },
          { x: 0.8, y: 4897 },
          { x: 0.9, y: 4920 },
        ],
      },
    ],
  },
  140: {
    absoluteMinX: 0.5,
    absoluteMaxX: 0.6,
    absoluteMinY: 4899,
    absoluteMaxY: 4920,
    ranges: [
      {
        rangeX: [0, 9],
        rangeY: [3000, 5000],
        values: [
          { x: 0.5, y: 4899 },
          { x: 0.54, y: 4904 },
          { x: 0.58, y: 4910 },
          { x: 0.6, y: 4920 },
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
 * @description Predict TTET given dropdown and weight using the reverse polynomial regressions.
 */
export const mtow_pc2dle_isa_2_predictTtet = (dropDown, weight) => {
  // Check flight enveloppe with dropdown
  if (!checkValueInSubrange(data, dropDown)) {
    return {
      value: null,
      error: "Outside defined dropdown range",
      text: "N/A",
    }
  }

  // Get low and high dropdown surrounding values
  const { lowValue: dropDownLow, highValue: dropDownHigh } = getLowHighValues(
    dropDown,
    10,
    140
  )

  // Check flight enveloppe with weight
  const valueInLimits = checkValueInLimits(
    data,
    dropDownLow,
    dropDownHigh,
    weight,
    "yAxis"
  )
  if (!valueInLimits.inLimits) return limitErrorObject(valueInLimits, "weight")

  // Get reverse regressions for low and high dropdowns
  const regressions = getRegressionsReverse(data, weight, 4)
  const ttetLow = regressions[dropDownLow].predict(weight)
  const ttetHigh = regressions[dropDownHigh].predict(weight)

  // Extrapolate TTET for given dropdown
  const ttet = extrapolation(
    dropDown,
    dropDownLow,
    ttetLow,
    dropDownHigh,
    ttetHigh
  )

  // Check flight enveloppe with TTET
  const ttetInLimits = setValueInsideLimits(
    data,
    dropDownLow,
    dropDownHigh,
    ttet,
    "xAxis"
  )
  return { value: Number(ttetInLimits.toFixed(1)), error: null, text: null }
}

/**
 * Generates curve data points for each isa based on regression calculations.
 *
 * @function curves
 * @returns {Object<string, Array<{x: number, y: number}>>} An object where:
 * - Each key is a isa (as a string),
 * - Each value is an array of points representing a curve,
 *   with:
 *   - `x`: zp value (input),
 *   - `y`: weight value (predicted).
 *
 * @description
 * For each isa:
 * - Iterates through Zp values from `absoluteMinX` to `absoluteMaxX` with a step of 10.
 * - Uses  regression to compute the corresponding weight.
 * - Only includes points where the weight is within the defined absolute Y range.
 */
const curves = () => {
  const curves = {}

  for (const dropdown in data) {
    const curve = []
    for (
      let ttet = data[dropdown].absoluteMinX;
      ttet <= data[dropdown].absoluteMaxX;
      ttet = Math.round((ttet + 0.1) * 10) / 10
    ) {
      const regressions = getRegressions(data, ttet)
      const weight = regressions[dropdown].predict(ttet)
      const absoluteMinY = data[dropdown].absoluteMinY
      const absoluteMaxY = data[dropdown].absoluteMaxY
      if (
        Math.round(weight) >= absoluteMinY &&
        Math.round(weight) <= absoluteMaxY
      )
        curve.push({ x: ttet, y: weight })
    }
    curves[dropdown] = curve
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
const areas = []

/**
 * Chart configuration and data for the MTOW PC2DLE ISA graph.
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
 * the **MTOW PC2DLE ISA** performance chart, including axis settings,
 * grid spacing, labels, scatter plot points, regression curves, borders, and shaded areas.
 */
export const mtow_pc2dle_isa_2_data = {
  name: "mtow_pc2dle_isa_2",
  title: "MAXIMUM TAKEOFF WEIGHT PC2DLE ISA",
  xmin: 0, // X axis minimum value
  xmax: 9, // X axis reference 0
  x0: 0, // X axis maximum value
  ymin: 3000, // Y axis minimum value
  ymax: 5000, // Y axis maximum value
  y0: 3000, // Y axis reference 0
  gridSpacingX: 0.1, // X axis grid spacing (value)
  gridSpacingY: 100, // Y axis grid spacing (value)
  gridSpacingThickX: 0.5, // X axis thick grid spacing (value)
  gridSpacingThickY: 500, // Y axis thick grid spacing (value)
  labelSpacingX: 1, // X axis label spacing (value)
  labelSpacingY: 500, // Y axis label spacing (value)
  xLabel: "TTET (s) at ISA=0, Hp=0ft, without wind",
  yLabel: "WEIGHT (kg)",
  scatterPlot: scatterPlot(data),
  curves: curves(),
  labels: labels,
  borderLines: borderLines,
  areas: areas,
}
