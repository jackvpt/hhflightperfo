import { FormControl, TextField } from "@mui/material"

const InputNumber = ({ name, label, value, onChange,onBlur, format }) => {
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
      <TextField
        id={name}
        name={name}
        type="text" // use text to allow formatting like padding
        inputMode="numeric"
        pattern="[0-9]*"
        label={label}
        value={formatValue(value)}
        aria-describedby={name}
        onFocus={(e) => e.target.select()}
        onChange={handleChange}
        onBlur={handleBlur}
        sx={{
          "& .MuiInputBase-input": {
            fontSize: "0.875rem",
            height: 18,
            padding: 1,
            textAlign: "right",
          },
        }}
      />
  )
}

export default InputNumber
