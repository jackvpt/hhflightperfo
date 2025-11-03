import "./MetarDisplay.scss"
import { useSelector } from "react-redux"
import { useFetchMetar } from "../../../hooks/useFetchMetar"

const MetarDisplay = () => {
  const takeoffAirfield = useSelector(
    (state) => state.flightData.takeoffAirfield
  )

  const {
    data: metarData,
    isLoading: isLoadingMetar,
    error: errorMetar,
  } = useFetchMetar(takeoffAirfield)

  // API async status handling
  if (errorMetar)
    return (
      <div className="metar-header">
        Error loading METAR data: {errorMetar.message}
      </div>
    )

  return (
    <div className="bodyTakeoffParameters-metar">
      <div className="metar-header">
        {metarData ? (
          <>
            {metarData?.icaoId} {metarData?.time}
          </>
        ) : isLoadingMetar ? (
          "Loading METAR..."
        ) : (
          "NO METAR DATA"
        )}
      </div>
      <div className="metar-text">{metarData?.rawText}</div>
    </div>
  )
}

export default MetarDisplay
