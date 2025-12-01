import PerformanceToolTip from "../PerformanceToolTip/PerformanceToolTip"

const DisplayPerfo = (item) => {
  return (
    <div key={item.name} className="container-tab__body-item">
      <div className="performanceCell_header">
        {item.name}
        {item.info && item.calculation !== "N/A" && (
          <PerformanceToolTip text={item.info} />
        )}
      </div>
      <div className="performanceCell_group">
        {item.calculations.map((calculation, index) => (
          <div
            key={`${item.name}-calculation-${index}`}
            className={`performanceCell_value cell_${calculation.type} ${
              calculation.value === "N/A" ? "nonApplicable" : ""
            }`}
          >
            {calculation.value}
          </div>
        ))}
      </div>
    </div>
  )
}

export default DisplayPerfo
