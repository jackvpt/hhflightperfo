import "./TakeoffParameters.scss"
import { FormControl } from "@mui/material"
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
    dispatch(updateAnyField(name, Number(value)))
  }

  // Handle calculations (triggered when the user finishes editing)
  const handleBlur = () => {
    dispatch(recalculatePerformances())
  }

  // Initial calculation on component load
  // dispatch(recalculatePerformances())

  return (
    <section className="container-takeoffparameters">
      {/* Wind Direction */}
      <FormControl variant="filled" size="small">
        <InputNumber
          name="windDirection"
          label="Wind Direction"
          value={weatherData.windDirection}
          format="heading"
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
      </FormControl>

      {/* Wind Speed */}
      <FormControl variant="filled" size="small">
        <InputNumber
          name="windSpeed"
          label="Wind Speed"
          value={weatherData.windSpeed}
          format="speed"
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
      </FormControl>

      {/* Runway Heading */}
      <FormControl variant="filled" size="small">
        <InputNumber
          name="runwayHeading"
          label="Runway Heading"
          value={flightData.runwayHeading}
          format="heading"
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
      </FormControl>

      {/* Head wind */}
      <FormControl variant="filled" size="small">
        <DisplayValue
          name="headWind"
          label="Head Wind"
          value={performancesData.headWind}
          format="heading"
        />
      </FormControl>

      {/* Factored Head wind */}
      <FormControl variant="filled" size="small">
        <DisplayValue
          name="factoredHeadWind"
          label="Factored Head Wind"
          value={performancesData.factoredHeadWind}
          format="speed"
        />
      </FormControl>

      {/* QNH */}
      <FormControl variant="filled" size="small">
        <InputNumber
          name="qnh"
          label="QNH"
          value={weatherData.qnh}
          format="pressure"
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
      </FormControl>

      {/* Takeoff altitude */}
      <FormControl variant="filled" size="small">
        <InputNumber
          name="takeoffAltitude"
          label="Altitude"
          value={weatherData.takeoffAltitude}
          format="altitude"
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
      </FormControl>

      {/* Pressure altitude (Zp) */}
      <FormControl variant="filled" size="small">
        <DisplayValue
          name="takeoffZp"
          label="Zp"
          value={weatherData.takeoffZp}
          format="altitude"
        />
      </FormControl>

      {/* Temperature */}
      <FormControl variant="filled" size="small">
        <InputNumber
          name="takeoffTemperature"
          label="Temperature"
          value={weatherData.takeoffTemperature}
          format="temperature"
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
      </FormControl>
    </section>
  )
}

export default TakeoffParameters
