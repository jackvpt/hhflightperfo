import { useSelector } from "react-redux"
import "./PerformancesClass1.scss"
import { d1_predictD1 } from "../../curves/d1"

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
            <tr>
              <th class="header">VTOSS</th>
              <td class="right">40</td>
              <td class="right">50</td>
              <td class="right">60</td>
              <td class="right">70</td>
              <td class="right">80</td>
            </tr>
            <tr>
              <th class="header">D1</th>
              <td class="right">{d1_predictD1(factoredHeadWind, 40)}</td>
              <td class="right">{d1_predictD1(factoredHeadWind, 50)}</td>
              <td class="right">{d1_predictD1(factoredHeadWind, 60)}</td>
              <td class="right">{d1_predictD1(factoredHeadWind, 70)}</td>
              <td class="right">{d1_predictD1(factoredHeadWind, 80)}</td>
            </tr>
          </table>
        </div>
      </div>
    </section>
  )
}

export default PerformancesClass1
