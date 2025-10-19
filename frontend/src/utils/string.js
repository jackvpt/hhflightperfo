  // Format the unit label
  export const abbreviateUnit = (unit) => {
    if (unit === "heading") return "°"
    if (unit === "temperature") return "°C"
    if (unit === "speed") return "kt"
    if (unit === "altitude") return "ft"
    if (unit === "pressure") return "hPa"
    return ""
  }

  // Width relative to unit type
  export const getInputWidth = (unit) => {
    if (unit === "heading") return 70
    if (unit === "temperature") return 70
    if (unit === "speed") return 70
    if (unit === "altitude") return 90
    if (unit === "pressure") return 90
    return 90
  }
