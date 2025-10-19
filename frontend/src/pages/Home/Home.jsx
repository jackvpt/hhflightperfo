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
import {
  mtow_ca_40_curves,
  mtow_ca_40_details,
  mtow_ca_40_scatterPlot,
} from "../../curves/mtow_ca_40"
import TakeoffParameters from "../../components/TakeoffParameters/TakeoffParameters"
import {
  mtow_ca_50_curves,
  mtow_ca_50_details,
  mtow_ca_50_scatterPlot,
} from "../../curves/mtow_ca_50"
import PerformancesClass1 from "../../components/PerformancesClass1/PerformancesClass1"
import { mtow_ca_60_curves, mtow_ca_60_details, mtow_ca_60_scatterPlot } from "../../curves/mtow_ca_60"

const Home = () => {
  return (
    <div className="home-page">
      <h1>Home page</h1>
      <div className="home-page__content">
        <TakeoffParameters />
        <PerformancesClass1 />

        <div>
          <Canvas
            {...mtow_ca_60_details}
            scatterPlot={mtow_ca_60_scatterPlot()}
            curves={mtow_ca_60_curves()}
          />
          <Canvas
            {...mtow_ca_50_details}
            scatterPlot={mtow_ca_50_scatterPlot()}
            curves={mtow_ca_50_curves()}
          />
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
