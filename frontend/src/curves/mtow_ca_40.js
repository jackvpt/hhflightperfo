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
  "-40": {
    absoluteMinY: 3598,
    absoluteMaxY: 4826,
    ranges: [
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
        range: [5026, 5546],
        values: [
          { x: 5547, y: 4600 },
          { x: 5371, y: 4610 },
          { x: 5167, y: 4622 },

          { x: 5026, y: 4631 },
        ],
      },
      {
        range: [-2000, 5025],
        values: [
          { x: 5026, y: 4631 },
          { x: 3263, y: 4700 },
          { x: 0, y: 4800 },
          { x: -2000, y: 4839 },
        ],
      },
    ],
  },
  "-30": {
    absoluteMinY: 3638,
    absoluteMaxY: 4826,
    ranges: [
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
  },
  "-20": {
    absoluteMinY: 3636,
    absoluteMaxY: 4826,
    ranges: [
      {
        range: [3525, 20000],
        values: [
          { x: 13895, y: 3000 },
          { x: 10204, y: 3500 },
          { x: 6896, y: 4000 },
          { x: 3958, y: 4500 },
          { x: 3525, y: 4577 },
        ],
      },
      {
        range: [3049, 3524],
        values: [
          { x: 3525, y: 4577 },
          { x: 3397, y: 4589 },
          { x: 3189, y: 4607 },
          { x: 3048, y: 4619 },
        ],
      },
      {
        range: [-2000, 3048],
        values: [
          { x: 3048, y: 4619 },
          { x: 1006, y: 4699 },
          { x: 0, y: 4734 },
          { x: -1000, y: 4763 },
          { x: -2000, y: 4790 },
        ],
      },
    ],
  },
  "-10": {
    absoluteMinY: 3646,
    absoluteMaxY: 4826,
    ranges: [
      {
        range: [2498, 20000],
        values: [
          { x: 13018, y: 3000 },
          { x: 9291, y: 3500 },
          { x: 5993, y: 4000 },
          { x: 2893, y: 4500 },
          { x: 2498, y: 4568 },
        ],
      },
      {
        range: [2015, 2497],
        values: [
          { x: 2498, y: 4568 },
          { x: 2352, y: 4583 },
          { x: 2192, y: 4600 },
          { x: 2015, y: 4618 },
        ],
      },
      {
        range: [-2000, 2014],
        values: [
          { x: 2015, y: 4618 },
          { x: 3000, y: 4622 },
          { x: 0, y: 4698 },
          { x: -1000, y: 4730 },
          { x: -2000, y: 4760 },
        ],
      },
    ],
  },
  0: {
    absoluteMinY: 3631,
    absoluteMaxY: 4826,
    ranges: [
      {
        range: [1447, 20000],
        values: [
          { x: 11886, y: 3000 },
          { x: 8210, y: 3500 },
          { x: 4945, y: 4000 },
          { x: 1884, y: 4500 },
          { x: 1447, y: 4572 },
        ],
      },
      {
        range: [994, 1446],
        values: [
          { x: 1447, y: 4572 },
          { x: 1294, y: 4589 },
          { x: 1145, y: 4604 },
          { x: 993, y: 4621 },
        ],
      },
      {
        range: [-2000, 993],
        values: [
          { x: 993, y: 4621 },
          { x: 0, y: 4661 },
          { x: -1000, y: 4696 },
          { x: -2000, y: 4729 },
        ],
      },
    ],
  },
  10: {
    absoluteMinY: 3608,
    absoluteMaxY: 4826,
    ranges: [
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
  },
  20: {
    absoluteMinY: 3575,
    absoluteMaxY: 4826,
    ranges: [
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
  },
  30: {
    absoluteMinY: 3517,
    absoluteMaxY: 4826,
    ranges: [
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
  },
  40: {
    absoluteMinY: 3419,
    absoluteMaxY: 4826,
    ranges: [
      {
        range: [-2000, 20000],
        values: [
          { x: 6705, y: 3000 },
          { x: 3079, y: 3500 },
          { x: 1027, y: 3800 },
          { x: -327, y: 4000 },
          { x: -1007, y: 4100 },
          { x: -2000, y: 4241 },
        ],
      },
    ],
  },
  50: {
    absoluteMinY: 3376,
    absoluteMaxY: 4826,
    ranges: [
      {
        range: [1, 20000],
        values: [
          { x: 7379, y: 3000 },
          { x: 5396, y: 3200 },
          { x: 3145, y: 3400 },
          { x: 2000, y: 3497 },
          { x: 0, y: 3668 },
        ],
      },
      {
        range: [-2000, 0],
        values: [
          { x: 0, y: 3668 },
          { x: -500, y: 3737 },
          { x: -1000, y: 3805 },
          { x: -1502, y: 3873 },
          { x: -2000, y: 3942 },
        ],
      },
    ],
  },
}

const getRegressions = (zp) => {
  const regressions = {} // Zp to weight

  for (const temperature in data) {
    const pointsInRange = data[temperature].ranges.flatMap((subrange) =>
      zp >= subrange.range[0] && zp <= subrange.range[1] ? subrange.values : []
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
    const ranges = data[temperature].ranges // tableau des sous-plages pour cette température

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
      const absoluteMinY = data[temperature].absoluteMinY
      const absoluteMaxY = data[temperature].absoluteMaxY
      if (weight >= absoluteMinY && weight <= absoluteMaxY)
        curve.push({ x: weight, y: zp })
    }
    curves[temperature] = curve
  }
  return curves
}
