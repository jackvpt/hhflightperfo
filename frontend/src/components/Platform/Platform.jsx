// CSS
import "./Platform.scss"

// REDUX
import { useSelector } from "react-redux"

// SVG
import PlatformIcon from "../../assets/images/platform.svg?react"
import TakeOffIcon from "../../assets/images/takeoff.svg?react"
import LandingIcon from "../../assets/images/landing.svg?react"

// FONTAWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCloudSunRain } from "@fortawesome/free-solid-svg-icons"

import { formatPerfo } from "../../utils/string"
import DisplayPerfo from "../SubComponents/DisplayPerfo/DisplayPerfo"

const Platform = () => {
  // REDUX store
  const weatherData = useSelector((state) => state.weatherData)
  const performancesData = useSelector((state) => state.performancesData)
  const flightData = useSelector((state) => state.flightData)

  // PC1 items declaration
  const itemsPC1_takeOff = [
    {
      name: "MTOW Elevated Heliport",
      calculations: [
        {
          value: formatPerfo(
            performancesData.pc1.elevatedHeliport.takeoff.mtow
          ),
        },
      ],
    },
  ]
  const itemsPC1_landing = [
    {
      name: "MLW Elevated Heliport",
      calculations: [
        {
          value: formatPerfo(performancesData.pc1.elevatedHeliport.landing.mlw),
        },
      ],
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
    [
      {
        name: "MTOW",
        calculations: [
          { value: formatPerfo(performancesData.pc2dle.takeoff.mtow) },
        ],
      },
      {
        name: "TTET at MTOW",
        calculations: [
          {
            value: formatPerfo(
              performancesData.pc2dle.takeoff.ttetCorrected,
              1
            ),
          },
        ],
        info: `Corrections for factored wind, Zp and ISA are applied (${
          takeOffDeltaTtet > 0 ? "+" : ""
        }${formatPerfo(takeOffDeltaTtet, 1)} s)`,
      },
    ],
    [
      {
        name: "MTOW at TTET=" + flightData.platformMaxTtet + " s",
        calculations: [
          {
            value: formatPerfo(performancesData.pc2dle.takeoff.mtow_givenTtet),
          },
        ],
        info: `Corrections for factored wind, Zp and ISA are applied (${
          landingDeltaTtet > 0 ? "+" : ""
        }${formatPerfo(landingDeltaTtet, 1)} s)`,
      },
    ],
     [
      {
        name:
          "TTET at WEIGHT=" + flightData.platformTakeoffWeight + " kg",
        calculations: [
          {
            value: formatPerfo(
              performancesData.pc2dle.takeoff.ttet_givenWeightCorrected,
              1
            ),
            type: "ttet",
          },
         
        ],
        info: `Corrections for factored wind, Zp and ISA are applied (${
          takeOffDeltaTtet > 0 ? "+" : ""
        }${formatPerfo(takeOffDeltaTtet, 1)} s)`,
      },
    ],
  ]

  const itemsPC2DLE_landing = [
    [
      {
        name: "MLW",
        calculations: [
          { value: formatPerfo(performancesData.pc2dle.landing.mlw) },
        ],
      },
      {
        name: "TTET & VLSS at MLW",
        calculations: [
          {
            value: formatPerfo(
              performancesData.pc2dle.landing.ttetCorrected,
              1
            ),
            type: "ttet",
          },
          {
            value: formatPerfo(performancesData.pc2dle.landing.vlss),
            type: "vlss",
          },
        ],
        info: `Corrections for factored wind, Zp and ISA are applied (${
          landingDeltaTtet > 0 ? "+" : ""
        }${formatPerfo(landingDeltaTtet, 1)} s)`,
      },
    ],
    [
      {
        name: "MLW & VLSS at TTET=" + flightData.platformMaxTtet + " s",
        calculations: [
          { value: formatPerfo(performancesData.pc2dle.landing.mlw_givenTtet) },
          {
            value: formatPerfo(performancesData.pc2dle.landing.vlss_givenTtet),
            type: "vlss",
          },
        ],
        info: `Corrections for factored wind, Zp and ISA are applied (${
          landingDeltaTtet > 0 ? "+" : ""
        }${formatPerfo(landingDeltaTtet, 1)} s)`,
      },
    ],
    [
      {
        name:
          "TTET & VLSS at WEIGHT=" + flightData.platformLandingWeight + " kg",
        calculations: [
          {
            value: formatPerfo(
              performancesData.pc2dle.landing.ttet_givenWeightCorrected,
              1
            ),
            type: "ttet",
          },
          {
            value: formatPerfo(
              performancesData.pc2dle.landing.vlss_givenWeight
            ),
            type: "vlss",
          },
        ],
        info: `Corrections for factored wind, Zp and ISA are applied (${
          landingDeltaTtet > 0 ? "+" : ""
        }${formatPerfo(landingDeltaTtet, 1)} s)`,
      },
    ],
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
                {" "}
                <TakeOffIcon className="icon_takeoff_landing" />
              </div>
              <div className="allItems-phase__performances">
                {itemsPC1_takeOff.map((item) => (
                  <DisplayPerfo key={item.name} {...item} />
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
                  <DisplayPerfo key={item.name} {...item} />
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
                <TakeOffIcon className="icon_takeoff_landing" />
              </div>
              <div className="allItems-phase__performances">
                {itemsPC2DLE_takeOff.map((itemGroup, groupIndex) => (
                  <div
                    className="allItems-phase__performances"
                    key={groupIndex}
                  >
                    {/* Display a separator except before the first group */}
                    {groupIndex > 0 && (
                      <div className="container-tab__body-separator" />
                    )}

                    {/* Display the items of the group */}
                    {itemGroup.map((item) => (
                      <DisplayPerfo key={item.name} {...item} />
                    ))}
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
                {itemsPC2DLE_landing.map((itemGroup, groupIndex) => (
                  <div
                    className="allItems-phase__performances"
                    key={groupIndex}
                  >
                    {/* Display a separator except before the first group */}
                    {groupIndex > 0 && (
                      <div className="container-tab__body-separator" />
                    )}

                    {/* Display the items of the group */}
                    {itemGroup.map((item) => (
                      <DisplayPerfo key={item.name} {...item} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Platform
