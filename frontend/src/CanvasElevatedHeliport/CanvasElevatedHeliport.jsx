import "./CanvasElevatedHeliport.scss"

import { useEffect, useRef, useState } from "react"

// MUI imports
import { darken, useTheme } from "@mui/material/styles"
import {
  Checkbox,
  Collapse,
  FormControlLabel,
  IconButton,
  Typography,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

import { invertColor } from "../utils/colors"
import { useSelector } from "react-redux"
import { drawPerformances } from "../utils/drawPerformances"
import { chartsData } from "../curves/chartsData"
import AntSwitch from "../components/SubComponents/AntSwitch/AntSwitch"

const CanvasElevatedHeliport = ({ data }) => {
  let {
    width = 500, // Canvas width (pixels)
    height = 700, // Canvas height (pixels)
    title = "",
    xmin, // X axis minimum value
    xmax, // X axis maximum value

    ymin, // Y axis minimum value
    ymax, // Y axis maximum value

    gridSpacingX, // X axis grid spacing (value)
    gridSpacingY, // Y axis grid spacing (value)

    labelSpacingX, // X axis label spacing (value)
    labelSpacingY, // Y axis label spacing (value)

    reverseX = false,
    reverseY = false,

    marginLeft = 60,
    marginRight = 20,
    marginTop = 10,
    marginBottom = 40,
    fontName = "Calibri",
    fontSize = 10, // Base font size for labels (pixels)

    name = "",
  } = data[0]

  const canvasRef = useRef(null)
  const theme = useTheme()

  const chartData = chartsData.find((chart) => chart.name === name)

  // REDUX store
  const performancesData = useSelector((state) => state.performancesData)
  const weatherData = useSelector((state) => state.weatherData)
  const flightData = useSelector((state) => state.flightData)

  // Use state
  const [isCheckedScatterPlot, setIsCheckedScatterPlot] = useState(false)
  const [isCheckedCurves, setIsCheckedCurves] = useState(true)
  const [isCheckedLabels, setIsCheckedLabels] = useState(true)
  const [isCheckedGrid, setIsCheckedGrid] = useState(true)
  const [isCheckedChart, setIsCheckedChart] = useState(false)
  const [isCheckedAreas, setIsCheckedAreas] = useState(true)
  const [isCheckedCalculations, setIsCheckedCalculations] = useState(true)
  const [displayMode, setDisplayMode] = useState("chart")

  const handleChangeDisplayMode = (event) => {
    setDisplayMode(event.target.checked ? "chart" : "digitalized")
    if (event.target.checked) {
      setIsCheckedChart(false)
      setIsCheckedCurves(true)
      setIsCheckedLabels(true)
      setIsCheckedGrid(true)
      setIsCheckedAreas(true)
    } else {
      setIsCheckedChart(true)
      setIsCheckedCurves(false)
      setIsCheckedLabels(false)
      setIsCheckedGrid(false)
      setIsCheckedAreas(false)
    }
  }

  // Adjust colors based on theme mode
  let gridColor = darken(theme.palette.primary.light, 0.4)
  let textColor = theme.palette.text.primary
  let axisColor = theme.palette.text.primary

  if (isCheckedChart) {
    gridColor = invertColor(gridColor)
    textColor = invertColor(textColor)
    axisColor = invertColor(axisColor)
  }

  const fontLabels = `${fontSize}px ${fontName}`
  const fontUnits = `${fontSize + 2}px ${fontName}`
  const fontTitle = `${fontSize + 4}px ${fontName}`

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    // Chart
    const img = new Image()
    img.src = `/charts/${chartData.image}`

    img.onload = () => {
      ctx.clearRect(0, 0, width, height)

      if (isCheckedChart) ctx.drawImage(img, 0, 0, width, height)

      data.forEach((dataset, index) => {
        let {
          width = 500, // Canvas width (pixels)
          height = 700, // Canvas height (pixels)
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
          yAxisSide = "left",

          xLabel = "",
          yLabel = "",
          marginLeft = 60,
          marginRight = 20,
          marginTop = 10,
          marginBottom = 40,

          scatterPlot = [],
          curves = [],
          labels = [],
          borderLines = [],
          areas = [],
          name = "",
        } = dataset

        let plotWidth, plotHeight, xfactor, yfactor

        if (isCheckedChart) {
          marginLeft = (chartData.xMin[index] * width) / chartData.width
          marginRight =
            ((chartData.width - chartData.xMax[index]) * width) /
            chartData.width
          marginTop = (chartData.yMin[index] * height) / chartData.height
          marginBottom =
            ((chartData.height - chartData.yMax[index]) * height) /
            chartData.height
        } else {
          const canvasHeight = height - marginTop - marginBottom
          const chartHeight =
            Math.max(...chartData.yMax) - Math.min(...chartData.yMin)
          const scaleY = canvasHeight / chartHeight
          marginTop += (chartData.yMin[index] - chartData.yMin[0]) * scaleY
          marginBottom +=
            (Math.max(...chartData.yMax) - chartData.yMax[index]) * scaleY
        }

        plotWidth = width - marginLeft - marginRight
        plotHeight = height - marginTop - marginBottom

        xfactor = plotWidth / (xmax - xmin)
        yfactor = plotHeight / (ymax - ymin)

        const toCanvasX = (x) => {
          if (reverseX) return width - marginRight - (x - xmin) * xfactor
          return marginLeft + (x - xmin) * xfactor
        }
        const toCanvasY = (y) => {
          if (reverseY) return marginTop + (ymax - y) * yfactor
          return height - marginBottom - (y - ymin) * yfactor
        }

        // Areas
        if (isCheckedAreas) {
          areas.forEach((area) => {
            const { color, points } = area
            ctx.fillStyle = color
            ctx.beginPath()

            points.forEach((point, index) => {
              const cx = toCanvasX(point.x)
              const cy = toCanvasY(point.y)
              if (index === 0) ctx.moveTo(cx, cy)
              else ctx.lineTo(cx, cy)
            })

            ctx.closePath()
            ctx.fill()
          })
        }

        if (isCheckedGrid) {
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
          const xAxis = yAxisSide === "left" ? marginLeft : width - marginRight
          ctx.moveTo(xAxis, height - marginBottom)
          ctx.lineTo(xAxis, marginTop)
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
          ctx.textAlign = yAxisSide === "left" ? "right" : "left"
          ctx.textBaseline = "middle"
          for (let y = y0; y <= ymax; y += labelSpacingY) {
            const cx =
              yAxisSide === "left" ? marginLeft - 5 : width - marginRight + 8
            const cy = toCanvasY(y)
            ctx.fillText(y.toString(), cx, cy)
          }

          // Axis X label (horizontal)
          ctx.font = fontUnits
          ctx.textAlign = "center"
          ctx.textBaseline = "bottom"
          ctx.fillText(xLabel, marginLeft + plotWidth / 2, height - 5)

          // Axis Y label (vertical)
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
        }

        ctx.strokeStyle = "#00ccff"
        ctx.lineWidth = 1.5

        // Draw lines for each curve
        if (isCheckedCurves) {
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

          // Draw border lines
          borderLines.forEach((line) => {
            ctx.beginPath()
            // Custom line color and thickness
            if (line["color"] === "axisColor") ctx.strokeStyle = axisColor
            else if (line["color"]) ctx.strokeStyle = line["color"]
            ctx.lineWidth = line["thickness"] || 1.5
            
            line["points"].forEach((point, index) => {
              const cx = toCanvasX(point.x)
              const cy = toCanvasY(point.y)
              if (index === 0) ctx.moveTo(cx, cy)
              else ctx.lineTo(cx, cy)
            })
            ctx.stroke()
          })
        }

        // Draw custom labels
        if (isCheckedLabels) {
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
        }

        // Draw scatter plot points
        if (isCheckedScatterPlot) {
          scatterPlot.forEach((point) => {
            const cx = toCanvasX(point.x)
            const cy = toCanvasY(point.y)
            ctx.beginPath()
            ctx.arc(cx, cy, 3, 0, Math.PI * 2)
            ctx.fillStyle = "red"
            ctx.fill()
          })
        }

        // Draw performances calculations
        if (isCheckedCalculations)
          drawPerformances(
            name,
            ctx,
            weatherData,
            flightData,
            performancesData,
            toCanvasX,
            toCanvasY,
            yAxisSide
          )
      })
    }
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
    isCheckedScatterPlot,
    isCheckedCurves,
    isCheckedLabels,
    isCheckedGrid,
    isCheckedChart,
    isCheckedAreas,
    isCheckedCalculations,
    performancesData,
  ])

  const [open, setOpen] = useState(true)

  return (
    <section className="container-canvas">
      <div className="container-canvas__title">
        <IconButton
          className="title-icon"
          onClick={() => setOpen(!open)}
          sx={{
            transition: "transform 0.3s ease",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            display: "block",
            mx: "auto",
          }}
          aria-label="toggle collapse"
        >
          <ExpandMoreIcon />
        </IconButton>
        <div className="title-text">{title}</div>
        <div className="spacer"></div>
      </div>
      <Collapse in={open} className="container-canvas__body">
        <div className="container-canvas__body-chart">
          <canvas ref={canvasRef} width={width} height={height} />
        </div>
        <div className="container-canvas__tools">
          <div className="container-canvas__tools-displayMode">
            <Typography sx={{ fontSize: "0.75rem" }}>HFM Chart</Typography>
            <AntSwitch
              checked={displayMode === "chart"}
              onChange={handleChangeDisplayMode}
              slotProps={{
                input: { "aria-label": "ant design" },
              }}
            />
            <Typography sx={{ fontSize: "0.75rem" }}>
              Digitalized chart
            </Typography>
          </div>
          {/** Checkbox for Scatter Plot */}
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={isCheckedScatterPlot}
                onChange={() => setIsCheckedScatterPlot(!isCheckedScatterPlot)}
              />
            }
            label="Scatter Plot"
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: "0.75rem", // adjust label font size
              },
            }}
          />

          {/** Checkbox for Curves */}
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={isCheckedCurves}
                onChange={() => setIsCheckedCurves(!isCheckedCurves)}
              />
            }
            label="Curves"
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: "0.75rem", // adjust label font size
              },
            }}
          />

          {/** Checkbox for Labels */}
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={isCheckedLabels}
                onChange={() => setIsCheckedLabels(!isCheckedLabels)}
              />
            }
            label="Labels"
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: "0.75rem", // adjust label font size
              },
            }}
          />

          {/** Checkbox for Grid */}
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={isCheckedGrid}
                onChange={() => setIsCheckedGrid(!isCheckedGrid)}
              />
            }
            label="Grid"
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: "0.75rem", // adjust label font size
              },
            }}
          />

          {/** Checkbox for Areas */}
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={isCheckedAreas}
                onChange={() => setIsCheckedAreas(!isCheckedAreas)}
              />
            }
            label="Areas"
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: "0.75rem", // adjust label font size
              },
            }}
          />

          {/** Checkbox for HFM Chart */}
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={isCheckedChart}
                onChange={() => setIsCheckedChart(!isCheckedChart)}
              />
            }
            label="HFM chart"
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: "0.75rem", // adjust label font size
              },
            }}
          />

          {/** Checkbox for Calculations */}
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={isCheckedCalculations}
                onChange={() =>
                  setIsCheckedCalculations(!isCheckedCalculations)
                }
              />
            }
            label="Calculations"
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: "0.75rem", // adjust label font size
              },
            }}
          />
        </div>
      </Collapse>
    </section>
  )
}

export default CanvasElevatedHeliport
