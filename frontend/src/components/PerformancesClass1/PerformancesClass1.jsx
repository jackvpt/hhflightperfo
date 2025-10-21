import { useSelector } from "react-redux"
import "./PerformancesClass1.scss"

const PerformancesClass1 = () => {
  // REDUX store
  const weatherData = useSelector((state) => state.weatherData)
  const performancesData = useSelector((state) => state.performancesData)

  return (
    <section className="container-tab">
      <div className="container-tab__header headerPerformancesClass1">
        Performances Class 1
      </div>
      <div className="container-tab__body bodyPerformancesClass1">
        <div className="container-tab__body-weatherData">
          <div>Zp: {weatherData.takeoffZp} ft</div>
          <div>Temperature: {weatherData.takeoffTemperature} °C</div>
          <div>Factored Head Wind: {performancesData.factoredHeadWind} kt</div>
        </div>
        <div className="container-tab__body-performanceData">

        </div>
      </div>
    </section>
  )
}

export default PerformancesClass1
