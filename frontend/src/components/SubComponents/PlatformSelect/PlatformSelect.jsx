import { MenuItem, Select } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { platforms } from "../../../data/platforms"
import { updateAnyField } from "../../../store/action"

const PlatformSelect = () => {
  // REDUX store
  const dispatch = useDispatch()
  const flightData = useSelector((state) => state.flightData)

  // Data
  const platformsData = platforms

  const handleInputChange = (event) => {
    const { name, value } = event.target
    dispatch(updateAnyField(name, value))
  }

  return (
    <Select
      id="platformName"
      name="platformName"
      value={flightData.platformName || platformsData[0].name}
      onChange={handleInputChange}
      sx={{
        width: "150px",

        "& .MuiSelect-select": {
          fontSize: "0.75rem",
          height: 12,
          padding: "4px 8px",
          textAlign: "right",
          display: "flex",
          alignItems: "center",
        },

        "& .MuiOutlinedInput-input": {
          padding: "4px 8px",
        },

        "& .MuiOutlinedInput-root": {
          height: "32px",
        },
      }}
      MenuProps={{
        PaperProps: {
          sx: {
            "& .MuiMenuItem-root": {
          fontSize: "0.75rem",
              minHeight: "20px",
              paddingY: "2px",
            },
          },
        },
      }}
    >
      {platformsData.map((platform) => (
        <MenuItem key={platform.name} value={platform.name}>
          {platform.name}
        </MenuItem>
      ))}
    </Select>
  )
}

export default PlatformSelect
