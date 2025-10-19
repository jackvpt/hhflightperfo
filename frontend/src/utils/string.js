  // Format the unit label
  export const abbreviateUnit = (unit) => {
    if (unit === "heading") return "°"
    if (unit === "temperature") return "°C"
    if (unit === "speed") return "kt"
    if (unit === "altitude") return "ft"
    if (unit === "pressure") return "hPa"
    return ""
  }