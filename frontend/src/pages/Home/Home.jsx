import "./Home.scss"
import { d1_data } from "../../curves/d1"
import Canvas from "../../Canvas/Canvas"
import { mtow_ca_40_data } from "../../curves/mtow_ca_40"
import TakeoffParameters from "../../components/TakeoffParameters/TakeoffParameters"
// import { mtow_ca_50_data } from "../../curves/mtow_ca_50"
import PerformancesClass1 from "../../components/PerformancesClass1/PerformancesClass1"
import { mtow_ca_60_data } from "../../curves/mtow_ca_60"

const Home = () => {
  return (
    <div className="home-page">
      <h1>EC155 Flight Performances</h1>
      <div className="home-page__content">
        <TakeoffParameters />
        <PerformancesClass1 />

        <div className="home-page__content-curves">
          <Canvas {...d1_data} />
          <Canvas {...mtow_ca_40_data} />
          <Canvas {...mtow_ca_60_data} />
        </div>
      </div>
    </div>
  )
}

export default Home
