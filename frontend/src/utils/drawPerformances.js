import { mtow_elevated_heliport_2_2_predictWeight } from "../curves/mtow_elevated_heliport_2_2"

// Function to draw performance points and lines on the canvas
export const drawPerformances = (
  name,
  ctx,
  weatherData,
  performancesData,
  flightData,
  toCanvasX,
  toCanvasY
) => {
  if (!performancesData) return

  switch (name) {
    case "d1":
      drawD1(ctx, performancesData, toCanvasX, toCanvasY)
      break
    case "mtow_ca_40":
      drawMtow_CA_40(ctx, weatherData, performancesData, toCanvasX, toCanvasY)
      break
    case "mtow_ca_50":
      drawMtow_CA_50(ctx, weatherData, performancesData, toCanvasX, toCanvasY)
      break
    case "mtow_ca_60":
      drawMtow_CA_60(ctx, weatherData, performancesData, toCanvasX, toCanvasY)
      break
    case "mlw_ca":
      drawMlw_CA(ctx, weatherData, performancesData, toCanvasX, toCanvasY)
      break
    case "mtow_helipad":
      drawMtow_Helipad(ctx, weatherData, performancesData, toCanvasX, toCanvasY)
      break
    case "mlw_helipad":
      drawMlw_Helipad(ctx, weatherData, performancesData, toCanvasX, toCanvasY)
      break
    case "mtow_elevated_heliport_1":
      drawMtow_Elevated_Heliport_1(
        ctx,
        performancesData,
        flightData,
        toCanvasX,
        toCanvasY
      )
      break
    case "mtow_elevated_heliport_2_1":
      drawMtow_Elevated_Heliport_2_1(
        ctx,
        weatherData,
        flightData,
        performancesData,
        toCanvasX,
        toCanvasY
      )
      break
    case "mtow_elevated_heliport_2_2":
      drawMtow_Elevated_Heliport_2_2(
        ctx,
        weatherData,
        flightData,
        performancesData,
        toCanvasX,
        toCanvasY
      )
      break
    case "mtow_elevated_heliport_2_3":
      drawMtow_Elevated_Heliport_2_3(
        ctx,
        weatherData,
        flightData,
        performancesData,
        toCanvasX,
        toCanvasY
      )
      break
    case "mlw_elevated_heliport":
      drawMlw_Elevated_Heliport(
        ctx,
        weatherData,
        performancesData,
        toCanvasX,
        toCanvasY
      )
      break
    case "mtow_pc2dle_isa_1":
      drawMtow_Pc2Dle_ISA(
        ctx,
        weatherData,
        performancesData,
        toCanvasX,
        toCanvasY
      )
      break
    case "mtow_pc2dle_isa_2":
      drawTtet_Pc2Dle_ISA(
        ctx,
        weatherData,
        performancesData,
        toCanvasX,
        toCanvasY
      )
      break
    case "mtow_pc2dle_isa+20_1":
      drawMtow_Pc2Dle_ISA(
        ctx,
        weatherData,
        performancesData,
        toCanvasX,
        toCanvasY
      )
      break
    case "mtow_pc2dle_isa+20_2":
      drawTtet_Pc2Dle_ISA(
        ctx,
        weatherData,
        performancesData,
        toCanvasX,
        toCanvasY
      )
      break
          case "mlw_pc2dle_isa_1":
      drawMlw_Pc2Dle_ISA(
        ctx,
        weatherData,
        performancesData,
        toCanvasX,
        toCanvasY
      )
      break
    default:
      break
  }
}

// Helper functions to draw lines and points
// Draw lines from (x0, y) to (x, y) to (x, y0)
const drawLines = (ctx, x0, x, y0, y) => {
  ctx.beginPath()
  ctx.moveTo(x0 - 5, y)
  ctx.lineTo(x, y)
  ctx.lineTo(x, y0 + 5)
  ctx.moveTo(x0 + 5, y)
  ctx.lineTo(x, y)
  ctx.lineTo(x, y0 - 5)
  ctx.strokeStyle = "orange"
  ctx.lineWidth = 2
  ctx.stroke()
}

// Draw a point at (x, y)
const drawPoint = (ctx, x, y) => {
  ctx.beginPath()
  ctx.strokeStyle = "orange"
  ctx.lineWidth = 2
  ctx.strokeRect(x - 4, y - 4, 8, 8)
}

