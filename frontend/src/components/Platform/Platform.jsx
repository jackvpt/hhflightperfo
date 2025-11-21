// CSS
import "./Platform.scss"

// REDUX
import { useSelector } from "react-redux"

// SVG
import PlatformIcon from "../../assets/images/platform.svg?react"

// FONTAWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCloudSunRain } from "@fortawesome/free-solid-svg-icons"
import { faPlaneDeparture } from "@fortawesome/free-solid-svg-icons"
import { faPlaneArrival } from "@fortawesome/free-solid-svg-icons"

import PerformanceToolTip from "../SubComponents/PerformanceToolTip/PerformanceToolTip"
import { formatPerfo } from "../../utils/string"

const Platform = () => {
  // REDUX store
  const weatherData = useSelector((state) => state.weatherData)
  const performancesData = useSelector((state) => state.performancesData)
  const flightData = useSelector((state) => state.flightData)

  // PC1 items declaration
  const itemsPC1_takeOff = [
    {
      name: "MTOW Elevated Heliport",
      calculation: formatPerfo(
        performancesData.pc1.elevatedHeliport.takeoff.mtow
      ),
    },
  ]
  const itemsPC1_landing = [
    {
      name: "MLW Elevated Heliport",
      calculation: formatPerfo(
        performancesData.pc1.elevatedHeliport.landing.mlw
      ),
    },
  ]
  // PC2DLE items declaration
  const takeOffDeltaTtet =
    performancesData.pc2dle.takeoff.ttetCorrected -
    performancesData.pc2dle.takeoff.ttet

  const landingDeltaTtet =
    performancesData.pc2dle.landing.ttetCorrected -
    performancesData.pc2dle.landing.ttet

  const itemsPC2DLE_takeOff = [
    {
      name: "MTOW PC2DLE",
      calculation: formatPerfo(performancesData.pc2dle.takeoff.mtow),
    },
    {
      name: "TAKE-OFF TTET at MTOW",
      calculation: formatPerfo(
        performancesData.pc2dle.takeoff.ttetCorrected,
        1
      ),
      info: `Corrections for factored wind, Zp and ISA are applied (${
        takeOffDeltaTtet > 0 ? "+" : ""
      }${formatPerfo(takeOffDeltaTtet, 1)} s)`,
    },
  ]

  const itemsPC2DLE_landing = [
    {
      name: "MLW",
      calculation: formatPerfo(performancesData.pc2dle.landing.mlw),
    },
    {
      name: "LANDING TTET at MLW",
      calculation: formatPerfo(
        performancesData.pc2dle.landing.ttetCorrected,
        1
      ),
      info: `Corrections for factored wind, Zp and ISA are applied (${
        landingDeltaTtet > 0 ? "+" : ""
      }${formatPerfo(landingDeltaTtet, 1)} s)`,
    },
    {
      name: "LANDING VLSS at MLW",
      calculation: formatPerfo(performancesData.pc2dle.landing.vlss),
    },
    {
      name: "MLW TTET=" + flightData.platformMaxTtet + " s",
      calculation: formatPerfo(performancesData.pc2dle.landing.mlw_givenTtet),
      info: `Corrections for factored wind, Zp and ISA are applied (${
        landingDeltaTtet > 0 ? "+" : ""
      }${formatPerfo(landingDeltaTtet, 1)} s)`,
    },
    {
      name: "VLSS TTET=" + flightData.platformMaxTtet + " s",
      calculation: formatPerfo(performancesData.pc2dle.landing.vlss_givenTtet),
    },
    {
      name:
        "LANDING TTET at WEIGHT=" + flightData.platformLandingWeight + " kg",
      calculation: formatPerfo(
        performancesData.pc2dle.landing.ttet_givenWeightCorrected,
        1
      ),
      info: `Corrections for factored wind, Zp and ISA are applied (${
        landingDeltaTtet > 0 ? "+" : ""
      }${formatPerfo(landingDeltaTtet, 1)} s)`,
    },
    {
      name: "VLSS WEIGHT=" + flightData.platformLandingWeight + " kg",
      calculation: formatPerfo(
        performancesData.pc2dle.landing.vlss_givenWeight
      ),
    },
  ]

  return (
    <section className="container-tab performances">
      <div className="container-tab__header headerPlatform">
        <PlatformIcon className="header-icon" />
        Platform
      </div>
      <div className="container-tab__body bodyPlatform">
        {/** Weather data */}
        <div className="container-tab__body-weatherData">
          <div className="weatherIconWrapper">
            <FontAwesomeIcon icon={faCloudSunRain} className="weatherIcon" />
          </div>
          <div className="weatherBody">
            <div className="weatherElement">
              Zp: {weatherData.platformZp} ft
            </div>
            <div className="weatherElement">
              Temperature: {weatherData.platformTemperature} °C (ISA
              {weatherData.platformISA >= 0 ? " +" : " "}
              {weatherData.platformISA})
            </div>
            <div className="weatherElement">
              Dropdown: {flightData.platformDropDown} ft
            </div>
            <div className="weatherElement">
              Factored Wind:{" "}
              {performancesData.miscellaneous.platformFactoredWind} kt
            </div>
          </div>
        </div>

        {/** Separator */}
        <div className="container-tab__body-separator" />

        {/** PC1 */}
        <div className="container-tab__body-group">
          <div className="container-tab__body-category pc1">PC1</div>
          <div className="container-tab__body-allItems">
            {/** Take off performances */}
            <div className="allItems-phase">
              <div className="allItems-phase__icon">
                <FontAwesomeIcon icon={faPlaneDeparture} />
              </div>
              <div className="allItems-phase__performances">
                {itemsPC1_takeOff.map((item) => (
                  <div key={item.name} className="container-tab__body-item">
                    <div className="performanceCell_header">
                      {item.name}
                      {item.info && item.calculation !== "N/A" && (
                        <PerformanceToolTip text={item.info} />
                      )}
                    </div>
                    <div className={`performanceCell_value ${item.calculation === "N/A" ? "nonApplicable" : ""}`}>
                      {item.calculation}
                    </div>
                  </div>
                ))}{" "}
              </div>
            </div>

            {/** Separator */}
            <div className="container-tab__body-separator" />

            {/** Landing performances */}
            <div className="allItems-phase">
              <div className="allItems-phase__icon">
                <FontAwesomeIcon icon={faPlaneArrival} />
              </div>
              <div className="allItems-phase__performances">
                {itemsPC1_landing.map((item) => (
                  <div key={item.name} className="container-tab__body-item">
                    <div className="performanceCell_header">
                      {item.name}
                      {item.info && item.calculation !== "N/A" && (
                        <PerformanceToolTip text={item.info} />
                      )}
                    </div>
                    <div className={`performanceCell_value ${item.calculation === "N/A" ? "nonApplicable" : ""}`}>
                      {item.calculation}
                    </div>
                  </div>
                ))}{" "}
              </div>
            </div>
          </div>
        </div>

        {/** Separator */}
        <div className="container-tab__body-separator" />

        {/** PC2 DLE */}
        <div className="container-tab__body-group">
          <div className="container-tab__body-category pc2">PC2DLE</div>
          <div className="container-tab__body-allItems">
            {/** Take off performances */}
            <div className="allItems-phase">
              <div className="allItems-phase__icon">
                <FontAwesomeIcon icon={faPlaneDeparture} />
              </div>
              <div className="allItems-phase__performances">
                {itemsPC2DLE_takeOff.map((item) => (
                  <div key={item.name} className="container-tab__body-item">
                    <div className="performanceCell_header">
                      {item.name}
                      {item.info && item.calculation !== "N/A" && (
                        <PerformanceToolTip text={item.info} />
                      )}
                    </div>
                    <div className={`performanceCell_value ${item.calculation === "N/A" ? "nonApplicable" : ""}`}>
                      {item.calculation}
                    </div>
                  </div>
                ))}{" "}
              </div>
            </div>

            {/** Separator */}
            <div className="container-tab__body-separator" />

            {/** Landing performances */}
            <div className="allItems-phase">
              <div className="allItems-phase__icon">
                <FontAwesomeIcon icon={faPlaneArrival} />
              </div>
              <div className="allItems-phase__performances">
                {itemsPC2DLE_landing.map((item) => (
                  <div key={item.name} className="container-tab__body-item">
                    <div className="performanceCell_header">
                      {item.name}
                      {item.info && item.calculation !== "N/A" && (
                        <PerformanceToolTip text={item.info} />
                      )}
                    </div>
                    <div className={`performanceCell_value ${item.calculation === "N/A" ? "nonApplicable" : ""}`}>
                      {item.calculation}
                    </div>
                  </div>
                ))}{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Platform
