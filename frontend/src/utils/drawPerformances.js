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
    default:
      break
  }
}

const drawPoint = (ctx, cx, cy) => {
    ctx.beginPath()
    ctx.strokeStyle = "yellow"
    ctx.lineWidth = 2 
    ctx.strokeRect(cx - 4, cy - 4, 8, 8) 
 
}

const drawD1 = (ctx, performancesData, toCanvasX, toCanvasY) => {
  for (let data in performancesData.d1) {
    const d1 = performancesData.d1[data]
    const cx = toCanvasX(d1.vtoss)
    const cy = toCanvasY(d1.distance)

    ctx.beginPath()
    ctx.moveTo(toCanvasX(40), cy)
    ctx.lineTo(cx, cy)
    ctx.lineTo(cx, toCanvasY(0))
    ctx.strokeStyle = "yellow"
    ctx.lineWidth = 2
    ctx.stroke()

    drawPoint(ctx, cx, cy)
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
  const cx = toCanvasX(weight)
  const cy = toCanvasY(zp)

  ctx.beginPath()
  ctx.moveTo(toCanvasX(3000), cy)
  ctx.lineTo(cx, cy)
  ctx.lineTo(cx, toCanvasY(-2000))
  ctx.strokeStyle = "yellow"
  ctx.lineWidth = 2
  ctx.stroke()

  drawPoint(ctx, cx, cy)
}
