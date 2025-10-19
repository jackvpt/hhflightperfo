import { PolynomialRegression } from "ml-regression-polynomial"

export const mtow_ca_60_details = {
  title: "MAXIMUM TAKEOFF WEIGHT CLEAR AREA VTOSS 60  KTS",
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
    absoluteMinY: 4140,
    absoluteMaxY: 4850,
    ranges: [
      {
        range: [-2000, 20000],
        values: [
          { x: 18960, y: 3000 },
          { x: 15500, y: 3500 },
          { x: 12288, y: 4000 },
          { x: 11409, y: 4140 },
          { x: 9292, y: 4500 },
          { x: 7329, y: 4850 },
          { x: 6509, y: 5000 },
        ],
      },
    ],
  },
  "-30": {
    absoluteMinY: 4140,
    absoluteMaxY: 4850,
    ranges: [
      {
        range: [-2000, 20000],
        values: [
          { x: 18270, y: 3000 },
          { x: 14607, y: 3500 },
          { x: 11236, y: 4000 },
          { x: 10325, y: 4140 },
          { x: 8185, y: 4500 },
          { x: 6207, y: 4850 },
          { x: 5416, y: 5000 },
        ],
      },
    ],
  },
  "-20": {
    absoluteMinY: 4140,
    absoluteMaxY: 4850,
    ranges: [
      {
        range: [-2000, 20000],
        values: [
          { x: 17398, y: 3000 },
          { x: 13385, y: 3500 },
          { x: 10195, y: 4000 },
          { x: 9303, y: 4140 },
          { x: 7128, y: 4500 },
          { x: 5150, y: 4850 },
          { x: 4280, y: 5000 },
        ],
      },
    ],
  },
  "-10": {
    absoluteMinY: 4140,
    absoluteMaxY: 4850,
    ranges: [
      {
        range: [-2000, 20000],
        values: [
          { x: 16254, y: 3000 },
          { x: 12608, y: 3500 },
          { x: 9185, y: 4000 },
          { x: 8290, y: 4140 },
          { x: 6099, y: 4500 },
          { x: 4106, y: 4850 },
          { x: 3246, y: 5000 },
        ],
      },
    ],
  },
  0: {
    absoluteMinY: 4140,
    absoluteMaxY: 4850,
    ranges: [
      {
        range: [-2000, 20000],
        values: [
          { x: 15180, y: 3000 },
          { x: 11651, y: 3500 },
          { x: 8227, y: 4000 },
          { x: 7308, y: 4140 },
          { x: 5111, y: 4500 },
          { x: 3081, y: 4850 },
          { x: 2250, y: 5000 },
        ],
      },
    ],
  },
  10: {
    absoluteMinY: 4140,
    absoluteMaxY: 4850,
    ranges: [
      {
        range: [-2000, 20000],
        values: [
          { x: 13876, y: 3000 },
          { x: 10589, y: 3500 },
          { x: 7266, y: 4000 },
          { x: 6350, y: 4140 },
          { x: 4130, y: 4500 },
          { x: 2113, y: 4850 },
          { x: 1285, y: 5000 },
        ],
      },
    ],
  },
  20: {
    absoluteMinY: 4125,
    absoluteMaxY: 4850,
    ranges: [
      {
        range: [-2000, 20000],
        values: [
          { x: 12418, y: 3000 },
          { x: 9201, y: 3500 },
          { x: 6168, y: 4000 },
          { x: 5439, y: 4125 },
          { x: 3197, y: 4500 },
          { x: 1187, y: 4850 },
          { x: 347, y: 5000 },
        ],
      },
    ],
  },
  30: {
    absoluteMinY: 4029,
    absoluteMaxY: 4850,
    ranges: [
      {
        range: [-2000, 20000],
        values: [
          { x: 10746, y: 3000 },
          { x: 7629, y: 3500 },
          { x: 4550, y: 4029 },
          { x: 1861, y: 4500 },
          { x: -26, y: 4850 },
          { x: -793, y: 5000 },
        ],
      },
    ],
  },
  40: {
    absoluteMinY: 3883,
    absoluteMaxY: 4850,
    ranges: [
      {
        range: [-2000, 20000],
        values: [
          { x: 7483, y: 3254 },
          { x: 5979, y: 3500 },
          { x: 3679, y: 3883 },
          { x: 86, y: 4500 },
          { x: -2000, y: 4870 },
        ],
      },
    ],
  },
  50: {
    absoluteMinY: 3822,
    absoluteMaxY: 4850,
    ranges: [
      {
        range: [-58, 20000],
        values: [
          { x: 11078, y: 3000 },
          { x: 6442, y: 3500 },
          { x: 3383, y: 3822 },
          { x: -58, y: 4156 },
        ],
      },
      {
        range: [-2000, 57],
        values: [
          { x: -58, y: 4156 },
          { x: -862, y: 4300 },
          { x: -1489, y: 4400 },
          { x: -2000, y: 4485 },
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

export const mtow_ca_60_predictWeight = (temperature, zp) => {
  const regressions = getRegressions(zp)
  if (regressions[temperature]) {
    return regressions[temperature].predict(zp)
  } else {
    throw new Error(`No regression for temperature=${temperature}`)
  }
}

export const mtow_ca_60_scatterPlot = () => {
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

export const mtow_ca_60_curves = () => {
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
