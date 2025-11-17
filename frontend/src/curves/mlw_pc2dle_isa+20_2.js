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
  // {
  //   text: "AVAILABLE DROP DOWN (ft)",
  //   x: 4,
  //   y: 4150,
  //   angle: -16,
  // },
  // {
  //   text: "0",
  //   x: 4,
  //   y: 4320,
  //   angle: -15,
  // },
  // {
  //   text: "50",
  //   x: 3,
  //   y: 4480,
  //   angle: -12,
  // },
  // {
  //   text: "100",
  //   x: 2,
  //   y: 4640,
  //   angle: -12,
  // },
  // {
  //   text: "150",
  //   x: 1,
  //   y: 4810,
  //   angle: -14,
  // },
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
    absoluteMinY: 3761,
    absoluteMaxY: 4410,
    ranges: [
      {
        rangeX: [0, 0.5],
        rangeY: [3761, 3798],
        values: [
          { x: 0.0, y: 3761 },
          { x: 0.1, y: 3768 },
          { x: 0.2, y: 3776 },
          { x: 0.3, y: 3786 },
          { x: 0.4, y: 3791 },
          { x: 0.5, y: 3798 },
        ],
      },
      {
        rangeX: [0.501, 8],
        rangeY: [3799, 4363],
        values: [
          { x: 0.5, y: 3798 },
          { x: 2, y: 3890 },
          { x: 4, y: 4034 },
          { x: 6, y: 4191 },
          { x: 8, y: 4363 },
        ],
      },
      {
        rangeX: [8.001, 9],
        rangeY: [4364, 5000],
        values: [
          { x: 8, y: 4363 },
          { x: 8.3, y: 4378 },
          { x: 8.7, y: 4395 },
          { x: 9, y: 4410 },
        ],
      },
    ],
  },
  10: {
    absoluteMinX: 0,
    absoluteMaxX: 9,
    absoluteMinY: 3809,
    absoluteMaxY: 4458,
    ranges: [
      {
        rangeX: [0, 0.5],
        rangeY: [3809, 3836],
        values: [
          { x: 0.0, y: 3809 },
          { x: 0.1, y: 3815 },
          { x: 0.2, y: 3820 },
          { x: 0.3, y: 3825 },
          { x: 0.4, y: 3832 },
          { x: 0.5, y: 3836 },
        ],
      },
      {
        rangeX: [0.501, 8],
        rangeY: [3836, 4410],
        values: [
          { x: 0.5, y: 3836 },
          { x: 2, y: 3932 },
          { x: 4, y: 4076 },
          { x: 6, y: 4236 },
          { x: 8, y: 4410 },
        ],
      },
      {
        rangeX: [8.001, 9],
        rangeY: [4411, 5000],
        values: [
          { x: 8, y: 4410 },
          { x: 8.3, y: 4425 },
          { x: 8.7, y: 4444 },
          { x: 9, y: 4458 },
        ],
      },
    ],
  },
  20: {
    absoluteMinX: 0,
    absoluteMaxX: 9,
    absoluteMinY: 3846,
    absoluteMaxY: 4509,
    ranges: [
      {
        rangeX: [0, 0.5],
        rangeY: [3846, 3878],
        values: [
          { x: 0.0, y: 3846 },
          { x: 0.1, y: 3853 },
          { x: 0.2, y: 3859 },
          { x: 0.3, y: 3866 },
          { x: 0.4, y: 3873 },
          { x: 0.5, y: 3878 },
        ],
      },
      {
        rangeX: [0.501, 8],
        rangeY: [3879, 4456],
        values: [
          { x: 0.5, y: 3878 },
          { x: 2, y: 3974 },
          { x: 4, y: 4123 },
          { x: 6, y: 4282 },
          { x: 8, y: 4456 },
        ],
      },
      {
        rangeX: [8.001, 9],
        rangeY: [4457, 5000],
        values: [
          { x: 8, y: 4456 },
          { x: 8.3, y: 4473 },
          { x: 8.7, y: 4492 },
          { x: 9, y: 4509 },
        ],
      },
    ],
  },
  30: {
    absoluteMinX: 0,
    absoluteMaxX: 9,
    absoluteMinY: 3886,
    absoluteMaxY: 4559,
    ranges: [
      {
        rangeX: [0, 0.5],
        rangeY: [3886, 3917],
        values: [
          { x: 0.0, y: 3886 },
          { x: 0.1, y: 3892 },
          { x: 0.2, y: 3899 },
          { x: 0.3, y: 3904 },
          { x: 0.4, y: 3911 },
          { x: 0.5, y: 3917 },
        ],
      },
      {
        rangeX: [0.501, 8],
        rangeY: [3917, 4506],
        values: [
          { x: 0.5, y: 3917 },
          { x: 2, y: 4016 },
          { x: 4, y: 4169 },
          { x: 6, y: 4328 },
          { x: 8, y: 4506 },
        ],
      },
      {
        rangeX: [8.001, 9],
        rangeY: [4507, 5000],
        values: [
          { x: 8, y: 4506 },
          { x: 8.3, y: 4521 },
          { x: 8.7, y: 4541 },
          { x: 9, y: 4559 },
        ],
      },
    ],
  },
  40: {
    absoluteMinX: 0,
    absoluteMaxX: 9,
    absoluteMinY: 3927,
    absoluteMaxY: 4591,
    ranges: [
      {
        rangeX: [0, 0.5],
        rangeY: [3927, 3957],
        values: [
          { x: 0.0, y: 3927 },
          { x: 0.1, y: 3933 },
          { x: 0.2, y: 3940 },
          { x: 0.3, y: 3946 },
          { x: 0.4, y: 3952 },
          { x: 0.5, y: 3957 },
        ],
      },
      {
        rangeX: [0.501, 8],
        rangeY: [3958, 4555],
        values: [
          { x: 0.5, y: 3957 },
          { x: 2, y: 4060 },
          { x: 4, y: 4212 },
          { x: 6, y: 4375 },
          { x: 8, y: 4555 },
        ],
      },
      {
        rangeX: [8.001, 9],
        rangeY: [4556, 5000],
        values: [
          { x: 8, y: 4555 },
          { x: 8.3, y: 4573 },
          { x: 8.7, y: 4584 },
          { x: 9, y: 4591 },
        ],
      },
    ],
  },
  50: {
    absoluteMinX: 0,
    absoluteMaxX: 9,
    absoluteMinY: 3967,
    absoluteMaxY: 4604,
    ranges: [
      {
        rangeX: [0, 0.5],
        rangeY: [3967],
        values: [
          { x: 0.0, y: 3967 },
          { x: 0.1, y: 3974 },
          { x: 0.2, y: 3980 },
          { x: 0.3, y: 3987 },
          { x: 0.4, y: 3994 },
          { x: 0.5, y: 3999 },
        ],
      },
      {
        rangeX: [0.501, 7.7],
        rangeY: [4000, 4580],
        values: [
          { x: 0.5, y: 3999 },
          { x: 2, y: 4105 },
          { x: 4, y: 4257 },
          { x: 6, y: 4423 },
          { x: 7.7, y: 4580 },
        ],
      },
      {
        rangeX: [7.701, 9],
        rangeY: [4581, 5000],
        values: [
          { x: 7.7, y: 4580 },
          { x: 8.3, y: 4591 },
          { x: 8.7, y: 4599 },
          { x: 9, y: 4604 },
        ],
      },
    ],
  },
  60: {
    absoluteMinX: 0,
    absoluteMaxX: 9,
    absoluteMinY: 4008,
    absoluteMaxY: 4613,
    ranges: [
      {
        rangeX: [0, 7.2],
        rangeY: [4008, 4580],
        values: [
          { x: 0.0, y: 4008 },
          { x: 1, y: 4075 },
          { x: 2, y: 4148 },
          { x: 3, y: 4224 },
          { x: 4, y: 4304 },
          { x: 5, y: 4385 },
          { x: 6, y: 4470 },
          { x: 7.2, y: 4580 },
        ],
      },
      {
        rangeX: [7.2001, 9],
        rangeY: [4581, 5000],
        values: [
          { x: 7.2, y: 4580 },
          { x: 7.8, y: 4594 },
          { x: 8.5, y: 4604 },
          { x: 9, y: 4613 },
        ],
      },
    ],
  },
  70: {
    absoluteMinX: 0,
    absoluteMaxX: 9,
    absoluteMinY: 4049,
    absoluteMaxY: 4620,
    ranges: [
      {
        rangeX: [0, 7.6],
        rangeY: [4049, 4580],
        values: [
          { x: 0.0, y: 4049 },
          { x: 1, y: 4118 },
          { x: 2, y: 4193 },
          { x: 3, y: 4269 },
          { x: 4, y: 4349 },
          { x: 5, y: 4432 },
          { x: 6, y: 4518 },
          { x: 6.6, y: 4580 },
        ],
      },
      {
        rangeX: [6.601, 9],
        rangeY: [4581, 5000],
        values: [
          { x: 6.6, y: 4580 },
          { x: 7.6, y: 4598 },
          { x: 8.3, y: 4609 },
          { x: 9, y: 4620 },
        ],
      },
    ],
  },
  80: {
    absoluteMinX: 0,
    absoluteMaxX: 9,
    absoluteMinY: 4090,
    absoluteMaxY: 4632,
    ranges: [
      {
        rangeX: [0, 6.1],
        rangeY: [4090, 4580],
        values: [
          { x: 0.0, y: 4090 },
          { x: 1, y: 4161 },
          { x: 2, y: 4238 },
          { x: 3, y: 4316 },
          { x: 4, y: 4396 },
          { x: 5, y: 4480 },
          { x: 6.1, y: 4580 },
        ],
      },
      {
        rangeX: [6.1001, 9],
        rangeY: [4581, 5000],
        values: [
          { x: 6.1, y: 4580 },
          { x: 7, y: 4598 },
          { x: 8, y: 4614 },
          { x: 9, y: 4632 },
        ],
      },
    ],
  },
  90: {
    absoluteMinX: 0,
    absoluteMaxX: 9,
    absoluteMinY: 4134,
    absoluteMaxY: 4641,
    ranges: [
      {
        rangeX: [0, 5.6],
        rangeY: [4134, 4582],
        values: [
          { x: 0.0, y: 4134 },
          { x: 1, y: 4206 },
          { x: 2, y: 4282 },
          { x: 3, y: 4362 },
          { x: 4, y: 4445 },
          { x: 5.6, y: 4582 },
        ],
      },
      {
        rangeX: [5.6001, 9],
        rangeY: [4583, 5000],
        values: [
          { x: 5.6, y: 4582 },
          { x: 6.5, y: 4598 },
          { x: 7.3, y: 4610 },
          { x: 8.2, y: 4626 },
          { x: 9, y: 4641 },
        ],
      },
    ],
  },
  100: {
    absoluteMinX: 0,
    absoluteMaxX: 9,
    absoluteMinY: 4179,
    absoluteMaxY: 4656,
    ranges: [
      {
        rangeX: [0, 5],
        rangeY: [4179, 4581],
        values: [
          { x: 0.0, y: 4179 },
          { x: 1, y: 4252 },
          { x: 2, y: 4331 },
          { x: 3, y: 4409 },
          { x: 4, y: 4494 },
          { x: 5, y: 4581 },
        ],
      },
      {
        rangeX: [5.001, 9],
        rangeY: [4582, 5000],
        values: [
          { x: 5, y: 4581 },
          { x: 6, y: 4600 },
          { x: 7, y: 4615 },
          { x: 8, y: 4633 },
          { x: 9, y: 4656 },
        ],
      },
    ],
  },
  110: {
    absoluteMinX: 0,
    absoluteMaxX: 9,
    absoluteMinY: 4222,
    absoluteMaxY: 4666,
    ranges: [
      {
        rangeX: [0, 4.4],
        rangeY: [4222, 4581],
        values: [
          { x: 0.0, y: 4222 },
          { x: 1, y: 4297 },
          { x: 2, y: 4378 },
          { x: 3, y: 4457 },
          { x: 4.4, y: 4581 },
        ],
      },
      {
        rangeX: [4.4001, 9],
        rangeY: [4582, 5000],
        values: [
          { x: 4.4, y: 4581 },
          { x: 6, y: 4610 },
          { x: 7, y: 4626 },
          { x: 8, y: 4645 },
          { x: 9, y: 4666 },
        ],
      },
    ],
  },
  120: {
    absoluteMinX: 0,
    absoluteMaxX: 9,
    absoluteMinY: 4267,
    absoluteMaxY: 4678,
    ranges: [
      {
        rangeX: [0, 3.8],
        rangeY: [4267, 4578],
        values: [
          { x: 0.0, y: 4267 },
          { x: 1, y: 4343 },
          { x: 2, y: 4425 },
          { x: 3, y: 4506 },
          { x: 3.8, y: 4578 },
        ],
      },
      {
        rangeX: [3.8001, 9],
        rangeY: [4579, 5000],
        values: [
          { x: 3.8, y: 4578 },
          { x: 5, y: 4602 },
          { x: 6, y: 4617 },
          { x: 7, y: 4635 },
          { x: 8, y: 4657 },
          { x: 9, y: 4678 },
        ],
      },
    ],
  },
  130: {
    absoluteMinX: 0,
    absoluteMaxX: 9,
    absoluteMinY: 4312,
    absoluteMaxY: 4691,
    ranges: [
      {
        rangeX: [0, 3.3],
        rangeY: [4312, 4583],
        values: [
          { x: 0.0, y: 4312 },
          { x: 1, y: 4390 },
          { x: 2, y: 4475 },
          { x: 3.3, y: 4583 },
        ],
      },
      {
        rangeX: [3.3001, 9],
        rangeY: [4584, 5000],
        values: [
          { x: 3.3, y: 4583 },
          { x: 5, y: 4612 },
          { x: 6, y: 4628 },
          { x: 7, y: 4647 },
          { x: 8, y: 4667 },
          { x: 9, y: 4691 },
        ],
      },
    ],
  },
  140: {
    absoluteMinX: 0,
    absoluteMaxX: 9,
    absoluteMinY: 4359,
    absoluteMaxY: 4705,
    ranges: [
      {
        rangeX: [0, 2.7],
        rangeY: [4359, 4583],
        values: [
          { x: 0.0, y: 4359 },
          { x: 1, y: 4438 },
          { x: 2, y: 4524 },
          { x: 2.7, y: 4583 },
        ],
      },
      {
        rangeX: [2.7001, 9],
        rangeY: [4584, 5000],
        values: [
          { x: 2.7, y: 4583 },
          { x: 4, y: 4604 },
          { x: 5, y: 4620 },
          { x: 7, y: 4659 },
          { x: 9, y: 4705 },
        ],
      },
    ],
  },
  150: {
    absoluteMinX: 0,
    absoluteMaxX: 9,
    absoluteMinY: 4407,
    absoluteMaxY: 4719,
    ranges: [
      {
        rangeX: [0, 2.1],
        rangeY: [4407],
        values: [
          { x: 0.0, y: 4407 },
          { x: 0.5, y: 4447 },
          { x: 1, y: 4487 },
          { x: 1.5, y: 4530 },
          { x: 2.1, y: 4585 },
        ],
      },
      {
        rangeX: [2.1001, 9],
        rangeY: [4586, 5000],
        values: [
          { x: 2.1, y: 4585 },
          { x: 4, y: 4614 },
          { x: 6, y: 4650 },
          { x: 8, y: 4693 },
          { x: 9, y: 4719 },
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
export const mlw_pc2dle_isa20_2_predictTtet = (dropDown, weight) => {
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
  if (!checkValueInLimits(data, dropDownLow, dropDownHigh, weight, "yAxis")) {
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
export const mlw_pc2dle_isa20_2_data = {
  name: "mlw_pc2dle_isa+20_2",
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
