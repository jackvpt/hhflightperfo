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
    x: 4,
    y: 4150,
    angle: -16,
  },
  {
    text: "0",
    x: 4,
    y: 4320,
    angle: -15,
  },
  {
    text: "50",
    x: 3,
    y: 4480,
    angle: -12,
  },
  {
    text: "100",
    x: 2,
    y: 4640,
    angle: -12,
  },
  {
    text: "150",
    x: 1,
    y: 4810,
    angle: -14,
  },
]

// Border lines (sides of flight envelope)
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
    absoluteMaxX: 9,
    absoluteMinY: 3967,
    absoluteMaxY: 4649,
    ranges: [
      {
        rangeX: [0, 0.5],
        rangeY: [3967, 3987],
        values: [
          { x: 0.0, y: 3967 },
          { x: 0.1, y: 3972 },
          { x: 0.2, y: 3974 },
          { x: 0.3, y: 3979 },
          { x: 0.4, y: 3982 },
          { x: 0.5, y: 3987 },
        ],
      },
      {
        rangeX: [0.501, 8],
        rangeY: [3988, 4598],
        values: [
          { x: 0.5, y: 3987 },
          { x: 2, y: 4086 },
          { x: 4, y: 4242 },
          { x: 6, y: 4412 },
          { x: 8, y: 4598 },
        ],
      },
      {
        rangeX: [8.001, 9],
        rangeY: [4599, 5000],
        values: [
          { x: 8, y: 4598 },
          { x: 8.3, y: 4613 },
          { x: 8.7, y: 4633 },
          { x: 9, y: 4649 },
        ],
      },
    ],
  },
  10: {
    absoluteMinX: 0,
    absoluteMaxX: 9,
    absoluteMinY: 4000,
    absoluteMaxY: 4700,
    ranges: [
      {
        rangeX: [0, 0.5],
        rangeY: [4000, 4032],
        values: [
          { x: 0.0, y: 4000 },
          { x: 0.1, y: 4008 },
          { x: 0.2, y: 4013 },
          { x: 0.3, y: 4018 },
          { x: 0.4, y: 4023 },
          { x: 0.5, y: 4032 },
        ],
      },
      {
        rangeX: [0.501, 8],
        rangeY: [4033, 4647],
        values: [
          { x: 0.5, y: 4032 },
          { x: 2, y: 4133 },
          { x: 4, y: 4290 },
          { x: 6, y: 4460 },
          { x: 8, y: 4647 },
        ],
      },
      {
        rangeX: [8.001, 9],
        rangeY: [4648, 5000],
        values: [
          { x: 8, y: 4647 },
          { x: 8.3, y: 4663 },
          { x: 8.7, y: 4684 },
          { x: 9, y: 4700 },
        ],
      },
    ],
  },
  20: {
    absoluteMinX: 0,
    absoluteMaxX: 9,
    absoluteMinY: 4042,
    absoluteMaxY: 4753,
    ranges: [
      {
        rangeX: [0, 0.5],
        rangeY: [4042, 4075],
        values: [
          { x: 0.0, y: 4042 },
          { x: 0.1, y: 4049 },
          { x: 0.2, y: 4056 },
          { x: 0.3, y: 4063 },
          { x: 0.4, y: 4068 },
          { x: 0.5, y: 4075 },
        ],
      },
      {
        rangeX: [0.501, 8],
        rangeY: [4076, 4700],
        values: [
          { x: 0.5, y: 4075 },
          { x: 2, y: 4178 },
          { x: 4, y: 4338 },
          { x: 6, y: 4508 },
          { x: 8, y: 4700 },
        ],
      },
      {
        rangeX: [8.001, 9],
        rangeY: [4701, 5000],
        values: [
          { x: 8, y: 4700 },
          { x: 8.3, y: 4716 },
          { x: 8.7, y: 4736 },
          { x: 9, y: 4753 },
        ],
      },
    ],
  },
  30: {
    absoluteMinX: 0,
    absoluteMaxX: 9,
    absoluteMinY: 4084,
    absoluteMaxY: 4806,
    ranges: [
      {
        rangeX: [0, 0.5],
        rangeY: [4084, 4118],
        values: [
          { x: 0.0, y: 4084 },
          { x: 0.1, y: 4089 },
          { x: 0.2, y: 4098 },
          { x: 0.3, y: 4105 },
          { x: 0.4, y: 4111 },
          { x: 0.5, y: 4118 },
        ],
      },
      {
        rangeX: [0.501, 8],
        rangeY: [4119, 4750],
        values: [
          { x: 0.5, y: 4118 },
          { x: 2, y: 4224 },
          { x: 4, y: 4386 },
          { x: 6, y: 4559 },
          { x: 8, y: 4750 },
        ],
      },
      {
        rangeX: [8.001, 9],
        rangeY: [4751, 5000],
        values: [
          { x: 8, y: 4750 },
          { x: 8.3, y: 4768 },
          { x: 8.7, y: 4790 },
          { x: 9, y: 4806 },
        ],
      },
    ],
  },
  40: {
    absoluteMinX: 0,
    absoluteMaxX: 9,
    absoluteMinY: 4126,
    absoluteMaxY: 4843,
    ranges: [
      {
        rangeX: [0, 0.5],
        rangeY: [4126, 4161],
        values: [
          { x: 0.0, y: 4126 },
          { x: 0.1, y: 4133 },
          { x: 0.2, y: 4140 },
          { x: 0.3, y: 4148 },
          { x: 0.4, y: 4153 },
          { x: 0.5, y: 4161 },
        ],
      },
      {
        rangeX: [0.501, 8],
        rangeY: [4162, 4805],
        values: [
          { x: 0.5, y: 4161 },
          { x: 2, y: 4271 },
          { x: 4, y: 4435 },
          { x: 6, y: 4609 },
          { x: 8, y: 4805 },
        ],
      },
      {
        rangeX: [8.001, 9],
        rangeY: [4806, 5000],
        values: [
          { x: 8, y: 4805 },
          { x: 8.3, y: 4822 },
          { x: 8.7, y: 4838 },
          { x: 9, y: 4843 },
        ],
      },
    ],
  },
  50: {
    absoluteMinX: 0,
    absoluteMaxX: 9,
    absoluteMinY: 4171,
    absoluteMaxY: 4857,
    ranges: [
      {
        rangeX: [0, 0.5],
        rangeY: [4171, 4207],
        values: [
          { x: 0.0, y: 4171 },
          { x: 0.1, y: 4177 },
          { x: 0.2, y: 4185 },
          { x: 0.3, y: 4193 },
          { x: 0.4, y: 4198 },
          { x: 0.5, y: 4207 },
        ],
      },
      {
        rangeX: [0.501, 7.7],
        rangeY: [4208, 4838],
        values: [
          { x: 0.5, y: 4207 },
          { x: 2, y: 4318 },
          { x: 4, y: 4484 },
          { x: 6, y: 4662 },
          { x: 7.7, y: 4830 },
        ],
      },
      {
        rangeX: [7.701, 9],
        rangeY: [4831, 5000],
        values: [
          { x: 7.7, y: 4830 },
          { x: 8.3, y: 4845 },
          { x: 8.7, y: 4851 },
          { x: 9, y: 4857 },
        ],
      },
    ],
  },
  60: {
    absoluteMinX: 0,
    absoluteMaxX: 9,
    absoluteMinY: 4215,
    absoluteMaxY: 4866,
    ranges: [
      {
        rangeX: [0, 2],
        rangeY: [4215, 4365],
        values: [
          { x: 0.0, y: 4215 },
          { x: 0.5, y: 4252 },
          { x: 1, y: 4290 },
          { x: 1.5, y: 4327 },
          { x: 2, y: 4365 },
        ],
      },
      {
        rangeX: [2.001, 7.2],
        rangeY: [4366, 4833],
        values: [
          { x: 2, y: 4365 },
          { x: 4, y: 4532 },
          { x: 6, y: 4713 },
          { x: 7.2, y: 4833 },
        ],
      },
      {
        rangeX: [7.2001, 9],
        rangeY: [4834, 5000],
        values: [
          { x: 7.2, y: 4833 },
          { x: 7.8, y: 4846 },
          { x: 8.5, y: 4859 },
          { x: 9, y: 4866 },
        ],
      },
    ],
  },
  70: {
    absoluteMinX: 0,
    absoluteMaxX: 9,
    absoluteMinY: 4258,
    absoluteMaxY: 4874,
    ranges: [
      {
        rangeX: [0, 2],
        rangeY: [4258, 4414],
        values: [
          { x: 0.0, y: 4258 },
          { x: 0.5, y: 4298 },
          { x: 1, y: 4335 },
          { x: 1.5, y: 4373 },
          { x: 2, y: 4414 },
        ],
      },
      {
        rangeX: [2.001, 6.6],
        rangeY: [4415, 4828],
        values: [
          { x: 2, y: 4414 },
          { x: 3.5, y: 4538 },
          { x: 5, y: 4673 },
          { x: 6.6, y: 4828 },
        ],
      },
      {
        rangeX: [6.6001, 9],
        rangeY: [4829, 5000],
        values: [
          { x: 6.6, y: 4828 },
          { x: 7.5, y: 4851 },
          { x: 8.5, y: 4866 },
          { x: 9, y: 4874 },
        ],
      },
    ],
  },
  80: {
    absoluteMinX: 0,
    absoluteMaxX: 9,
    absoluteMinY: 4305,
    absoluteMaxY: 4886,
    ranges: [
      {
        rangeX: [0, 6.1],
        rangeY: [3000, 4828],
        values: [
          { x: 0.0, y: 4305 },
          { x: 1, y: 4382 },
          { x: 2, y: 4462 },
          { x: 3, y: 4546 },
          { x: 4, y: 4634 },
          { x: 5, y: 4723 },
          { x: 6.1, y: 4828 },
        ],
      },

      {
        rangeX: [6.1001, 9],
        rangeY: [4829, 5000],
        values: [
          { x: 6.1, y: 4828 },
          { x: 7, y: 4850 },
          { x: 8, y: 4868 },
          { x: 9, y: 4886 },
        ],
      },
    ],
  },
  90: {
    absoluteMinX: 0,
    absoluteMaxX: 9,
    absoluteMinY: 4350,
    absoluteMaxY: 4898,
    ranges: [
      {
        rangeX: [0, 5.5],
        rangeY: [3000, 4828],
        values: [
          { x: 0.0, y: 4350 },
          { x: 1, y: 4428 },
          { x: 2, y: 4512 },
          { x: 3, y: 4596 },
          { x: 4, y: 4684 },
          { x: 5, y: 4777 },
          { x: 5.5, y: 4828 },
        ],
      },

      {
        rangeX: [5.5001, 9],
        rangeY: [4829, 5000],
        values: [
          { x: 5.5, y: 4828 },
          { x: 6.5, y: 4850 },
          { x: 8, y: 4877 },
          { x: 9, y: 4898 },
        ],
      },
    ],
  },
  100: {
    absoluteMinX: 0,
    absoluteMaxX: 9,
    absoluteMinY: 4394,
    absoluteMaxY: 4910,
    ranges: [
      {
        rangeX: [0, 5],
        rangeY: [3000, 4831],
        values: [
          { x: 0.0, y: 4394 },
          { x: 1, y: 4476 },
          { x: 2, y: 4563 },
          { x: 3, y: 4647 },
          { x: 4, y: 4736 },
          { x: 5, y: 4831 },
        ],
      },
      {
        rangeX: [5.001, 9],
        rangeY: [4832, 5000],
        values: [
          { x: 5, y: 4831 },
          { x: 6, y: 4851 },
          { x: 7.5, y: 4877 },
          { x: 9, y: 4910 },
        ],
      },
    ],
  },
  110: {
    absoluteMinX: 0,
    absoluteMaxX: 9,
    absoluteMinY: 4444,
    absoluteMaxY: 4919,
    ranges: [
      {
        rangeX: [0, 4.4],
        rangeY: [3000, 4828],
        values: [
          { x: 0.0, y: 4444 },
          { x: 1, y: 4525 },
          { x: 2, y: 4612 },
          { x: 3, y: 4698 },
          { x: 4.4, y: 4828 },
        ],
      },
      {
        rangeX: [4.4001, 9],
        rangeY: [4829, 5000],
        values: [
          { x: 4.4, y: 4828 },
          { x: 6, y: 4863 },
          { x: 7.5, y: 4889 },
          { x: 9, y: 4919 },
        ],
      },
    ],
  },
  120: {
    absoluteMinX: 0,
    absoluteMaxX: 9,
    absoluteMinY: 4493,
    absoluteMaxY: 4920,
    ranges: [
      {
        rangeX: [0, 3.9],
        rangeY: [3000, 4831],
        values: [
          { x: 0.0, y: 4493 },
          { x: 1, y: 4575 },
          { x: 2, y: 4665 },
          { x: 3, y: 4750 },
          { x: 3.9, y: 4831 },
        ],
      },
      {
        rangeX: [3.9001, 9],
        rangeY: [4832, 5000],
        values: [
          { x: 3.9, y: 4831 },
          { x: 5, y: 4854 },
          { x: 7, y: 4891 },
          { x: 9, y: 4920 },
        ],
      },
    ],
  },
  130: {
    absoluteMinX: 0,
    absoluteMaxX: 9,
    absoluteMinY: 4542,
    absoluteMaxY: 4920,
    ranges: [
      {
        rangeX: [0, 3.3],
        rangeY: [3000, 4831],
        values: [
          { x: 0.0, y: 4542 },
          { x: 1, y: 4626 },
          { x: 2, y: 4718 },
          { x: 3.3, y: 4831 },
        ],
      },
      {
        rangeX: [3.3001, 9],
        rangeY: [4832, 5000],
        values: [
          { x: 3.3, y: 4831 },
          { x: 5, y: 4864 },
          { x: 7, y: 4903 },
          { x: 9, y: 4920 },
        ],
      },
    ],
  },
  140: {
    absoluteMinX: 0,
    absoluteMaxX: 9,
    absoluteMinY: 4593,
    absoluteMaxY: 4920,
    ranges: [
      {
        rangeX: [0, 2.7],
        rangeY: [3000, 4831],
        values: [
          { x: 0.0, y: 4593 },
          { x: 1, y: 4678 },
          { x: 2, y: 4770 },
          { x: 2.7, y: 4831 },
        ],
      },
      {
        rangeX: [2.7001, 9],
        rangeY: [4832, 5000],
        values: [
          { x: 2.7, y: 4831 },
          { x: 4, y: 4858 },
          { x: 6, y: 4894 },
          { x: 8, y: 4911 },
          { x: 9, y: 4920 },
        ],
      },
    ],
  },
  150: {
    absoluteMinX: 0,
    absoluteMaxX: 9,
    absoluteMinY: 4644,
    absoluteMaxY: 4920,
    ranges: [
      {
        rangeX: [0, 2],
        rangeY: [3000, 4826],
        values: [
          { x: 0.0, y: 4644 },
          { x: 0.5, y: 4688 },
          { x: 1, y: 4732 },
          { x: 1.5, y: 4777 },
          { x: 2, y: 4826 },
        ],
      },
      {
        rangeX: [2.001, 9],
        rangeY: [4827, 5000],
        values: [
          { x: 2, y: 4826 },
          { x: 3, y: 4850 },
          { x: 4, y: 4867 },
          { x: 5, y: 4885 },
          { x: 6, y: 4907 },
          { x: 7, y: 4916 },
          { x: 8, y: 4919 },
          { x: 9, y: 4920 },
        ],
      },
    ],
  },
}

