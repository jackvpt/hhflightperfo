import { Box, FormLabel, InputAdornment, TextField } from "@mui/material"
import { abbreviateUnit } from "../../../utils/string"

const DisplayValue = ({ name, label, value, format }) => {
  // 🧭 Format the displayed value (e.g., headings padded to 3 digits)
  const formatValue = (val) => {
    if (val === "" || val === null || val === undefined) return ""
    const num = Number(val)
    if (Number.isNaN(num)) return ""
    if (format === "heading") return String(num).padStart(3, "0")
    return String(num)
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1, // espace entre label et champ
      }}
    >
      <FormLabel
        htmlFor={name}
        sx={{
          fontSize: "0.8rem",
          whiteSpace: "nowrap",
          minWidth: 60,
          textAlign: "right",
        }}
      >
        {label}
      </FormLabel>
      <TextField
        id={name}
        name={name}
        value={formatValue(value)}
        aria-describedby={name}
        disabled
        sx={{
          "& .MuiInputBase-input": {
            fontSize: "0.875rem",
            width: 40,
            height: 18,
            padding: 1,
            textAlign: "right",
          },
        }}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment
                position="end"
                sx={{
                  m: 0,
                  minHeight: "unset",
                  lineHeight: 1,
                  color: "text.disabled",
                }}
              >
                <Box
                  component="span"
                  sx={{
                    fontSize: "0.7rem",
                    lineHeight: 1,
                    p: 0,
                    pt: 0.5,
                    m: 0,
                  }}
                >
                  {abbreviateUnit(format)}
                </Box>
              </InputAdornment>
            ),
          },
          inputLabel: {
            shrink: true,
          },
        }}
      />
    </Box>
  )
}

export default DisplayValue
