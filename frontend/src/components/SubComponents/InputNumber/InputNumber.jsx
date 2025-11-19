import { useState, useEffect } from "react"
import "./InputNumber.scss"
import { Box, InputAdornment, TextField } from "@mui/material"
import { abbreviateUnit, getInputWidth } from "../../../utils/string"
import { useSelector } from "react-redux"

const InputNumber = ({ name, label, value, onChange, onBlur, format }) => {
  // REDUX store
  const flightData = useSelector((state) => state.flightData)

  // State
  const [inputValue, setInputValue] = useState("")

  // 🧭 Format displayed value (e.g., pad heading values with zeros)
  const formatValue = (val) => {
    if (val === "" || val === null || val === undefined) return ""
    const num = Number(val)
    if (Number.isNaN(num)) return ""
    if (format === "heading") return String(num).padStart(3, "0")
    return String(num)
  }

  // 🧭 Keep local value in sync with the store value
  useEffect(() => {
    setInputValue(formatValue(value))
  }, [value, flightData])

  // 🧼 Handle user input: keep raw text locally and update store only when valid
  const handleChange = (e) => {
    setInputValue(e.target.value)
  }

  // 🧭 Clean / normalize value and update the store only on blur
  const handleBlur = () => {
    const raw = inputValue.trim()

    // Incomplete or invalid value → reset
    if (raw === "" || raw === "-" || raw === "." || raw === "-.") {
      setInputValue("")
      onChange({ target: { name, value: "" } })
      if (onBlur) onBlur()
      return
    }

    // Clean the string (keep only digits, dot and minus)
    const normalized = raw.replace(/[^\d.-]/g, "")
    let numericValue = Number(normalized)

    if (Number.isNaN(numericValue)) {
      // If still invalid after cleaning
      setInputValue("")
      onChange({ target: { name, value: "" } })
      if (onBlur) onBlur()
      return
    }

    // Special case: heading → modulo 360 and positive
    if (format === "heading") {
      numericValue = numericValue % 360
      if (numericValue < 0) numericValue += 360
    }

    // Update store
    onChange({ target: { name, value: numericValue } })
    // Update local display with formatted value
    setInputValue(formatValue(numericValue))

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
        inputMode="decimal"
        pattern="-?[0-9]+"
        value={inputValue}
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
