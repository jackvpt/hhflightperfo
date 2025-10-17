import { FormControl, TextField } from "@mui/material"

const InputNumber = ({ name, label, value, onChange }) => {
  // Format value based on field name
  const formatValue = (val) => {
    if (val === "" || val === null || val === undefined) return ""
    const num = Number(val)
    
    // List of fields to format to 3 digits
    const headingFields = ["runwayHeading", "windDirection"]
    if (headingFields.includes(name)) {
      return String(num).padStart(3, "0") // 👈 format 3 chiffres
    }
    return num // Pour les autres champs, pas de formatage
  }

  const handleChange = (e) => {
    const rawValue = e.target.value
    onChange(e)
  }

  return (
    <FormControl variant="filled" size="small">
      <TextField
        id={name}
        name={name}
        type="number"
        label={label}
        value={formatValue(value)}
        aria-describedby={name}
        onFocus={(e) => e.target.select()}
        onChange={handleChange}
        sx={{
          "& .MuiInputBase-input": {
            fontSize: "0.875rem",
            height: 18,
            padding: 1,
          },
        }}
      />
    </FormControl>
  )
}
export default InputNumber
