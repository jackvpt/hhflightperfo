import "./Home.scss"
import { FormControl, TextField } from "@mui/material"
import InputNumber from "../../components/SubComponents/InputNumber/InputNumber"
import {
  d1_curves,
  d1_details,
  d1_labels,
  d1_scatterPlot,
} from "../../curves/d1"
import Canvas from "../../Canvas/Canvas"
import { useDispatch, useSelector } from "react-redux"
import { updateAnyField } from "../../store/action"

const Home = () => {
  // REDUX store
  const dispatch = useDispatch()
  const weatherData = useSelector((state) => state.weatherData)
  const flightData = useSelector((state) => state.flightData)
  const performancesData = useSelector((state) => state.performances)

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target
    dispatch(updateAnyField(name, Number(value)))
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
            onChange={handleInputChange}
          />
        </FormControl>

        {/* Wind Speed */}
        <FormControl variant="filled" size="small">
          <InputNumber
            name="windSpeed"
            label="Wind Speed"
            value={weatherData.windSpeed}
            onChange={handleInputChange}
          />
        </FormControl>

        {/* Runway Heading */}
        <FormControl variant="filled" size="small">
          <InputNumber
            name="runwayHeading"
            label="Runway Heading"
            value={flightData.runwayHeading}
            onChange={handleInputChange}
          />
        </FormControl>

        {/* Head wind */}
        <FormControl variant="filled" size="small">
          <TextField
            name="headWind"
            label="Head Wind"
            value={flightData.headWind}
            disabled
            sx={{
              "& .MuiInputBase-input": {
                fontSize: "0.875rem",
                height: 18,
                padding: 1,
              },
            }}
          />
        </FormControl>

        <div>
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
