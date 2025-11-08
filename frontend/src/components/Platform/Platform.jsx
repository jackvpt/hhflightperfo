// CSS
import "./Platform.scss"

// REDUX
import { useSelector } from "react-redux"

// SVG
import PlatformIcon from "../../assets/images/platform.svg?react"

// FONTAWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCloudSunRain } from "@fortawesome/free-solid-svg-icons"

const Platform = () => {
  // REDUX store
  const weatherData = useSelector((state) => state.weatherData)
  const performancesData = useSelector((state) => state.performancesData)

  const items = [
    {
      name: "MTOW Elevated Heliport",
      calculation: performancesData.mtow_elevated_heliport,
    },
    {
      name: "MLW Elevated Heliport",
      calculation: performancesData.mlw_elevated_heliport,
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
            Temperature: {weatherData.platformTemperature} °C
          </div>
          <div className="weatherElement">
            Factored Wind: {weatherData.platformWindSpeed} kt
          </div>
        </div>
       
        {items.map((item) => (
          <div className="container-tab__body-item">
            <div className="performanceCell_header">{item.name}</div>
            <div className="performanceCell_value">{item.calculation}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Platform
