import "./Home.scss"
import { FormControl } from "@mui/material"
import InputNumber from "../../components/SubComponents/InputNumber/InputNumber"
import {
  d1_curves,
  d1_details,
  d1_labels,
  d1_scatterPlot,
} from "../../curves/d1"
import Canvas from "../../Canvas/Canvas"
import { useDispatch, useSelector } from "react-redux"
import { recalculatePerformances, updateAnyField } from "../../store/action"
import DisplayValue from "../../components/SubComponents/DisplayValue/DisplayValue"
import { mtow_ca_40_curves, mtow_ca_40_details, mtow_ca_40_scatterPlot } from "../../curves/mtow_ca_40"

const Home = () => {
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

  return (
    <div className="home-page">
      <h1>Home page</h1>
      <div className="home-page__content">
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

        <div>
          <Canvas
          {...mtow_ca_40_details}
            scatterPlot={mtow_ca_40_scatterPlot()}
            curves={mtow_ca_40_curves()}
          />
          <Canvas
            {...d1_details}
            scatterPlot={d1_scatterPlot()}
            curves={d1_curves()}
            labels={d1_labels}
          />
          
        </div>
      </div>
    </div>
  )
}

export default Home
