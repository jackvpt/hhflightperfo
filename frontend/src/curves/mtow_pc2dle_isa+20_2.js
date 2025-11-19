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

// Labels for temperatures
const labels = [
  {
    text: "AVAILABLE DROP DOWN (ft)",
    x: 3.5,
    y: 4100,
    angle: -37,
  },
  {
    text: "0",
    x: 3.5,
    y: 4280,
    angle: -38,
  },
  {
    text: "50",
    x: 2.8,
    y: 4560,
    angle: -36,
  },
  {
    text: "100",
    x: 2.1,
    y: 4740,
    angle: -32,
  },
  {
    text: "150",
    x: 1.4,
    y: 4900,
    angle: -25,
  },
]

// Border lines (sides of flight envelope)
const borderLines = [
  {
    color: "",
    thickness: 1.5,
    points: [
      { x: 0.5, y: 3577 },
      { x: 0.5, y: 4652 },
    ],
  },
  {
    color: "",
    thickness: 1.5,
    points: [
      { x: 2.1, y: 4920 },
      { x: 6.4, y: 4920 },
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
    absoluteMaxX: 6.4,
    absoluteMinY: 3577,
    absoluteMaxY: 4920,
    ranges: [
      {
        rangeX: [0, 1],
        rangeY: [3577, 3652],
        values: [
          { x: 0.5, y: 3577 },
          { x: 0.6, y: 3590 },
          { x: 0.7, y: 3605 },
          { x: 0.8, y: 3621 },
          { x: 0.9, y: 3634 },
          { x: 1, y: 3652 },
        ],
      },
      {
        rangeX: [1.001, 9],
        rangeY: [3653, 4920],
        values: [
          { x: 1, y: 3652 },
          { x: 2, y: 3855 },
          { x: 4, y: 4293 },
          { x: 5.5, y: 4671 },
          { x: 6.4, y: 4920 },
        ],
      },
    ],
  },
  10: {
    absoluteMinX: 0.5,
    absoluteMaxX: 6.1,
    absoluteMinY: 3693,
    absoluteMaxY: 4920,
    ranges: [
      {
        rangeX: [0, 1],
        rangeY: [3693, 3772],
        values: [
          { x: 0.5, y: 3693 },
          { x: 0.6, y: 3708 },
          { x: 0.7, y: 3723 },
          { x: 0.8, y: 3740 },
          { x: 0.9, y: 3754 },
          { x: 1, y: 3772 },
        ],
      },
      {
        rangeX: [1.001, 9],
        rangeY: [3773, 4920],
        values: [
          { x: 1, y: 3772 },
          { x: 2, y: 3964 },
          { x: 4, y: 4393 },
          { x: 5.5, y: 4758 },
          { x: 6.1, y: 4920 },
        ],
      },
    ],
  },
  20: {
    absoluteMinX: 0.5,
    absoluteMaxX: 5.8,
    absoluteMinY: 3797,
    absoluteMaxY: 4920,
    ranges: [
      {
        rangeX: [0, 1],
        rangeY: [3797, 3873],
        values: [
          { x: 0.5, y: 3797 },
          { x: 0.6, y: 3811 },
          { x: 0.7, y: 3824 },
          { x: 0.8, y: 3842 },
          { x: 0.9, y: 3858 },
          { x: 1, y: 3873 },
        ],
      },
      {
        rangeX: [1.001, 9],
        rangeY: [3874, 4920],
        values: [
          { x: 1, y: 3873 },
          { x: 2, y: 4058 },
          { x: 4, y: 4482 },
          { x: 5.8, y: 4920 },
        ],
      },
    ],
  },
  30: {
    absoluteMinX: 0.5,
    absoluteMaxX: 5.5,
    absoluteMinY: 3887,
    absoluteMaxY: 4920,
    ranges: [
      {
        rangeX: [0, 1],
        rangeY: [3887, 3970],
        values: [
          { x: 0.5, y: 3887 },
          { x: 0.6, y: 3902 },
          { x: 0.7, y: 3917 },
          { x: 0.8, y: 3935 },
          { x: 0.9, y: 3951 },
          { x: 1, y: 3970 },
        ],
      },
      {
        rangeX: [1.001, 9],
        rangeY: [3971, 4920],
        values: [
          { x: 1, y: 3970 },
          { x: 2, y: 4144 },
          { x: 4, y: 4565 },
          { x: 5.5, y: 4920 },
        ],
      },
    ],
  },
  40: {
    absoluteMinX: 0.5,
    absoluteMaxX: 5.2,
    absoluteMinY: 3971,
    absoluteMaxY: 4920,
    ranges: [
      {
        rangeX: [0, 1],
        rangeY: [3971, 4053],
        values: [
          { x: 0.5, y: 3971 },
          { x: 0.6, y: 3988 },
          { x: 0.7, y: 4001 },
          { x: 0.8, y: 4019 },
          { x: 0.9, y: 4036 },
          { x: 1, y: 4053 },
        ],
      },
      {
        rangeX: [1.001, 9],
        rangeY: [4054, 4920],
        values: [
          { x: 1, y: 4053 },
          { x: 2, y: 4226 },
          { x: 4, y: 4643 },
          { x: 5.2, y: 4920 },
        ],
      },
    ],
  },
  50: {
    absoluteMinX: 0.5,
    absoluteMaxX: 4.9,
    absoluteMinY: 4050,
    absoluteMaxY: 4920,
    ranges: [
      {
        rangeX: [0, 1],
        rangeY: [4050, 4132],
        values: [
          { x: 0.5, y: 4050 },
          { x: 0.6, y: 4063 },
          { x: 0.7, y: 4081 },
          { x: 0.8, y: 4097 },
          { x: 0.9, y: 4115 },
          { x: 1, y: 4132 },
        ],
      },
      {
        rangeX: [1.001, 9],
        rangeY: [4133, 4920],
        values: [
          { x: 1, y: 4132 },
          { x: 2, y: 4302 },
          { x: 4, y: 4717 },
          { x: 4.9, y: 4920 },
        ],
      },
    ],
  },
  60: {
    absoluteMinX: 0.5,
    absoluteMaxX: 4.6,
    absoluteMinY: 4123,
    absoluteMaxY: 4920,
    ranges: [
      {
        rangeX: [0, 1],
        rangeY: [4123, 4205],
        values: [
          { x: 0.5, y: 4123 },
          { x: 0.6, y: 4138 },
          { x: 0.7, y: 4154 },
          { x: 0.8, y: 4170 },
          { x: 0.9, y: 4188 },
          { x: 1, y: 4205 },
        ],
      },
      {
        rangeX: [1.001, 9],
        rangeY: [4206, 4920],
        values: [
          { x: 1, y: 4205 },
          { x: 2, y: 4375 },
          { x: 3.5, y: 4674 },
          { x: 4.6, y: 4920 },
        ],
      },
    ],
  },
  70: {
    absoluteMinX: 0.5,
    absoluteMaxX: 4.3,
    absoluteMinY: 4191,
    absoluteMaxY: 4920,
    ranges: [
      {
        rangeX: [0, 1],
        rangeY: [4191, 4275],
        values: [
          { x: 0.5, y: 4191 },
          { x: 0.6, y: 4207 },
          { x: 0.7, y: 4222 },
          { x: 0.8, y: 4241 },
          { x: 0.9, y: 4258 },
          { x: 1, y: 4275 },
        ],
      },
      {
        rangeX: [1.001, 9],
        rangeY: [4276, 4920],
        values: [
          { x: 1, y: 4275 },
          { x: 2, y: 4443 },
          { x: 3.5, y: 4741 },
          { x: 4.3, y: 4920 },
        ],
      },
    ],
  },
  80: {
    absoluteMinX: 0.5,
    absoluteMaxX: 4,
    absoluteMinY: 4258,
    absoluteMaxY: 4920,
    ranges: [
      {
        rangeX: [0, 1],
        rangeY: [4258, 4341],
        values: [
          { x: 0.5, y: 4258 },
          { x: 0.6, y: 4273 },
          { x: 0.7, y: 4289 },
          { x: 0.8, y: 4306 },
          { x: 0.9, y: 4323 },
          { x: 1, y: 4341 },
        ],
      },
      {
        rangeX: [1.001, 9],
        rangeY: [4342, 4920],
        values: [
          { x: 1, y: 4341 },
          { x: 2, y: 4508 },
          { x: 3, y: 4702 },
          { x: 4, y: 4920 },
        ],
      },
    ],
  },
  90: {
    absoluteMinX: 0.5,
    absoluteMaxX: 3.7,
    absoluteMinY: 4319,
    absoluteMaxY: 4920,
    ranges: [
      {
        rangeX: [0, 1],
        rangeY: [4319, 4404],
        values: [
          { x: 0.5, y: 4319 },
          { x: 0.6, y: 4334 },
          { x: 0.7, y: 4352 },
          { x: 0.8, y: 4370 },
          { x: 0.9, y: 4384 },
          { x: 1, y: 4404 },
        ],
      },
      {
        rangeX: [1.001, 9],
        rangeY: [4405, 4920],
        values: [
          { x: 1, y: 4404 },
          { x: 2, y: 4571 },
          { x: 3, y: 4764 },
          { x: 3.7, y: 4920 },
        ],
      },
    ],
  },
  100: {
    absoluteMinX: 0.5,
    absoluteMaxX: 3.5,
    absoluteMinY: 4384,
    absoluteMaxY: 4920,
    ranges: [
      {
        rangeX: [0, 1],
        rangeY: [4384, 4464],
        values: [
          { x: 0.5, y: 4384 },
          { x: 0.6, y: 4397 },
          { x: 0.7, y: 4412 },
          { x: 0.8, y: 4429 },
          { x: 0.9, y: 4447 },
          { x: 1, y: 4464 },
        ],
      },
      {
        rangeX: [1.001, 9],
        rangeY: [4465, 4920],
        values: [
          { x: 1, y: 4464 },
          { x: 2, y: 4631 },
          { x: 3, y: 4824 },
          { x: 3.5, y: 4920 },
        ],
      },
    ],
  },
  110: {
    absoluteMinX: 0.5,
    absoluteMaxX: 3.2,
    absoluteMinY: 4439,
    absoluteMaxY: 4920,
    ranges: [
      {
        rangeX: [0, 1],
        rangeY: [4439, 4524],
        values: [
          { x: 0.5, y: 4439 },
          { x: 0.6, y: 4455 },
          { x: 0.7, y: 4473 },
          { x: 0.8, y: 4489 },
          { x: 0.9, y: 4508 },
          { x: 1, y: 4524 },
        ],
      },
      {
        rangeX: [1.001, 9],
        rangeY: [4525, 4920],
        values: [
          { x: 1, y: 4524 },
          { x: 2, y: 4690 },
          { x: 2.5, y: 4785 },
          { x: 3.2, y: 4920 },
        ],
      },
    ],
  },
  120: {
    absoluteMinX: 0.5,
    absoluteMaxX: 2.9,
    absoluteMinY: 4493,
    absoluteMaxY: 4920,
    ranges: [
      {
        rangeX: [0, 1],
        rangeY: [4493, 4579],
        values: [
          { x: 0.5, y: 4493 },
          { x: 0.6, y: 4512 },
          { x: 0.7, y: 4528 },
          { x: 0.8, y: 4545 },
          { x: 0.9, y: 4562 },
          { x: 1, y: 4579 },
        ],
      },
      {
        rangeX: [1.001, 9],
        rangeY: [4580, 4920],
        values: [
          { x: 1, y: 4579 },
          { x: 1.5, y: 4661 },
          { x: 2, y: 4747 },
          { x: 2.9, y: 4920 },
        ],
      },
    ],
  },
  130: {
    absoluteMinX: 0.5,
    absoluteMaxX: 2.6,
    absoluteMinY: 4550,
    absoluteMaxY: 4920,
    ranges: [
      {
        rangeX: [0, 1],
        rangeY: [4550, 4634],
        values: [
          { x: 0.5, y: 4550 },
          { x: 0.6, y: 4566 },
          { x: 0.7, y: 4584 },
          { x: 0.8, y: 4600 },
          { x: 0.9, y: 4617 },
          { x: 1, y: 4634 },
        ],
      },
      {
        rangeX: [1.001, 9],
        rangeY: [4635, 4920],
        values: [
          { x: 1, y: 4634 },
          { x: 1.5, y: 4716 },
          { x: 2, y: 4804 },
          { x: 2.6, y: 4920 },
        ],
      },
    ],
  },
  140: {
    absoluteMinX: 0.5,
    absoluteMaxX: 2.3,
    absoluteMinY: 4602,
    absoluteMaxY: 4920,
    ranges: [
      {
        rangeX: [0, 1],
        rangeY: [4602, 4687],
        values: [
          { x: 0.5, y: 4602 },
          { x: 0.6, y: 4617 },
          { x: 0.7, y: 4636 },
          { x: 0.8, y: 4655 },
          { x: 0.9, y: 4670 },
          { x: 1, y: 4687 },
        ],
      },
      {
        rangeX: [1.001, 9],
        rangeY: [4688, 4920],
        values: [
          { x: 1, y: 4687 },
          { x: 1.3, y: 4736 },
          { x: 1.7, y: 4804 },
          { x: 2.3, y: 4920 },
        ],
      },
    ],
  },
  150: {
    absoluteMinX: 0.5,
    absoluteMaxX: 2.1,
    absoluteMinY: 4652,
    absoluteMaxY: 4920,
    ranges: [
      {
        rangeX: [0, 1],
        rangeY: [4652],
        values: [
          { x: 0.5, y: 4652 },
          { x: 0.6, y: 4670 },
          { x: 0.7, y: 4687 },
          { x: 0.8, y: 4705 },
          { x: 0.9, y: 4722 },
          { x: 1, y: 4740 },
        ],
      },
      {
        rangeX: [1.001, 9],
        rangeY: [4741, 4920],
        values: [
          { x: 1, y: 4740 },
          { x: 1.3, y: 4789 },
          { x: 1.7, y: 4854 },
          { x: 2.1, y: 4920 },
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
export const mtow_pc2dle_isa20_2_predictTtet = (dropDown, weight) => {
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
  if (!checkValueInLimits(data, dropDownLow, dropDownHigh, weight, "yAxis").inLimits) {
    return {
      value: null,
      error: "Outside defined weight range",
      text: "N/A",
    }
  }

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
export const mtow_pc2dle_isa20_2_data = {
  name: "mtow_pc2dle_isa+20_2",
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