// Draw D1 performance points and lines
const drawD1 = (ctx, performancesData, toCanvasX, toCanvasY) => {
  for (let data in performancesData.d1) {
    const d1 = performancesData.d1[data]
    const x0 = toCanvasX(40)
    const y0 = toCanvasY(0)
    const x = toCanvasX(d1.vtoss)
    const y = toCanvasY(d1.distance.value)

    drawLines(ctx, x0, x, y0, y)
    drawPoint(ctx, x, y)
  }
}

// Draw MTOW Clear Area VTOSS 40 performance points and lines
const drawMtow_CA_40 = (
  ctx,
  weatherData,
  performancesData,
  toCanvasX,
  toCanvasY
) => {
  const weight = performancesData.mtow_ca_40
  const zp = weatherData.takeoffZp
  const x0 = toCanvasX(3000)
  const y0 = toCanvasY(-2000)
  const x = toCanvasX(weight)
  const y = toCanvasY(zp)

  drawLines(ctx, x0, x, y0, y)
  drawPoint(ctx, x, y)
}

// Draw MTOW Clear Area VTOSS 50 performance points and lines
const drawMtow_CA_50 = (
  ctx,
  weatherData,
  performancesData,
  toCanvasX,
  toCanvasY
) => {
  const weight = performancesData.mtow_ca_50
  const zp = weatherData.takeoffZp
  const x0 = toCanvasX(3000)
  const y0 = toCanvasY(-2000)
  const x = toCanvasX(weight)
  const y = toCanvasY(zp)

  drawLines(ctx, x0, x, y0, y)
  drawPoint(ctx, x, y)
}

// Draw MTOW Clear Area VTOSS 60 performance points and lines
const drawMtow_CA_60 = (
  ctx,
  weatherData,
  performancesData,
  toCanvasX,
  toCanvasY
) => {
  const weight = performancesData.mtow_ca_60
  const zp = weatherData.takeoffZp
  const x0 = toCanvasX(3000)
  const y0 = toCanvasY(-2000)
  const x = toCanvasX(weight)
  const y = toCanvasY(zp)

  drawLines(ctx, x0, x, y0, y)
  drawPoint(ctx, x, y)
}

// Draw MLW Clear Area performance points and lines
const drawMlw_CA = (
  ctx,
  weatherData,
  performancesData,
  toCanvasX,
  toCanvasY
) => {
  const weight = performancesData.mtow_ca_60
  const zp = weatherData.takeoffZp
  const x0 = toCanvasX(3000)
  const y0 = toCanvasY(-2000)
  const x = toCanvasX(weight)
  const y = toCanvasY(zp)

  drawLines(ctx, x0, x, y0, y)
  drawPoint(ctx, x, y)
}

// Draw MTOW Helipad performance points and lines
const drawMtow_Helipad = (
  ctx,
  weatherData,
  performancesData,
  toCanvasX,
  toCanvasY
) => {
  const weight = performancesData.mtow_helipad
  const zp = weatherData.takeoffZp
  const x0 = toCanvasX(3000)
  const y0 = toCanvasY(-2000)
  const x = toCanvasX(weight)
  const y = toCanvasY(zp)

  drawLines(ctx, x0, x, y0, y)
  drawPoint(ctx, x, y)
}

// Draw MLW Helipad performance points and lines
const drawMlw_Helipad = (
  ctx,
  weatherData,
  performancesData,
  toCanvasX,
  toCanvasY
) => {
  const weight = performancesData.mlw_helipad
  const zp = weatherData.takeoffZp
  const x0 = toCanvasX(3000)
  const y0 = toCanvasY(-2000)
  const x = toCanvasX(weight)
  const y = toCanvasY(zp)

  drawLines(ctx, x0, x, y0, y)
  drawPoint(ctx, x, y)
}

// Draw MTOW Elevated Heliport #1 performance points and lines
const drawMtow_Elevated_Heliport_1 = (
  ctx,
  performancesData,
  flightData,
  toCanvasX,
  toCanvasY
) => {
  const dropDown = flightData.platformDropDown
  const coef = performancesData.mtow_elevated_heliport_1
  const x0 = toCanvasX(0)
  const y0 = toCanvasY(0)
  const x = toCanvasX(dropDown)
  const y = toCanvasY(coef)

  drawLines(ctx, x0, x, y0, y)
  drawPoint(ctx, x, y)
}

