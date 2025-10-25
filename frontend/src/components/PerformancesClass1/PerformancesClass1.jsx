import { useSelector } from "react-redux"
import "./PerformancesClass1.scss"
import { d1_predictD1 } from "../../curves/d1"
import { mtow_ca_40_predictWeight } from "../../curves/mtow_ca_40"

const PerformancesClass1 = () => {
  // REDUX store
  const weatherData = useSelector((state) => state.weatherData)
  const performancesData = useSelector((state) => state.performancesData)
  const factoredHeadWind = performancesData.factoredHeadWind

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
        <div className="performancesClass1__d1">
          <table>
            <thead>
              <tr>
                <th className="header">VTOSS</th>
                {[40, 50, 60, 70, 80].map((speed) => (
                  <td key={speed} className="right">
                    {speed}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="header">D1</th>
                {[40, 50, 60, 70, 80].map((speed) => (
                  <td key={speed} className="right">
                    {d1_predictD1(factoredHeadWind, speed)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <div className="performancesClass1__mtowClearArea">
          <div className="performanceCell_header">MTOW Clear Area VTOSS=40kt</div>
          <div className="performanceCell_value">{mtow_ca_40_predictWeight(weatherData.takeoffTemperature,weatherData.takeoffZp)}</div>
          </div>
      </div>
    </section>
  )
}

export default PerformancesClass1
