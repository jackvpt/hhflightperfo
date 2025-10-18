import { TextField } from "@mui/material"

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
    <TextField
      id={name}
      name={name}
      label={label}
      value={formatValue(value)}
      aria-describedby={name}
      disabled
      sx={{
        "& .MuiInputBase-input": {
          fontSize: "0.875rem",
          width: 100,
          height: 18,
          padding: 1,
          textAlign: "right",
        },
      }}
    />
  )
}

export default DisplayValue
