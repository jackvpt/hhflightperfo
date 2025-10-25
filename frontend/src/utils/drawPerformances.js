export const drawPerformances = (
  name,
  ctx,
  performancesData,
  toCanvasX,
  toCanvasY
) => {
  if (!performancesData) return

  switch (name) {
    case "d1":
      drawD1(ctx, performancesData, toCanvasX, toCanvasY)
      break
    default:
      break
  }
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

    ctx.beginPath()
    ctx.arc(cx, cy, 4, 0, 2 * Math.PI)
    ctx.fillStyle = "yellow"
    ctx.fill()
  }
}
