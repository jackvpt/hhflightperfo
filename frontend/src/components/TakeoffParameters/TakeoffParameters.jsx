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
    console.log('value :>> ', name, value);
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
        />
      </FormControl>

      {/* QNH */}
      <FormControl variant="filled" size="small">
        <InputNumber
          name="qnh"
          label="QNH"
          value={weatherData.qnh}
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
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
      </FormControl>

      {/* Head wind */}
      <FormControl variant="filled" size="small">
        <DisplayValue
          name="takeoffZp"
          label="Zp"
          value={weatherData.takeoffZp}
        />
      </FormControl>
    </section>
  )
}

export default TakeoffParameters
