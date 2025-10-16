import { PolynomialRegression } from "ml-regression-polynomial"

export const d1_details = {
  title: "D1 - REJECTED TAKEOFF DISTANCE",
  x0: 40, // X axis minimum value
  xmax: 80, // X axis maximum value
  y0: 0, // Y axis minimum value
  ymax: 1000, // Y axis maximum value
  gridSpacingX: 2, // X axis grid spacing (value)
  gridSpacingY: 25, // Y axis grid spacing (value)
  labelSpacingX: 10, // X axis label spacing (value)
  labelSpacingY: 100, // Y axis label spacing (value)
  xLabel: "VTOSS (kts)",
  yLabel: "Distance (m)",
}

export const d1_labels=[
  {
    text: "0 kt",
    x: 54,
    y: 520,
    angle:-40
  },
  {
    text: "10 kts",
    x: 57,
    y: 370,
    angle:-35
  },
  {
    text: "20 kts",
    x: 59,
    y: 255,
    angle:-30
  },
  {
    text: "30 kts",
    x: 62,
    y: 185,
    angle:-25
  },
  {
    text: "40 kts",
    x: 63,
    y: 110,
    angle:-25
  },
  {
    text: "50 kts",
    x: 64,
    y: 62,
    angle:-8
  },
  {
    text: "FACTORED HEAD WIND",
    x: 66,
    y: 710,
    angle:-45
  },

]

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

for (const wind in data) {
  // Extract x and y for each series
  const xs = data[wind].map((point) => point.x)
  const ys = data[wind].map((point) => point.y)

  // Create the polynomial regression (degree 5 here)
  regressions[wind] = new PolynomialRegression(xs, ys, 5)
  regressionsReverse[wind] = new PolynomialRegression(ys, xs, 5)
}

export const d1_predictVtoss = (wind, distance) => {
  if (regressions[wind]) {
    return regressionsReverse[wind].predict(distance)
  } else {
    throw new Error(`No regression for wind=${wind}`)
  }
}

export const d1_predictDistance = (wind, vtoss) => {
  if (regressionsReverse[wind]) {
    const result = regressions[wind].predict(vtoss)
    return Math.round(result, 0)
  } else {
    throw new Error(`No regression for wind=${wind}`)
  }
}

export const d1_predictRoundVtoss = (vtoss) => {
  return Math.round(vtoss / 10) * 10
}

export const d1_scatterPlot = () => {
  let points = []

  for (const wind in data) {
    points.push(...data[wind])
  }

  return points
}

export const d1_curves = () => {
  const curves = {}

  for (const wind in data) {
    const curve = []
    for (let vtoss = 40; vtoss <= 80; vtoss += 1) {
      const y = regressions[wind].predict(vtoss)
      curve.push({ x: vtoss, y })
    }
    curves[wind] = curve
  }
  return curves
}
