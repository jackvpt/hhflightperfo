import { useEffect, useRef } from "react"

// MUI imports
import { darken, useTheme } from "@mui/material/styles"

const Canvas = ({
  width = 500, // Canvas width (pixels)
  height = 700, // Canvas height (pixels)
  title = "",
  xmin, // X axis minimum value
  xmax, // X axis maximum value
  x0, // X axis reference 0
  ymin, // Y axis minimum value
  ymax, // Y axis maximum value
  y0, // Y axis reference 0
  gridSpacingX, // X axis grid spacing (value)
  gridSpacingY, // Y axis grid spacing (value)
  gridSpacingThickX, // X axis thick grid spacing (value)
  gridSpacingThickY, // Y axis thick grid spacing (value)
  labelSpacingX, // X axis label spacing (value)
  labelSpacingY, // Y axis label spacing (value)
  xLabel = "",
  yLabel = "",
  marginLeft = 60,
  marginRight = 20,
  marginTop = 40,
  marginBottom = 40,
  fontName = "Calibri",
  fontSize = 10, // Base font size for labels (pixels)
  scatterPlot = [],
  curves = [],
  labels = [],
}) => {
  const canvasRef = useRef(null)
  const theme = useTheme()

  // Adjust colors based on theme mode
  const gridColor = darken(theme.palette.primary.light, 0.4)
  const textColor = theme.palette.text.primary
  const axisColor = theme.palette.text.primary

  const fontLabels = `${fontSize}px ${fontName}`
  const fontUnits = `${fontSize + 2}px ${fontName}`
  const fontTitle = `${fontSize + 4}px ${fontName}`

  const plotWidth = width - marginLeft - marginRight
  const plotHeight = height - marginTop - marginBottom

  const xfactor = plotWidth / (xmax - xmin)
  const yfactor = plotHeight / (ymax - ymin)

  const toCanvasX = (x) => marginLeft + (x - xmin) * xfactor
  const toCanvasY = (y) => height - marginBottom - (y - ymin) * yfactor

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, width, height)

    // Vertical grid lines
    ctx.strokeStyle = gridColor
    ctx.lineWidth = 1
    for (let x = xmin; x <= xmax; x += gridSpacingX) {
      const cx = toCanvasX(x)
      ctx.beginPath()
      ctx.moveTo(cx, marginTop)
      ctx.lineTo(cx, height - marginBottom)
      ctx.stroke()
    }

    // Horizontal grid lines
    for (let y = ymin; y <= ymax; y += gridSpacingY) {
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
    ctx.fillStyle = textColor
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

    ctx.strokeStyle = "#00ccff"
    ctx.lineWidth = 1.5

    // Draw lines for each curve
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

    // Draw labels
    ctx.fillStyle = textColor
    Object.values(labels).forEach((label) => {
      ctx.save()
      const cx = toCanvasX(label.x)
      const cy = toCanvasY(label.y)
      ctx.translate(cx, cy)
      ctx.rotate((label.angle * Math.PI) / 180)
      ctx.fillText(label.text, 0, 0)
      ctx.restore()
    })

    // Draw scatter plot points
    scatterPlot.forEach((point) => {
      const cx = toCanvasX(point.x)
      const cy = toCanvasY(point.y)
      ctx.beginPath()
      ctx.arc(cx, cy, 3, 0, Math.PI * 2)
      ctx.fillStyle = "red"
      ctx.fill()
    })
  }, [
    width,
    height,
    xmin,
    xmax,
    ymin,
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
