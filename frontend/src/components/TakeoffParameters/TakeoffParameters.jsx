import "./TakeoffParameters.scss"
import InputNumber from "../SubComponents/InputNumber/InputNumber"
import DisplayValue from "../SubComponents/DisplayValue/DisplayValue"
import { useDispatch, useSelector } from "react-redux"
import { calculatePerformances, updateAnyField } from "../../store/action"
import { useFetchMetar } from "../../hooks/useFetchMetar"
import { Button } from "@mui/material"
import { useEffect, useState } from "react"
import { updateFromMetar } from "../../features/weatherDataSlice"

const TakeoffParameters = () => {
  // REDUX store
  const dispatch = useDispatch()
  const weatherData = useSelector((state) => state.weatherData)
  const flightData = useSelector((state) => state.flightData)
  const performancesData = useSelector((state) => state.performancesData)

  // State
  const [airfieldCode, setAirfieldCode] = useState("manual")

  const {
    data: metarData,
    isLoading: isLoadingMetar,
    error: errorMetar,
  } = useFetchMetar(airfieldCode)

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target
    dispatch(updateAnyField(name, value))
  }

  const handleBlur = () => {
    return dispatch(calculatePerformances())
  }

  const handleClickAirfieldShortcut = (airfieldCode) => {
    setAirfieldCode(airfieldCode)
  }

  useEffect(() => {
    if (metarData && airfieldCode !== "manual") {
      dispatch(updateFromMetar(metarData))
      dispatch(calculatePerformances())
    }
  }, [metarData, airfieldCode, dispatch])

  // API async status handling
  if (isLoadingMetar) return <div>Loading METAR data...</div>
  if (errorMetar)
    return <div>Error loading METAR data: {errorMetar.message}</div>

  return (
    <section className="container-tab takeoffParameters">
      <div className="container-tab__header headerTakeoffParameters">
        Takeoff Parameters
      </div>
      <div className="container-tab__body">
        <div className="tabBodyWithShortCuts">
          <aside className="bodyShortCuts">
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{
                fontSize: "0.65rem",
                padding: "1px 4px",
                width: 60,
              }}
              onClick={() => handleClickAirfieldShortcut("ehkd")}
            >
              EHKD
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{
                fontSize: "0.65rem",
                padding: "1px 4px",
                width: 60,
              }}
              onClick={() => handleClickAirfieldShortcut("epgd")}
            >
              EPGD
            </Button>
          </aside>
          <div className="bodyTakeoffParameters">
            <div className="bodyTakeoffParameters-metar">
              <div className="metar-header">
                {metarData ? (
                  <>
                    {metarData?.icaoId} {metarData?.time}
                  </>
                ) : "NO METAR DATA"}
              </div>
              <div className="metar-text">{metarData?.rawText}</div>
            </div>
            <div className="bodyTakeoffParameters-inputBoxes">
              <InputNumber
                name="windDirection"
                label="Wind Direction"
                value={weatherData.windDirection}
                format="heading"
                onChange={handleInputChange}
                onBlur={handleBlur}
              />

              {/* Wind Speed */}
              <InputNumber
                name="windSpeed"
                label="Wind Speed"
                value={weatherData.windSpeed}
                format="speed"
                onChange={handleInputChange}
                onBlur={handleBlur}
              />

              {/* Runway Heading */}
              <InputNumber
                name="runwayHeading"
                label="Runway Heading"
                value={flightData.runwayHeading}
                format="heading"
                onChange={handleInputChange}
                onBlur={handleBlur}
              />

              {/* Head wind */}
              <DisplayValue
                name="headWind"
                label="Head Wind"
                value={performancesData.headWind}
                format="speed"
              />

              {/* Factored Head wind */}
              <DisplayValue
                name="factoredHeadWind"
                label="Factored Head Wind"
                value={performancesData.factoredHeadWind}
                format="speed"
              />

              {/* QNH */}
              <InputNumber
                name="qnh"
                label="QNH"
                value={weatherData.qnh}
                format="pressure"
                onChange={handleInputChange}
                onBlur={handleBlur}
              />

              {/* Takeoff altitude */}
              <InputNumber
                name="takeoffAltitude"
                label="Altitude"
                value={weatherData.takeoffAltitude}
                format="altitude"
                onChange={handleInputChange}
                onBlur={handleBlur}
              />

              {/* Pressure altitude (Zp) */}
              <DisplayValue
                name="takeoffZp"
                label="Zp"
                value={weatherData.takeoffZp}
                format="altitude"
              />

              {/* Temperature */}
              <InputNumber
                name="takeoffTemperature"
                label="Temperature"
                value={weatherData.takeoffTemperature}
                format="temperature"
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TakeoffParameters
