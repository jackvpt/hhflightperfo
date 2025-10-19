import "./InputNumber.scss"

import { Box, FormLabel, InputAdornment, TextField } from "@mui/material"
import { abbreviateUnit, getInputWidth } from "../../../utils/string"

const InputNumber = ({ name, label, value, onChange, onBlur, format }) => {
  // 🧭 Format the displayed value (e.g., headings padded to 3 digits)
  const formatValue = (val) => {
    if (val === "" || val === null || val === undefined) return ""
    const num = Number(val)
    if (Number.isNaN(num)) return ""
    if (format === "heading") return String(num).padStart(3, "0")
    return String(num)
  }

  // 🧼 Handle user input: remove non-digits, convert to number
  const handleChange = (e) => {
    const rawValue = e.target.value
    if (rawValue === "") {
      onChange({ target: { name, value: "" } })
      return
    }

    // Keep only digits
    const normalized = rawValue.replace(/\D+/g, "")
    if (normalized === "") {
      onChange({ target: { name, value: "" } })
      return
    }

    const numericValue = Number(normalized)
    onChange({ target: { name, value: numericValue } })
  }

  // 🧭 Normalize the value on blur (e.g., heading modulo 360)
  const handleBlur = () => {
    // optional formatting logic
    if (format === "heading" && value !== "" && value !== null) {
      let heading = Number(value)
      heading = heading % 360
      if (heading < 0) heading += 360
      onChange({ target: { name, value: heading } })
    }

    // trigger parent onBlur if provided
    if (onBlur) onBlur()
  }

  return (
    <div className="container-inputNumber">
      <div className="container-inputNumber__label">{label}</div>
      <TextField
          className="container-inputNumber__input"
        id={name}
        name={name}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={formatValue(value)}
        aria-describedby={name}
        onFocus={(e) => e.target.select()}
        onChange={handleChange}
        onBlur={handleBlur}
        fullWidth
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment
                position="end"
                sx={{
                  m: 0,
                  minHeight: "unset",
                  lineHeight: 1,
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
        }}
        sx={{
          width: getInputWidth(format),
          "& .MuiInputBase-input": {
            fontSize: "0.875rem",
            height: 12,
            padding: 1,
            textAlign: "right",
          },
          "& .MuiInputAdornment-root": {
            minHeight: "unset",
            m: 0,
            p: 0,
          },
        }}
      />
    </div>
  )
}

export default InputNumber