// Draw MTOW Elevated Heliport #2 performance points and lines
const drawMtow_Elevated_Heliport_2_1 = (
  ctx,
  weatherData,
  flightData,
  performancesData,
  toCanvasX,
  toCanvasY
) => {
  const weight = performancesData.mtow_elevated_heliport_2_1
  const zp = weatherData.platformZp
  const x0 = toCanvasX(3000)
  const y0 = toCanvasY(-2000)
  const x = toCanvasX(weight)
  const y = toCanvasY(zp)

  drawLines(ctx, x0, x, y0, y)
  drawPoint(ctx, x, y)
}

// Draw MTOW Elevated Heliport #3 performance points and lines
const drawMtow_Elevated_Heliport_2_2 = (
  ctx,
  weatherData,
  flightData,
  performancesData,
  toCanvasX,
  toCanvasY
) => {
  const coef = performancesData.mtow_elevated_heliport_1
  const weightA = performancesData.mtow_elevated_heliport_2_1

  ctx.beginPath()
  ctx.moveTo(toCanvasX(weightA), toCanvasY(10) - 5)
  ctx.lineTo(toCanvasX(weightA), toCanvasY(10))

  for (let drawCoef = 9.9; drawCoef >= coef; drawCoef -= 0.1) {
    const { value: weight } = mtow_elevated_heliport_2_2_predictWeight(
      weightA,
      drawCoef
    )
    ctx.lineTo(toCanvasX(weight), toCanvasY(drawCoef))
  }

  ctx.strokeStyle = "orange"
  ctx.lineWidth = 2
  ctx.stroke()

  const weight = performancesData.mtow_elevated_heliport_2_2
  const x0 = toCanvasX(3000)
  const y0 = toCanvasY(0)
  const x = toCanvasX(weight)
  const y = toCanvasY(coef)

  drawLines(ctx, x0, x, y0, y)
  drawPoint(ctx, x, y)
}

// Draw MTOW Elevated Heliport #4 performance points and lines
const drawMtow_Elevated_Heliport_2_3 = (
  ctx,
  weatherData,
  flightData,
  performancesData,
  toCanvasX,
  toCanvasY
) => {
  const weight = performancesData.mtow_elevated_heliport_2_3
  const zp = weatherData.platformZp
  const x0 = toCanvasX(3000)
  const y0 = toCanvasY(5000)
  const x = toCanvasX(weight)
  const y = toCanvasY(zp)

  drawLines(ctx, x0, x, y0, y)
  drawPoint(ctx, x, y)
}

// Draw MLW Elevated Heliport performance points and lines
const drawMlw_Elevated_Heliport = (
  ctx,
  weatherData,
  performancesData,
  toCanvasX,
  toCanvasY
) => {
  const weight = performancesData.mlw_elevated_heliport
  const zp = weatherData.platformZp
  const x0 = toCanvasX(3000)
  const y0 = toCanvasY(-2000)
  const x = toCanvasX(weight)
  const y = toCanvasY(zp)

  drawLines(ctx, x0, x, y0, y)
  drawPoint(ctx, x, y)
}

// Draw MTOW PC2DLE performance points and lines
const drawMtow_Pc2Dle_ISA = (
  ctx,
  weatherData,
  performancesData,
  toCanvasX,
  toCanvasY
) => {
  const weight = performancesData.mtow_pc2dle
  const zp = weatherData.platformZp
  const x0 = toCanvasX(-1000)
  const y0 = toCanvasY(3000)
  const x = toCanvasX(zp)
  const y = toCanvasY(weight)

  drawLines(ctx, x0, x, y0, y)
  drawPoint(ctx, x, y)
}

// Draw MTOW PC2DLE performance points and lines
const drawTtet_Pc2Dle_ISA = (
  ctx,
  weatherData,
  performancesData,
  toCanvasX,
  toCanvasY
) => {
  const ttet = performancesData.ttet_pc2dle
  const weight = performancesData.mtow_pc2dle
  const x0 = toCanvasX(0)
  const y0 = toCanvasY(3000)
  const x = toCanvasX(ttet)
  const y = toCanvasY(weight)

  drawLines(ctx, x0, x, y0, y)
  drawPoint(ctx, x, y)
}

// Draw MLW PC2DLE performance points and lines
const drawMlw_Pc2Dle_ISA = (
  ctx,
  weatherData,
  performancesData,
  toCanvasX,
  toCanvasY
) => {
  const weight = performancesData.mtow_pc2dle
  const zp = weatherData.platformZp
  const x0 = toCanvasX(-1000)
  const y0 = toCanvasY(3000)
  const x = toCanvasX(zp)
  const y = toCanvasY(weight)

  drawLines(ctx, x0, x, y0, y)
  drawPoint(ctx, x, y)
}