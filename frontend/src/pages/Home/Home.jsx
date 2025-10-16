import "./Home.scss"
import { FormControl, TextField } from "@mui/material"
import { useState } from "react"
import InputNumber from "../../components/SubComponents/InputNumber/InputNumber"
import { calculateHeadWind } from "../../utils/calculations"
import {
  d1_curves,
  d1_details,
  d1_labels,
  d1_scatterPlot,
} from "../../curves/d1"
import Canvas from "../../Canvas/Canvas"

const Home = () => {
  // Local states
  const initialFormData = {
    windDirection: 360,
    windSpeed: 15,
    temperature: 20,
    qnh: 1013,
    runwayHeading: 360,
    headWind: 10,
  }
  const [formData, setFormData] = useState(initialFormData)

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target

    const newData = {
      ...formData,
      [name]: value,
    }

    newData.headWind = calculateHeadWind(
      newData.windDirection,
      newData.windSpeed,
      newData.runwayHeading
    )

    setFormData(newData)
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
            value={formData.windDirection}
            onChange={handleInputChange}
          />
        </FormControl>

        {/* Wind Speed */}
        <FormControl variant="filled" size="small">
          <InputNumber
            name="windSpeed"
            label="Wind Speed"
            value={formData.windSpeed}
            onChange={handleInputChange}
          />
        </FormControl>

        {/* Runway Heading */}
        <FormControl variant="filled" size="small">
          <InputNumber
            name="runwayHeading"
            label="Runway Heading"
            value={formData.runwayHeading}
            onChange={handleInputChange}
          />
        </FormControl>

        {/* Head wind */}
        <FormControl variant="filled" size="small">
          <TextField
            name="headWind"
            label="Head Wind"
            value={formData.headWind}
            disabled
            size="small"
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
