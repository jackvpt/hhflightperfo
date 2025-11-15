// CSS
import "./Platform.scss"

// REDUX
import { useSelector } from "react-redux"

// SVG
import PlatformIcon from "../../assets/images/platform.svg?react"

// FONTAWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCloudSunRain } from "@fortawesome/free-solid-svg-icons"
import PerformanceToolTip from "../SubComponents/PerformanceToolTip/PerformanceToolTip"

const Platform = () => {
  // REDUX store
  const weatherData = useSelector((state) => state.weatherData)
  const performancesData = useSelector((state) => state.performancesData)
  const flightData = useSelector((state) => state.flightData)

  // PC1 items declaration
  const itemsPC1 = [
    {
      name: "MTOW Elevated Heliport",
      calculation: performancesData.mtow_elevated_heliport,
    },
    {
      name: "MLW Elevated Heliport",
      calculation: performancesData.mlw_elevated_heliport,
    },
  ]
  // PC2DLE items declaration
  const takeOffDeltaTtet =
    performancesData.takeoff_ttet_pc2dle_corrected -
    performancesData.takeoff_ttet_pc2dle

  const landingDeltaTtet =
    performancesData.landing_ttet_pc2dle_corrected -
    performancesData.landing_ttet_pc2dle

  const itemsPC2DLE = [
    {
      name: "MTOW PC2DLE",
      calculation: performancesData.mtow_pc2dle,
    },
    {
      name: "TAKE-OFF TTET",
      calculation: performancesData.takeoff_ttet_pc2dle_corrected,
      info: `Corrections for factored wind, Zp and ISA are applied (${
        takeOffDeltaTtet > 0 ? "+" : ""
      }${takeOffDeltaTtet.toFixed(1)} s)`,
    },
    {
      name: "MLW PC2DLE",
      calculation: performancesData.mlw_pc2dle,
    },
    {
      name: "LANDING TTET",
      calculation: performancesData.landing_ttet_pc2dle_corrected,
      info: `Corrections for factored wind, Zp and ISA are applied (${
        landingDeltaTtet > 0 ? "+" : ""
      }${landingDeltaTtet.toFixed(1)} s)`,
    },
    {
      name: "LANDING VLSS",
      calculation: Math.round(performancesData.landing_vlss_pc2dle),
    },
  ]

  return (
    <section className="container-tab">
      <div className="container-tab__header headerPlatform">
        <PlatformIcon className="header-icon" />
        Platform
      </div>
      <div className="container-tab__body bodyPlatform">
        {/** Weather data */}
        <div className="container-tab__body-weatherData">
          <FontAwesomeIcon icon={faCloudSunRain} className="weatherIcon" />
          <div className="weatherElement">Zp: {weatherData.platformZp} ft</div>
          <div className="weatherElement">
            Temperature: {weatherData.platformTemperature} °C (ISA
            {weatherData.platformISA >= 0 ? " +" : " "}
            {weatherData.platformISA})
          </div>
          <div className="weatherElement">
            Dropdown: {flightData.platformDropDown} ft
          </div>
          <div className="weatherElement">
            Factored Wind: {performancesData.platformFactoredWind} kt
          </div>
        </div>

        {/** Separator */}
        <div className="container-tab__body-separator" />

        {/** PC1 */}
        <div className="container-tab__body-group">
          <div className="container-tab__body-category pc1">PC1</div>
          <div className="container-tab__body-allItems">
            {itemsPC1.map((item) => (
              <div key={item.name} className="container-tab__body-item">
                <div className="performanceCell_header">{item.name}</div>
                <div className="performanceCell_value">{item.calculation}</div>
              </div>
            ))}
          </div>
        </div>

        {/** Separator */}
        <div className="container-tab__body-separator" />

        {/** PC2 DLE */}
        <div className="container-tab__body-group">
          <div className="container-tab__body-category pc2">PC2DLE</div>
          <div className="container-tab__body-allItems">
            {itemsPC2DLE.map((item) => (
              <div key={item.name} className="container-tab__body-item">
                <div className="performanceCell_header">
                  {item.name}
                  {item.info && item.calculation !== "N/A" && (
                    <PerformanceToolTip text={item.info} />
                  )}
                </div>
                <div className="performanceCell_value">{item.calculation}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Platform
