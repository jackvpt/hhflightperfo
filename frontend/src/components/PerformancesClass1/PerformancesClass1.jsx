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
                {[40, 50, 60, 70, 80].map((speed) => {
                  const match = performancesData.d1.find(
                    (d) => d.vtoss === speed
                  )
                  return (
                    <td key={speed} className="right">
                      {match ? match.distance : "-"}
                    </td>
                  )
                })}
              </tr>
            </tbody>
          </table>
        </div>
        <div className="performancesClass1__mtowClearArea">
          <div className="performanceCell_header">
            MTOW Clear Area VTOSS=40kt
          </div>
          <div className="performanceCell_value">
            {performancesData.mtow_ca_40}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PerformancesClass1
