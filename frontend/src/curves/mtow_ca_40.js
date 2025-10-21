import { PolynomialRegression } from "ml-regression-polynomial"

const labels = [
  {
    text: "-40",
    x: 4200,
    y: 8400,
    angle: 30,
  },
  {
    text: "-30",
    x: 4200,
    y: 7500,
    angle: 35,
  },
  {
    text: "-20",
    x: 4200,
    y: 6400,
    angle: 40,
  },
  {
    text: "-10",
    x: 4200,
    y: 5450,
    angle: 40,
  },
  {
    text: "0",
    x: 4200,
    y: 4450,
    angle: 40,
  },
  {
    text: "10",
    x: 4200,
    y: 3350,
    angle: 40,
  },
  {
    text: "20",
    x: 4200,
    y: 2200,
    angle: 40,
  },
  {
    text: "30",
    x: 4100,
    y: 1350,
    angle: 40,
  },
  {
    text: "40",
    x: 4000,
    y: 500,
    angle: 42,
  },
  {
    text: "50",
    x: 3870,
    y: -630,
    angle: 46,
  },
]

const borderLines = [
  [
    { x: 3873, y: -1500 },
    { x: 4839, y: -1500 },
  ],
  [
    { x: 3600, y: 11406 },
    { x: 3636, y: 10824 },
    { x: 3639, y: 10334 },
    { x: 3636, y: 9292 },
    { x: 3644, y: 8296 },
    { x: 3644, y: 7897 },
    { x: 3631, y: 7315 },
    { x: 3608, y: 6362 },
    { x: 3573, y: 5456 },
    { x: 3516, y: 4540 },
    { x: 3418, y: 3679 },
    { x: 3376, y: 3389 },
  ],
]

const data = {
  "-40": {
    absoluteMinX: -1500,
    absoluteMaxX: 20000,
    absoluteMinY: 3598,
    absoluteMaxY: 4839,
    ranges: [
      {
        range: [5547, 20000],
        values: [
          { x: 15686, y: 3000 },
          { x: 11406, y: 3600 },
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
    absoluteMinX: -1500,
    absoluteMaxX: 20000,
    absoluteMinY: 3638,
    absoluteMaxY: 4826,
    ranges: [
      {
        range: [4497, 20000],
        values: [
          { x: 14880, y: 3000 },
          { x: 10334, y: 3639 },
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
    absoluteMinX: -1500,
    absoluteMaxX: 20000,
    absoluteMinY: 3636,
    absoluteMaxY: 4826,
    ranges: [
      {
        range: [3525, 20000],
        values: [
          { x: 13895, y: 3000 },
          { x: 9292, y: 3636 },
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
  "-15": {
    absoluteMinX: -1500,
    absoluteMaxX: 20000,
    absoluteMinY: 3636,
    absoluteMaxY: 4762,
    ranges: [
      {
        range: [2989, 20000],
        values: [
          { x: 8815, y: 3636 },
          { x: 6404, y: 4000 },
          { x: 5198, y: 4200 },
          { x: 4042, y: 4400 },
          { x: 2989, y: 4582 },
        ],
      },
      {
        range: [2474, 2988],
        values: [
          { x: 2989, y: 4582 },
          { x: 2854, y: 4594 },
          { x: 2616, y: 4613 },
          { x: 2474, y: 4624 },
        ],
      },
      {
        range: [-2000, 2473],
        values: [
          { x: 2474, y: 4624 },
          { x: 1986, y: 4643 },
          { x: 983, y: 4682 },
          { x: -22, y: 4717 },
          { x: -1519, y: 4762 },
        ],
      },
    ],
  },
  "-10": {
    absoluteMinX: -1500,
    absoluteMaxX: 20000,
    absoluteMinY: 3646,
    absoluteMaxY: 4826,
    ranges: [
      {
        range: [2498, 20000],
        values: [
          { x: 13018, y: 3000 },
          { x: 8296, y: 3644 },
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
    absoluteMinX: -1500,
    absoluteMaxX: 20000,
    absoluteMinY: 3631,
    absoluteMaxY: 4826,
    ranges: [
      {
        range: [1447, 20000],
        values: [
          { x: 11886, y: 3000 },
          { x: 7315, y: 3631 },
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
    absoluteMinX: -1500,
    absoluteMaxX: 20000,
    absoluteMinY: 3608,
    absoluteMaxY: 4826,
    ranges: [
      {
        range: [1, 20000],
        values: [
          { x: 10819, y: 3000 },
          { x: 6362, y: 3608 },
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
    absoluteMinX: -1500,
    absoluteMaxX: 20000,
    absoluteMinY: 3575,
    absoluteMaxY: 4826,
    ranges: [
      {
        range: [-1000, 20000],
        values: [
          { x: 9555, y: 3000 },
          { x: 5456, y: 3573 },
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
    absoluteMinX: -1500,
    absoluteMaxX: 20000,
    absoluteMinY: 3517,
    absoluteMaxY: 4826,
    ranges: [
      {
        range: [-2000, 20000],
        values: [
          { x: 8185, y: 3000 },
          { x: 4540, y: 3516 },
          { x: 1308, y: 4000 },
          { x: 34, y: 4200 },
          { x: -2000, y: 4512 },
        ],
      },
    ],
  },
  40: {
    absoluteMinX: -1500,
    absoluteMaxX: 20000,
    absoluteMinY: 3419,
    absoluteMaxY: 4826,
    ranges: [
      {
        range: [-2000, 20000],
        values: [
          { x: 6705, y: 3000 },
          { x: 3679, y: 3418 },
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
    absoluteMinX: -1500,
    absoluteMaxX: 20000,
    absoluteMinY: 3376,
    absoluteMaxY: 4826,
    ranges: [
      {
        range: [1, 20000],
        values: [
          { x: 7379, y: 3000 },
          { x: 5396, y: 3200 },
          { x: 3389, y: 3376 },
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

const scatterPlot = () => {
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

const curves = () => {
  const curves = {}

  for (const temperature in data) {
    const curve = []
    for (
      let zp = data[temperature].absoluteMinX;
      zp <= data[temperature].absoluteMaxX;
      zp += 10
    ) {
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

const areas = [
  {
    color: "rgba(100,100,100,0.6)",
    points: [
      ...curves()["-40"],
      { x: 3600, y: 11406 },
      { x: 3636, y: 10824 },
      { x: 3639, y: 10334 },
      { x: 3636, y: 9292 },
      ...curves()["-15"].reverse(),
    ],
  },
]

export const mtow_ca_40_data = {
  name: "mtow_ca_40",
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
  scatterPlot: scatterPlot(),
  curves: curves(),
  labels: labels,
  borderLines: borderLines,
  areas: areas,
}
