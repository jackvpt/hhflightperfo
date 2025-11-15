import { extrapolation } from "../utils/calculations"

// Labels for temperatures
const labels = Array.from({ length: 28 - 10 + 1 }, (_, i) => {
  const x = 10 + i
  return {
    text: String(x),
    x,
    y: 4.4,
    angle: 0,
    fontSize: 11,
  }
})

// Border lines (VLSS scale)
const generateBorderLines = (start = 10, end = 28) => {
  const lines = [
    {
      color: "axisColor",
      thickness: 1.5,
      points: [
        { x: 10, y: 0 },
        { x: 28, y: 0 },
      ],
    },
  ]

  for (let x = start; x <= end; x += 0.5) {
    const isMajor = Number.isInteger(x)

    lines.push({
      color: "axisColor",
      thickness: 1.5,
      points: [
        { x, y: 0 },
        { x, y: isMajor ? 2 : 1 },
      ],
    })
  }

  return lines
}

const borderLines = generateBorderLines(10, 28)

/**
 *
 * @param {Number} temperature
 * @param {Number} zp
 * @returns {Number} predicted weight
 * @description Predict TTET given dropdown and weight using the reverse polynomial regressions.
 */
export const mlw_pc2dle_isa_3_predictVlss = (ttet) => {
  // Check flight enveloppe with ttet
  if (ttet < 0 || ttet > 9) {
    return {
      value: null,
      error: "Outside defined TTET range",
      text: "N/A",
    }
  }

  // Extrapolate TTET for given dropdown
  const vlss = extrapolation(ttet, 0, 10, 9, 27.4)

  // Check flight enveloppe with VLSS
  let vlssInLimits = vlss
  if (vlss < 0) vlssInLimits = 0
  if (vlss > 27.5) vlssInLimits = 27.5
  return { value: Number(vlssInLimits.toFixed(1)), error: null, text: null }
}

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
export const mlw_pc2dle_isa_3_data = {
  name: "mlw_pc2dle_isa_3",
  title: "MAXIMUM LANDING WEIGHT PC2DLE ISA",
  xmin: 10, // X axis minimum value
  xmax: 27.5, // X axis reference 0
  x0: 10, // X axis maximum value
  ymin: 0, // Y axis minimum value
  ymax: 2, // Y axis maximum value
  y0: 0, // Y axis reference 0
  gridSpacingX: null, // X axis grid spacing (value)
  gridSpacingY: null, // Y axis grid spacing (value)
  gridSpacingThickX: null, // X axis thick grid spacing (value)
  gridSpacingThickY: null, // Y axis thick grid spacing (value)
  labelSpacingX: null, // X axis label spacing (value)
  labelSpacingY: null, // Y axis label spacing (value)
  xLabel: "(DPBL) VLSS (kt) - Ground speed",
  yLabel: "",
  scatterPlot: [],
  curves: [],
  labels: labels,
  borderLines: borderLines,
  areas: [],
}