/**
 *
 * @param {Number} dropDown
 * @param {Number} ttet
 * @returns {Number} predicted weight
 * @description Predict weight given dropdown and ttet using the polynomial regressions.
 */
export const mlw_pc2dle_isa_2_predictWeight = (dropDown, ttet) => {
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
    150
  )

  // Check flight enveloppe with TTET
  const valueInLimits = checkValueInLimits(
    data,
    dropDownLow,
    dropDownHigh,
    ttet,
    "xAxis"
  )
  if (!valueInLimits.inLimits) return limitErrorObject(valueInLimits, "TTET")

  // Get  regressions for low and high dropdowns
  const regressions = getRegressions(data, ttet, 4)
  const weightLow = regressions[dropDownLow].predict(ttet)
  const weightHigh = regressions[dropDownHigh].predict(ttet)

  // Extrapolate weight for given dropdown
  const weight = extrapolation(
    dropDown,
    dropDownLow,
    weightLow,
    dropDownHigh,
    weightHigh
  )

  // Check flight enveloppe with weight
  const weightInLimits = setValueInsideLimits(
    data,
    dropDownLow,
    dropDownHigh,
    weight,
    "yAxis"
  )
  return { value: Math.round(weightInLimits), error: null, text: null }
}

/**
 *
 * @param {Number} temperature
 * @param {Number} zp
 * @returns {Number} predicted ttet
 * @description Predict TTET given dropdown and weight using the reverse polynomial regressions.
 */
export const mlw_pc2dle_isa_2_predictTtet = (dropDown, weight) => {
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
    150
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
export const mlw_pc2dle_isa_2_data = {
  name: "mlw_pc2dle_isa_2",
  title: "MAXIMUM LANDING WEIGHT PC2DLE ISA",
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
