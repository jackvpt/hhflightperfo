import "./TakeoffParameters.scss"
import { Box, FormControl, Typography } from "@mui/material"
import InputNumber from "../SubComponents/InputNumber/InputNumber"
import DisplayValue from "../SubComponents/DisplayValue/DisplayValue"
import { useDispatch, useSelector } from "react-redux"
import { recalculatePerformances, updateAnyField } from "../../store/action"

const TakeoffParameters = () => {
  // REDUX store
  const dispatch = useDispatch()
  const weatherData = useSelector((state) => state.weatherData)
  const flightData = useSelector((state) => state.flightData)
  const performancesData = useSelector((state) => state.performancesData)

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target
    dispatch(updateAnyField(name, value))
  }

  const handleBlur = () => {
    return dispatch(recalculatePerformances())
  }

  return (
    <section className="container-tab takeoffParameters">
      <div className="container-tab__header headerTakeoffParameters">
        Takeoff Parameters
      </div>
      <div className="container-tab__body bodyTakeoffParameters">
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
    </section>
  )
}

export default TakeoffParameters
