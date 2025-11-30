import "./PlatformParameters.scss"
import InputNumber from "../SubComponents/InputNumber/InputNumber"
import { useDispatch, useSelector } from "react-redux"
import { calculatePerformances, updateAnyField } from "../../store/action"
import DisplayValue from "../SubComponents/DisplayValue/DisplayValue"

const PlatformParameters = () => {
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
    dispatch(calculatePerformances())
  }

  return (
    <section className="container-tab takeoffParameters">
      <div className="container-tab__header headerTakeoffParameters">
        Platform Parameters
      </div>
      <div className="container-tab__body">
        <div className="tabBodyWithShortCuts">
          <div className="bodyTakeoffParameters">
            <div className="bodyTakeoffParameters-inputBoxes">
              {/* Wind Speed */}
              <InputNumber
                name="platformWindSpeed"
                label="Wind Speed"
                value={weatherData.platformWindSpeed}
                format="speed"
                range={[0, 60]}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />

              {/* Factored wind */}
              <DisplayValue
                name="platformFactoredWind"
                label="Factored Wind"
                value={performancesData.miscellaneous.platformFactoredWind}
                format="speed"
              />

              {/* QNH */}
              <InputNumber
                name="platformQnh"
                label="QNH"
                value={weatherData.platformQnh}
                format="pressure"
                range={[950, 1050]}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />

              {/* Takeoff altitude */}
              <InputNumber
                name="platformAltitude"
                label="Altitude"
                value={weatherData.platformAltitude}
                format="altitude"
                range={[-1000, 1000]}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />

              {/* Pressure altitude (Zp) */}
              <DisplayValue
                name="platformZp"
                label="Zp"
                value={weatherData.platformZp}
                format="altitude"
              />

              {/* Temperature */}
              <InputNumber
                name="platformTemperature"
                label="Temperature"
                value={weatherData.platformTemperature}
                format="temperature"
                range={[-50, 50]}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />

              {/* Drop down */}
              <InputNumber
                name="platformDropDown"
                label="Drop down"
                value={flightData.platformDropDown}
                format="altitude"
                range={[0, 150]}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />

              {/* Maximum TTET */}
              <InputNumber
                name="platformMaxTtet"
                label="Maximum TTET"
                value={flightData.platformMaxTtet}
                format="seconds"
                range={[0, 9]}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />

              {/* Estimated Landing weight */}
              <InputNumber
                name="platformLandingWeight"
                label="Landing Weight"
                value={flightData.platformLandingWeight}
                format="weight"
                range={[3000, 4920]}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />

              {/* Estimated TakeOff weight */}
              <InputNumber
                name="platformTakeoffWeight"
                label="TakeOff Weight"
                value={flightData.platformTakeoffWeight}
                format="weight"
                range={[3000, 4920]}
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

export default PlatformParameters
