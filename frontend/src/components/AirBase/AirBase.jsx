// CSS
import "./AirBase.scss"

// REDUX
import { useSelector } from "react-redux"

// SVG
import HelicopterRunway from "../../assets/images/helicopter-runway.svg?react"
import TakeOffIcon from "../../assets/images/takeoff.svg?react"
import LandingIcon from "../../assets/images/landing.svg?react"

// FONTAWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCloudSunRain } from "@fortawesome/free-solid-svg-icons"
import { faPlaneDeparture } from "@fortawesome/free-solid-svg-icons"
import { faPlaneArrival } from "@fortawesome/free-solid-svg-icons"

import { formatPerfo } from "../../utils/string"

const AirBase = () => {
  // REDUX store
  const weatherData = useSelector((state) => state.weatherData)
  const performancesData = useSelector((state) => state.performancesData)

  const itemsPC1_takeOff = [
    {
      name: "MTOW Clear Area VTOSS = 40kt",
      calculation: formatPerfo(
        performancesData.pc1.clearArea.takeoff.mtow_vtoss40
      ),
    },
    {
      name: "MTOW Clear Area VTOSS = 50kt",
      calculation: formatPerfo(
        performancesData.pc1.clearArea.takeoff.mtow_vtoss50
      ),
    },
    {
      name: "MTOW Clear Area VTOSS ≥ 60kt",
      calculation: formatPerfo(
        performancesData.pc1.clearArea.takeoff.mtow_vtoss60
      ),
    },

    {
      name: "MTOW Ground Helipad",
      calculation: formatPerfo(performancesData.pc1.helipad.takeoff.mtow),
    },
  ]

  const itemsPC1_landing = [
    {
      name: "MLW Clear Area",
      calculation: formatPerfo(performancesData.pc1.clearArea.landing.mlw),
    },
    {
      name: "MLW Ground Helipad",
      calculation: formatPerfo(performancesData.pc1.helipad.landing.mlw),
    },
  ]

  return (
    <section className="container-tab performances">
      <div className="container-tab__header headerAirbase">
        <HelicopterRunway className="header-icon" />
        Air Base
      </div>
      <div className="container-tab__body bodyAirbase">
        {/** Weather data */}
        <div className="container-tab__body-weatherData">
          <FontAwesomeIcon icon={faCloudSunRain} className="weatherIcon" />
          <div className="weatherElement">Zp: {weatherData.takeoffZp} ft</div>
          <div className="weatherElement">
            Temperature: {weatherData.takeoffTemperature} °C
          </div>
          <div className="weatherElement">
            Factored Head Wind:{" "}
            {performancesData.pc1.clearArea.takeoff.factoredHeadWind} kt
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
                <TakeOffIcon className="icon_takeoff_landing" />
              </div>
              <div className="allItems-phase__performances">
                {/** D1 */}
                <div className="container-tab__body-item d1">
                  <table>
                    <tbody>
                      <tr>
                        <td>VTOSS</td>
                      </tr>
                      <tr>
                        <td>D1</td>
                      </tr>
                    </tbody>
                  </table>
                  <table className="d1-values">
                    <tbody>
                      <tr>
                        {[40, 50, 60, 70, 80].map((vtoss) => (
                          <td key={vtoss} className="right">
                            {vtoss}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        {[40, 50, 60, 70, 80].map((vtoss) => {
                          const match =
                            performancesData.pc1.clearArea.takeoff.d1.find(
                              (d) => d.vtoss === vtoss
                            )
                          return (
                            <td
                              key={vtoss}
                              className={`right ${
                                match.distance.text === "N/A"
                                  ? "nonApplicable"
                                  : ""
                              }`}
                            >
                              {match
                                ? match.distance.value
                                  ? match.distance.value
                                  : match.distance.text
                                : "-"}
                            </td>
                          )
                        })}
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/** Other items */}
                {itemsPC1_takeOff.map((item) => (
                  <div key={item.name} className="container-tab__body-item">
                    <div className="performanceCell_header">{item.name}</div>
                    <div className="performanceCell_value">
                      {item.calculation}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/** Separator */}
            <div className="container-tab__body-separator" />

            {/** Landing performances */}
            <div className="allItems-phase">
              <div className="allItems-phase__icon">
                <LandingIcon className="icon_takeoff_landing" />
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
                    <div className="performanceCell_value">
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

export default AirBase
