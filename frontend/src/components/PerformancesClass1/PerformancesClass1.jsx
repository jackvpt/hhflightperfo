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
          <table className="performancesClass1__d1-labels">
            <tbody>
              <tr>
                <td>VTOSS</td>
              </tr>
              <tr>
                <td>D1</td>
              </tr>
            </tbody>
          </table>
          <table className="performancesClass1__d1-values">
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
                  const match = performancesData.d1.find(
                    (d) => d.vtoss === vtoss
                  )
                  return (
                    <td key={vtoss} className="right">
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
