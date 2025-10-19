import { PolynomialRegression } from "ml-regression-polynomial"

export const mtow_ca_50_details = {
  title: "MAXIMUM TAKEOFF WEIGHT CLEAR AREA VTOSS 50  KTS",
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
    absoluteMinY: 3946,
    absoluteMaxY: 4850,
    ranges: [
      {
        range: [-2000, 20000],
        values: [
          { x: 17782, y: 3000 },
          { x: 14242, y: 3500 },
          { x: 11402, y: 3946 },
          { x: 8231, y: 4500 },
          { x: 6380, y: 4850 },
          { x: 5660, y: 5000 },
        ],
      },
    ],
  },
  "-30": {
    absoluteMinY: 3988,
    absoluteMaxY: 4920,
    ranges: [
      {
        range: [-2000, 20000],
        values: [
          { x: 17000, y: 3000 },
          { x: 13433, y: 3500 },
          { x: 10322, y: 3988 },
          { x: 7360, y: 4500 },
          { x: 5517, y: 4850 },
          { x: 4749, y: 5000 },
        ],
      },
    ],
  },
  "-20": {
    absoluteMinY: 3985,
    absoluteMaxY: 4920,
    ranges: [
      {
        range: [-2000, 20000],
        values: [
          { x: 16018, y: 3000 },
          { x: 12432, y: 3500 },
          { x: 9276, y: 3985 },
          { x: 6238, y: 4500 },
          { x: 4359, y: 4850 },
          { x: 3568, y: 5000 },
        ],
      },
    ],
  },
  "-10": {
    absoluteMinY: 3996,
    absoluteMaxY: 4920,
    ranges: [
      {
        range: [-2000, 20000],
        values: [
          { x: 15076, y: 3000 },
          { x: 11547, y: 3500 },
          { x: 8275, y: 3996 },
          { x: 5242, y: 4500 },
          { x: 3310, y: 4850 },
          { x: 2519, y: 5000 },
        ],
      },
    ],
  },
  0: {
    absoluteMinY: 3981,
    absoluteMaxY: 4920,
    ranges: [
      {
        range: [-2000, 20000],
        values: [
          { x: 14009, y: 3000 },
          { x: 10435, y: 3500 },
          { x: 7290, y: 3981 },
          { x: 4240, y: 4500 },
          { x: 2301, y: 4850 },
          { x: 1523, y: 5000 },
        ],
      },
    ],
  },
  10: {
    absoluteMinY: 3955,
    absoluteMaxY: 4920,
    ranges: [
      {
        range: [-2000, 20000],
        values: [
          { x: 12926, y: 3000 },
          { x: 9360, y: 3500 },
          { x: 6348, y: 3955 },
          { x: 3120, y: 4500 },
          { x: 1194, y: 4850 },
          { x: 390, y: 5000 },
        ],
      },
    ],
  },
  20: {
    absoluteMinY: 3919,
    absoluteMaxY: 4920,
    ranges: [
      {
        range: [-2000, 20000],
        values: [
          { x: 11643, y: 3000 },
          { x: 8145, y: 3500 },
          { x: 5423, y: 3919 },
          { x: 1970, y: 4500 },
          { x: 46, y: 4850 },
          { x: -789, y: 5000 },
        ],
      },
    ],
  },
  30: {
    absoluteMinY: 3857,
    absoluteMaxY: 4920,
    ranges: [
      {
        range: [-2000, 20000],
        values: [
          { x: 10200, y: 3000 },
          { x: 6836, y: 3500 },
          { x: 4530, y: 3857 },
          { x: 615, y: 4500 },
          { x: -1424, y: 4850 },
          { x: -2000, y: 4951 },
        ],
      },
    ],
  },
  40: {
    absoluteMinY: 3753,
    absoluteMaxY: 4920,
    ranges: [
      {
        range: [-2000, 20000],
        values: [
          { x: 7332, y: 3197 },
          { x: 5354, y: 3500 },
          { x: 3654, y: 3753 },
          { x: 1474, y: 4100 },
          { x: -1023, y: 4500 },
          { x: -2000, y: 4655 },
        ],
      },
    ],
  },
  50: {
    absoluteMinY: 3708,
    absoluteMaxY: 4920,
    ranges: [
      {
        range: [24, 20000],
        values: [
          { x: 10212, y: 3000 },
          { x: 5483, y: 3500 },
          { x: 3362, y: 3708 },
          { x: 2437, y: 3800 },
          { x: 1373, y: 3900 },
          { x: 24, y: 4022 },
        ],
      },
      {
        range: [-2000, 23],
        values: [
          { x: 24, y: 4022 },
          { x: -461, y: 4100 },
          { x: -1116, y: 4200 },
          { x: -2000, y: 4331 },
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

export const mtow_ca_50_predictWeight = (temperature, zp) => {
  const regressions = getRegressions(zp)
  console.log("zp,regressions :>> ", zp, regressions)
  if (regressions[temperature]) {
    return regressions[temperature].predict(zp)
  } else {
    throw new Error(`No regression for temperature=${temperature}`)
  }
}

export const mtow_ca_50_scatterPlot = () => {
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

export const mtow_ca_50_curves = () => {
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
