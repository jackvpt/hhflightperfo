import { useEffect, useRef } from "react"

const Canvas = ({
  width = 500, // Canvas width (pixels)
  height = 700, // Canvas height (pixels)
  title = "",
  x0 = 40, // X axis minimum value
  xmax = 80, // X axis maximum value
  y0 = 0, // Y axis minimum value
  ymax = 1000, // Y axis maximum value
  gridSpacingX = 2, // X axis grid spacing (value)
  gridSpacingY = 20, // Y axis grid spacing (value)
  gridSpacingThickX = 10, // X axis thick grid spacing (value)
  gridSpacingThickY = 100, // Y axis thick grid spacing (value)
  labelSpacingX = 10, // X axis label spacing (value)
  labelSpacingY = 100, // Y axis label spacing (value)
  xLabel = "",
  yLabel = "",
  marginLeft = 60,
  marginRight = 20,
  marginTop = 40,
  marginBottom = 40,
  fontName = "Calibri",
  fontSize = 10, // Base font size for labels (pixels)
  gridColor = "#ccc",
  axisColor = "#000",
  scatterPlot = [],
  curves = [],
}) => {
  const canvasRef = useRef(null)

  const fontLabels = `${fontSize}px ${fontName}`
  const fontUnits = `${fontSize + 2}px ${fontName}`
  const fontTitle = `${fontSize + 4}px ${fontName}`

  const plotWidth = width - marginLeft - marginRight
  const plotHeight = height - marginTop - marginBottom

  const xfactor = plotWidth / (xmax - x0)
  const yfactor = plotHeight / (ymax - y0)

  const toCanvasX = (x) => marginLeft + (x - x0) * xfactor
  const toCanvasY = (y) => height - marginBottom - (y - y0) * yfactor

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, width, height)

    // Vertical grid lines
    ctx.strokeStyle = gridColor
    ctx.lineWidth = 1
    for (let x = x0; x <= xmax; x += gridSpacingX) {
      const cx = toCanvasX(x)
      ctx.beginPath()
      ctx.moveTo(cx, marginTop)
      ctx.lineTo(cx, height - marginBottom)
      ctx.stroke()
    }

    // Horizontal grid lines
    for (let y = y0; y <= ymax; y += gridSpacingY) {
      const cy = toCanvasY(y)
      ctx.beginPath()
      ctx.moveTo(marginLeft, cy)
      ctx.lineTo(width - marginRight, cy)
      ctx.stroke()
    }

    // Vertical thick grid lines
    ctx.strokeStyle = gridColor
    ctx.lineWidth = 2
    for (let x = x0; x <= xmax; x += gridSpacingThickX) {
      const cx = toCanvasX(x)
      ctx.beginPath()
      ctx.moveTo(cx, marginTop)
      ctx.lineTo(cx, height - marginBottom)
      ctx.stroke()
    }

    // Horizontal thick grid lines
    for (let y = y0; y <= ymax; y += gridSpacingThickY) {
      const cy = toCanvasY(y)
      ctx.beginPath()
      ctx.moveTo(marginLeft, cy)
      ctx.lineTo(width - marginRight, cy)
      ctx.stroke()
    }

    // Axis
    ctx.strokeStyle = axisColor
    ctx.lineWidth = 2

    // Axis X
    ctx.beginPath()
    ctx.moveTo(marginLeft, height - marginBottom)
    ctx.lineTo(width - marginRight, height - marginBottom)
    ctx.stroke()

    // Axis Y
    ctx.beginPath()
    ctx.moveTo(marginLeft, height - marginBottom)
    ctx.lineTo(marginLeft, marginTop)
    ctx.stroke()

    // X labels
    ctx.font = fontLabels
    ctx.fillStyle = "#000"
    ctx.textAlign = "center"
    ctx.textBaseline = "top"
    for (let x = x0; x <= xmax; x += labelSpacingX) {
      const cx = toCanvasX(x)
      const cy = height - marginBottom + 5
      ctx.fillText(x.toString(), cx, cy)
    }

    // Y labels
    ctx.textAlign = "right"
    ctx.textBaseline = "middle"
    for (let y = y0; y <= ymax; y += labelSpacingY) {
      const cx = marginLeft - 5
      const cy = toCanvasY(y)
      ctx.fillText(y.toString(), cx, cy)
    }

    // Axis X label (unit)
    ctx.font = fontUnits
    ctx.textAlign = "center"
    ctx.textBaseline = "bottom"
    ctx.fillText(xLabel, marginLeft + plotWidth / 2, height - 5)

    // Label axe Y (unité, vertical)
    ctx.save()
    ctx.translate(marginLeft / 5, marginTop + plotHeight / 2)
    ctx.rotate(-Math.PI / 2)
    ctx.textAlign = "center"
    ctx.textBaseline = "top"
    ctx.fillText(yLabel, 0, 0)
    ctx.restore()

    ctx.font = fontTitle
    ctx.textAlign = "center"
    ctx.textBaseline = "top"
    ctx.fillText(title, marginLeft + plotWidth / 2, 10)

    scatterPlot.forEach((point) => {
      const cx = toCanvasX(point.x)
      const cy = toCanvasY(point.y)
      ctx.beginPath()
      ctx.arc(cx, cy, 3, 0, Math.PI * 2)
      ctx.fillStyle = "red"
      ctx.fill()
    })

    ctx.strokeStyle = "blue"
    ctx.lineWidth = 1.5

    Object.values(curves).forEach((curve) => {
      ctx.beginPath()
      curve.forEach((point, index) => {
        const cx = toCanvasX(point.x)
        const cy = toCanvasY(point.y)
        if (index === 0) ctx.moveTo(cx, cy)
        else ctx.lineTo(cx, cy)
      })
      ctx.stroke()
    })
  }, [
    width,
    height,
    x0,
    xmax,
    y0,
    ymax,
    gridSpacingX,
    gridSpacingY,
    labelSpacingX,
    labelSpacingY,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    gridColor,
    axisColor,
  ])

  return <canvas ref={canvasRef} width={width} height={height} />
}

export default Canvas
