export const drawPerformances = (
  name,
  ctx,
  weatherData,
  performancesData,
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
    default:
      break
  }
}

const drawLines = (ctx, x0, x, y0, y) => {
  ctx.beginPath()
  ctx.moveTo(x0, y)
  ctx.lineTo(x, y)
  ctx.lineTo(x, y0)
  ctx.strokeStyle = "orange"
  ctx.lineWidth = 2
  ctx.stroke()
}

const drawPoint = (ctx, x, y) => {
  ctx.beginPath()
  ctx.strokeStyle = "orange"
  ctx.lineWidth = 2
  ctx.strokeRect(x - 4, y - 4, 8, 8)
}

const drawD1 = (ctx, performancesData, toCanvasX, toCanvasY) => {
  for (let data in performancesData.d1) {
    const d1 = performancesData.d1[data]
    const x0 = toCanvasX(40)
    const y0 = toCanvasY(0)
    const x = toCanvasX(d1.vtoss)
    const y = toCanvasY(d1.distance)

    drawLines(ctx, x0, x, y0, y)
    drawPoint(ctx, x, y)
  }
}

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
