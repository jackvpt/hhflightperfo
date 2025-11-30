import { ToggleButton, ToggleButtonGroup } from "@mui/material"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateField as updateFlightField } from "../../../features/flightDataSlice"
import { airports } from "../../../data/airports"

const AirfieldToggleGroup = () => {
  // Store REDUX
  const dispatch = useDispatch()
  const takeoffAirfield = useSelector(
    (state) => state.flightData.takeoffAirfield
  )

  const [activeAirfield, setActiveAirfield] = useState(takeoffAirfield)

  const handleChange = (event, newAirfield) => {
    if (newAirfield === null) return
    setActiveAirfield( newAirfield)
    dispatch(
      updateFlightField({ field: "takeoffAirfield", value: newAirfield })
    )
  }

  return (
    <ToggleButtonGroup
      value={activeAirfield}
      exclusive
      onChange={handleChange}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      {airports.map(
        ({ code }) => (
          <ToggleButton
            key={code}
            value={code}
            disableRipple
            disableFocusRipple
            sx={{
              fontSize: "0.65rem",
              padding: "1px 4px",
              width: 60,
              textTransform: "none",
              borderRadius: 0,
              backgroundColor: activeAirfield === code ? "#00b894" : "#a6bff9",
              color: activeAirfield === code ? "#fff" : "#000",
              border:
                activeAirfield === code
                  ? `1px solid #00b894`
                  : "1px solid #a6bff9",
              transition:
                "background-color 0.25s ease, border-color 0.25s ease, transform 0.1s ease",
              "&:hover": {
                backgroundColor:
                  activeAirfield === code ? "#00b894" : "#90aaf7",
              },
              "&.Mui-selected": {
                backgroundColor: "#00b894",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#00b894",
                },
              },
              "&.Mui-focusVisible": {
                outline: "none",
              },

            }}
          >
            {code}
          </ToggleButton>
        )
      )}
    </ToggleButtonGroup>
  )
}

export default AirfieldToggleGroup
