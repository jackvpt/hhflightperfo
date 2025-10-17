import { PolynomialRegression } from "ml-regression-polynomial"

export const mtow_ca_40_details = {
  title: "MAXIMUM TAKEOFF WEIGHT CLEAR AREA VTOSS 40 KTS",
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
  yLabel: "Hp (ft x 1000)",
}

// export const d1_labels=[
//   {
//     text: "0 kt",
//     x: 54,
//     y: 520,
//     angle:-40
//   },
//   {
//     text: "10 kts",
//     x: 57,
//     y: 370,
//     angle:-35
//   },
//   {
//     text: "20 kts",
//     x: 59,
//     y: 255,
//     angle:-30
//   },
//   {
//     text: "30 kts",
//     x: 62,
//     y: 185,
//     angle:-25
//   },
//   {
//     text: "40 kts",
//     x: 63,
//     y: 110,
//     angle:-25
//   },
//   {
//     text: "50 kts",
//     x: 64,
//     y: 62,
//     angle:-8
//   },
//   {
//     text: "FACTORED HEAD WIND",
//     x: 66,
//     y: 710,
//     angle:-45
//   },

// ]

const data = {
  0: [
    { x: 40, y: 319 },
    { x: 50, y: 434 },
    { x: 60, y: 573 },
    { x: 70, y: 736 },
    { x: 80, y: 923 },
  ],
  10: [
    { x: 40, y: 174 },
    { x: 50, y: 264 },
    { x: 60, y: 378 },
    { x: 70, y: 516 },
    { x: 80, y: 680 },
  ],
  20: [
    { x: 40, y: 78 },
    { x: 50, y: 143 },
    { x: 60, y: 234 },
    { x: 70, y: 348 },
    { x: 80, y: 487 },
  ],
  30: [
    { x: 40, y: 37 },
    { x: 50, y: 80 },
    { x: 60, y: 143 },
    { x: 70, y: 234 },
    { x: 80, y: 348 },
  ],
  40: [
    { x: 40, y: 21 },
    { x: 50, y: 32 },
    { x: 60, y: 68 },
    { x: 70, y: 136 },
    { x: 80, y: 225 },
  ],
  50: [
    { x: 40, y: 21 },
    { x: 44, y: 21 },
    { x: 50, y: 24 },
    { x: 60, y: 32 },
    { x: 70, y: 58 },
    { x: 73, y: 69 },
    { x: 76, y: 89 },
    { x: 80, y: 116 },
  ],
}

const regressions = {} // VTOSS to distance
const regressionsReverse = {} // Distance to VTOSS

for (const temperature in data) {
  // Extract x and y for each series
  const xs = data[temperature].map((point) => point.x)
  const ys = data[temperature].map((point) => point.y)

  // Create the polynomial regression (degree 5 here)
  regressions[temperature] = new PolynomialRegression(xs, ys, 5)
  regressionsReverse[temperature] = new PolynomialRegression(ys, xs, 5)
}

export const mtow_ca_40_predictWeight = (temperature, zp) => {
  if (regressions[temperature]) {
    return regressions[temperature].predict(zp)
  } else {
    throw new Error(`No regression for temperature=${temperature}`)
  }
}

export const mtow_ca_40_scatterPlot = () => {
  let points = []

  for (const temperature in data) {
    points.push(...data[temperature])
  }

  return points
}

export const mtow_ca_40_curves = () => {
  const curves = {}

  for (const temperature in data) {
    const curve = []
    for (let zp = -2000; zp <= 20000; zp += 100) {
      const y = regressions[temperature].predict(zp)
      curve.push({ x: zp, y })
    }
    curves[temperature] = curve
  }
  return curves
}
