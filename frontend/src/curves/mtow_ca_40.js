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
  "-40": [
    {
      range: [5547, 20000],
      values: [
        { x: 15686, y: 3000 },
        { x: 12109, y: 3500 },
        { x: 8915, y: 4000 },
        { x: 6032, y: 4500 },
        { x: 5547, y: 4600 },
      ],
    },
    {
      range: [-2000, 5546],
      values: [
        { x: 5547, y: 4601 },
        { x: 3263, y: 4700 },
        { x: 0, y: 4800 },
        { x: -2000, y: 4839 },
      ],
    },
  ],
  "-30": [
    {
      range: [4497, 20000],
      values: [
        { x: 14880, y: 3000 },
        { x: 11267, y: 3500 },
        { x: 8038, y: 4000 },
        { x: 5148, y: 4500 },
        { x: 4497, y: 4607 },
      ],
    },
    {
      range: [-2000, 4496],
      values: [
        { x: 4497, y: 4607 },
        { x: 2092, y: 4700 },
        { x: -1323, y: 4800 },
        { x: -2000, y: 4815 },
      ],
    },
  ],
  "-20": [
    {
      range: [3478, 20000],
      values: [
        { x: 13895, y: 3000 },
        { x: 10204, y: 3500 },
        { x: 6896, y: 4000 },
        { x: 3958, y: 4500 },
        { x: 3477, y: 4583 },
      ],
    },
    {
      range: [-2000, 3477],
      values: [
        { x: 3477, y: 4583 },
        { x: 3000, y: 4622 },
        { x: 540, y: 4700 },
        { x: -1323, y: 4800 },
        { x: -2000, y: 4790 },
      ],
    },
  ],
  "-10": [
    {
      range: [2214, 20000],
      values: [
        { x: 13018, y: 3000 },
        { x: 9291, y: 3500 },
        { x: 5993, y: 4000 },
        { x: 2893, y: 4500 },
        { x: 2422, y: 4582 },
        { x: 2214, y: 4613 },
      ],
    },
    {
      range: [-2000, 2213],
      values: [
        { x: 2214, y: 4613 },
        { x: 3000, y: 4622 },
        { x: 0, y: 4698 },
        { x: -1000, y: 4730 },
        { x: -2000, y: 4760 },
      ],
    },
  ],
  0: [
    {
      range: [1197, 20000],
      values: [
        { x: 11886, y: 3000 },
        { x: 8210, y: 3500 },
        { x: 4945, y: 4000 },
        { x: 1884, y: 4500 },
        { x: 1384, y: 4591 },
        { x: 1197, y: 4618 },
      ],
    },
    {
      range: [-2000, 1196],
      values: [
        { x: 1197, y: 4618 },
        { x: 0, y: 4661 },
        { x: -1000, y: 4696 },
        { x: -2000, y: 4729 },
      ],
    },
  ],
  10: [
    {
      range: [1, 20000],
      values: [
        { x: 10819, y: 3000 },
        { x: 7116, y: 3500 },
        { x: 3806, y: 4000 },
        { x: 765, y: 4500 },
        { x: 0, y: 4620 },
      ],
    },
    {
      range: [-2000, 0],
      values: [
        { x: 0, y: 4620 },
        { x: -500, y: 4641 },
        { x: -1000, y: 4659 },
        { x: -1500, y: 4678 },
        { x: -2000, y: 4696 },
      ],
    },
  ],
  20: [
    {
      range: [-1000, 20000],
      values: [
        { x: 9555, y: 3000 },
        { x: 5946, y: 3500 },
        { x: 2639, y: 4000 },
        { x: -395, y: 4500 },
        { x: -1000, y: 4595 },
      ],
    },
    {
      range: [-2000, -1001],
      values: [
        { x: -1000, y: 4595 },
        { x: -1250, y: 4618 },
        { x: -1500, y: 4642 },
        { x: -1750, y: 4654 },
        { x: -2000, y: 4664 },
      ],
    },
  ],
  30: [
    {
      range: [-2000, 20000],
      values: [
        { x: 8185, y: 3000 },
        { x: 4678, y: 3500 },
        { x: 1308, y: 4000 },
        { x: 34, y: 4200 },
        { x: -2000, y: 4512 },
      ],
    },
  ],
  40: [
    {
      range: [-2000, 20000],
      values: [
        { x: 6705, y: 3000 },
        { x: 3079 , y: 3500 },
        { x: 1027, y: 3800 },
        { x: -327 , y: 4000 },
        { x: -1007 , y: 4100 },
        { x: -2000, y: 4241 },
      ],
    },
  ],
    50: [
    {
      range: [1, 20000],
      values: [
        { x: 7379, y: 3000 },
        { x: 5396, y: 3200 },
        { x: 3145 , y: 3400 },
        { x: 2000 , y: 3497 },
        { x: 0, y: 3668 },
      ],
    },
    {
      range: [-2000, 0],
      values: [
        { x: 0, y: 3668 },
        { x: -500 , y: 3737 },
        { x: -1000, y: 3805 },
        { x: -1502 , y: 3873 },
        { x: -2000 , y: 3942 },
       ],
    },
  ],
}

const getRegressions = (zp) => {
  const regressions = {} // Zp to weight

  for (const temperature in data) {
    const pointsInRange = data[temperature].flatMap((subrange) =>
      // Filter points in this subrange where zp is included in range
      subrange.values.filter(
        () => zp >= subrange.range[0] && zp <= subrange.range[1]
      )
    )
    const xs = pointsInRange.map((point) => point.x)
    const ys = pointsInRange.map((point) => point.y)

    // Create the polynomial regression (degree 5 here)
    regressions[temperature] = new PolynomialRegression(xs, ys, 3)
  }

  return regressions
}

export const mtow_ca_40_predictWeight = (temperature, zp) => {
  const regressions = getRegressions(zp)
  console.log("zp,regressions :>> ", zp, regressions)
  if (regressions[temperature]) {
    return regressions[temperature].predict(zp)
  } else {
    throw new Error(`No regression for temperature=${temperature}`)
  }
}

export const mtow_ca_40_scatterPlot = () => {
  let points = []

  for (const temperature in data) {
    const ranges = data[temperature] // tableau des sous-plages pour cette température

    for (const range of ranges) {
      // Inverser x et y pour chaque point
      const invertedPoints = range.values.map((point) => ({
        x: point.y,
        y: point.x,
      }))

      points.push(...invertedPoints) // ajoute tous les points inversés
    }
  }
  return points
}

export const mtow_ca_40_curves = () => {
  const curves = {}

  for (const temperature in data) {
    const curve = []
    for (let zp = -2000; zp <= 20000; zp += 50) {
      const regressions = getRegressions(zp)
      const weight = regressions[temperature].predict(zp)
      if (
        weight >= mtow_ca_40_details.xmin &&
        weight <= mtow_ca_40_details.xmax
      )
        curve.push({ x: weight, y: zp })
    }
    curves[temperature] = curve
  }
  return curves
}
