import "./Home.scss"
import { d1_data } from "../../curves/d1"
import Canvas from "../../Canvas/Canvas"
import { mtow_ca_40_data } from "../../curves/mtow_ca_40"
import TakeoffParameters from "../../components/TakeoffParameters/TakeoffParameters"
import { mtow_ca_60_data } from "../../curves/mtow_ca_60"
import { mtow_ca_50_data } from "../../curves/mtow_ca_50"
import { mlw_ca_data } from "../../curves/mlw_ca"
import { mtow_helipad_data } from "../../curves/mtow_helipad"
import { mlw_helipad_data } from "../../curves/mlw_helipad"
import { mtow_elevated_heliport_1_data } from "../../curves/mtow_elevated_heliport_1"
import PlatformParameters from "../../components/PlatformParameters/PlatformParameters"
import { mtow_elevated_heliport_2_1_data } from "../../curves/mtow_elevated_heliport_2_1"
import { mtow_elevated_heliport_2_2_data } from "../../curves/mtow_elevated_heliport_2_2"
import CanvasElevatedHeliport from "../../CanvasElevatedHeliport/CanvasElevatedHeliport"
import { mtow_elevated_heliport_2_3_data } from "../../curves/mtow_elevated_heliport_2_3"
import { mlw_elevated_heliport_data } from "../../curves/mlw_elevated_heliport"
import AirBase from "../../components/AirBase/AirBase"
import Platform from "../../components/Platform/Platform"
import CanvasPc2Dle from "../../CanvasPc2Dle/CanvasPc2Dle"
import { mtow_pc2dle_isa_1_data } from "../../curves/mtow_pc2dle_isa_1"
import { mtow_pc2dle_isa_2_data } from "../../curves/mtow_pc2dle_isa_2"
import { mtow_pc2dle_isa20_1_data } from "../../curves/mtow_pc2dle_isa+20_1"
import { useSelector } from "react-redux"
import { mtow_pc2dle_isa20_2_data } from "../../curves/mtow_pc2dle_isa+20_2"
import { mlw_pc2dle_isa_1_data } from "../../curves/mlw_pc2dle_isa_1"
import { mlw_pc2dle_isa_2_data } from "../../curves/mlw_pc2dle_isa_2"
import { mlw_pc2dle_isa_3_data } from "../../curves/mlw_pc2dle_isa_3"
import { mlw_pc2dle_isa20_1_data } from "../../curves/mlw_pc2dle_isa+20_1"
import { mlw_pc2dle_isa20_2_data } from "../../curves/mlw_pc2dle_isa+20_2"

const Home = () => {
  // REDUX store
  const weatherData = useSelector((state) => state.weatherData)

  return (
    <div className="home-page">
      <h1>EC155 Flight Performances</h1>
      <div className="home-page__content">
        <section className="home-page__content-parameters">
          <TakeoffParameters />
          <PlatformParameters />
        </section>
        <section className="home-page__content-performances">
          <AirBase />
          <Platform />
        </section>
        <section className="home-page__content-curves">
          {/** PC2DLE curves in acordance with platform ISA */}
          {weatherData.platformISA < 10 ? (
            <>
              <CanvasPc2Dle
                data={[
                  mlw_pc2dle_isa_1_data,
                  mlw_pc2dle_isa_2_data,
                  mlw_pc2dle_isa_3_data,
                ]}
              />
              <CanvasPc2Dle
                data={[mtow_pc2dle_isa_1_data, mtow_pc2dle_isa_2_data]}
              />
            </>
          ) : (
            <>
              <CanvasPc2Dle data={[mlw_pc2dle_isa20_1_data]} />
              <CanvasPc2Dle
                data={[mtow_pc2dle_isa20_1_data, mtow_pc2dle_isa20_2_data]}
              />
            </>
          )}

          <Canvas {...mlw_elevated_heliport_data} />
          <CanvasElevatedHeliport
            data={[
              mtow_elevated_heliport_2_1_data,
              mtow_elevated_heliport_2_2_data,
              mtow_elevated_heliport_2_3_data,
            ]}
          />
          <Canvas {...mtow_elevated_heliport_1_data} />
          <Canvas {...d1_data} />
          <Canvas {...mtow_ca_40_data} />
          <Canvas {...mtow_ca_50_data} />
          <Canvas {...mtow_ca_60_data} />
          <Canvas {...mlw_ca_data} />
          <Canvas {...mtow_helipad_data} />
          <Canvas {...mlw_helipad_data} />
        </section>
      </div>
    </div>
  )
}

export default Home
