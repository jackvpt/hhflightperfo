import { FormControl, TextField } from "@mui/material"

const InputNumber = ({ name, label, value, onChange }) => {
  return (
    <FormControl variant="filled" size="small">
      <TextField
        id={name}
        name={name}
        type="number"
        label={label}
        value={value}
        aria-describedby={name}
        onFocus={(e) => e.target.select()}
        onChange={onChange}
        size="small"
      />
    </FormControl>
  )
}
export default InputNumber
